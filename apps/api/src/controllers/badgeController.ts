import type { FastifyReply, FastifyRequest } from "fastify";
import { getBadgesForUser } from "../services/badgeService.js";

export async function listBadgesHandler(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const userId = (request.user as { sub: string }).sub;
  const badges = await getBadgesForUser(userId);

  return reply.send(
    badges.map((b) => ({
      id: b.id,
      cardano_tx_hash: b.cardanoTxHash,
      policy_id: b.policyId,
      asset_name: b.assetName,
      metadata_json: b.metadataJson,
      created_at: b.createdAt,
      workout: {
        distance_km: b.workout.distanceKm,
        duration_minutes: b.workout.durationMinutes,
        calories: b.workout.calories,
        source: b.workout.source,
        created_at: b.workout.createdAt,
      },
    }))
  );
}