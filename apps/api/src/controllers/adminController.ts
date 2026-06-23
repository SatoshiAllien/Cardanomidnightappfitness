import type { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { prisma } from "../db/prisma.js";

export async function listUsersHandler(
  _request: FastifyRequest,
  reply: FastifyReply
) {
  const users = await prisma.user.findMany({
    select: {
      id: true,
      email: true,
      name: true,
      walletAddress: true,
      createdAt: true,
      _count: { select: { workouts: true, badges: true } },
    },
    orderBy: { createdAt: "desc" },
  });

  return reply.send({ users });
}

export async function listAllBadgesHandler(
  _request: FastifyRequest,
  reply: FastifyReply
) {
  const badges = await prisma.badge.findMany({
    include: {
      user: { select: { id: true, name: true, email: true } },
      workout: true,
    },
    orderBy: { createdAt: "desc" },
  });

  return reply.send({ badges });
}

export async function getConfigHandler(
  _request: FastifyRequest,
  reply: FastifyReply
) {
  const config =
    (await prisma.configThreshold.findFirst({
      orderBy: { createdAt: "desc" },
    })) ?? null;

  return reply.send({
    config: config
      ? {
          min_distance_km: config.minDistanceKm,
          min_duration_minutes: config.minDurationMinutes,
          min_calories: config.minCalories,
        }
      : {
          min_distance_km: 3,
          min_duration_minutes: 20,
          min_calories: null,
        },
  });
}

const configSchema = z.object({
  min_distance_km: z.number().positive(),
  min_duration_minutes: z.number().int().positive(),
  min_calories: z.number().int().positive().nullable().optional(),
});

export async function updateConfigHandler(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const parsed = configSchema.safeParse(request.body);
  if (!parsed.success) {
    return reply.status(400).send({ error: parsed.error.flatten() });
  }

  const config = await prisma.configThreshold.create({
    data: {
      minDistanceKm: parsed.data.min_distance_km,
      minDurationMinutes: parsed.data.min_duration_minutes,
      minCalories: parsed.data.min_calories ?? null,
    },
  });

  return reply.send({
    config: {
      min_distance_km: config.minDistanceKm,
      min_duration_minutes: config.minDurationMinutes,
      min_calories: config.minCalories,
    },
  });
}