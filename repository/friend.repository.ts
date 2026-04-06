import { prisma } from "../config/prisma";
import {  Prisma } from "@prisma/client";

export const friendRepository = {
    
  findById: (id: string) => {   
    return prisma.friend.findUnique({
      where: { id },
    });
  },
  findAll: (limit = 20, skip = 0) => {
    return prisma.friend.findMany({
      take: limit,
      skip,
    });
  },

  deleteOne: (id: string) => {
    return prisma.friend.delete({
      where: { id },
    });
  },

  updateEtat: (id: string, stat:string) => {
    return prisma.friend.update({
      where: { id },
      data: { status:stat },
    });
  },
  createFriend :(data:any)=>{
    return prisma.friend.create({data})
  },

  updateFriend: (
    id: string,
    data: Prisma.FriendUpdateInput
  ) => {
    return prisma.friend.update({
      where: { id },
      data,
    });
  },
};