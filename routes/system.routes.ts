import { Router } from "express";
import { health,version,live,ready } from "../controllers/system.controller";

const router = Router();

router.get("/health", health);
router.get("/version", version);
router.get("/live", live);
router.get("/ready", ready);
export default router;