import type { Provider, RequestLogInput } from "@codemesh/core";
import { sha256Hex } from "@codemesh/crypto";
import { RequestLogQueue } from "../src/logging/queue.js";
import type { ApiKeyLookup, AuthContext } from "../src/middleware/auth.js";
import type { ProviderKeyResolver } from "../src/keys.js";

const TENANT_ID = "11111111-1111-1111-1111-111111111111";
const API_KEY_ID = "22222222-2222-2222-2222-222222222222";

export const TEST_API_KEY = "cmk_test_validkey1234567890";

export const fakeTenant = {
  id: TENANT_ID,
  name: "Test Tenant",
  plan: "developer" as const,
  status: "active" as const,
  monthlyTokenQuota: BigInt(50_000_000),
  createdAt: new Date(),
};

export const fakeApiKey = {
  id: API_KEY_ID,
  tenantId: TENANT_ID,
  keyHash: sha256Hex(TEST_API_KEY),
  keyPrefix: TEST_API_KEY.slice(0, 12),
  name: "test-key",
  createdAt: new Date(),
  lastUsedAt: null,
  revokedAt: null,
};

export function makeApiKeyLookup(
  overrides?: { suspended?: boolean; missing?: boolean },
): ApiKeyLookup {
  return async (hash) => {
    if (overrides?.missing) return null;
    if (hash !== fakeApiKey.keyHash) return null;
    const tenant = overrides?.suspended
      ? { ...fakeTenant, status: "suspended" as const }
      : fakeTenant;
    return { tenant, apiKey: fakeApiKey } satisfies AuthContext;
  };
}

export function makeKeyResolver(value: string | null = "sk-ant-test"): ProviderKeyResolver {
  return {
    async get(_tenantId: string, _provider: Provider) {
      return value;
    },
  };
}

export function makeLogQueue() {
  const captured: RequestLogInput[] = [];
  const queue = new RequestLogQueue({
    sink: async (entry) => {
      captured.push(entry);
    },
    flushIntervalMs: 10,
  });
  return { queue, captured };
}
