import { Router } from "express";
import { register, login,deleteUser } from "../controllers/auth.controller";

const router = Router();

router.post("/register", register);
router.post("/login", login);
router.delete("/delete/:id", deleteUser);
export default router;