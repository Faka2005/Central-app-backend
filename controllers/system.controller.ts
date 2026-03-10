import { Request, Response } from "express";
import { prisma } from "../config/prisma";
import pkg from "../package.json";

//donner un résumé complet du système.
export const health = async (req: Request, res: Response) => {
  try {
    await prisma.user.findFirst();

    res.json({
      status: "ok",
      services: {
        database: "ok",
        api: "ok",
      },
      uptime: process.uptime(),
      memory: process.memoryUsage(),
      timestamp: new Date(),
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      services: {
        database: "down",
      },
      timestamp: new Date(),
    });
  }
};
  
  export const version =()=>(req: Request, res: Response) => {
    res.json({
      apiVersion: pkg.version,
      nodeVersion: process.version,
      environment: process.env.NODE_ENV || "development",
      timestamp: new Date(),
    });
  }
  //vérifier si le serveur est prêt à recevoir du trafic
export const ready = async (req: Request, res: Response) => {
  try {
    await prisma.user.findFirst();

    res.json({
      status: "ready",
      database: "connected",
      timestamp: new Date(),
    });
  } catch (error) {
    res.status(503).json({
      status: "not-ready",
      database: "disconnected",
      timestamp: new Date(),
    });
  }
};
// Vérifie que le serveur tourne toujours
export const live = (req: Request, res: Response) => {
  res.json({
    status: "alive",
    uptime: process.uptime(),
    timestamp: new Date(),
  });
};