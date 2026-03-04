import { Secret, SignOptions } from "jsonwebtoken";
import { env } from "./env";

export const JWT_SECRET: Secret = env.JWT_SECRET;

export const JWT_OPTIONS: SignOptions = {
  expiresIn: env.JWT_EXPIRES_IN as SignOptions["expiresIn"],
};