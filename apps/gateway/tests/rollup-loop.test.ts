import { fileURLToPath } from "node:url";
import path from "node:path";
import { PGlite } from "@electric-sql/pglite";
import { createDb, schema } from "@codemesh/db";
import { drizzle } from "drizzle-orm/pglite";
import { migrate } from "drizzle-orm/pglite/migrator";
import { afterEach, beforeEach, describe, expect, it } from "vitest";
import { drainRollup } from "../src/worker/rollup-loop.js";

const here = path.dirname(fileURLToPath(import.meta.url));
const migrationsFolder = path.join(here, "..", "..", "..", "packages", "db", "migrations");

type Db = ReturnType<typeof createDb>;
let client: PGlite;
let db: Db;
let tenantId: string;
let apiKeyId: string;

beforeEach(async () => {
  client = new PGlite();
  db = drizzle(client, { schema }) as unknown as Db;
  await migrate(db as never, { migrationsFolder });
  const [t] = await db.insert(schema.tenants).values({ name: "Loop Co" }).returning();
  tenantId = t!.id;
  const [k] = await db
    .insert(schema.apiKeys)
    .values({ tenantId, keyHash: "h", keyPrefix: "cmk_test_xx", name: "k" })
    .returning();
  apiKeyId = k!.id;
});

afterEach(async () => {
  await client.close();
});

describe("drainRollup", () => {
  it("drains all pending rows across multiple batches", async () => {
    const past = new Date(Date.now() - 60_000);
    const values = Array.from({ length: 7 }, () => ({
      tenantId,
      apiKeyId,
      provider: "anthropic" as const,
      modelRequested: "claude-haiku-4-5",
      modelUsed: "claude-haiku-4-5",
      inputTokens: 10,
      outputTokens: 5,
      cachedInputTokens: 0,
      costUsdMicros: 100n,
      latencyMs: 1,
      status: "success" as const,
      createdAt: past,
    }));
    await db.insert(schema.requestLogs).values(values);

    const total = await drainRollup(db, { batchSize: 3 });
    expect(total).toBe(7);

    const buckets = await db.select().from(schema.spendBuckets);
    expect(buckets).toHaveLength(1);
    expect(buckets[0]?.requestCount).toBe(7);
    expect(buckets[0]?.costUsdMicros).toBe(700n);

    // nothing left to roll
    expect(await drainRollup(db, { batchSize: 3 })).toBe(0);
  });
});
