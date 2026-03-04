import { Secret, SignOptions } from "jsonwebtoken";

if (!process.env.JWT_SECRET) {
  throw new Error("JWT_SECRET is not defined");
}

export const JWT_SECRET: Secret = process.env.JWT_SECRET;

//export const JWT_OPTIONS: SignOptions = {
//  expiresIn: process.env.JWT_EXPIRES_IN || 1,
//};