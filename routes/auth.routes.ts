import { Router } from "express";
import {register, login, deleteUser, logout, me} from "../controllers/auth.controller";
import { AuthUser } from "../middleware/AuthUserMiddleware";

const router = Router();

router.post("/register", register);
router.post("/login", login);
router.delete("/delete", AuthUser, deleteUser);
router.post("/logout", logout);
router.get('/me',AuthUser,me)
export default router;