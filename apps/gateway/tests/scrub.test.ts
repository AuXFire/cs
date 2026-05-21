import { describe, expect, it } from "vitest";
import { scrub } from "../src/logging/scrub.js";

describe("scrub", () => {
  it("redacts anthropic provider keys", () => {
    expect(scrub("got key sk-ant-api03-abcdef0123456789")).toBe(
      "got key [REDACTED]",
    );
  });

  it("redacts codemesh api keys", () => {
    expect(scrub("auth header: cmk_live_abcdef0123456789xyz")).toBe(
      "auth header: [REDACTED]",
    );
  });

  it("redacts Bearer tokens", () => {
    expect(scrub("Authorization: Bearer abc.def-123")).toBe(
      "Authorization: [REDACTED]",
    );
  });

  it("leaves clean text untouched", () => {
    expect(scrub("nothing sensitive here")).toBe("nothing sensitive here");
  });
});
