// src/utils/AppError.ts

export class AppError extends Error {
  public statusCode: number;
  public isOperational: boolean;

  constructor(message: string, statusCode = 500, isOperational = true) {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = isOperational;

    // Maintenir la trace de la stack
    Error.captureStackTrace(this, this.constructor);
  }
}