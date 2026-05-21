import { createCipheriv, createDecipheriv, randomBytes } from "node:crypto";
import type { Kms } from "./kms.js";

const DATA_ALGO = "aes-256-gcm";
const IV_BYTES = 12;
const TAG_BYTES = 16;
const DEK_LEN_BYTES = 2;

export interface EncryptedKey {
  ciphertext: Buffer;
  fingerprint: string;
}

export async function encryptProviderKey(
  kms: Kms,
  plaintext: string,
): Promise<EncryptedKey> {
  const dek = randomBytes(32);
  const iv = randomBytes(IV_BYTES);
  const cipher = createCipheriv(DATA_ALGO, dek, iv);
  const ct = Buffer.concat([
    cipher.update(plaintext, "utf8"),
    cipher.final(),
  ]);
  const tag = cipher.getAuthTag();

  const wrappedDek = await kms.encryptDek(dek);
  if (wrappedDek.length > 0xffff) {
    throw new Error("wrapped DEK exceeds 65535 bytes");
  }
  const dekLen = Buffer.alloc(DEK_LEN_BYTES);
  dekLen.writeUInt16BE(wrappedDek.length, 0);

  return {
    ciphertext: Buffer.concat([dekLen, wrappedDek, iv, tag, ct]),
    fingerprint: fingerprintKey(plaintext),
  };
}

export async function decryptProviderKey(
  kms: Kms,
  blob: Buffer,
): Promise<string> {
  if (blob.length < DEK_LEN_BYTES) {
    throw new Error("encrypted blob too short");
  }
  const dekLen = blob.readUInt16BE(0);
  let off = DEK_LEN_BYTES;
  const wrappedDek = blob.subarray(off, off + dekLen);
  off += dekLen;
  const iv = blob.subarray(off, off + IV_BYTES);
  off += IV_BYTES;
  const tag = blob.subarray(off, off + TAG_BYTES);
  off += TAG_BYTES;
  const ct = blob.subarray(off);

  const dek = await kms.decryptDek(wrappedDek);
  const decipher = createDecipheriv(DATA_ALGO, dek, iv);
  decipher.setAuthTag(tag);
  const plaintext = Buffer.concat([decipher.update(ct), decipher.final()]);
  return plaintext.toString("utf8");
}

export function fingerprintKey(plaintext: string): string {
  return plaintext.length <= 8
    ? "****"
    : `****${plaintext.slice(-4)}`;
}
