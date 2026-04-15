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
  receiverId: z.string(),
  content: z.string().min(1, "Message vide"),
});

/**
 * PROFIL
 */


const interestSchema = z.object({
  name: z.string().min(1)
})
const profil = z.object({
  firstname: z.string(),
  lastname: z.string(),
  bio: z.string().optional(),
  interests: z.array(interestSchema).optional(),
  niveau: z.string(),
  campus: z.string(),
  isTutor: z.boolean().default(false)
})



 const lesson = z.object({
  title: z
    .string()
    .min(5, "Le titre doit faire au moins 5 caractères")
    .max(100, "Le titre est trop long"),
  
  content: z
    .string()
    .min(20, "L'énoncé doit être plus détaillé"),
  
  niveau: z.enum({"Débutant":"Débutant", "Intermédiaire":"Intermédiaire", "Avancé":"Avancé"}  , 
    ( "Le niveau doit être Débutant, Intermédiaire ou Avancé" ),  ),

    language: z.string().min(1, "Le langage est requis (ex: javascript)"),

  starterCode: z
    .string()
    .min(1, "Le code de départ ne peut pas être vide"),

  solution: z
    .string()
    .optional(), 
    
  validation: z
    .string()
    .refine((val) => {
      try {
        new RegExp(val);
        return true;
      } catch (e) {
        return false;
      }
    }, "La Regex de validation n'est pas valide"),
});



export { message, service, UserRegister, UserLogin, password ,profil, lesson};

