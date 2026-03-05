import { verifyToken, AuthRequest} from "../utils/VerifyToken"
import { Request, Response, NextFunction } from "express";
export const AuthUserOrAdmin = [
  verifyToken,
  (req: AuthRequest, res: Response, next: NextFunction) => {
    if (req.user.role !== "user" && req.user.role !== "admin") {
      return res.status(403).json({ message: "Accès refusé" });
    }
    next();
  },
];
