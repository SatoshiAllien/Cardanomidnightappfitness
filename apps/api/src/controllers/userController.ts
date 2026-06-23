import type { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { getUserById, updateWalletAddress } from "../services/authService.js";

export async function meHandler(request: FastifyRequest, reply: FastifyReply) {
  const userId = (request.user as { sub: string }).sub;
  const user = await getUserById(userId);
  if (!user) return reply.status(404).send({ error: "User not found" });
  return reply.send({ user });
}

const walletSchema = z.object({
  wallet_address: z.string().min(10),
});

export async function updateWalletHandler(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const parsed = walletSchema.safeParse(request.body);
  if (!parsed.success) {
    return reply.status(400).send({ error: parsed.error.flatten() });
  }

  const userId = (request.user as { sub: string }).sub;
  const user = await updateWalletAddress(userId, parsed.data.wallet_address);
  return reply.send({ user });
}