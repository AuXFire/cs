import { Hono } from "hono";
import type { ProviderKeyResolver } from "./keys.js";
import type { ApiKeyLookup } from "./middleware/auth.js";
import { authMiddleware } from "./middleware/auth.js";
import type { RequestLogQueue } from "./logging/queue.js";
import { makeAnthropicMessagesRoute } from "./routes/anthropic.js";

export interface ServerDeps {
  apiKeyLookup: ApiKeyLookup;
  keys: ProviderKeyResolver;
  logQueue: RequestLogQueue;
  anthropicBaseUrl: string;
  fetchImpl?: typeof fetch;
}

export function buildServer(deps: ServerDeps) {
  const app = new Hono();

  app.get("/health", (c) => c.json({ status: "ok" }));

  const authed = new Hono();
  authed.use("*", authMiddleware(deps.apiKeyLookup));
  authed.post(
    "/v1/messages",
    makeAnthropicMessagesRoute({
      baseUrl: deps.anthropicBaseUrl,
      keys: deps.keys,
      logQueue: deps.logQueue,
      fetchImpl: deps.fetchImpl,
    }),
  );

  app.route("/", authed);

  return app;
}
