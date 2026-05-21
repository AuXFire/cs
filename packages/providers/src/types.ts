import type { Provider } from "@codemesh/core";

export interface ProviderUsage {
  inputTokens: number;
  outputTokens: number;
  cachedInputTokens: number;
}

export interface ProviderAdapter {
  readonly name: Provider;
  readonly baseUrl: string;
  authHeaders(apiKey: string): Record<string, string>;
  parseUsage(responseBody: unknown): ProviderUsage | null;
  parseStreamUsage(
    state: StreamUsageState,
    chunk: string,
  ): { usage: ProviderUsage | null; model: string | null };
  initialStreamState(): StreamUsageState;
}

export interface StreamUsageState {
  buffer: string;
  usage: ProviderUsage;
  model: string | null;
}
