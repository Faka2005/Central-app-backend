import { prisma } from "../config/prisma";
import {  Prisma } from "@prisma/client";

export const serviceRepository = {

  findById: (id: number) => {
    return prisma.service.findUnique({
      where: { id },
    });
  },
  findAll: (limit = 20, skip = 0) => {
    return prisma.service.findMany({
      take: limit,
      skip,
    });
  },

  deleteOne: (id: string) => {
    return prisma.password.delete({
      where: { id },
    });
  },

  create:(userId:string,data:Prisma.PasswordCreateInput)=>{

  },


  updatePassword: (
    id: string,
    data: Prisma.ServiceUpdateInput
  ) => {
    return prisma.password.update({
      where: { id },
      data,
    });
  },
};