// middleware/AuthAdmin.ts
import { verifyToken, AuthRequest } from "../utils/VerifyToken";
import { Response, NextFunction } from "express";

export const AuthAdmin = [
  verifyToken,
  (req: AuthRequest, res: Response, next: NextFunction) => {
    if (req.user?.role !== "admin") {
      return res.status(403).json({ message: "Accès refusé" });
    }
    next();
  },
];