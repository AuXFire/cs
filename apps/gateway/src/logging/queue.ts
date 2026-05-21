import type { RequestLogInput } from "@codemesh/core";
import { safeLog } from "./scrub.js";

export type LogSink = (entry: RequestLogInput) => Promise<void>;

export class RequestLogQueue {
  private readonly buffer: RequestLogInput[] = [];
  private flushing = false;
  private closed = false;
  private readonly sink: LogSink;
  private readonly maxBuffer: number;
  private readonly flushIntervalMs: number;
  private timer: NodeJS.Timeout | null = null;
  private pendingFlush: Promise<void> | null = null;

  constructor(opts: {
    sink: LogSink;
    maxBuffer?: number;
    flushIntervalMs?: number;
  }) {
    this.sink = opts.sink;
    this.maxBuffer = opts.maxBuffer ?? 1000;
    this.flushIntervalMs = opts.flushIntervalMs ?? 500;
  }

  start(): void {
    if (this.timer) return;
    this.timer = setInterval(() => {
      void this.flush();
    }, this.flushIntervalMs);
    this.timer.unref?.();
  }

  enqueue(entry: RequestLogInput): void {
    if (this.closed) return;
    if (this.buffer.length >= this.maxBuffer) {
      safeLog("warn", "request log queue full, dropping entry", {
        tenantId: entry.tenantId,
      });
      return;
    }
    this.buffer.push(entry);
  }

  async flush(): Promise<void> {
    if (this.flushing || this.buffer.length === 0) return;
    if (this.pendingFlush) return this.pendingFlush;

    this.flushing = true;
    const batch = this.buffer.splice(0, this.buffer.length);

    this.pendingFlush = (async () => {
      for (const entry of batch) {
        try {
          await this.sink(entry);
        } catch (err) {
          safeLog("error", "request log sink failed", {
            error: (err as Error).message,
          });
        }
      }
    })();

    try {
      await this.pendingFlush;
    } finally {
      this.flushing = false;
      this.pendingFlush = null;
    }
  }

  async close(): Promise<void> {
    this.closed = true;
    if (this.timer) {
      clearInterval(this.timer);
      this.timer = null;
    }
    await this.flush();
  }

  size(): number {
    return this.buffer.length;
  }
}
