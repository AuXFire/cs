import { createDb } from "@codemesh/db";
import { loadEnv } from "../env.js";
import { safeLog } from "../logging/scrub.js";
import { startRollupLoop } from "./rollup-loop.js";

function main() {
  const env = loadEnv();
  const db = createDb(env.databaseUrl);
  const loop = startRollupLoop(db, { intervalMs: env.rollupIntervalMs });
  safeLog("info", "rollup worker started", { intervalMs: env.rollupIntervalMs });

  const shutdown = (signal: string) => {
    safeLog("info", "rollup worker shutting down", { signal });
    loop.stop();
    process.exit(0);
  };
  process.on("SIGINT", () => shutdown("SIGINT"));
  process.on("SIGTERM", () => shutdown("SIGTERM"));
}

main();
