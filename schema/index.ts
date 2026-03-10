import * as z from "zod";

/**
 * PASSWORD
 */
const password = z.object({
  site: z.string().min(1, "Site requis"),
  email: z.string().email("Email invalide"),
  description: z.string().optional(),
  password: z.string().min(6, "Mot de passe trop court"),
});

/**
 * USER LOGIN
 */
const UserLogin = z.object({
  email: z.string().email("Email invalide"),
  password: z.string().min(6),
});

/**
 * USER REGISTER
 */
const UserRegister = z.object({
  username: z.string().min(3, "Username trop court"),
  email: z.string().email("Email invalide"),
  password: z.string().min(6, "Mot de passe trop court"),
});

/**
 * SERVICE
 */
const service = z.object({
  name: z.string().min(1),
  description: z.string().optional(), // correction "descrption"
  link: z.string().url("URL invalide"),
  etat: z.boolean(),
});

/**
 * MESSAGE
 */
const message = z.object({
  senderId: z.string(),
  receiverId: z.string(),
  content: z.string().min(1, "Message vide"),
});



export { message, service, UserRegister, UserLogin, password };

