import { prisma } from "../config/prisma";
import {  Prisma } from "@prisma/client";


import { encrypt } from "../utils/Encrypt";

export const passwordRepository = {

  // Trouver un mot de passe par son ID
  findById: (id: string) => {
    return prisma.password.findUnique({
      where: { id },
    });
  },

  // Trouver tous les mots de passe avec pagination
  findAll: (limit = 20, skip = 0) => {
    return prisma.password.findMany({
      take: limit,
      skip,
    });
  },

  // Trouver tous les mots de passe pour un utilisateur
  findByUser: (userId: string) => {
    return prisma.password.findMany({
      where: { userId },
    });
  },

  //  Créer un mot de passe (avec chiffrement)
  create: (userId: string, data: Prisma.PasswordCreateInput) => {
    return prisma.password.create({
      data: {
        site: data.site,
        email: data.email,
        description: data.description,
        userId,
        password: JSON.stringify(encrypt(data.password as string)), // Chiffrement
      },
    });
  },

  //  Mettre à jour un mot de passe
  updatePassword: (id: string, data: Prisma.PasswordUpdateInput) => {
    const updateData: any = {};

    if (data.site !== undefined) updateData.site = data.site;
    if (data.email !== undefined) updateData.email = data.email;
    if (data.description !== undefined) updateData.description = data.description;
    if (data.password !== undefined)
      updateData.password = JSON.stringify(encrypt(data.password as string)); // Chiffrement

    //  Retourner le résultat de la mise à jour
    return prisma.password.update({
      where: { id },
      data: updateData,
    });
  },

  // Supprimer un mot de passe
  delete: (id: string) => {
    return prisma.password.delete({
      where: { id },
    });
  },
};