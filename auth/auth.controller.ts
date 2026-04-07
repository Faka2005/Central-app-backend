import { NextFunction, Request, Response } from "express";
import {registerService, loginService, deleteUserService, meService} from "./auth.service";
import { UserLogin, UserRegister } from "../schema";
import { AppError } from "../utils/AppError";
import {AuthRequest} from "../utils/VerifyToken";


export const register = async (req: Request, res: Response) => {
  console.log("BODY:", req.body);
  const parsed = UserRegister.safeParse(req.body);

  if (!parsed.success) {
    return res.status(400).json(parsed.error.format());
  }

  try {
    const result = await registerService(parsed.data);
    console.log("RESULT:", result);
    res.status(201).json(result);
  } catch (err) {
    console.error(err);
  }
};

export const login = async (req: Request, res: Response,next:NextFunction) => {
  const parsed = UserLogin.safeParse(req.body);

  if (!parsed.success) {
    return res.status(400).json(parsed.error.format());
  }

  try {
    const result = await loginService(parsed.data);
    //  Stocker le token JWT dans un cookie HTTP-only sécurisé
    res.cookie("token", result.token, {
      httpOnly: true,       // inaccessible côté JavaScript
      secure: process.env.NODE_ENV === "production", // seulement HTTPS en prod
      sameSite: "strict",   // protection CSRF
      maxAge: 1000 * 60 * 60 * 24, // 1 jour en millisecondes,
      path: "/", // cookie disponible sur tout le site
    });

    //  Optionnel : renvoyer un message ou user info dans le body
    res.status(200).json({
      message: result.message
    });
    

  } catch (err) {
    console.error(err);
    next(err instanceof AppError ? err : new AppError("Erreur serveur"));
  }
};

export const deleteUser = async (req: AuthRequest, res: Response,next:NextFunction) => {
  const id = req.user?.id // vient du middleware auth;
  if (!id) {
    return res.status(401).json({ message: "Utilisateur non trouvé" });
  }
  try {
    const result = await deleteUserService(id.toString());
    res.json(result);
  } catch (err) {
    console.error(err);
    next(err instanceof AppError ? err : new AppError("Erreur serveur"));
  }
};

export const logout = (req: Request, res: Response) => {
  // Supprime le cookie "token"
  res.clearCookie("token", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
  });

  res.status(200).json({ message: "Déconnecté avec succès" });
};


export const me = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const userId = req.user?.id // vient du middleware auth
if (!userId) {
  throw new AppError("Utilisateur non trouvé", 401);
}
    const user = await meService(userId)
        const filteredUser = {
      username: user.user.username,
      email: user.user.email,
      createdAt: user.user.createdAt,
    };

    res.status(200).json(filteredUser);
    
    
  } catch (err) {
    next(err instanceof AppError ? err : new AppError("Erreur serveur", 500))
  }
}