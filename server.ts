import "dotenv/config";
import express, { Request, Response, NextFunction } from "express";
// @ts-ignore
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "./generated/prisma/client";
import userRoute from "./routes/users.routes";
import sourateRoute from "./routes/sourate.routes";
import reciterRoute from "./routes/reciter.routes";
import { Secret } from "jsonwebtoken";
import servicesRoute from "./routes/services.routes";
var jwt = require("jsonwebtoken");
import bcrypt from "bcrypt";
const app = express();
app.use(express.json()); // parse JSON bodies
var cors =require('cors')
app.use(cors({ origin: "http://localhost:5173" }));




app.use("/reciters", express.static("public/reciters"));



// Adapter Prisma (optionnel si tu veux utiliser PrismaPg)
const connectionString = process.env.DATABASE_URL!;
const adapter = new PrismaPg({ connectionString });
export const prisma = new PrismaClient({ adapter });

const JWT_SECRET: Secret = process.env.JWT_SECRET || "devsecret";
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || "1h";
app.use("/users", userRoute);
app.use("/surahs", sourateRoute);
app.use("/reciter", reciterRoute);
app.use("/services", servicesRoute);
app.get('/',(req:Request,res:Response)=>{
  res.send('Bonjour');
})


app.post("/auth/register", async (req: Request, res: Response) => {
  try {
    const { email, password, username } = req.body;
    if (!email || !password || !username) {
      return res
        .status(400)
        .json({ error: "Email, username and password are required" });
    }

    const existing = await prisma.user.findUnique({ where: { email } });
    if (existing)
      return res.status(409).json({ error: "Email already registered" });

    const hashedPassword = await bcrypt.hash(password, 10);

    // Créer l'utilisateur
    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        username,
      },
    });

    // Créer un profil vide lié à l'utilisateur
    const profile = await prisma.profil.create({
      data: {
        userId: user.id, // <-- lier le profil à l'utilisateur
        firstname: "",
        lastname: "",
        bio: "",
        niveau: "",
        campus: "",
        isTutor: false,
      },
    });



    res.status(201).json({
      user: { id: user.id, email: user.email, username: user.username },
      
    });
  } catch (err: any) {
    console.error(err);
    res.status(500).json({ error: "DB error" });
  }
});

app.post("/auth/login", async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    if (!email || !password)
      return res.status(400).json({ error: "Email and password are required" });

    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) return res.status(404).json({ error: "User not found" });

    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) return res.status(401).json({ error: "Invalid password" });

    const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, {
      expiresIn: JWT_EXPIRES_IN,
    });

    res.status(200).json({
      user: { id: user.id, email: user.email, username: user.username },
      token,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "DB error" });
  }
});

app.delete("/auth/me/:id", async (req: Request, res: Response) => {
  const { id } = req.params;

  if (Array.isArray(id)) {
    return res.status(400).json({ error: "Invalid user id" });
  }

  try {
    if (!id) {
      return res.status(400).json({ error: "User id is required" });
    }

    const existingUser = await prisma.user.findUnique({
      where: { id },
    });

    if (!existingUser) {
      return res.status(404).json({ error: "User not found" });
    }

    // Supprimer le profil lié (si relation 1–1)
    await prisma.profil.deleteMany({
      where: { userId: id },
    });

    // Supprimer l'utilisateur
    await prisma.user.delete({
      where: { id },
    });

    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "DB error" });
  }
});

app.post("/auth/refresh", async (req: Request, res: Response) => {
  const refreshToken = req.body.refreshToken;

  if (!refreshToken) {
    return res.status(401).json({ error: "Refresh token missing" });
  }

  const payload = jwt.verify(refreshToken, JWT_SECRET) as any;

  const user = await prisma.user.findUnique({
    where: { id: payload.id },
  });

  if (!user) {
    return res.status(401).json({ error: "Invalid refresh token" });
  }

  const newToken = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, {
    expiresIn: JWT_EXPIRES_IN,
  });

  res.json({ token: newToken });
});



//app.post("/auth/reset-password/:id", async (req: Request, res: Response) => {
//  const id =req.params;
//  const {newpassword} =req.body;
//
//     if (!id || !newpassword)
//      return res.status(400).json({ error: "Email and password are required" });
//       if (Array.isArray(id)) {
//    return res.status(400).json({ error: "Invalid user id" });
//  }
//    const user = await prisma.user.findUnique({ where: { id } });
//    if (!user) return res.status(404).json({ error: "User not found" });
//  try {
//    
//  } catch (error) {
//    
//  }
//});
//app.post("/auth/forgot-password", async (req: Request, res: Response) => {});

// ----------------------
// Démarrage du serveur
// ----------------------


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
