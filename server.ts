import "dotenv/config";
import express from "express";
// @ts-ignore
import { PrismaClient } from "@prisma/client";
import { prisma } from "./config/prisma";
import userRoute from "./routes/users.routes";
import passwordRoute from "./routes/passwords.routes";
import reciterRoute from "./routes/reciter.routes";
import adminRoute  from "./routes/admin.routes";
import mediaRoute from "./routes/media.routes";
import authRoute from "./auth/auth.routes" ;
import servicesRoute from "./routes/services.routes";
import systemRoutes from "./routes/system.routes";
import path from 'path';
const app = express();
app.use(express.json()); 
import cookieParser from "cookie-parser"
app.use(cookieParser());
import cors, { CorsOptions } from "cors";
import { errorHandlerMiddleware } from "./middleware/ErrorMiddleware";



app.use(cors({
  origin: '*', 
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], // Ajoute OPTIONS ici
  allowedHeaders: ['Content-Type', 'Authorization', 'Accept'], // Ajoute Accept ici
  credentials: true // Important si tu utilises des cookies ou des tokens
}));

// Optionnel mais efficace : Forcer la réponse aux requêtes OPTIONS
app.use("/reciters", express.static("public/reciters"));





async function testDB() {
  try {
    await prisma.$connect();
    console.log("✅ DB connectée");
  } catch (err) {
    console.error("❌ DB erreur:", err);
  }
}

testDB();


app.use("/", systemRoutes);
app.use("/auth", authRoute);
app.use("/users", userRoute);
app.use("/users",adminRoute);
app.use("/password", passwordRoute);
app.use("/reciter", reciterRoute);
app.use("/services", servicesRoute);
app.use("/media", mediaRoute);



app.use(errorHandlerMiddleware)




// ----------------------
// Démarrage du serveur
// ----------------------


const PORT = Number(process.env.PORT) || 3000;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Serveur lancé sur http://0.0.0.0:${PORT}`);
});
