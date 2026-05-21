const SECRET_PATTERNS: RegExp[] = [
  /sk-[A-Za-z0-9_-]{8,}/g,
  /cmk_(?:live|test)_[A-Za-z0-9_-]{8,}/g,
  /Bearer\s+[A-Za-z0-9._-]+/g,
];

export function scrub(message: string): string {
  let out = message;
  for (const pattern of SECRET_PATTERNS) {
    out = out.replace(pattern, "[REDACTED]");
  }
  return out;
}

export function safeLog(
  level: "info" | "warn" | "error",
  msg: string,
  meta: Record<string, unknown> = {},
): void {
  const safeMeta: Record<string, unknown> = {};
  for (const [k, v] of Object.entries(meta)) {
    safeMeta[k] = typeof v === "string" ? scrub(v) : v;
  }
  const line = JSON.stringify({ level, msg: scrub(msg), ...safeMeta });
  if (level === "error") console.error(line);
  else if (level === "warn") console.warn(line);
  else console.log(line);
}
