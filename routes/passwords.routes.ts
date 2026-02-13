import { Router } from 'express';
import { prisma } from '../server';
import express, { Request, Response } from "express";
import bcrypt from "bcrypt";
// @ts-ignore

const app = express();
app.use(express.json()); 

const router = Router();


/**
 *Ajouter un nouveau mot de passe à l'utilisateur
 */

router.post("/:id", async (req: Request, res: Response) => {
  const id = req.params.id.toString(); // déjà string
  const { site, email, password, description } = req.body;

  // Vérifications
  if (!id) return res.status(400).json({ message: "ID requis" });
  if (!site || !email || !password || !description)
    return res.status(400).json({ message: "Champs manquants" });

  try {
    // Vérifier que l'utilisateur existe
    const user = await prisma.user.findUnique({
      where: { id },
    });
    if (!user) return res.status(404).json({ error: "User not found" });

    // Hash du mot de passe
    const passwordHash = await bcrypt.hash(password, 10);

    // Créer le mot de passe lié à l'utilisateur
    const newPassword = await prisma.password.create({
      data: {
        site,
        email,
        password: passwordHash, // <-- utiliser le hash
        description,
        userId: user.id,
      },
    });

    res.status(201).json(newPassword);
  } catch (err) {
    
    res.status(500).json({ error: "DB error" });
  }
});


router.get("/:id", async (req: Request, res: Response) => {
  try {
    const id = req.params.id.toString();
    const password = await prisma.password.findUnique({
      where: { id },
    });
    if (!password) return res.status(404).json({ error: "Mot de passe introuvable" });
    res.json(password);
  } catch (err) {
    
    res.status(500).json({ error: "DB error" });
  }
});


router.delete("/:id", async (req: Request, res: Response) => {
  try {

  } catch (err) {
    
    res.status(500).json({ error: "DB error" });
  }
});


router.delete("/:id", async (req: Request, res: Response) => {
  try {
    const id = req.params.id.toString();
    const deletedPassword = await prisma.password.delete({
      where: { id },
    });
    res.json({ message: "Mot de passe supprimé", deletedPassword });
  } catch (err) {
    
    res.status(500).json({ error: "DB error" });
  }
});

export default router;
