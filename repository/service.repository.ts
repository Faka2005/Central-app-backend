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

  deleteOne: (id: number) => {
    return prisma.service.delete({
      where: { id },
    });
  },

  updateEtat: (id: number, etat:true|false) => {
    return prisma.service.update({
      where: { id },
      data: { etat:etat },
    });
  },


  updateService: (
    id: number,
    data: Prisma.ServiceUpdateInput
  ) => {
    return prisma.service.update({
      where: { id },
      data,
    });
  },
};