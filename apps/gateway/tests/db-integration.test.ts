import { fileURLToPath } from "node:url";
import path from "node:path";
import { PGlite } from "@electric-sql/pglite";
import { LocalKms, encryptProviderKey, sha256Hex } from "@codemesh/crypto";
import { createDb, schema } from "@codemesh/db";
import { drizzle } from "drizzle-orm/pglite";
import { migrate } from "drizzle-orm/pglite/migrator";
import { afterEach, beforeEach, describe, expect, it } from "vitest";
import {
  CachingProviderKeyResolver,
  dbProviderKeyFetcher,
} from "../src/keys.js";
import { dbApiKeyLookup } from "../src/middleware/auth.js";

const here = path.dirname(fileURLToPath(import.meta.url));
const migrationsFolder = path.join(here, "..", "..", "..", "packages", "db", "migrations");

type Db = ReturnType<typeof createDb>;

let client: PGlite;
let db: Db;

beforeEach(async () => {
  client = new PGlite();
  db = drizzle(client, { schema }) as unknown as Db;
  await migrate(db as never, { migrationsFolder });
});

afterEach(async () => {
  await client.close();
});

describe("DB-backed gateway paths", () => {
  it("resolves a tenant from a cmk_ key hash and decrypts its provider key", async () => {
    const kms = LocalKms.generate();
    const cmkKey = "cmk_test_integration1234567890";
    const providerKeyPlain = "sk-ant-api03-secretvalue9876";

    const [tenant] = await db
      .insert(schema.tenants)
      .values({ name: "Integration Co" })
      .returning();

    const [apiKey] = await db
      .insert(schema.apiKeys)
      .values({
        tenantId: tenant!.id,
        keyHash: sha256Hex(cmkKey),
        keyPrefix: cmkKey.slice(0, 12),
        name: "primary",
      })
      .returning();

    const encrypted = await encryptProviderKey(kms, providerKeyPlain);
    await db.insert(schema.providerKeys).values({
      tenantId: tenant!.id,
      provider: "anthropic",
      encryptedKey: encrypted.ciphertext,
      keyFingerprint: encrypted.fingerprint,
    });

    // auth lookup
    const lookup = dbApiKeyLookup(db);
    const auth = await lookup(sha256Hex(cmkKey));
    expect(auth).not.toBeNull();
    expect(auth!.tenant.id).toBe(tenant!.id);
    expect(auth!.apiKey.id).toBe(apiKey!.id);

    // unknown key hash -> null
    expect(await lookup(sha256Hex("cmk_test_wrong"))).toBeNull();

    // provider key decryption round-trip
    const resolver = new CachingProviderKeyResolver(
      dbProviderKeyFetcher(db),
      kms,
      { ttlMs: 300_000 },
    );
    const resolved = await resolver.get(tenant!.id, "anthropic");
    expect(resolved).toBe(providerKeyPlain);

    // second call hits the in-memory cache (still correct)
    expect(await resolver.get(tenant!.id, "anthropic")).toBe(providerKeyPlain);
  });

  it("returns null when a tenant has no provider key for the requested provider", async () => {
    const kms = LocalKms.generate();
    const [tenant] = await db
      .insert(schema.tenants)
      .values({ name: "NoKeys Co" })
      .returning();

    const resolver = new CachingProviderKeyResolver(
      dbProviderKeyFetcher(db),
      kms,
      { ttlMs: 300_000 },
    );
    expect(await resolver.get(tenant!.id, "openai")).toBeNull();
  });

  it("writes a request_log row that the rollup can aggregate", async () => {
    const { runSpendRollup } = await import("@codemesh/db");
    const [tenant] = await db
      .insert(schema.tenants)
      .values({ name: "Logging Co" })
      .returning();
    const [apiKey] = await db
      .insert(schema.apiKeys)
      .values({
        tenantId: tenant!.id,
        keyHash: sha256Hex("cmk_test_log"),
        keyPrefix: "cmk_test_log",
        name: "k",
      })
      .returning();

    await db.insert(schema.requestLogs).values({
      tenantId: tenant!.id,
      apiKeyId: apiKey!.id,
      provider: "anthropic",
      modelRequested: "claude-sonnet-4-6",
      modelUsed: "claude-sonnet-4-6",
      inputTokens: 100,
      outputTokens: 50,
      cachedInputTokens: 30,
      costUsdMicros: 969n,
      latencyMs: 12,
      status: "success",
      createdAt: new Date(Date.now() - 60_000),
    });

    const res = await runSpendRollup(db);
    expect(res.rolledRows).toBe(1);
    const buckets = await db.select().from(schema.spendBuckets);
    expect(buckets[0]?.costUsdMicros).toBe(969n);
  });
});
