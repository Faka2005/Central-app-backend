import { NextFunction, Request, Response } from "express";
import { registerService, loginService ,deleteUserService} from "../service/auth.service";
import { UserLogin, UserRegister } from "../schema";
import { AppError } from "../utils/AppError";


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
      maxAge: 1000 * 60 * 60 * 24, // 1 jour en millisecondes
    });

    //  Optionnel : renvoyer un message ou user info dans le body
    res.status(200).json({
      message: result.message,
      user: result.user || null, 
    });
    

  } catch (err) {
    console.error(err);
    next(err instanceof AppError ? err : new AppError("Erreur serveur"));
  }
};

export const deleteUser = async (req: Request, res: Response,next:NextFunction) => {
  const id = (req as any).user?.id;
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

