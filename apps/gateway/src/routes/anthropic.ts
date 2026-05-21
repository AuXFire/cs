import type { RequestLogInput, RequestStatus } from "@codemesh/core";
import { anthropicAdapter } from "@codemesh/providers";
import type { Context, Handler } from "hono";
import { getAuth } from "../middleware/auth.js";
import type { ProviderKeyResolver } from "../keys.js";
import type { RequestLogQueue } from "../logging/queue.js";
import { safeLog } from "../logging/scrub.js";

export interface AnthropicRouteDeps {
  baseUrl: string;
  keys: ProviderKeyResolver;
  logQueue: RequestLogQueue;
  fetchImpl?: typeof fetch;
}

const FORWARDED_REQUEST_HEADERS = new Set([
  "anthropic-beta",
  "anthropic-version",
  "content-type",
  "accept",
]);

const STRIPPED_RESPONSE_HEADERS = new Set([
  "transfer-encoding",
  "content-encoding",
  "content-length",
  "connection",
]);

export function makeAnthropicMessagesRoute(deps: AnthropicRouteDeps): Handler {
  const doFetch = deps.fetchImpl ?? fetch;
  return async (c) => {
    const start = Date.now();
    const { tenant, apiKey } = getAuth(c);

    const apiKeyPlain = await deps.keys.get(tenant.id, "anthropic");
    if (!apiKeyPlain) {
      return c.json(
        { error: { type: "configuration_error", message: "No anthropic provider key configured" } },
        400,
      );
    }

    const team = c.req.header("x-codemesh-team") ?? null;
    const feature = c.req.header("x-codemesh-feature") ?? null;

    const bodyBuffer = await c.req.arrayBuffer();
    const bodyBytes = new Uint8Array(bodyBuffer);
    const parsedBody = parseJsonSafe(bodyBytes);
    const modelRequested =
      typeof parsedBody?.model === "string" ? parsedBody.model : "unknown";
    const isStream = parsedBody?.stream === true;

    const forwardHeaders = new Headers();
    c.req.raw.headers.forEach((value, name) => {
      if (FORWARDED_REQUEST_HEADERS.has(name.toLowerCase())) {
        forwardHeaders.set(name, value);
      }
    });
    const auth = anthropicAdapter.authHeaders(apiKeyPlain);
    for (const [k, v] of Object.entries(auth)) forwardHeaders.set(k, v);
    if (!forwardHeaders.has("content-type")) {
      forwardHeaders.set("content-type", "application/json");
    }

    const abortController = new AbortController();
    const onClientAbort = () => abortController.abort();
    c.req.raw.signal.addEventListener("abort", onClientAbort);

    let upstream: Response;
    try {
      upstream = await doFetch(`${deps.baseUrl}/v1/messages`, {
        method: "POST",
        headers: forwardHeaders,
        body: bodyBytes,
        signal: abortController.signal,
      });
    } catch (err) {
      c.req.raw.signal.removeEventListener("abort", onClientAbort);
      logUsage({
        deps,
        tenantId: tenant.id,
        apiKeyId: apiKey.id,
        modelRequested,
        team,
        feature,
        status: c.req.raw.signal.aborted ? "timeout" : "error",
        latencyMs: Date.now() - start,
        usage: null,
        modelUsed: null,
      });
      safeLog("warn", "upstream fetch failed", { error: (err as Error).message });
      return c.json(
        { error: { type: "upstream_error", message: "Failed to reach upstream" } },
        502,
      );
    }

    if (!isStream || !upstream.body) {
      return finishJson({
        c,
        deps,
        tenantId: tenant.id,
        apiKeyId: apiKey.id,
        upstream,
        modelRequested,
        team,
        feature,
        start,
        onAbort: onClientAbort,
      });
    }

    return finishStream({
      c,
      deps,
      tenantId: tenant.id,
      apiKeyId: apiKey.id,
      upstream,
      modelRequested,
      team,
      feature,
      start,
      abortController,
      onClientAbort,
    });
  };
}

async function finishJson(args: {
  c: Context;
  deps: AnthropicRouteDeps;
  tenantId: string;
  apiKeyId: string;
  upstream: Response;
  modelRequested: string;
  team: string | null;
  feature: string | null;
  start: number;
  onAbort: () => void;
}): Promise<Response> {
  const { c, deps, tenantId, apiKeyId, upstream, modelRequested, team, feature, start, onAbort } = args;
  const bytes = new Uint8Array(await upstream.arrayBuffer());
  c.req.raw.signal.removeEventListener("abort", onAbort);

  const parsed = parseJsonSafe(bytes);
  const usage = parsed ? anthropicAdapter.parseUsage(parsed) : null;
  const modelUsed = typeof parsed?.model === "string" ? parsed.model : modelRequested;
  const status: RequestStatus = upstream.ok ? "success" : "error";

  logUsage({
    deps,
    tenantId,
    apiKeyId,
    modelRequested,
    team,
    feature,
    status,
    latencyMs: Date.now() - start,
    usage,
    modelUsed,
  });

  return new Response(bytes, {
    status: upstream.status,
    headers: filterResponseHeaders(upstream.headers),
  });
}

