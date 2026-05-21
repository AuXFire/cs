import { sql } from "drizzle-orm";
import { afterEach, beforeEach, describe, expect, it } from "vitest";
import { runSpendRollup } from "../src/rollup.js";
import * as schema from "../src/schema.js";
import { makeTestDb, type TestDb } from "./harness.js";

let h: TestDb;
let tenantId: string;
let apiKeyId: string;

beforeEach(async () => {
  h = await makeTestDb();
  const [tenant] = await h.db
    .insert(schema.tenants)
    .values({ name: "Acme" })
    .returning();
  tenantId = tenant!.id;
  const [apiKey] = await h.db
    .insert(schema.apiKeys)
    .values({
      tenantId,
      keyHash: "hash",
      keyPrefix: "cmk_test_xx",
      name: "k",
    })
    .returning();
  apiKeyId = apiKey!.id;
});

afterEach(async () => {
  await h.close();
});

async function insertLog(overrides: Partial<typeof schema.requestLogs.$inferInsert> = {}) {
  const [row] = await h.db
    .insert(schema.requestLogs)
    .values({
      tenantId,
      apiKeyId,
      provider: "anthropic",
      modelRequested: "claude-sonnet-4-6",
      modelUsed: "claude-sonnet-4-6",
      inputTokens: 100,
      outputTokens: 50,
      cachedInputTokens: 0,
      costUsdMicros: 1000n,
      latencyMs: 10,
      status: "success",
      // place in the past so the olderThanSeconds buffer doesn't exclude it
      createdAt: new Date(Date.now() - 60_000),
      ...overrides,
    })
    .returning();
  return row!;
}

describe("runSpendRollup", () => {
  it("aggregates request_logs into hourly spend_buckets", async () => {
    await insertLog({ team: "agents", feature: "planner" });
    await insertLog({ team: "agents", feature: "planner", outputTokens: 70 });

    const res = await runSpendRollup(h.db);
    expect(res.rolledRows).toBe(2);

    const buckets = await h.db.select().from(schema.spendBuckets);
    expect(buckets).toHaveLength(1);
    expect(buckets[0]).toMatchObject({
      team: "agents",
      feature: "planner",
      provider: "anthropic",
      model: "claude-sonnet-4-6",
      requestCount: 2,
      inputTokens: 200n,
      outputTokens: 120n,
      costUsdMicros: 2000n,
    });
  });

  it("collapses null team/feature to empty string", async () => {
    await insertLog({ team: null, feature: null });
    await runSpendRollup(h.db);
    const buckets = await h.db.select().from(schema.spendBuckets);
    expect(buckets[0]?.team).toBe("");
    expect(buckets[0]?.feature).toBe("");
  });

  it("is exactly-once: re-running does not double count", async () => {
    await insertLog();
    await runSpendRollup(h.db);
    const second = await runSpendRollup(h.db);
    expect(second.rolledRows).toBe(0);

    const buckets = await h.db.select().from(schema.spendBuckets);
    expect(buckets[0]?.requestCount).toBe(1);
  });

  it("adds new logs into an existing hour bucket on a later run", async () => {
    const now = new Date(Date.now() - 60_000);
    await insertLog({ createdAt: now });
    await runSpendRollup(h.db);

    await insertLog({ createdAt: now, costUsdMicros: 500n });
    const res = await runSpendRollup(h.db);
    expect(res.rolledRows).toBe(1);

    const buckets = await h.db.select().from(schema.spendBuckets);
    expect(buckets).toHaveLength(1);
    expect(buckets[0]?.requestCount).toBe(2);
    expect(buckets[0]?.costUsdMicros).toBe(1500n);
  });

  it("attributes intervention savings into the bucket", async () => {
    const log = await insertLog();
    await h.db.insert(schema.interventions).values({
      requestLogId: log.id,
      type: "cache_control_injected",
      tokensSaved: 80,
      costSavedUsdMicros: 240n,
    });

    await runSpendRollup(h.db);
    const buckets = await h.db.select().from(schema.spendBuckets);
    expect(buckets[0]?.savingsUsdMicros).toBe(240n);
  });

  it("separates distinct models into distinct buckets", async () => {
    await insertLog({ modelUsed: "claude-sonnet-4-6" });
    await insertLog({ modelUsed: "claude-haiku-4-5" });
    await runSpendRollup(h.db);
    const buckets = await h.db.select().from(schema.spendBuckets);
    expect(buckets).toHaveLength(2);
  });

  it("rollup total reconciles to request_logs sum (within 0)", async () => {
    await insertLog({ costUsdMicros: 111n });
    await insertLog({ costUsdMicros: 222n, team: "x" });
    await insertLog({ costUsdMicros: 333n, feature: "y" });
    await runSpendRollup(h.db);

    const logSumRes = await h.db.execute<{ s: string }>(
      sql`SELECT COALESCE(SUM(cost_usd_micros),0)::bigint AS s FROM request_logs`,
    );
    const bucketSumRes = await h.db.execute<{ s: string }>(
      sql`SELECT COALESCE(SUM(cost_usd_micros),0)::bigint AS s FROM spend_buckets`,
    );
    const logSum = (bucketSumRes as { rows: Array<{ s: string }> }).rows[0];
    const bucketSum = (logSumRes as { rows: Array<{ s: string }> }).rows[0];
    expect(bucketSum!.s).toBe(logSum!.s);
  });
});
