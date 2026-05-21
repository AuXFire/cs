import { describe, expect, it } from "vitest";
import { buildServer } from "../src/server.js";
import {
  TEST_API_KEY,
  makeApiKeyLookup,
  makeKeyResolver,
  makeLogQueue,
} from "./fixtures.js";

function makeFetchImpl(responder: (req: Request) => Promise<Response>): typeof fetch {
  return ((input: RequestInfo | URL, init?: RequestInit) => {
    const req = input instanceof Request ? input : new Request(input.toString(), init);
    return responder(req);
  }) as typeof fetch;
}

describe("auth middleware", () => {
  it("rejects requests without an authorization header", async () => {
    const { queue } = makeLogQueue();
    const app = buildServer({
      apiKeyLookup: makeApiKeyLookup(),
      keys: makeKeyResolver(),
      logQueue: queue,
      anthropicBaseUrl: "http://upstream.invalid",
      fetchImpl: makeFetchImpl(async () => new Response("never called", { status: 500 })),
    });
    const res = await app.request("/v1/messages", { method: "POST" });
    expect(res.status).toBe(401);
  });

  it("rejects bearer tokens that don't start with cmk_", async () => {
    const { queue } = makeLogQueue();
    const app = buildServer({
      apiKeyLookup: makeApiKeyLookup(),
      keys: makeKeyResolver(),
      logQueue: queue,
      anthropicBaseUrl: "http://upstream.invalid",
      fetchImpl: makeFetchImpl(async () => new Response("never called", { status: 500 })),
    });
    const res = await app.request("/v1/messages", {
      method: "POST",
      headers: { authorization: "Bearer sk-anthropic-style" },
    });
    expect(res.status).toBe(401);
  });

  it("rejects suspended tenants with 403", async () => {
    const { queue } = makeLogQueue();
    const app = buildServer({
      apiKeyLookup: makeApiKeyLookup({ suspended: true }),
      keys: makeKeyResolver(),
      logQueue: queue,
      anthropicBaseUrl: "http://upstream.invalid",
      fetchImpl: makeFetchImpl(async () => new Response("never called", { status: 500 })),
    });
    const res = await app.request("/v1/messages", {
      method: "POST",
      headers: { authorization: `Bearer ${TEST_API_KEY}` },
    });
    expect(res.status).toBe(403);
  });

  it("health endpoint requires no auth", async () => {
    const { queue } = makeLogQueue();
    const app = buildServer({
      apiKeyLookup: makeApiKeyLookup(),
      keys: makeKeyResolver(),
      logQueue: queue,
      anthropicBaseUrl: "http://upstream.invalid",
      fetchImpl: makeFetchImpl(async () => new Response("never called", { status: 500 })),
    });
    const res = await app.request("/health");
    expect(res.status).toBe(200);
    expect(await res.json()).toEqual({ status: "ok" });
  });
});

describe("non-streaming proxy", () => {
  it("forwards to upstream with x-api-key and logs usage", async () => {
    const { queue, captured } = makeLogQueue();
    let observedHeaders: Headers | null = null;
    let observedBody = "";

    const app = buildServer({
      apiKeyLookup: makeApiKeyLookup(),
      keys: makeKeyResolver("sk-ant-test-XYZ"),
      logQueue: queue,
      anthropicBaseUrl: "http://upstream.invalid",
      fetchImpl: makeFetchImpl(async (req) => {
        observedHeaders = req.headers;
        observedBody = await req.text();
        return new Response(
          JSON.stringify({
            type: "message",
            model: "claude-sonnet-4-6",
            usage: { input_tokens: 100, output_tokens: 50, cache_read_input_tokens: 30 },
          }),
          { status: 200, headers: { "content-type": "application/json" } },
        );
      }),
    });

    const res = await app.request("/v1/messages", {
      method: "POST",
      headers: {
        authorization: `Bearer ${TEST_API_KEY}`,
        "content-type": "application/json",
        "x-codemesh-team": "agents",
        "x-codemesh-feature": "planner",
      },
      body: JSON.stringify({
        model: "claude-sonnet-4-6",
        messages: [{ role: "user", content: "hi" }],
      }),
    });

    expect(res.status).toBe(200);
    const json = (await res.json()) as { usage: { input_tokens: number } };
    expect(json.usage.input_tokens).toBe(100);

    expect(observedHeaders!.get("x-api-key")).toBe("sk-ant-test-XYZ");
    expect(observedHeaders!.get("anthropic-version")).toBe("2023-06-01");
    expect(observedHeaders!.get("authorization")).toBeNull();
    expect(JSON.parse(observedBody).model).toBe("claude-sonnet-4-6");

    await queue.flush();
    expect(captured).toHaveLength(1);
    expect(captured[0]).toMatchObject({
      provider: "anthropic",
      modelRequested: "claude-sonnet-4-6",
      modelUsed: "claude-sonnet-4-6",
      team: "agents",
      feature: "planner",
      inputTokens: 100,
      outputTokens: 50,
      cachedInputTokens: 30,
      status: "success",
    });
    // (70*3 + 30*0.3 + 50*15) / 1e6 USD = 969 micros
    expect(captured[0]?.costUsdMicros).toBe(969n);
  });

  it("returns 502 when the provider key is missing", async () => {
    const { queue } = makeLogQueue();
    const app = buildServer({
      apiKeyLookup: makeApiKeyLookup(),
      keys: makeKeyResolver(null),
      logQueue: queue,
      anthropicBaseUrl: "http://upstream.invalid",
      fetchImpl: makeFetchImpl(async () => new Response("never", { status: 500 })),
    });
    const res = await app.request("/v1/messages", {
      method: "POST",
      headers: {
        authorization: `Bearer ${TEST_API_KEY}`,
        "content-type": "application/json",
      },
      body: JSON.stringify({ model: "claude-sonnet-4-6", messages: [] }),
    });
    expect(res.status).toBe(400);
  });

  it("passes upstream errors through verbatim (non-stream)", async () => {
    const { queue } = makeLogQueue();
    const app = buildServer({
      apiKeyLookup: makeApiKeyLookup(),
      keys: makeKeyResolver(),
      logQueue: queue,
      anthropicBaseUrl: "http://upstream.invalid",
      fetchImpl: makeFetchImpl(async () =>
        new Response(
          JSON.stringify({ type: "error", error: { type: "invalid_request_error", message: "bad" } }),
          { status: 400, headers: { "content-type": "application/json" } },
        ),
      ),
    });
    const res = await app.request("/v1/messages", {
      method: "POST",
      headers: {
        authorization: `Bearer ${TEST_API_KEY}`,
        "content-type": "application/json",
      },
      body: JSON.stringify({ model: "claude-sonnet-4-6", messages: [] }),
    });
    expect(res.status).toBe(400);
    const json = await res.json();
    expect(json).toMatchObject({ type: "error" });
  });
});
