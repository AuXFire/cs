import { sql } from "drizzle-orm";
import {
  bigint,
  boolean,
  customType,
  index,
  integer,
  jsonb,
  pgEnum,
  pgTable,
  primaryKey,
  text,
  timestamp,
  uuid,
} from "drizzle-orm/pg-core";

const bytea = customType<{ data: Buffer; default: false }>({
  dataType() {
    return "bytea";
  },
});

export const providerEnum = pgEnum("provider", [
  "anthropic",
  "openai",
  "google",
]);

export const tenantPlanEnum = pgEnum("tenant_plan", [
  "developer",
  "team",
  "enterprise",
]);

export const tenantStatusEnum = pgEnum("tenant_status", [
  "active",
  "suspended",
]);

export const requestStatusEnum = pgEnum("request_status", [
  "success",
  "error",
  "timeout",
  "cached_dedup",
]);

export const interventionTypeEnum = pgEnum("intervention_type", [
  "cache_control_injected",
  "dedup_hit",
  "tool_pruned",
  "model_routed",
  "context_trimmed",
]);

export const tenants = pgTable("tenants", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: text("name").notNull(),
  plan: tenantPlanEnum("plan").notNull().default("developer"),
  status: tenantStatusEnum("status").notNull().default("active"),
  monthlyTokenQuota: bigint("monthly_token_quota", {
    mode: "bigint",
  })
    .notNull()
    .default(sql`50000000`),
  createdAt: timestamp("created_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
});

export const apiKeys = pgTable(
  "api_keys",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    tenantId: uuid("tenant_id")
      .notNull()
      .references(() => tenants.id, { onDelete: "cascade" }),
    keyHash: text("key_hash").notNull().unique(),
    keyPrefix: text("key_prefix").notNull(),
    name: text("name").notNull(),
    createdAt: timestamp("created_at", { withTimezone: true })
      .notNull()
      .defaultNow(),
    lastUsedAt: timestamp("last_used_at", { withTimezone: true }),
    revokedAt: timestamp("revoked_at", { withTimezone: true }),
  },
  (t) => ({
    tenantIdx: index("api_keys_tenant_idx").on(t.tenantId),
  }),
);

export const providerKeys = pgTable(
  "provider_keys",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    tenantId: uuid("tenant_id")
      .notNull()
      .references(() => tenants.id, { onDelete: "cascade" }),
    provider: providerEnum("provider").notNull(),
    encryptedKey: bytea("encrypted_key").notNull(),
    keyFingerprint: text("key_fingerprint").notNull(),
    createdAt: timestamp("created_at", { withTimezone: true })
      .notNull()
      .defaultNow(),
  },
  (t) => ({
    tenantProviderIdx: index("provider_keys_tenant_provider_idx").on(
      t.tenantId,
      t.provider,
    ),
  }),
);

export const requestLogs = pgTable(
  "request_logs",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    tenantId: uuid("tenant_id")
      .notNull()
      .references(() => tenants.id, { onDelete: "cascade" }),
    apiKeyId: uuid("api_key_id")
      .notNull()
      .references(() => apiKeys.id, { onDelete: "cascade" }),
    provider: providerEnum("provider").notNull(),
    modelRequested: text("model_requested").notNull(),
    modelUsed: text("model_used").notNull(),
    team: text("team"),
    feature: text("feature"),
    inputTokens: integer("input_tokens").notNull().default(0),
    outputTokens: integer("output_tokens").notNull().default(0),
    cachedInputTokens: integer("cached_input_tokens").notNull().default(0),
    costUsdMicros: bigint("cost_usd_micros", { mode: "bigint" })
      .notNull()
      .default(sql`0`),
    latencyMs: integer("latency_ms").notNull().default(0),
    status: requestStatusEnum("status").notNull(),
    requestHash: text("request_hash"),
    createdAt: timestamp("created_at", { withTimezone: true })
      .notNull()
      .defaultNow(),
    rolledUpAt: timestamp("rolled_up_at", { withTimezone: true }),
  },
  (t) => ({
    tenantCreatedIdx: index("request_logs_tenant_created_idx").on(
      t.tenantId,
      sql`${t.createdAt} DESC`,
    ),
    tenantTeamCreatedIdx: index("request_logs_tenant_team_created_idx").on(
      t.tenantId,
      t.team,
      t.createdAt,
    ),
    requestHashIdx: index("request_logs_request_hash_idx").on(
      t.requestHash,
      t.createdAt,
    ),
    unrolledIdx: index("request_logs_unrolled_idx")
      .on(t.createdAt)
      .where(sql`${t.rolledUpAt} IS NULL`),
  }),
);

export const interventions = pgTable(
  "interventions",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    requestLogId: uuid("request_log_id")
      .notNull()
      .references(() => requestLogs.id, { onDelete: "cascade" }),
    type: interventionTypeEnum("type").notNull(),
    tokensSaved: integer("tokens_saved").notNull().default(0),
    costSavedUsdMicros: bigint("cost_saved_usd_micros", { mode: "bigint" })
      .notNull()
      .default(sql`0`),
    metadata: jsonb("metadata").$type<Record<string, unknown>>().notNull().default({}),
  },
  (t) => ({
    requestLogIdx: index("interventions_request_log_idx").on(t.requestLogId),
  }),
);

