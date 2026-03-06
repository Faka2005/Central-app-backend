import { serviceRepository } from "../repository/service.repository";
import { Prisma } from "@prisma/client";
import { prisma } from "../server";

export const serviceService = {

  createService: async (data: Prisma.ServiceCreateInput) => {
    return serviceRepository.createService(data);
  },

  deleteService: async (id: number) => {
    return serviceRepository.deleteOne(id);
  },

  updateService: async (id: number, data: Prisma.ServiceUpdateInput) => {
    return serviceRepository.updateService(id, data);
  },

  updateEtat: async (id: number, etat: boolean) => {
    return serviceRepository.updateEtat(id, etat);
  },
  getAll:async()=>{
    return serviceRepository.findAll()
  },
  getOne:async(id:number)=>{
    return serviceRepository.findById(id)
  }

};