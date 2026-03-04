import crypto from "crypto";

const algorithm = "aes-256-gcm";
const key = Buffer.from(process.env.ENCRYPTION_KEY as string, "hex");

export function encrypt(text: string) {
  const iv = crypto.randomBytes(12);
  const cipher = crypto.createCipheriv(algorithm, key, iv);

  const encrypted = Buffer.concat([
    cipher.update(text, "utf8"),
    cipher.final(),
  ]);

  const authTag = cipher.getAuthTag();

  return {
    content: encrypted.toString("base64"),
    iv: iv.toString("base64"),
    tag: authTag.toString("base64"),
  };
}