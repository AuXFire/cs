import { sha256Hex } from "@codemesh/crypto";
import type { Db } from "@codemesh/db";
import { schema } from "@codemesh/db";
import { and, eq, isNull } from "drizzle-orm";
import type { Context, MiddlewareHandler } from "hono";

export interface AuthContext {
  tenant: typeof schema.tenants.$inferSelect;
  apiKey: typeof schema.apiKeys.$inferSelect;
}

export type ApiKeyLookup = (keyHash: string) => Promise<AuthContext | null>;

const KEY_PREFIX = "cmk_";

export function authMiddleware(lookup: ApiKeyLookup): MiddlewareHandler {
  return async (c, next) => {
    const header = c.req.header("authorization");
    if (!header || !header.startsWith("Bearer ")) {
      return c.json({ error: { type: "authentication_error", message: "Missing API key" } }, 401);
    }
    const presented = header.slice(7).trim();
    if (!presented.startsWith(KEY_PREFIX)) {
      return c.json({ error: { type: "authentication_error", message: "Invalid API key format" } }, 401);
    }

    const auth = await lookup(sha256Hex(presented));
    if (!auth) {
      return c.json({ error: { type: "authentication_error", message: "Invalid or revoked key" } }, 401);
    }
    if (auth.tenant.status !== "active") {
      return c.json({ error: { type: "authentication_error", message: "Tenant suspended" } }, 403);
    }

    setAuth(c, auth);
    await next();
  };
}

export function dbApiKeyLookup(db: Db): ApiKeyLookup {
  return async (keyHash) => {
    const rows = await db
      .select({
        apiKey: schema.apiKeys,
        tenant: schema.tenants,
      })
      .from(schema.apiKeys)
      .innerJoin(schema.tenants, eq(schema.apiKeys.tenantId, schema.tenants.id))
      .where(
        and(
          eq(schema.apiKeys.keyHash, keyHash),
          isNull(schema.apiKeys.revokedAt),
        ),
      )
      .limit(1);
    const row = rows[0];
    return row ? { apiKey: row.apiKey, tenant: row.tenant } : null;
  };
}

export function setAuth(c: Context, auth: AuthContext): void {
  c.set("auth" as never, auth as never);
}

export function getAuth(c: Context): AuthContext {
  const auth = c.get("auth" as never) as AuthContext | undefined;
  if (!auth) throw new Error("auth context not set");
  return auth;
}
