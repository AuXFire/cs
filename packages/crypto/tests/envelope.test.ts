import { describe, expect, it } from "vitest";
import {
  LocalKms,
  decryptProviderKey,
  encryptProviderKey,
  fingerprintKey,
} from "../src/index.js";

describe("envelope encryption", () => {
  const kms = LocalKms.generate();

  it("roundtrips a provider key", async () => {
    const plaintext = "sk-ant-api03-abcdef0123456789";
    const { ciphertext, fingerprint } = await encryptProviderKey(kms, plaintext);
    expect(ciphertext).not.toContain(Buffer.from(plaintext));
    expect(fingerprint).toBe("****6789");

    const decrypted = await decryptProviderKey(kms, ciphertext);
    expect(decrypted).toBe(plaintext);
  });

  it("produces distinct ciphertexts for the same plaintext (random IV + DEK)", async () => {
    const plaintext = "sk-ant-api03-abcdef0123456789";
    const a = await encryptProviderKey(kms, plaintext);
    const b = await encryptProviderKey(kms, plaintext);
    expect(a.ciphertext.equals(b.ciphertext)).toBe(false);
  });

  it("fails on tampered ciphertext", async () => {
    const { ciphertext } = await encryptProviderKey(kms, "sk-secret-key-1234");
    const tampered = Buffer.from(ciphertext);
    tampered[tampered.length - 1] ^= 0x01;
    await expect(decryptProviderKey(kms, tampered)).rejects.toThrow();
  });

  it("fingerprintKey masks short keys entirely", () => {
    expect(fingerprintKey("abcd")).toBe("****");
    expect(fingerprintKey("abcdefgh")).toBe("****");
    expect(fingerprintKey("abcdefghi")).toBe("****fghi");
  });
});
