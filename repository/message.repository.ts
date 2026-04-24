//import { prisma } from "../config/prisma";
//import { Message } from "@prisma/client";
//
//// @ts-ignore
//export const messagerepository = {
//
//  // trouver un message par son id
//  findById: async (id: string): Promise<Message | null> => {
//    return prisma.message.findUnique({
//      where: { id }
//    });
//  },
//
//  // trouver tous les messages d’un utilisateur
//  findByUserId: async (userId: string): Promise<Message[]> => {
//    return prisma.message.findMany({
//      where: {
//        OR: [
//          { senderId: userId },
//          { receiverId: userId }
//        ]
//      },
//      orderBy: {
//        createdAt: "asc"
//      }
//    });
//  },
//
//  // créer un message
//  create: async (
//    senderId: string,
//    receiverId: string,
//    content: string
//  ): Promise<Message> => {
//    return prisma.message.create({
//      data: {
//        senderId,
//        receiverId,
//        content
//      }
//    });
//  },
//
//  // récupérer la conversation entre deux utilisateurs
//  findConversation: async (
//    userId: string,
//    friendId: string
//  ): Promise<Message[]> => {
//    return prisma.message.findMany({
//      where: {
//        OR: [
//          { senderId: userId, receiverId: friendId },
//          { senderId: friendId, receiverId: userId }
//        ]
//      },
//      orderBy: {
//        createdAt: "asc"
//      }
//    });
//  },
//  //Supprimer un message
//  deletemessage:async(id:string)=>{
//    return prisma.message.delete({
//        where:{id}
//    })
//  },
//  //Supprimer une conversation
//  deleteConversation:async(userid:string,friendid:string)=> {
//    return prisma.message.deleteMany({
//      where: {
//        OR: [
//          {senderId: userid, receiverId: friendid},
//          {senderId: friendid, receiverId: userid}
//        ]
//      }
//    })
//  },
//  updateIsRead:async(id:string,isRead:boolean)=>{
//    return prisma.message.update({
//      where:{id},{isRead:isRead}
//    })
//  }
//};