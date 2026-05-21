import { createCipheriv, createDecipheriv, randomBytes } from "node:crypto";

export interface Kms {
  encryptDek(dek: Buffer): Promise<Buffer>;
  decryptDek(ciphertext: Buffer): Promise<Buffer>;
}

const LOCAL_KMS_ALGO = "aes-256-gcm";
const LOCAL_KMS_IV_BYTES = 12;
const LOCAL_KMS_TAG_BYTES = 16;

export class LocalKms implements Kms {
  private readonly masterKey: Buffer;

  constructor(masterKey: Buffer) {
    if (masterKey.length !== 32) {
      throw new Error("LocalKms master key must be 32 bytes");
    }
    this.masterKey = masterKey;
  }

  static fromHex(hex: string): LocalKms {
    return new LocalKms(Buffer.from(hex, "hex"));
  }

  static generate(): LocalKms {
    return new LocalKms(randomBytes(32));
  }

  async encryptDek(dek: Buffer): Promise<Buffer> {
    const iv = randomBytes(LOCAL_KMS_IV_BYTES);
    const cipher = createCipheriv(LOCAL_KMS_ALGO, this.masterKey, iv);
    const ct = Buffer.concat([cipher.update(dek), cipher.final()]);
    const tag = cipher.getAuthTag();
    return Buffer.concat([iv, tag, ct]);
  }

  async decryptDek(ciphertext: Buffer): Promise<Buffer> {
    if (ciphertext.length < LOCAL_KMS_IV_BYTES + LOCAL_KMS_TAG_BYTES) {
      throw new Error("LocalKms ciphertext too short");
    }
    const iv = ciphertext.subarray(0, LOCAL_KMS_IV_BYTES);
    const tag = ciphertext.subarray(
      LOCAL_KMS_IV_BYTES,
      LOCAL_KMS_IV_BYTES + LOCAL_KMS_TAG_BYTES,
    );
    const ct = ciphertext.subarray(LOCAL_KMS_IV_BYTES + LOCAL_KMS_TAG_BYTES);
    const decipher = createDecipheriv(LOCAL_KMS_ALGO, this.masterKey, iv);
    decipher.setAuthTag(tag);
    return Buffer.concat([decipher.update(ct), decipher.final()]);
  }
}
