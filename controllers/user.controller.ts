//import { NextFunction, Request, Response } from "express";
//import { UserLogin, UserRegister } from "../schema";
//import { AppError } from "../utils/AppError";
//import {userService} from "../service/user.service";
//export const getUserById=async  (req:Request,res:Response,next:NextFunction)=>{
//   const {id}=req.params
//    if(!id)throw new AppError("Id needed")
//    try {
//       const result=await userService.getUserById(id.toString())
//   }catch (e) {
//       next(e instanceof AppError ? e:new AppError("Erreur serveur"));
//   }
//}
//export const resetUserPassword=async (req:Request,res:Response,next:NextFunction)=>{
//    try
//}