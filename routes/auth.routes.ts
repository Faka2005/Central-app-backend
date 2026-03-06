import { Router } from "express";
import { register, login,deleteUser,logout } from "../controllers/auth.controller";
import { AuthUser } from "../middleware/AuthUserMiddleware";

const router = Router();

router.post("/register", register);
router.post("/login", login);
router.delete("/delete/:id", deleteUser);
router.post("/logout",AuthUser, logout);
export default router;