import type { ProviderAdapter, ProviderUsage, StreamUsageState } from "./types.js";

interface AnthropicUsage {
  input_tokens?: number;
  output_tokens?: number;
  cache_read_input_tokens?: number;
  cache_creation_input_tokens?: number;
}

interface AnthropicMessageResponse {
  type?: string;
  model?: string;
  usage?: AnthropicUsage;
}

function toUsage(u: AnthropicUsage | undefined): ProviderUsage {
  return {
    inputTokens: u?.input_tokens ?? 0,
    outputTokens: u?.output_tokens ?? 0,
    cachedInputTokens: u?.cache_read_input_tokens ?? 0,
  };
}

export const anthropicAdapter: ProviderAdapter = {
  name: "anthropic",
  baseUrl: "https://api.anthropic.com",

  authHeaders(apiKey) {
    return {
      "x-api-key": apiKey,
      "anthropic-version": "2023-06-01",
    };
  },

  parseUsage(responseBody) {
    const body = responseBody as AnthropicMessageResponse | null;
    if (!body || typeof body !== "object") return null;
    if (!body.usage) return null;
    return toUsage(body.usage);
  },

  initialStreamState() {
    return {
      buffer: "",
      usage: { inputTokens: 0, outputTokens: 0, cachedInputTokens: 0 },
      model: null,
    };
  },

  parseStreamUsage(state, chunk) {
    state.buffer += chunk;
    const events = splitSseEvents(state);

    for (const event of events) {
      const payload = parseSseDataPayload(event);
      if (!payload) continue;
      mergeUsageFromEvent(state, payload);
    }

    return { usage: state.usage, model: state.model };
  },
};

function splitSseEvents(state: StreamUsageState): string[] {
  const events: string[] = [];
  let idx: number;
  while ((idx = state.buffer.indexOf("\n\n")) !== -1) {
    events.push(state.buffer.slice(0, idx));
    state.buffer = state.buffer.slice(idx + 2);
  }
  return events;
}

function parseSseDataPayload(event: string): unknown {
  for (const line of event.split("\n")) {
    if (!line.startsWith("data:")) continue;
    const data = line.slice(5).trim();
    if (!data || data === "[DONE]") continue;
    try {
      return JSON.parse(data);
    } catch {
      return null;
    }
  }
  return null;
}

interface StreamEvent {
  type?: string;
  message?: AnthropicMessageResponse;
  usage?: AnthropicUsage;
}

function mergeUsageFromEvent(state: StreamUsageState, payload: unknown): void {
  const ev = payload as StreamEvent | null;
  if (!ev || typeof ev !== "object") return;

  if (ev.type === "message_start" && ev.message) {
    if (ev.message.model) state.model = ev.message.model;
    if (ev.message.usage) {
      const u = toUsage(ev.message.usage);
      state.usage.inputTokens = u.inputTokens;
      state.usage.cachedInputTokens = u.cachedInputTokens;
      state.usage.outputTokens = u.outputTokens;
    }
  } else if (ev.type === "message_delta" && ev.usage) {
    if (typeof ev.usage.output_tokens === "number") {
      state.usage.outputTokens = ev.usage.output_tokens;
    }
    if (typeof ev.usage.input_tokens === "number") {
      state.usage.inputTokens = ev.usage.input_tokens;
    }
    if (typeof ev.usage.cache_read_input_tokens === "number") {
      state.usage.cachedInputTokens = ev.usage.cache_read_input_tokens;
    }
  }
}
