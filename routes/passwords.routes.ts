import { Router } from "express";
import { passwordController } from "../controllers/password.controller";
import { AuthUser } from "../middleware/AuthUserMiddleware";

const router = Router();

router.post("/:userId", AuthUser, passwordController.create);
router.get("/user/:userId", AuthUser, passwordController.getAllForUser);
router.put("/:id", AuthUser, passwordController.update);
router.delete("/:id", AuthUser, passwordController.delete);

export default router;