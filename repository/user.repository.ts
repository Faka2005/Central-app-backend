import { prisma } from "../config/prisma";
import { Prisma } from "@prisma/client";

export const userRepository = {

  findById: (id: string) => {
    return prisma.user.findUnique({
      where: { id },

    });
  },

  findAll: (limit = 20, skip = 0) => {
    return prisma.user.findMany({
      take: limit,
      skip,
    });
  },

  delete: (id: string) => {
    return prisma.user.delete({
      where: { id },
    });
  },

  updateRole: (id: string, role: string) => {
    return prisma.user.update({
      where: { id },
      data: { role },
    });
  },

  resetPassword: (id: string, hashedPassword: string) => {
    return prisma.user.update({
      where: { id },
      data: { password: hashedPassword },
    });
  },

  updateProfile: (
    userId: string,
    data: Prisma.ProfilUpdateInput
  ) => {
    return prisma.profil.update({
      where: { userId },
      data,
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