import { describe, expect, it } from "vitest";
import { RequestLogQueue } from "../src/logging/queue.js";
import type { RequestLogInput } from "@codemesh/core";

function makeEntry(overrides: Partial<RequestLogInput> = {}): RequestLogInput {
  return {
    tenantId: "00000000-0000-0000-0000-000000000001",
    apiKeyId: "00000000-0000-0000-0000-000000000002",
    provider: "anthropic",
    modelRequested: "claude-sonnet-4-6",
    modelUsed: "claude-sonnet-4-6",
    team: null,
    feature: null,
    inputTokens: 10,
    outputTokens: 5,
    cachedInputTokens: 0,
    costUsdMicros: BigInt(0),
    latencyMs: 42,
    status: "success",
    requestHash: null,
    ...overrides,
  };
}

describe("RequestLogQueue", () => {
  it("delivers entries to the sink on flush", async () => {
    const calls: RequestLogInput[] = [];
    const q = new RequestLogQueue({
      sink: async (e) => {
        calls.push(e);
      },
    });
    q.enqueue(makeEntry({ latencyMs: 1 }));
    q.enqueue(makeEntry({ latencyMs: 2 }));
    await q.flush();
    expect(calls).toHaveLength(2);
    expect(calls[0]?.latencyMs).toBe(1);
    expect(calls[1]?.latencyMs).toBe(2);
  });

  it("survives a sink error and continues with later entries", async () => {
    let count = 0;
    const q = new RequestLogQueue({
      sink: async () => {
        count++;
        if (count === 1) throw new Error("boom");
      },
    });
    q.enqueue(makeEntry());
    q.enqueue(makeEntry());
    await q.flush();
    expect(count).toBe(2);
  });

  it("drops entries beyond maxBuffer", () => {
    const q = new RequestLogQueue({
      sink: async () => {},
      maxBuffer: 2,
    });
    q.enqueue(makeEntry());
    q.enqueue(makeEntry());
    q.enqueue(makeEntry());
    expect(q.size()).toBe(2);
  });

  it("flushes on close", async () => {
    const calls: RequestLogInput[] = [];
    const q = new RequestLogQueue({
      sink: async (e) => {
        calls.push(e);
      },
    });
    q.enqueue(makeEntry());
    await q.close();
    expect(calls).toHaveLength(1);
  });
});
