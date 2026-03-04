import { Router, Request, Response } from "express";
import { prisma } from "../server";
import { encrypt } from "../utils/Encrypt";
import { decrypt } from "../utils/Decrypt";
import "dotenv/config";
import { AuthUser } from "../middleware/AuthUserMiddleware";

const router = Router();




/**
 * CREATE
 */
router.post("/:userId",AuthUser, async (req: Request, res: Response) => {
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
router.get("/user/:userId",AuthUser, async (req: Request, res: Response) => {
  const { userId } = req.params;

  try {
    const passwords = await prisma.password.findMany({
      where: { userId: userId.toString() },
    });

const decryptedPasswords = passwords.map((p: any) => {
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
router.put("/:id",AuthUser, async (req: Request, res: Response) => {
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
router.delete("/:id",AuthUser, async (req: Request, res: Response) => {
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
