import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { AppError } from "../utils/AppError";

export interface AuthRequest extends Request {
  user?: {
    id: string;
    role: string;
    [key: string]: any;
  };
}

export const verifyToken = (req: AuthRequest, res: Response, next: NextFunction) => {
    console.log("Headers reçus :", req.headers.authorization);

  //  récupérer le token : header Bearer OU cookie
  const authHeader = req.headers.authorization;
  const cookieToken = req.cookies?.token;

  const token = authHeader?.startsWith("Bearer ") 
      ? authHeader.split(" ")[1] 
      : cookieToken;

  if (!token) {
    return res.status(401).json({ message: "Token manquant" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as { id: string; role: string };
    req.user = { id: decoded.id, role: decoded.role };
    next();
  } catch (err) {
    return res.status(401).json({ message: "Token invalide" + err});
  }
};

// Middleware pour autoriser certains rôles
export const authorize = (...roles: string[]) => {
  return [
    verifyToken,
    (req: AuthRequest, res: Response, next: NextFunction) => {
      if (!req.user) return res.status(401).json({ message: "Non authentifié" });
      if (!roles.includes(req.user.role)) return res.status(403).json({ message: "Accès refusé" });
      next();
    },
  ];
};