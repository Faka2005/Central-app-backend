import { Router } from 'express';
import { prisma } from '../server';
import express, { Request, Response, NextFunction } from "express";
// @ts-ignore

const app = express();
app.use(express.json()); // parse JSON bodies

const router = Router();

// Récupérer tous les services
router.get("/", async (_req: Request, res: Response) => {
  const services = await prisma.service.findMany({ orderBy: { name: "asc" } });
  res.json(services);
});

// Mettre à jour un service (admin)
router.put("/admin/:name", async (req: Request, res: Response) => {
  try {
    const name = Array.isArray(req.params.name) ? req.params.name[0] : req.params.name;
    const { etat } = req.body;
    const updated = await prisma.service.update({
      where: { name },
      data: { etat },
    });
    res.json(updated);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "DB error" });
  }
});
export default router;
