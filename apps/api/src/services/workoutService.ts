import { prisma } from "../db/prisma.js";
import { mintBadgeForWorkout } from "./badgeService.js";

export async function getActiveThreshold() {
  return (
    (await prisma.configThreshold.findFirst({ orderBy: { createdAt: "desc" } })) ?? {
      minDistanceKm: 3,
      minDurationMinutes: 20,
      minCalories: null,
    }
  );
}

export function workoutQualifies(
  workout: { distanceKm: number; durationMinutes: number; calories?: number | null },
  threshold: { minDistanceKm: number; minDurationMinutes: number; minCalories: number | null }
) {
  const meetsDistance = workout.distanceKm >= threshold.minDistanceKm;
  const meetsDuration = workout.durationMinutes >= threshold.minDurationMinutes;
  const meetsCalories =
    threshold.minCalories == null ||
    (workout.calories != null && workout.calories >= threshold.minCalories);

  return meetsDistance && meetsDuration && meetsCalories;
}

export async function createWorkout(
  userId: string,
  input: {
    distanceKm: number;
    durationMinutes: number;
    calories?: number;
    source: string;
  }
) {
  const [workout, threshold, user] = await Promise.all([
    prisma.workout.create({
      data: {
        userId,
        distanceKm: input.distanceKm,
        durationMinutes: input.durationMinutes,
        calories: input.calories,
        source: input.source,
      },
    }),
    getActiveThreshold(),
    prisma.user.findUniqueOrThrow({
      where: { id: userId },
      select: { walletAddress: true },
    }),
  ]);

  let badge = null;
  if (workoutQualifies(workout, threshold)) {
    badge = await mintBadgeForWorkout({
      userId,
      workoutId: workout.id,
      distanceKm: workout.distanceKm,
      durationMinutes: workout.durationMinutes,
      calories: workout.calories,
      walletAddress: user.walletAddress,
    });
  }

  return { workout, badge };
}

export async function listWorkouts(userId: string) {
  return prisma.workout.findMany({
    where: { userId },
    orderBy: { createdAt: "desc" },
    include: { badge: true },
  });
}