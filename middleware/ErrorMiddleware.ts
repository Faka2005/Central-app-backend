import { Request, Response, NextFunction } from "express";
import { AppError } from "../utils/AppError";

export const errorHandlerMiddleware = (
  err: AppError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.error(err.stack);
  const statusCode = err.statusCode || 500;
  const message = err.message || "Erreur serveur inconnue";
  res.status(statusCode).json({ message });
};