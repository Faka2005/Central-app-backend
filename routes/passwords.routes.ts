import { Router, Request, Response } from "express";
import { prisma } from "../server";
import crypto from "crypto";
import "dotenv/config";
import { Password } from "@prisma/client";

const router = Router();

const algorithm = "aes-256-gcm";
const key = Buffer.from(process.env.ENCRYPTION_KEY as string, "hex");

/**
 * 🔐 Encrypt
 */
function encrypt(text: string) {
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

/**
 * 🔓 Decrypt
 */
function decrypt(encrypted: any) {
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

/**
 * CREATE
 */
router.post("/:userId", async (req: Request, res: Response) => {
  const { userId } = req.params;
  const { site, email, password, description } = req.body;

  if (!userId || !site || !email || !password) {
    return res.status(400).json({ message: "Champs manquants" });
  }

  try {
const encryptedPassword = encrypt(password);

const newPassword = await prisma.password.create({
  data: {
    site,
    email,
    description,
    userId: userId.toString(),
    password: JSON.stringify(encryptedPassword), // ← stocke iv + content + tag
  },
});

    res.status(201).json({
      ...newPassword,
      password, // renvoyer version décryptée au frontend
    });
  } catch (err) {
    res.status(500).json({ message: "Erreur serveur" });
  }
});

/**
 * READ ALL (décrypté pour frontend)
 */
router.get("/user/:userId", async (req: Request, res: Response) => {
  const { userId } = req.params;

  try {
    const passwords = await prisma.password.findMany({
      where: { userId: userId.toString() },
    });

const decryptedPasswords = passwords.map((p) => {
  try {
    const parsed = JSON.parse(p.password); // parsed = { iv, content, tag }
    return {
      ...p,
      password: decrypt(parsed),
    };
  } catch (error) {
    console.error("Erreur decrypt :", error, p.password);
    return p; // fallback pour ne pas planter la route
  }
});

    res.json(decryptedPasswords);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Erreur serveur" });
  }
});


/**
 * UPDATE (re-chiffre si nouveau password)
 */
router.put("/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  const { site, email, password, description } = req.body;

  try {
    const updateData: any = {};

    if (site !== undefined) updateData.site = site;
    if (email !== undefined) updateData.email = email;
    if (description !== undefined) updateData.description = description;

    if (password !== undefined) {
      updateData.password = JSON.stringify(encrypt(password));
    }

    const updated = await prisma.password.update({
      where: { id: id.toString() },
      data: updateData,
    });

    res.json({ message: "Mis à jour" });
  } catch (err) {
    res.status(500).json({ message: "Erreur serveur" });
  }
});

/**
 * DELETE
 */
router.delete("/:id", async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    await prisma.password.delete({
      where: { id: id.toString() },
    });

    res.json({ message: "Supprimé" });
  } catch (err) {
    res.status(500).json({ message: "Erreur serveur" });
  }
});

export default router;
