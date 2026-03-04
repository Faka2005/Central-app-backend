import {z} from "zod"

const envSchema = z.object({
  JWT_SECRET: z.string().min(10),
  JWT_EXPIRES_IN: z.string().default("1h"),
});

export const env = envSchema.parse(process.env);