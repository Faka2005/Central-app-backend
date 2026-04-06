import { Router } from "express";
import { serviceController } from "../controllers/service.controller";
import { AuthAdmin } from "../middleware/AuthAdminMiddleware";

const router = Router();

/**
 * GET /services
 * Récupérer tous les services
 */
router.get("/", serviceController.getAll);

/**
 * GET /services/:id
 * Récupérer un service
 */
router.get("/:id", AuthAdmin, serviceController.getOne);

/**
 * POST /services
 * Créer un service
 */
router.post("/", AuthAdmin, serviceController.create);

/**
 * PUT /services/:id
 * Modifier un service
 */
router.put("/:id", AuthAdmin, serviceController.updateService);

/**
 * PATCH /services/:id/etat
 * Modifier seulement l'état
 */
router.patch("/:id/etat", AuthAdmin, serviceController.updateEtat);

/**
 * DELETE /services/:id
 */
router.delete("/:id", AuthAdmin, serviceController.delete);

export default router;