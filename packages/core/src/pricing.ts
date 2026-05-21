export interface ModelPrice {
  /** USD per million input tokens */
  input: number;
  /** USD per million output tokens */
  output: number;
  /** USD per million cached (read) input tokens */
  cachedInput: number;
}

/**
 * Prices in USD per million tokens. Store cost in micros (USD * 1e6) in the DB
 * to avoid float arithmetic. Update when providers change pricing.
 */
export const MODEL_PRICING: Record<string, ModelPrice> = {
  "claude-opus-4-7": { input: 15, output: 75, cachedInput: 1.5 },
  "claude-sonnet-4-6": { input: 3, output: 15, cachedInput: 0.3 },
  "claude-haiku-4-5": { input: 0.8, output: 4, cachedInput: 0.08 },
};

const MICROS_PER_USD = 1_000_000;

export function getModelPrice(model: string): ModelPrice | null {
  return MODEL_PRICING[model] ?? null;
}

export interface CostInput {
  model: string;
  inputTokens: number;
  outputTokens: number;
  cachedInputTokens: number;
}

/**
 * Cost in USD micros (USD * 1e6). Cached input tokens are billed at the cached
 * rate; the remaining (non-cached) input tokens at the regular input rate.
 * Returns 0n for unknown models so attribution never blocks the response path.
 */
export function computeCostUsdMicros(input: CostInput): bigint {
  const price = getModelPrice(input.model);
  if (!price) return 0n;

  const nonCachedInput = Math.max(0, input.inputTokens - input.cachedInputTokens);
  const usd =
    (nonCachedInput * price.input +
      input.cachedInputTokens * price.cachedInput +
      input.outputTokens * price.output) /
    1_000_000;

  return BigInt(Math.round(usd * MICROS_PER_USD));
}

/**
 * Savings from a cache-control hit: the delta between the regular input price
 * and the cached input price, applied to the cached tokens.
 */
export function computeCacheSavingsUsdMicros(
  model: string,
  cachedInputTokens: number,
): bigint {
  const price = getModelPrice(model);
  if (!price) return 0n;
  const usd = (cachedInputTokens * (price.input - price.cachedInput)) / 1_000_000;
  return BigInt(Math.round(usd * MICROS_PER_USD));
}
