import type { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { loginUser, registerUser } from "../services/authService.js";

const registerSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
  name: z.string().min(1),
});

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
});

export async function registerHandler(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const parsed = registerSchema.safeParse(request.body);
  if (!parsed.success) {
    return reply.status(400).send({ error: parsed.error.flatten() });
  }

  try {
    const user = await registerUser(parsed.data);
    const token = await reply.jwtSign({ sub: user.id, role: "user" });
    return reply.status(201).send({ user, token });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Registration failed";
    return reply.status(409).send({ error: message });
  }
}

export async function loginHandler(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const parsed = loginSchema.safeParse(request.body);
  if (!parsed.success) {
    return reply.status(400).send({ error: parsed.error.flatten() });
  }

  try {
    const user = await loginUser(parsed.data.email, parsed.data.password);
    const token = await reply.jwtSign({ sub: user.id, role: "user" });
    return reply.send({ user, token });
  } catch {
    return reply.status(401).send({ error: "Invalid credentials" });
  }
}