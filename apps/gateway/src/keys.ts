import type { Provider } from "@codemesh/core";
import { TtlCache, decryptProviderKey, type Kms } from "@codemesh/crypto";
import type { Db } from "@codemesh/db";
import { schema } from "@codemesh/db";
import { and, desc, eq } from "drizzle-orm";

export interface ProviderKeyResolver {
  get(tenantId: string, provider: Provider): Promise<string | null>;
}

export class CachingProviderKeyResolver implements ProviderKeyResolver {
  private readonly cache: TtlCache<string>;

  constructor(
    private readonly fetchEncrypted: (
      tenantId: string,
      provider: Provider,
    ) => Promise<Buffer | null>,
    private readonly kms: Kms,
    opts: { ttlMs: number },
  ) {
    this.cache = new TtlCache<string>({ ttlMs: opts.ttlMs });
  }

  async get(tenantId: string, provider: Provider): Promise<string | null> {
    const cacheKey = `${tenantId}:${provider}`;
    const cached = this.cache.get(cacheKey);
    if (cached) return cached;

    const encrypted = await this.fetchEncrypted(tenantId, provider);
    if (!encrypted) return null;

    const plaintext = await decryptProviderKey(this.kms, encrypted);
    this.cache.set(cacheKey, plaintext);
    return plaintext;
  }

  invalidate(tenantId: string, provider: Provider): void {
    this.cache.delete(`${tenantId}:${provider}`);
  }
}

export function dbProviderKeyFetcher(db: Db) {
  return async (tenantId: string, provider: Provider): Promise<Buffer | null> => {
    const rows = await db
      .select()
      .from(schema.providerKeys)
      .where(
        and(
          eq(schema.providerKeys.tenantId, tenantId),
          eq(schema.providerKeys.provider, provider),
        ),
      )
      .orderBy(desc(schema.providerKeys.createdAt))
      .limit(1);
    const row = rows[0];
    return row ? row.encryptedKey : null;
  };
}
