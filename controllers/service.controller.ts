import { message, service } from "../schema";
import { NextFunction, Request, Response } from "express";
import { serviceService } from "../service/services.service";
import { Prisma } from "@prisma/client";
import { AppError } from "../utils/AppError";
export const serviceController = {

  create: async (req: Request, res: Response,next:NextFunction) => {
    const parsed = service.safeParse(req.body);

    if (!parsed.success) {
      return res.status(400).json(parsed.error.format());
    }

    try {
      await serviceService.createService(parsed.data as Prisma.ServiceCreateInput);

      res.status(201).json({
        message: "Service ajouté",
      });

    } catch (err) {
      console.error(err);
      next(err instanceof AppError ? err : new AppError("Erreur serveur"));
    }
  },
  getOne:async(req: Request, res: Response,next:NextFunction)=>{
    const id = parseInt(req.params.id.toString(), 10);
    try {
      const service=await serviceService.getOne(id);
      res.json(service)
    } catch (err) {
      next(err instanceof AppError ? err : new AppError("Erreur serveur"));
    }
  },

  getAll: async (req: Request, res: Response,next:NextFunction) => {
    try {
      const services = await serviceService.getAll();
      res.json(services);
    } catch (err) {
      next(err instanceof AppError ? err : new AppError("Erreur serveur : "+ err   ));
    }
  },

  delete: async (req: Request, res: Response,next:NextFunction) => {
    const id = Number(req.params.id);

    try {
      await serviceService.deleteService(id);
      res.json({ message: "Service supprimé" });
    } catch (err) {
      next(err instanceof AppError ? err : new AppError("Erreur serveur"));
    }
  },

  updateEtat: async (req: Request, res: Response,next:NextFunction) => {
    const id = Number(req.params.id);
    const { etat } = req.body;

    try {
      await serviceService.updateEtat(id, etat);
      res.json({ message: "Etat mis à jour" });
    } catch (err) {
      next(err instanceof AppError ? err : new AppError("Erreur serveur"));
    }
  },
  updateService:async(req:Request,res:Response,next:NextFunction)=>{
    const id = Number(req.params.id);
    const parsed = service.safeParse(req.body);

    if (!parsed.success) {
      return res.status(400).json(parsed.error.format());
    }
    try {
      await serviceService.updateService(id,parsed.data as Prisma.ServiceUpdateInput)
    } catch (err) {
      console.error(err)
      next(err instanceof AppError ? err : new AppError("Erreur serveur"));
    }

  }
};