import { Request, Response, NextFunction } from "express";
import { AppError } from "../utils/AppError";

export const errorHandlerMiddleware = (
    err: any,
    req: Request,
    res: Response,
    next: NextFunction
) => {
  console.error("💥 Error:", err);

  if (err instanceof AppError) {
    return res.status(err.statusCode || 400).json({
      error: err.message,
    });
  }

  return res.status(500).json({
    error: "Erreur serveur",
  });
};