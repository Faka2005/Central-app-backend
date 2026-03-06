import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { userRepository } from "../repository/user.repository";
import { AppError } from "../utils/AppError";
import { ComparePassword } from "../utils/ComparePassword";
import { HashPassword } from "../utils/HashPassword";
import { generateToken } from "../utils/GeneratedToken";

const JWT_SECRET = process.env.JWT_SECRET!;

export const registerService = async (data: any) => {
  const { email, password } = data;

  const existingUser = await userRepository.findByEmail(email);

  if (existingUser) {
    throw new AppError("Email already used", 400);
  }

  const hashedPassword = await HashPassword(password);

  const user = await userRepository.create({
    email,
    password: hashedPassword,
    role: "USER",
  });

  return {
    message: "User created",
    user: {
      id: user.id,
      email: user.email,
    },
  };
};

export const loginService = async (data: any) => {
  const { email, password } = data;

  const user = await userRepository.findByEmail(email);

  if (!user) {
    throw new AppError("Invalid credentials", 401);
  }

  const isMatch = await ComparePassword(password, user.password);

  if (!isMatch) {
    throw new AppError("Invalid credentials", 401);
  }

  const token = generateToken({ userId: user.id, role: "user" });

  return {
    user,
    message: "Login success",
    token,
  };
};

export const deleteUserService = async (id: string) => {
  const user = await userRepository.findById(id);

  if (!user) {
    throw new AppError("User not found", 404);
  }

  await userRepository.delete(id);

  return {
    message: "User deleted",
  };
};

