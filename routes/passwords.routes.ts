import { Router } from "express";
import { create,getAllForUser, update,deletepassword } from "../controllers/password.controller";
import { AuthUser } from "../middleware/AuthUserMiddleware";

const router = Router();

router.post("/", AuthUser, create);
router.get("/", AuthUser, getAllForUser);
router.put("/", AuthUser, update);
router.delete("/", AuthUser, deletepassword);

export default router;