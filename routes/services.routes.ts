import { Router } from 'express';
import { prisma } from '../server';
import express, { Request, Response, NextFunction } from "express";
import { AuthUserOrAdmin } from '../middleware/AuthUserOrAdminMiddleware';
// @ts-ignore

const app = express();
app.use(express.json()); // parse JSON bodies

const router = Router();

/**
 * GET /service
 * Récupérer tous les services
 */
router.get("/",AuthUserOrAdmin, async (req: Request, res: Response) => {
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
router.get("/:id",AuthUserOrAdmin, async (req: Request, res: Response) => {
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
router.post("/",AuthUserOrAdmin, async (req: Request, res: Response) => {
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
 * PUT /services/:id
 * Mettre à jour un service
 */
router.put("/:id",AuthUserOrAdmin, async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ error: "ID invalide" });
    }

    const { name, description, link, etat } = req.body;

    // Vérifie qu’au moins un champ est envoyé
    if (
        name === undefined &&
        description === undefined &&
        link === undefined &&
        etat === undefined
    ) {
      return res
          .status(400)
          .json({ error: "Au moins un champ doit être fourni" });
    }

    // Vérifie que le service existe
    const existingService = await prisma.service.findUnique({
      where: { id:Number(id) },
    });

    if (!existingService) {
      return res.status(404).json({ error: "Service non trouvé" });
    }

    // Mise à jour dynamique (ne met à jour que les champs fournis)
    const updatedService = await prisma.service.update({
      where: { id:Number(id) },
      data: {
        ...(name !== undefined && { name }),
        ...(description !== undefined && { description }),
        ...(link !== undefined && { link }),
        ...(etat !== undefined && { etat }),
      },
    });

    return res.json({
      message: "Service mis à jour avec succès",
      service: updatedService,
    });

  } catch (err: any) {
    console.error(err);

    if (err.code === "P2002") {
      return res
          .status(409)
          .json({ error: "Un service avec ce nom existe déjà" });
    }

    return res.status(500).json({ error: "Erreur base de données" });
  }
});

/**
 * DELETE /service/:id
 * Supprimer un service
 */
router.delete("/:id",AuthUserOrAdmin, async (req: Request, res: Response) => {
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
