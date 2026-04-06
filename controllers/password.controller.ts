import { NextFunction, Request, Response } from "express";
import { passwordService } from "../service/password.service";
import { password } from "../schema";
import { AppError } from "../utils/AppError";
import {prisma} from "../config/prisma"
import {Prisma} from "@prisma/client";
export const passwordController = {

  // CREATE
  create: async (req: Request, res: Response,next:NextFunction) => {
    const userId = (req as any).user?.id;

    const parsed = password.safeParse(req.body);

    if (!parsed.success) {
      return res.status(400).json(parsed.error.format());
    }

    try {
      await passwordService.createPassword(userId.toString(), parsed.data as Prisma.PasswordCreateInput);

      res.status(201).json({
        message: "Mot de passe ajouté",
      });

    } catch (err) {
      console.error(err);
      next(err instanceof AppError ? err : new AppError("Erreur serveur"));
    }
  },

  // READ
  getAllForUser: async (req: Request, res: Response,next:NextFunction) => {
    const userId = (req as any).user?.id;


    try {
      const passwords = await passwordService.getPasswordsForUser(userId.toString());

      res.json(passwords);

    } catch (err) {
      console.error(err);
      next(err instanceof AppError ? err : new AppError("Erreur serveur"));

    }
  },

  // UPDATE
  update: async (req: Request, res: Response,next:NextFunction) => {
    const { id } = req.params;

    const parsed = password.partial().safeParse(req.body);

    if (!parsed.success) {
      return res.status(400).json(parsed.error.format());
    }

    try {
      await passwordService.updatePassword(id.toString(), parsed.data as Prisma.PasswordUpdateInput);

      res.json({
        message: "Mot de passe mis à jour",
      });

    } catch (err) {
      console.error(err);
      next(err instanceof AppError ? err : new AppError("Erreur serveur"));
    }
  },

  // DELETE
  delete: async (req: Request, res: Response,next:NextFunction) => {
    const { id } = req.params;

    try {
      await passwordService.delete(id.toString());

      res.json({
        message: "Mot de passe supprimé",
      });

    } catch (err) {
      console.error(err);
      next(err instanceof AppError ? err : new AppError("Erreur serveur"));
    }
  },
};