import { passwordRepository } from "../repository/password.repository";
import { encrypt } from "../utils/Encrypt";
import { decrypt } from "../utils/Decrypt";
import { Prisma } from "@prisma/client";
import { AppError } from "../utils/AppError";

export const passwordService = {
  //  Créer un mot de passe
  createPassword: async (userId: string, data: Prisma.PasswordCreateInput) => {
    if (!data.password) throw new AppError("Le mot de passe est requis", 400);

    try {
      const encryptedPassword = encrypt(data.password as string);
      return passwordRepository.create(userId, data);
    } catch (err) {
      throw new AppError("Impossible de créer le mot de passe", 500);
    }
  },

  //  Récupérer tous les mots de passe pour un utilisateur
  getPasswordsForUser: async (userId: string) => {
    const passwords = await passwordRepository.findByUser(userId);
    if (!passwords || passwords.length === 0) {
      throw new AppError("Aucun mot de passe trouvé pour cet utilisateur", 404);
    }

    return passwords.map((p: any) => {
      try {
        return { ...p, password: decrypt(JSON.parse(p.password)) };
      } catch (err) {
        console.error("Erreur lors du décryptage :", err);
        return { ...p, password: null }; // fallback si décryptage échoue
      }
    });
  },

  //  Mettre à jour un mot de passe
  updatePassword: async (id: string, data: Prisma.PasswordUpdateInput) => {
    const existing = await passwordRepository.findByUser(id);
    if (!existing) throw new AppError("Mot de passe introuvable", 404);


    

    return passwordRepository.updatePassword(id, data);
  },

  //  Supprimer un mot de passe
  delete: async (id: string) => {
    const existing = await passwordRepository.findByUser(id);
    if (!existing) throw new AppError("Mot de passe introuvable", 404);

    return passwordRepository.delete(id);
  },
};