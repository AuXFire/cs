export interface GatewayEnv {
  databaseUrl: string;
  kmsMasterKeyHex: string;
  port: number;
  anthropicBaseUrl: string;
  keyCacheTtlMs: number;
  rollupIntervalMs: number;
}

export function loadEnv(source: NodeJS.ProcessEnv = process.env): GatewayEnv {
  const databaseUrl = source.DATABASE_URL;
  if (!databaseUrl) throw new Error("DATABASE_URL is required");

  const kmsMasterKeyHex = source.KMS_MASTER_KEY_HEX;
  if (!kmsMasterKeyHex) throw new Error("KMS_MASTER_KEY_HEX is required");
  if (kmsMasterKeyHex.length !== 64) {
    throw new Error("KMS_MASTER_KEY_HEX must be 64 hex chars (32 bytes)");
  }

  return {
    databaseUrl,
    kmsMasterKeyHex,
    port: Number(source.PORT ?? "8787"),
    anthropicBaseUrl: source.ANTHROPIC_BASE_URL ?? "https://api.anthropic.com",
    keyCacheTtlMs: Number(source.KEY_CACHE_TTL_MS ?? "300000"),
    rollupIntervalMs: Number(source.ROLLUP_INTERVAL_MS ?? "300000"),
  };
}
