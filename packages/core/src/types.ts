export type Provider = "anthropic" | "openai" | "google";

export type TenantPlan = "developer" | "team" | "enterprise";
export type TenantStatus = "active" | "suspended";

export interface Tenant {
  id: string;
  name: string;
  plan: TenantPlan;
  status: TenantStatus;
  monthlyTokenQuota: bigint;
  createdAt: Date;
}

export interface ApiKey {
  id: string;
  tenantId: string;
  keyHash: string;
  keyPrefix: string;
  name: string;
  createdAt: Date;
  lastUsedAt: Date | null;
  revokedAt: Date | null;
}

export interface ProviderKey {
  id: string;
  tenantId: string;
  provider: Provider;
  encryptedKey: Buffer;
  keyFingerprint: string;
  createdAt: Date;
}

export type RequestStatus = "success" | "error" | "timeout" | "cached_dedup";

export interface UsageData {
  provider: Provider;
  modelRequested: string;
  modelUsed: string;
  inputTokens: number;
  outputTokens: number;
  cachedInputTokens: number;
  costUsdMicros: bigint;
  latencyMs: number;
  status: RequestStatus;
}

export interface RequestLogInput extends UsageData {
  tenantId: string;
  apiKeyId: string;
  team: string | null;
  feature: string | null;
  requestHash: string | null;
}

export type InterventionType =
  | "cache_control_injected"
  | "dedup_hit"
  | "tool_pruned"
  | "model_routed"
  | "context_trimmed";

export interface Intervention {
  type: InterventionType;
  tokensSaved: number;
  costSavedUsdMicros: bigint;
  metadata: Record<string, unknown>;
}
