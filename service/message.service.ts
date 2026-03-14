
import { messagerepository } from "../repository/message.repository";
import { AppError } from "../utils/AppError";
import { prisma } from "../server";
import { fr } from "zod/v4/locales";
import { userRepository } from "../repository/user.repository";

export const messageservice={
    sendMessage:async(
        senderId:string,
        receiverId:string,
        content:string
    )=>{
        // Vérifie que le message est pas vide
        if (!content || content.trim( )==="") {
            throw new AppError("Message vide")
        }
        //Vérifie qu'ils envoie pas un message à soi-même
        if (senderId ===receiverId) {
            throw new AppError("Impossible de s'envoyer un message à soi-même")
        }

        //Vérifie que le receveur existe

        const receiverexist=await userRepository.findById(receiverId)
        if (!receiverexist) {
            throw new AppError("Utilisateur destinataire introuvable.");
        }

        //Vérifie qu'ils ont amis
        //const friendship= await friendRepository.isFriend(senderId,receiverId)
        //if (!friendship) {
        //    throw new AppError("Vous pouvez pas envoyer de message à une personne qui n'est pas votre ami")
        //}

        return messagerepository.create(senderId,receiverId,content)
    },
    getConversation:async(
        senderId:string,
        receiverId:string
    )=>{
        return messagerepository.findConversation(senderId,receiverId)
    },
    deleteMessage:async(
        messageId: string,
        userId: string
    )=>{
        const message=await messagerepository.findById(messageId)
        if (!message) {
            throw new AppError("Message introuble")
        }
        if(message.senderId !==userId){
            throw new AppError("Vous pouvez supprimer que vos message")
        }
        return messagerepository.deletemessage(messageId)

    },
    deleteConversation: async(
        senderId:string,
        receiverId:string
    )=>{
        return messagerepository.deleteConversation(senderId,receiverId)
    }

}