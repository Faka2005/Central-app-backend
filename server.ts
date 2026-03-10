import "dotenv/config";
import express, { Request, Response, NextFunction } from "express";
// @ts-ignore
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "@prisma/client";

import userRoute from "./routes/users.routes";
import passwordRoute from "./routes/passwords.routes";
import reciterRoute from "./routes/reciter.routes";
import adminRoute  from "./routes/admin.routes";
import mediaRoute from "./routes/media.routes";
import authRoute from "./routes/auth.routes" ;
import servicesRoute from "./routes/services.routes";
import systemRoutes from "./routes/system.routes";
import path from 'path';
const app = express();
app.use(express.json()); 
import cookieParser from "cookie-parser"
app.use(cookieParser());
import cors, { CorsOptions } from "cors";
import { errorHandlerMiddleware } from "./middleware/ErrorMiddleware";


//const allowedOrigins = [
//  "http://localhost:5173",
//  process.env.FRONTEND_URL,
//].filter(Boolean) as string[];
//
//const corsOptions: CorsOptions = {
//  origin: (origin, callback) => {
//    console.log("CORS check, origin:", origin);
//    if (!origin || allowedOrigins.includes(origin)) {
//      callback(null, true);
//    } else {
//      console.warn("Blocked by CORS:", origin);
//      callback(new Error("Not allowed by CORS"));
//    }
//  },
//  credentials: true,
//};

//app.use(cors(corsOptions));

app.use(cors({
  origin: true,
  credentials: true,
}));






app.use("/reciters", express.static("public/reciters"));



// Adapter Prisma (optionnel si tu veux utiliser PrismaPg)
const connectionString = process.env.DATABASE_URL!;
const adapter = new PrismaPg({ connectionString });
export const prisma = new PrismaClient({ adapter });



app.use("/auth", authRoute);
app.use("/users", userRoute);
app.use("/users",adminRoute);
app.use("/password", passwordRoute);
app.use("/reciter", reciterRoute);
app.use("/services", servicesRoute);
app.use("/media", mediaRoute);
app.use(
  "/test",
  express.static(path.resolve("coverage/lcov-report"))
);

app.use("/", systemRoutes);


app.use(errorHandlerMiddleware)




// ----------------------
// Démarrage du serveur
// ----------------------


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
