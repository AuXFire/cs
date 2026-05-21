import { runSpendRollup, type Db } from "@codemesh/db";
import { safeLog } from "../logging/scrub.js";

export interface RollupLoopOptions {
  intervalMs?: number;
  batchSize?: number;
}

/**
 * Drains all pending request_logs into spend_buckets, looping until a rollup
 * pass reports zero rolled rows. Returns the total rows rolled. Safe to call on
 * a timer; each pass is exactly-once via rolled_up_at.
 */
export async function drainRollup(
  db: Db,
  opts: { batchSize?: number } = {},
): Promise<number> {
  let total = 0;
  for (;;) {
    const { rolledRows } = await runSpendRollup(db, { batchSize: opts.batchSize });
    total += rolledRows;
    if (rolledRows === 0) break;
  }
  return total;
}

export function startRollupLoop(
  db: Db,
  opts: RollupLoopOptions = {},
): { stop: () => void } {
  const intervalMs = opts.intervalMs ?? 5 * 60 * 1000;
  let running = false;

  const tick = async () => {
    if (running) return;
    running = true;
    try {
      const rolled = await drainRollup(db, { batchSize: opts.batchSize });
      if (rolled > 0) safeLog("info", "spend rollup pass complete", { rolled });
    } catch (err) {
      safeLog("error", "spend rollup failed", { error: (err as Error).message });
    } finally {
      running = false;
    }
  };

  const timer = setInterval(() => void tick(), intervalMs);
  timer.unref?.();
  return { stop: () => clearInterval(timer) };
}
