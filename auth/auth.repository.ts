import { prisma } from "../config/prisma";
import { Prisma } from "@prisma/client";

export const authRepository = {

  findById: (id: string) => {
    return prisma.user.findUnique({
      where: { id },

    });
  },



  delete: (id: string) => {
    return prisma.user.delete({
      where: { id },
    });
  },






  findByEmail: (email: string) => {
    return prisma.user.findUnique({
      where: { email },
    });
  },


  create: (data: any) => {
    return prisma.user.create({
      data,
    });
  },
};