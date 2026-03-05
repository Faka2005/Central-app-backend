import { Request, Response } from "express";
import { registerService, loginService ,deleteUserService} from "../service/auth.service";

export const register = async (req: Request, res: Response) => {
  const result = await registerService(req.body);
  res.status(201).json(result);
};

export const login = async (req: Request, res: Response) => {
  const result = await loginService(req.body);
  res.json(result);
};

export const deleteUser = async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await deleteUserService(id.toString());
  res.json(result);
}