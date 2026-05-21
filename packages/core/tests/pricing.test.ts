import { describe, expect, it } from "vitest";
import {
  computeCacheSavingsUsdMicros,
  computeCostUsdMicros,
  getModelPrice,
} from "../src/index.js";

describe("computeCostUsdMicros", () => {
  it("prices non-cached input, cached input, and output separately", () => {
    // sonnet: input 3, cachedInput 0.3, output 15 (USD per 1M)
    // 1_000_000 input of which 400_000 cached, 200_000 output
    // non-cached input = 600_000 * 3 / 1e6 = 1.8
    // cached input     = 400_000 * 0.3 / 1e6 = 0.12
    // output           = 200_000 * 15 / 1e6 = 3.0
    // total = 4.92 USD = 4_920_000 micros
    const cost = computeCostUsdMicros({
      model: "claude-sonnet-4-6",
      inputTokens: 1_000_000,
      outputTokens: 200_000,
      cachedInputTokens: 400_000,
    });
    expect(cost).toBe(4_920_000n);
  });

  it("returns 0 for unknown models", () => {
    expect(
      computeCostUsdMicros({
        model: "gpt-unknown",
        inputTokens: 1000,
        outputTokens: 1000,
        cachedInputTokens: 0,
      }),
    ).toBe(0n);
  });

  it("bills fully-cached input at the cached rate", () => {
    const cost = computeCostUsdMicros({
      model: "claude-haiku-4-5",
      inputTokens: 100,
      outputTokens: 0,
      cachedInputTokens: 100,
    });
    // all 100 input billed at cached rate (0.08/1M): 100*0.08/1e6 = 0.000008 USD = 8 micros
    expect(cost).toBe(8n);
  });
});

describe("computeCacheSavingsUsdMicros", () => {
  it("attributes the input vs cached price delta", () => {
    // sonnet: (3 - 0.3) = 2.7 per 1M; 1_000_000 cached = 2.7 USD = 2_700_000 micros
    expect(
      computeCacheSavingsUsdMicros("claude-sonnet-4-6", 1_000_000),
    ).toBe(2_700_000n);
  });

  it("returns 0 for unknown models", () => {
    expect(computeCacheSavingsUsdMicros("gpt-unknown", 1000)).toBe(0n);
  });
});

describe("getModelPrice", () => {
  it("returns null for unknown models", () => {
    expect(getModelPrice("nope")).toBeNull();
  });

  it("returns pricing for known models", () => {
    expect(getModelPrice("claude-opus-4-7")).toEqual({
      input: 15,
      output: 75,
      cachedInput: 1.5,
    });
  });
});
