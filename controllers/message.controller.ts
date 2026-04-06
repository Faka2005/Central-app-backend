import { Request, Response, NextFunction } from "express";
import { message } from "../schema";
import { messageservice } from "../service/message.service";

export const messageController = {

  // Envoyer un message
  create: async (req: Request, res: Response, next: NextFunction) => {

    try {

      const senderId = req.user?.id;


      const parsed = message.safeParse(req.body);

      if (!parsed.success) {
        return res.status(400).json(parsed.error.format());
      }

      const { receiverId, content } = parsed.data;

      const newMessage = await messageservice.sendMessage(
        senderId,
        receiverId,
        content
      );

      res.status(201).json(newMessage);

    } catch (error) {
      next(error);
    }

  }

};