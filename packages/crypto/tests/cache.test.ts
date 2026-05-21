import { describe, expect, it } from "vitest";
import { TtlCache } from "../src/index.js";

describe("TtlCache", () => {
  it("returns set values before expiry", () => {
    let now = 0;
    const cache = new TtlCache<string>({ ttlMs: 100, now: () => now });
    cache.set("k", "v");
    now = 99;
    expect(cache.get("k")).toBe("v");
  });

  it("evicts expired entries", () => {
    let now = 0;
    const cache = new TtlCache<string>({ ttlMs: 100, now: () => now });
    cache.set("k", "v");
    now = 101;
    expect(cache.get("k")).toBeUndefined();
  });

  it("evicts oldest when maxSize exceeded", () => {
    const cache = new TtlCache<number>({ ttlMs: 1000, maxSize: 2 });
    cache.set("a", 1);
    cache.set("b", 2);
    cache.set("c", 3);
    expect(cache.get("a")).toBeUndefined();
    expect(cache.get("b")).toBe(2);
    expect(cache.get("c")).toBe(3);
  });

  it("rejects non-positive ttl", () => {
    expect(() => new TtlCache({ ttlMs: 0 })).toThrow();
  });
});
