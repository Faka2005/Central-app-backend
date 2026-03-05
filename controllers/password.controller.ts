import { Request, Response } from "express";
import { passwordService } from "../service/password.service";

export const passwordController = {
  // 🔹 Créer un mot de passe
  create: async (req: Request, res: Response) => {
    const { userId } = req.params;
    const { site, email, password, description } = req.body;

    if (!site || !email || !password) {
      return res.status(400).json({ message: "Champs manquants" });
    }

    try {
      await passwordService.createPassword(userId.toString(), { site, email, password, description });
      res.status(201).json({ message: "Mot de passe ajouté" });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Erreur serveur" });
    }
  },

  // 🔹 Récupérer tous les mots de passe d’un utilisateur
  getAllForUser: async (req: Request, res: Response) => {
    const { userId } = req.params;
    try {
      const passwords = await passwordService.getPasswordsForUser(userId.toString());
      res.json(passwords);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Erreur serveur" });
    }
  },

  // 🔹 Mettre à jour un mot de passe
  update: async (req: Request, res: Response) => {
    const { id } = req.params;
    const data = req.body;
    try {
      await passwordService.updatePassword(id.toString(), data);
      res.json({ message: "Mot de passe mis à jour" });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Erreur serveur" });
    }
  },

  // 🔹 Supprimer un mot de passe
  delete: async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
      await passwordService.delete(id.toString());
      res.json({ message: "Mot de passe supprimé" });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Erreur serveur" });
    }
  },
};