// Hourly rollups for fast dashboard queries. team/feature are part of the PK,
// so they are NOT NULL with '' meaning "unattributed" (NULLs can't be compared
// in a primary key, which would break upserts).
export const spendBuckets = pgTable(
  "spend_buckets",
  {
    tenantId: uuid("tenant_id")
      .notNull()
      .references(() => tenants.id, { onDelete: "cascade" }),
    hour: timestamp("hour", { withTimezone: true }).notNull(),
    team: text("team").notNull().default(""),
    feature: text("feature").notNull().default(""),
    provider: providerEnum("provider").notNull(),
    model: text("model").notNull(),
    requestCount: integer("request_count").notNull().default(0),
    inputTokens: bigint("input_tokens", { mode: "bigint" })
      .notNull()
      .default(sql`0`),
    outputTokens: bigint("output_tokens", { mode: "bigint" })
      .notNull()
      .default(sql`0`),
    cachedInputTokens: bigint("cached_input_tokens", { mode: "bigint" })
      .notNull()
      .default(sql`0`),
    costUsdMicros: bigint("cost_usd_micros", { mode: "bigint" })
      .notNull()
      .default(sql`0`),
    savingsUsdMicros: bigint("savings_usd_micros", { mode: "bigint" })
      .notNull()
      .default(sql`0`),
  },
  (t) => ({
    pk: primaryKey({
      columns: [t.tenantId, t.hour, t.team, t.feature, t.provider, t.model],
    }),
    tenantHourIdx: index("spend_buckets_tenant_hour_idx").on(
      t.tenantId,
      t.hour,
    ),
  }),
);

export const routingActionEnum = pgEnum("routing_action", [
  "route_to_cheaper",
  "block",
  "alert",
]);

export const routingRules = pgTable(
  "routing_rules",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    tenantId: uuid("tenant_id")
      .notNull()
      .references(() => tenants.id, { onDelete: "cascade" }),
    name: text("name").notNull(),
    enabled: boolean("enabled").notNull().default(false),
    matchTeam: text("match_team"),
    matchFeature: text("match_feature"),
    matchModel: text("match_model"),
    action: routingActionEnum("action").notNull(),
    targetModel: text("target_model"),
    createdAt: timestamp("created_at", { withTimezone: true })
      .notNull()
      .defaultNow(),
  },
  (t) => ({
    tenantIdx: index("routing_rules_tenant_idx").on(t.tenantId),
  }),
);

export const cachePrefixes = pgTable(
  "cache_prefixes",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    tenantId: uuid("tenant_id")
      .notNull()
      .references(() => tenants.id, { onDelete: "cascade" }),
    prefixHash: text("prefix_hash").notNull(),
    tokenCount: integer("token_count").notNull(),
    firstSeenAt: timestamp("first_seen_at", { withTimezone: true })
      .notNull()
      .defaultNow(),
    lastSeenAt: timestamp("last_seen_at", { withTimezone: true })
      .notNull()
      .defaultNow(),
    hitCount: integer("hit_count").notNull().default(0),
    cacheControlInserted: boolean("cache_control_inserted")
      .notNull()
      .default(false),
  },
  (t) => ({
    tenantPrefixIdx: index("cache_prefixes_tenant_prefix_idx").on(
      t.tenantId,
      t.prefixHash,
    ),
  }),
);

export const dedupCache = pgTable("dedup_cache", {
  requestHash: text("request_hash").primaryKey(),
  tenantId: uuid("tenant_id")
    .notNull()
    .references(() => tenants.id, { onDelete: "cascade" }),
  responseBody: jsonb("response_body").notNull(),
  expiresAt: timestamp("expires_at", { withTimezone: true }).notNull(),
});

export type Tenant = typeof tenants.$inferSelect;
export type NewTenant = typeof tenants.$inferInsert;
export type ApiKey = typeof apiKeys.$inferSelect;
export type NewApiKey = typeof apiKeys.$inferInsert;
export type ProviderKey = typeof providerKeys.$inferSelect;
export type NewProviderKey = typeof providerKeys.$inferInsert;
export type RequestLog = typeof requestLogs.$inferSelect;
export type NewRequestLog = typeof requestLogs.$inferInsert;
export type Intervention = typeof interventions.$inferSelect;
export type NewIntervention = typeof interventions.$inferInsert;
export type SpendBucket = typeof spendBuckets.$inferSelect;
export type NewSpendBucket = typeof spendBuckets.$inferInsert;
export type RoutingRule = typeof routingRules.$inferSelect;
export type NewRoutingRule = typeof routingRules.$inferInsert;
export type CachePrefix = typeof cachePrefixes.$inferSelect;
export type NewCachePrefix = typeof cachePrefixes.$inferInsert;
export type DedupCacheRow = typeof dedupCache.$inferSelect;
export type NewDedupCacheRow = typeof dedupCache.$inferInsert;
