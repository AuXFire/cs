import { describe, expect, it } from "vitest";
import { buildServer } from "../src/server.js";
import {
  TEST_API_KEY,
  makeApiKeyLookup,
  makeKeyResolver,
  makeLogQueue,
} from "./fixtures.js";

const SSE_SCRIPT = [
  `event: message_start\ndata: ${JSON.stringify({
    type: "message_start",
    message: {
      model: "claude-sonnet-4-6",
      usage: { input_tokens: 200, output_tokens: 1, cache_read_input_tokens: 150 },
    },
  })}\n\n`,
  `event: content_block_delta\ndata: ${JSON.stringify({
    type: "content_block_delta",
    delta: { type: "text_delta", text: "Hello" },
  })}\n\n`,
  `event: message_delta\ndata: ${JSON.stringify({
    type: "message_delta",
    usage: { output_tokens: 75 },
  })}\n\n`,
  `event: message_stop\ndata: ${JSON.stringify({ type: "message_stop" })}\n\n`,
];

function scriptedSseStream(opts: {
  delayMs?: number;
  cancelSignal?: AbortSignal;
  onCancel?: () => void;
}): ReadableStream<Uint8Array> {
  const encoder = new TextEncoder();
  const delayMs = opts.delayMs ?? 0;
  let canceled = false;
  return new ReadableStream<Uint8Array>({
    async start(controller) {
      let i = 0;
      const writeNext = async () => {
        if (canceled || opts.cancelSignal?.aborted) {
          if (!canceled) controller.close();
          return;
        }
        if (i >= SSE_SCRIPT.length) {
          controller.close();
          return;
        }
        try {
          controller.enqueue(encoder.encode(SSE_SCRIPT[i]!));
        } catch {
          return;
        }
        i++;
        if (delayMs > 0) {
          await new Promise((r) => setTimeout(r, delayMs));
        }
        void writeNext();
      };
      void writeNext();
    },
    cancel() {
      canceled = true;
      opts.onCancel?.();
    },
  });
}

async function readAll(stream: ReadableStream<Uint8Array>): Promise<string> {
  const reader = stream.getReader();
  const decoder = new TextDecoder();
  let out = "";
  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    if (value) out += decoder.decode(value, { stream: true });
  }
  return out;
}

describe("SSE streaming proxy", () => {
  it("forwards event stream end-to-end and logs final usage", async () => {
    const { queue, captured } = makeLogQueue();

    const app = buildServer({
      apiKeyLookup: makeApiKeyLookup(),
      keys: makeKeyResolver(),
      logQueue: queue,
      anthropicBaseUrl: "http://upstream.invalid",
      fetchImpl: (async () =>
        new Response(scriptedSseStream({}), {
          status: 200,
          headers: { "content-type": "text/event-stream" },
        })) as typeof fetch,
    });

    const res = await app.request("/v1/messages", {
      method: "POST",
      headers: {
        authorization: `Bearer ${TEST_API_KEY}`,
        "content-type": "application/json",
      },
      body: JSON.stringify({
        model: "claude-sonnet-4-6",
        stream: true,
        messages: [{ role: "user", content: "hi" }],
      }),
    });

    expect(res.status).toBe(200);
    expect(res.headers.get("content-type")).toBe("text/event-stream");
    const body = await readAll(res.body!);
    expect(body).toContain("message_start");
    expect(body).toContain("Hello");
    expect(body).toContain("message_stop");

    await queue.flush();
    expect(captured).toHaveLength(1);
    expect(captured[0]).toMatchObject({
      modelUsed: "claude-sonnet-4-6",
      inputTokens: 200,
      cachedInputTokens: 150,
      outputTokens: 75,
      status: "success",
    });
  });

  it("aborts the upstream when the client cancels mid-stream", async () => {
    const { queue, captured } = makeLogQueue();
    let upstreamCanceled = false;
    let upstreamAbortHit = false;

    const fetchImpl = (async (input: RequestInfo | URL, init?: RequestInit) => {
      const signal = init?.signal as AbortSignal | undefined;
      signal?.addEventListener("abort", () => {
        upstreamAbortHit = true;
      });
      return new Response(
        scriptedSseStream({
          delayMs: 50,
          cancelSignal: signal,
          onCancel: () => {
            upstreamCanceled = true;
          },
        }),
        { status: 200, headers: { "content-type": "text/event-stream" } },
      );
    }) as typeof fetch;

    const app = buildServer({
      apiKeyLookup: makeApiKeyLookup(),
      keys: makeKeyResolver(),
      logQueue: queue,
      anthropicBaseUrl: "http://upstream.invalid",
      fetchImpl,
    });

    const clientAbort = new AbortController();
    const reqPromise = app.request(
      "/v1/messages",
      {
        method: "POST",
        headers: {
          authorization: `Bearer ${TEST_API_KEY}`,
          "content-type": "application/json",
        },
        body: JSON.stringify({
          model: "claude-sonnet-4-6",
          stream: true,
          messages: [{ role: "user", content: "long" }],
        }),
        signal: clientAbort.signal,
      } as RequestInit,
    );

    const res = await reqPromise;
    expect(res.status).toBe(200);
    const reader = res.body!.getReader();
    await reader.read();
    clientAbort.abort();
    await reader.cancel();

    await new Promise((r) => setTimeout(r, 80));

    expect(upstreamAbortHit || upstreamCanceled).toBe(true);
    await queue.flush();
    expect(captured).toHaveLength(1);
    expect(captured[0]?.status).toBe("timeout");
  });
});
