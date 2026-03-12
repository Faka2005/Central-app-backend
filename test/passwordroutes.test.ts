import request from "supertest";
import express from "express";
import passwordRoute from "../routes/passwords.routes";
import { prisma } from "../server";

// 🔐 Clé obligatoire pour l'encryption
process.env.ENCRYPTION_KEY =
  "1234567890123456789012345678901234567890123456789012345678901234";

// ---- MOCK PRISMA ----
jest.mock("../server", () => ({
  prisma: {
    password: {
      create: jest.fn(),
      findMany: jest.fn(),
      findUnique: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    },
  },
}));

const mockCreate = prisma.password.create as jest.Mock;
const mockFindMany = prisma.password.findMany as jest.Mock;
const mockFindUnique = prisma.password.findUnique as jest.Mock;
const mockUpdate = prisma.password.update as jest.Mock;
const mockDelete = prisma.password.delete as jest.Mock;

// ---- TEST APP ----
const app = express();
app.use(express.json());
app.use("/password", passwordRoute);

describe("🔐 Password API", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  // ====================================================
  // CREATE
  // ====================================================

  it("should create a password successfully", async () => {
    mockCreate.mockResolvedValue({
      id: "pass-1",
    });

    const res = await request(app).post("/password").send({
      userId: "user-1",
      site: "gmail.com",
      email: "yassar@gmail.com",
      password: "123456",
      description: "Compte principal",
    });

    expect(res.status).toBe(201);
    expect(res.body.message).toBe("Mot de passe enregistré");
    expect(mockCreate).toHaveBeenCalledTimes(1);
  });

  it("should return 400 if required fields missing", async () => {
    const res = await request(app).post("/password").send({
      site: "gmail.com",
    });

    expect(res.status).toBe(400);
    expect(res.body.message).toBe("Champs manquants");
  });

  // ====================================================
  // GET ALL
  // ====================================================

  it("should return all passwords for user (decrypted)", async () => {
    const encrypted = {
      content: "YWJj", // fake base64
      iv: "ZGVm",
      tag: "Z2hp",
    };

    mockFindMany.mockResolvedValue([
      {
        id: "pass-1",
        site: "gmail.com",
        email: "yassar@gmail.com",
        userId: "user-1",
        password: JSON.stringify(encrypted),
      },
    ]);

    const res = await request(app).get("/password/user/user-1");

    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(mockFindMany).toHaveBeenCalledTimes(1);
  });

  it("should return 500 if database fails (GET ALL)", async () => {
    mockFindMany.mockRejectedValue(new Error("DB error"));

    const res = await request(app).get("/password/user/user-1");

    expect(res.status).toBe(500);
  });

  // ====================================================
  // GET ONE
  // ====================================================

  it("should return one password (decrypted)", async () => {
    const encrypted = {
      content: "YWJj",
      iv: "ZGVm",
      tag: "Z2hp",
    };

    mockFindUnique.mockResolvedValue({
      id: "pass-1",
      site: "gmail.com",
      email: "yassar@gmail.com",
      userId: "user-1",
      password: JSON.stringify(encrypted),
    });

    const res = await request(app).get("/password/pass-1");

    expect(res.status).toBe(200);
    expect(res.body.id).toBe("pass-1");
    expect(mockFindUnique).toHaveBeenCalledTimes(1);
  });

  it("should return 404 if password not found", async () => {
    mockFindUnique.mockResolvedValue(null);

    const res = await request(app).get("/password/unknown");

    expect(res.status).toBe(404);
    expect(res.body.message).toBe("Introuvable");
  });

  it("should return 500 if database fails (GET ONE)", async () => {
    mockFindUnique.mockRejectedValue(new Error("DB error"));

    const res = await request(app).get("/password/pass-1");

    expect(res.status).toBe(500);
  });

  // ====================================================
  // UPDATE
  // ====================================================

  it("should update password successfully", async () => {
    mockUpdate.mockResolvedValue({
      id: "pass-1",
    });

    const res = await request(app)
      .put("/password/pass-1")
      .send({
        site: "newsite.com",
        email: "new@mail.com",
        password: "newpass",
      });

    expect(res.status).toBe(200);
    expect(res.body.message).toBe("Mis à jour");
    expect(mockUpdate).toHaveBeenCalledTimes(1);
  });

  it("should return 500 if update fails", async () => {
    mockUpdate.mockRejectedValue(new Error("DB error"));

    const res = await request(app)
      .put("/password/pass-1")
      .send({ site: "test.com" });

    expect(res.status).toBe(500);
  });

  // ====================================================
  // DELETE
  // ====================================================

  it("should delete password successfully", async () => {
    mockDelete.mockResolvedValue({});

    const res = await request(app).delete("/password/pass-1");

    expect(res.status).toBe(200);
    expect(res.body.message).toBe("Supprimé");
    expect(mockDelete).toHaveBeenCalledTimes(1);
  });

  it("should return 500 if delete fails", async () => {
    mockDelete.mockRejectedValue(new Error("DB error"));

    const res = await request(app).delete("/password/pass-1");

    expect(res.status).toBe(500);
  });
});
