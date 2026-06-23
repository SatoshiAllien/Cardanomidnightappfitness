import { prisma } from "../db/prisma.js";
import { mintWorkoutBadge, type BadgeMetadata } from "./cardanoService.js";

export async function getBadgesForUser(userId: string) {
  return prisma.badge.findMany({
    where: { userId },
    orderBy: { createdAt: "desc" },
    include: {
      workout: {
        select: {
          distanceKm: true,
          durationMinutes: true,
          calories: true,
          source: true,
          createdAt: true,
        },
      },
    },
  });
}

export async function mintBadgeForWorkout(params: {
  userId: string;
  workoutId: string;
  distanceKm: number;
  durationMinutes: number;
  calories?: number | null;
  walletAddress?: string | null;
}) {
  const badgeId = crypto.randomUUID();

  const metadata: BadgeMetadata = {
    name: `MidnightFit #${badgeId.slice(0, 8)}`,
    description: `Proof of workout on ${new Date().toISOString().split("T")[0]}`,
    image: "ipfs://QmMidnightFitnessPlaceholder",
    mediaType: "image/png",
    attributes: [
      { trait_type: "distance_km", value: params.distanceKm },
      { trait_type: "duration_minutes", value: params.durationMinutes },
      ...(params.calories != null
        ? [{ trait_type: "calories", value: params.calories }]
        : []),
      { trait_type: "user_id", value: params.userId },
      { trait_type: "workout_id", value: params.workoutId },
    ],
  };

  const mintResult = await mintWorkoutBadge({
    badgeId,
    recipientAddress: params.walletAddress,
    metadata,
  });

  return prisma.badge.create({
    data: {
      userId: params.userId,
      workoutId: params.workoutId,
      cardanoTxHash: mintResult.txHash,
      policyId: mintResult.policyId,
      assetName: mintResult.assetName,
      metadataJson: metadata,
    },
  });
}