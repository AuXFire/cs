import { sql } from "drizzle-orm";
import type { Db } from "./client.js";

export interface RollupResult {
  rolledRows: number;
}

/** postgres-js returns an array from execute(); pglite returns { rows }. */
function extractRows<T>(result: unknown): T[] {
  if (Array.isArray(result)) return result as T[];
  if (result && typeof result === "object" && "rows" in result) {
    return (result as { rows: T[] }).rows;
  }
  return [];
}

/**
 * Aggregates not-yet-rolled request_logs into hourly spend_buckets, then marks
 * those rows as rolled. Exactly-once: each request_log row is counted on the
 * first rollup that picks it up (rolled_up_at IS NULL) and never again.
 *
 * Savings come from the interventions attached to each request_log. team and
 * feature collapse NULL -> '' to match the spend_buckets primary key.
 *
 * `olderThanSeconds` leaves a small buffer so in-flight writes for a given
 * row aren't double-processed across overlapping invocations.
 */
export async function runSpendRollup(
  db: Db,
  opts: { batchSize?: number; olderThanSeconds?: number } = {},
): Promise<RollupResult> {
  const batchSize = opts.batchSize ?? 5000;
  const olderThanSeconds = opts.olderThanSeconds ?? 2;

  return db.transaction(async (tx) => {
    const selected = await tx.execute(sql`
      SELECT id FROM request_logs
      WHERE rolled_up_at IS NULL
        AND created_at < now() - (${olderThanSeconds} * interval '1 second')
      ORDER BY created_at
      LIMIT ${batchSize}
      FOR UPDATE SKIP LOCKED
    `);

    const ids = extractRows<{ id: string }>(selected).map((r) => r.id);
    if (ids.length === 0) {
      return { rolledRows: 0 };
    }

    await tx.execute(sql`
      WITH rolled AS (
        SELECT
          rl.tenant_id,
          date_trunc('hour', rl.created_at) AS hour,
          COALESCE(rl.team, '') AS team,
          COALESCE(rl.feature, '') AS feature,
          rl.provider,
          rl.model_used AS model,
          rl.input_tokens,
          rl.output_tokens,
          rl.cached_input_tokens,
          rl.cost_usd_micros,
          COALESCE(iv.savings, 0) AS savings_usd_micros
        FROM request_logs rl
        LEFT JOIN (
          SELECT request_log_id, SUM(cost_saved_usd_micros) AS savings
          FROM interventions
          GROUP BY request_log_id
        ) iv ON iv.request_log_id = rl.id
        WHERE rl.id = ANY(${sql`ARRAY[${sql.join(
          ids.map((id) => sql`${id}::uuid`),
          sql`, `,
        )}]`})
      ),
      agg AS (
        SELECT
          tenant_id, hour, team, feature, provider, model,
          COUNT(*)::int AS request_count,
          SUM(input_tokens)::bigint AS input_tokens,
          SUM(output_tokens)::bigint AS output_tokens,
          SUM(cached_input_tokens)::bigint AS cached_input_tokens,
          SUM(cost_usd_micros)::bigint AS cost_usd_micros,
          SUM(savings_usd_micros)::bigint AS savings_usd_micros
        FROM rolled
        GROUP BY tenant_id, hour, team, feature, provider, model
      )
      INSERT INTO spend_buckets (
        tenant_id, hour, team, feature, provider, model,
        request_count, input_tokens, output_tokens, cached_input_tokens,
        cost_usd_micros, savings_usd_micros
      )
      SELECT
        tenant_id, hour, team, feature, provider, model,
        request_count, input_tokens, output_tokens, cached_input_tokens,
        cost_usd_micros, savings_usd_micros
      FROM agg
      ON CONFLICT (tenant_id, hour, team, feature, provider, model)
      DO UPDATE SET
        request_count = spend_buckets.request_count + excluded.request_count,
        input_tokens = spend_buckets.input_tokens + excluded.input_tokens,
        output_tokens = spend_buckets.output_tokens + excluded.output_tokens,
        cached_input_tokens = spend_buckets.cached_input_tokens + excluded.cached_input_tokens,
        cost_usd_micros = spend_buckets.cost_usd_micros + excluded.cost_usd_micros,
        savings_usd_micros = spend_buckets.savings_usd_micros + excluded.savings_usd_micros
    `);

    await tx.execute(sql`
      UPDATE request_logs
      SET rolled_up_at = now()
      WHERE id = ANY(${sql`ARRAY[${sql.join(
        ids.map((id) => sql`${id}::uuid`),
        sql`, `,
      )}]`})
    `);

    return { rolledRows: ids.length };
  });
}
