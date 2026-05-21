import { serve } from "@hono/node-server";
import { LocalKms } from "@codemesh/crypto";
import { createDb, schema } from "@codemesh/db";
import { loadEnv } from "./env.js";
import { CachingProviderKeyResolver, dbProviderKeyFetcher } from "./keys.js";
import { RequestLogQueue } from "./logging/queue.js";
import { safeLog } from "./logging/scrub.js";
import { buildServer } from "./server.js";
import { dbApiKeyLookup } from "./middleware/auth.js";

async function main() {
  const env = loadEnv();
  const db = createDb(env.databaseUrl);
  const kms = LocalKms.fromHex(env.kmsMasterKeyHex);

  const logQueue = new RequestLogQueue({
    sink: async (entry) => {
      await db.insert(schema.requestLogs).values({
        tenantId: entry.tenantId,
        apiKeyId: entry.apiKeyId,
        provider: entry.provider,
        modelRequested: entry.modelRequested,
        modelUsed: entry.modelUsed,
        team: entry.team,
        feature: entry.feature,
        inputTokens: entry.inputTokens,
        outputTokens: entry.outputTokens,
        cachedInputTokens: entry.cachedInputTokens,
        costUsdMicros: entry.costUsdMicros,
        latencyMs: entry.latencyMs,
        status: entry.status,
        requestHash: entry.requestHash,
      });
    },
  });
  logQueue.start();

  const keys = new CachingProviderKeyResolver(
    dbProviderKeyFetcher(db),
    kms,
    { ttlMs: env.keyCacheTtlMs },
  );

  const app = buildServer({
    apiKeyLookup: dbApiKeyLookup(db),
    keys,
    logQueue,
    anthropicBaseUrl: env.anthropicBaseUrl,
  });

  const server = serve({ fetch: app.fetch, port: env.port }, (info) => {
    safeLog("info", "gateway listening", { port: info.port });
  });

  const shutdown = async (signal: string) => {
    safeLog("info", "shutting down", { signal });
    server.close();
    await logQueue.close();
    process.exit(0);
  };
  process.on("SIGINT", () => void shutdown("SIGINT"));
  process.on("SIGTERM", () => void shutdown("SIGTERM"));
}

main().catch((err) => {
  safeLog("error", "fatal startup error", { error: (err as Error).message });
  process.exit(1);
});
