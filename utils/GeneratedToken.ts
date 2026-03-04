import { Secret } from "jsonwebtoken";


import jwt from "jsonwebtoken";
import { JWT_SECRET, JWT_OPTIONS } from "../config/jwt";

interface TokenPayload {
  userId: string;
  role: "user" | "admin";
}

export function generateToken(payload: TokenPayload): string {
  return jwt.sign(payload, JWT_SECRET, JWT_OPTIONS);
}