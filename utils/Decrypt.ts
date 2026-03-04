import crypto from "crypto";

const algorithm = "aes-256-gcm";
const key = Buffer.from(process.env.ENCRYPTION_KEY as string, "hex");

export function decrypt(encrypted: any) {
  const decipher = crypto.createDecipheriv(
      algorithm,
      key,
      Buffer.from(encrypted.iv, "base64")
  );

  decipher.setAuthTag(Buffer.from(encrypted.tag, "base64"));

  const decrypted = Buffer.concat([
    decipher.update(Buffer.from(encrypted.content, "base64")),
    decipher.final(),
  ]);

  return decrypted.toString("utf8");
}