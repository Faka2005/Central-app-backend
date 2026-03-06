import { message, service } from "../schema";
import { Request, Response } from "express";
import { serviceService } from "../service/services.service";
import { Prisma } from "@prisma/client";
export const serviceController = {

  create: async (req: Request, res: Response) => {
    const parsed = service.safeParse(req.body);

    if (!parsed.success) {
      return res.status(400).json(parsed.error.format());
    }

    try {
      await serviceService.createService(parsed.data as Prisma.ServiceCreateInput);

      res.status(201).json({
        message: "Service ajouté",
      });

    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Erreur serveur" });
    }
  },
  getOne:async(req: Request, res: Response)=>{
    const id = parseInt(req.params.id.toString(), 10);
    try {
      const service=await serviceService.getOne(id);
      res.json(service)
    } catch (error) {
      res.status(500).json({ message: "Erreur serveur" });
    }
  },

  getAll: async (req: Request, res: Response) => {
    try {
      const services = await serviceService.getAll();
      res.json(services);
    } catch (error) {
      res.status(500).json({ message: "Erreur serveur" });
    }
  },

  delete: async (req: Request, res: Response) => {
    const id = Number(req.params.id);

    try {
      await serviceService.deleteService(id);
      res.json({ message: "Service supprimé" });
    } catch (error) {
      res.status(500).json({ message: "Erreur serveur" });
    }
  },

  updateEtat: async (req: Request, res: Response) => {
    const id = Number(req.params.id);
    const { etat } = req.body;

    try {
      await serviceService.updateEtat(id, etat);
      res.json({ message: "Etat mis à jour" });
    } catch (error) {
      res.status(500).json({ message: "Erreur serveur" });
    }
  },
  updateService:async(req:Request,res:Response)=>{
    const id = Number(req.params.id);
    const parsed = service.safeParse(req.body);

    if (!parsed.success) {
      return res.status(400).json(parsed.error.format());
    }
    try {
      await serviceService.updateService(id,parsed.data as Prisma.ServiceUpdateInput)
    } catch (error) {
      console.error(error)
      res.status(500).json({message: "Erreur serveur"})
    }

  }
};