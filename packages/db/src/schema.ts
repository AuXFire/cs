import { sql } from "drizzle-orm";
import {
  bigint,
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
