import { NextFunction, Request, Response } from "express";
import { UserLogin, UserRegister } from "../schema";
import { AppError } from "../utils/AppError";
import {userService} from "../service/user.service";
export const getUser = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const id = (req as any).user?.id;

        if (!id) {
            throw new AppError("Id needed");
        }

        const result = await userService.getUserById(id);

        return res.status(200).json(result);
    } catch (e) {
        next(e instanceof AppError ? e : new AppError("Erreur serveur"));
    }
};