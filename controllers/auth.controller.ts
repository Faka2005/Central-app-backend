import { Request, Response } from "express";
import { registerService, loginService ,deleteUserService} from "../service/auth.service";
import { UserLogin, UserRegister } from "../schema";



export const register = async (req: Request, res: Response) => {
  const parsed = UserRegister.safeParse(req.body);

  if (!parsed.success) {
    return res.status(400).json(parsed.error.format());
  }

  try {
    const result = await registerService(parsed.data);
    res.status(201).json(result);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Erreur serveur" });
  }
};

export const login = async (req: Request, res: Response) => {
  const parsed = UserLogin.safeParse(req.body);

  if (!parsed.success) {
    return res.status(400).json(parsed.error.format());
  }

  try {
    const result = await loginService(parsed.data);
    res.json(result);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Erreur serveur" });
  }
};

export const deleteUser = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const result = await deleteUserService(id.toString());
    res.json(result);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Erreur serveur" });
  }
};