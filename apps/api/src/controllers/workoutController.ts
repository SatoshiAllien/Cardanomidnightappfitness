import type { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { createWorkout, listWorkouts } from "../services/workoutService.js";

const workoutSchema = z.object({
  distance_km: z.number().positive(),
  duration_minutes: z.number().int().positive(),
  calories: z.number().int().positive().optional(),
  source: z.enum(["manual", "healthkit", "google_fit"]),
});

export async function createWorkoutHandler(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const parsed = workoutSchema.safeParse(request.body);
  if (!parsed.success) {
    return reply.status(400).send({ error: parsed.error.flatten() });
  }

  const userId = (request.user as { sub: string }).sub;
  const { workout, badge } = await createWorkout(userId, {
    distanceKm: parsed.data.distance_km,
    durationMinutes: parsed.data.duration_minutes,
    calories: parsed.data.calories,
    source: parsed.data.source,
  });

  return reply.status(201).send({
    workout: {
      id: workout.id,
      distance_km: workout.distanceKm,
      duration_minutes: workout.durationMinutes,
      calories: workout.calories,
      source: workout.source,
      created_at: workout.createdAt,
    },
    badge: badge
      ? {
          id: badge.id,
          cardano_tx_hash: badge.cardanoTxHash,
          policy_id: badge.policyId,
          asset_name: badge.assetName,
          metadata_json: badge.metadataJson,
        }
      : null,
  });
}

export async function listWorkoutsHandler(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const userId = (request.user as { sub: string }).sub;
  const workouts = await listWorkouts(userId);

  return reply.send(
    workouts.map((w) => ({
      id: w.id,
      distance_km: w.distanceKm,
      duration_minutes: w.durationMinutes,
      calories: w.calories,
      source: w.source,
      created_at: w.createdAt,
      badge: w.badge
        ? {
            id: w.badge.id,
            cardano_tx_hash: w.badge.cardanoTxHash,
            policy_id: w.badge.policyId,
            asset_name: w.badge.assetName,
          }
        : null,
    }))
  );
}