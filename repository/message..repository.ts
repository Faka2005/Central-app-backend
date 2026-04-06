import { prisma } from "../config/prisma";
import { Prisma } from "@prisma/client";

export const messageRepository = {
    
  // Trouver un message par son ID  
    findById: (id: string) => {
        return prisma.message.findUnique({
            where: { id },
        });
    },

    // Trouver tous les messages avec pagination
    findAll: (limit = 20, skip = 0) => {
        return prisma.message.findMany({
            take: limit,
            skip,
        });
    },

    // Trouver tous les messages pour un utilisateur
    findByUser: (userId: string) => {
        return prisma.message.findMany({
            where: { userId },
        });
    },

    // Créer un message
    create: (userId: string, data: Prisma.MessageCreateInput) => {
        return prisma.message.create({
            data: {
                content: data.content,
                userId,
            },
        });
    }