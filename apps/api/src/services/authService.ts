import bcrypt from "bcryptjs";
import { prisma } from "../db/prisma.js";

export async function registerUser(input: {
  email: string;
  password: string;
  name: string;
}) {
  const existing = await prisma.user.findUnique({
    where: { email: input.email },
  });
  if (existing) {
    throw new Error("Email already registered");
  }

  const passwordHash = await bcrypt.hash(input.password, 12);
  return prisma.user.create({
    data: {
      email: input.email,
      passwordHash,
      name: input.name,
    },
    select: publicUserSelect,
  });
}

export async function loginUser(email: string, password: string) {
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) throw new Error("Invalid credentials");

  const valid = await bcrypt.compare(password, user.passwordHash);
  if (!valid) throw new Error("Invalid credentials");

  return prisma.user.findUniqueOrThrow({
    where: { id: user.id },
    select: publicUserSelect,
  });
}

export async function getUserById(id: string) {
  return prisma.user.findUnique({
    where: { id },
    select: publicUserSelect,
  });
}

export async function updateWalletAddress(userId: string, walletAddress: string) {
  return prisma.user.update({
    where: { id: userId },
    data: { walletAddress },
    select: publicUserSelect,
  });
}

export const publicUserSelect = {
  id: true,
  email: true,
  name: true,
  avatarUrl: true,
  walletAddress: true,
  createdAt: true,
} as const;