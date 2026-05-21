import { describe, expect, it } from "vitest";
import { anthropicAdapter } from "../src/index.js";

describe("anthropicAdapter.parseUsage", () => {
  it("extracts usage from a non-streaming response", () => {
    const usage = anthropicAdapter.parseUsage({
      type: "message",
      model: "claude-sonnet-4-6",
      usage: {
        input_tokens: 100,
        output_tokens: 50,
        cache_read_input_tokens: 80,
      },
    });
    expect(usage).toEqual({
      inputTokens: 100,
      outputTokens: 50,
      cachedInputTokens: 80,
    });
  });

  it("returns null for malformed bodies", () => {
    expect(anthropicAdapter.parseUsage(null)).toBeNull();
    expect(anthropicAdapter.parseUsage({})).toBeNull();
    expect(anthropicAdapter.parseUsage("not-an-object")).toBeNull();
  });

  it("defaults cached_input_tokens to 0 when absent", () => {
    const usage = anthropicAdapter.parseUsage({
      usage: { input_tokens: 10, output_tokens: 5 },
    });
    expect(usage).toEqual({
      inputTokens: 10,
      outputTokens: 5,
      cachedInputTokens: 0,
    });
  });
});

describe("anthropicAdapter.parseStreamUsage", () => {
  it("accumulates usage across SSE events", () => {
    const state = anthropicAdapter.initialStreamState();

    const messageStart = [
      "event: message_start",
      `data: ${JSON.stringify({
        type: "message_start",
        message: {
          model: "claude-sonnet-4-6",
          usage: {
            input_tokens: 200,
            output_tokens: 1,
            cache_read_input_tokens: 150,
          },
        },
      })}`,
      "",
      "",
    ].join("\n");

    anthropicAdapter.parseStreamUsage(state, messageStart);
    expect(state.model).toBe("claude-sonnet-4-6");
    expect(state.usage.inputTokens).toBe(200);
    expect(state.usage.cachedInputTokens).toBe(150);

    const messageDelta = [
      "event: message_delta",
      `data: ${JSON.stringify({
        type: "message_delta",
        usage: { output_tokens: 75 },
      })}`,
      "",
      "",
    ].join("\n");

    anthropicAdapter.parseStreamUsage(state, messageDelta);
    expect(state.usage.outputTokens).toBe(75);
  });

  it("handles partial chunks across events", () => {
    const state = anthropicAdapter.initialStreamState();
    const event = `event: message_start\ndata: ${JSON.stringify({
      type: "message_start",
      message: { model: "claude-sonnet-4-6", usage: { input_tokens: 50 } },
    })}\n\n`;

    const mid = Math.floor(event.length / 2);
    anthropicAdapter.parseStreamUsage(state, event.slice(0, mid));
    expect(state.model).toBeNull();
    anthropicAdapter.parseStreamUsage(state, event.slice(mid));
    expect(state.model).toBe("claude-sonnet-4-6");
    expect(state.usage.inputTokens).toBe(50);
  });

  it("ignores [DONE] sentinel and malformed JSON without throwing", () => {
    const state = anthropicAdapter.initialStreamState();
    anthropicAdapter.parseStreamUsage(state, "data: [DONE]\n\n");
    anthropicAdapter.parseStreamUsage(state, "data: {not json\n\n");
    expect(state.usage.outputTokens).toBe(0);
  });
});

describe("anthropicAdapter.authHeaders", () => {
  it("returns x-api-key and anthropic-version", () => {
    expect(anthropicAdapter.authHeaders("sk-test")).toEqual({
      "x-api-key": "sk-test",
      "anthropic-version": "2023-06-01",
    });
  });
});