function finishStream(args: {
  c: Context;
  deps: AnthropicRouteDeps;
  tenantId: string;
  apiKeyId: string;
  upstream: Response;
  modelRequested: string;
  team: string | null;
  feature: string | null;
  start: number;
  abortController: AbortController;
  onClientAbort: () => void;
}): Response {
  const {
    c,
    deps,
    tenantId,
    apiKeyId,
    upstream,
    modelRequested,
    team,
    feature,
    start,
    abortController,
    onClientAbort,
  } = args;

  const reader = upstream.body!.getReader();
  const decoder = new TextDecoder();
  const usageState = anthropicAdapter.initialStreamState();
  let logged = false;

  const finalizeLog = (status: RequestStatus) => {
    if (logged) return;
    logged = true;
    c.req.raw.signal.removeEventListener("abort", onClientAbort);
    logUsage({
      deps,
      tenantId,
      apiKeyId,
      modelRequested,
      team,
      feature,
      status,
      latencyMs: Date.now() - start,
      usage: {
        inputTokens: usageState.usage.inputTokens,
        outputTokens: usageState.usage.outputTokens,
        cachedInputTokens: usageState.usage.cachedInputTokens,
      },
      modelUsed: usageState.model ?? modelRequested,
    });
  };

  const stream = new ReadableStream<Uint8Array>({
    async pull(controller) {
      try {
        const { done, value } = await reader.read();
        if (done) {
          controller.close();
          finalizeLog(upstream.ok ? "success" : "error");
          return;
        }
        if (value) {
          controller.enqueue(value);
          anthropicAdapter.parseStreamUsage(
            usageState,
            decoder.decode(value, { stream: true }),
          );
        }
      } catch (err) {
        const aborted = c.req.raw.signal.aborted;
        finalizeLog(aborted ? "timeout" : "error");
        controller.error(err);
      }
    },
    cancel() {
      abortController.abort();
      reader.cancel().catch(() => {});
      finalizeLog("timeout");
    },
  });

  c.req.raw.signal.addEventListener("abort", () => {
    abortController.abort();
    reader.cancel().catch(() => {});
    finalizeLog("timeout");
  });

  const responseHeaders = filterResponseHeaders(upstream.headers);
  if (!responseHeaders.has("content-type")) {
    responseHeaders.set("content-type", "text/event-stream");
  }
  responseHeaders.set("cache-control", "no-cache");

  return new Response(stream, {
    status: upstream.status,
    headers: responseHeaders,
  });
}

function logUsage(args: {
  deps: AnthropicRouteDeps;
  tenantId: string;
  apiKeyId: string;
  modelRequested: string;
  team: string | null;
  feature: string | null;
  status: RequestStatus;
  latencyMs: number;
  usage: { inputTokens: number; outputTokens: number; cachedInputTokens: number } | null;
  modelUsed: string | null;
}): void {
  const entry: RequestLogInput = {
    tenantId: args.tenantId,
    apiKeyId: args.apiKeyId,
    provider: "anthropic",
    modelRequested: args.modelRequested,
    modelUsed: args.modelUsed ?? args.modelRequested,
    team: args.team,
    feature: args.feature,
    inputTokens: args.usage?.inputTokens ?? 0,
    outputTokens: args.usage?.outputTokens ?? 0,
    cachedInputTokens: args.usage?.cachedInputTokens ?? 0,
    costUsdMicros: BigInt(0),
    latencyMs: args.latencyMs,
    status: args.status,
    requestHash: null,
  };
  args.deps.logQueue.enqueue(entry);
}

function parseJsonSafe(bytes: Uint8Array): { model?: string; stream?: boolean } | null {
  try {
    const text = new TextDecoder().decode(bytes);
    if (!text) return null;
    const parsed = JSON.parse(text);
    return typeof parsed === "object" && parsed !== null ? parsed : null;
  } catch {
    return null;
  }
}

function filterResponseHeaders(src: Headers): Headers {
  const out = new Headers();
  src.forEach((value, key) => {
    if (!STRIPPED_RESPONSE_HEADERS.has(key.toLowerCase())) {
      out.set(key, value);
    }
  });
  return out;
}
