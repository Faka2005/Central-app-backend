// middleware/AuthUser.ts
import { verifyToken, AuthRequest } from "../utils/VerifyToken";
import { Response, NextFunction } from "express";

export const AuthUser = [
  verifyToken,
  (req: AuthRequest, res: Response, next: NextFunction) => {
    if (req.user?.role !== "user") {
      return res.status(403).json({ message: "Accès refusé" });
    }
    next();
  },
];