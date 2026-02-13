import { Router } from 'express';
import { prisma } from '../server';
import express, { Request, Response, NextFunction } from "express";
// @ts-ignore

const app = express();
app.use(express.json()); // parse JSON bodies

const router = Router();

/**
 * GET /service
 * Récupérer tous les services
 */
router.get("/", async (req: Request, res: Response) => {
  try {
    const services = await prisma.service.findMany();
    res.json(services);
  } catch (err) {
    
    res.status(500).json({ error: "Erreur base de données" });
  }
});

/**
 * GET /service/:id
 * Récupérer un service par ID
 */
router.get("/:id", async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id.toString(), 10);
    if (isNaN(id)) return res.status(400).json({ error: "ID invalide" });

    const service = await prisma.service.findUnique({
      where: { id },
    });

    if (!service) return res.status(404).json({ error: "Service non trouvé" });

    res.json(service);
  } catch (err) {
    
    res.status(500).json({ error: "Erreur base de données" });
  }
});

/**
 * POST /service
 * Créer un nouveau service
 */
router.post("/", async (req: Request, res: Response) => {
  try {
    const { name, description, link, etat } = req.body;

    if (!name || !description || !link || etat === undefined) {
      return res.status(400).json({
        error: "Les champs name, description, link et etat sont requis",
      });
    }

    const service = await prisma.service.create({
      data: {
        name,
        description,
        link,
        etat,
        createdAt: new Date(),
      },
    });

    res.status(201).json({ message: "Service créé avec succès", service });
  } catch (err: any) {
    
    if (err.code === "P2002") {
      return res.status(409).json({ error: "Un service avec ce nom existe déjà" });
    }
    res.status(500).json({ error: "Erreur base de données" });
  }
});

/**
 * PUT /service/:id
 * Mettre à jour un service
 */
router.put("/:id", async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id.toString(), 10);
    const { name, description, link, etat } = req.body;

    if (isNaN(id)) return res.status(400).json({ error: "ID invalide" });

    // Vérifie qu'il y a au moins un champ à modifier
    if (!name && !description && !link && etat === undefined) {
      return res.status(400).json({ error: "Au moins un champ doit être fourni" });
    }

    const service = await prisma.service.update({
      where: { id },
      data: {
        name,
        description,
        link,
        etat,
        updatedAt: new Date(),
      },
    });

    res.json({ message: "Service mis à jour", service });
  } catch (err: any) {
    
    if (err.code === "P2025") {
      return res.status(404).json({ error: "Service non trouvé" });
    }
    if (err.code === "P2002") {
      return res.status(409).json({ error: "Un service avec ce nom existe déjà" });
    }
    res.status(500).json({ error: "Erreur base de données" });
  }
});

/**
 * DELETE /service/:id
 * Supprimer un service
 */
router.delete("/:id", async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id.toString(), 10);
    if (isNaN(id)) return res.status(400).json({ error: "ID invalide" });

    const deleted = await prisma.service.delete({
      where: { id },
    });

    res.json({ message: "Service supprimé", service: deleted });
  } catch (err: any) {
    
    if (err.code === "P2025") {
      return res.status(404).json({ error: "Service non trouvé" });
    }
    res.status(500).json({ error: "Erreur base de données" });
  }
});
export default router;
