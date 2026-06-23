import { Router } from "express";

export interface WorkoutRecord {
  id: string;
  distance_km: number;
  duration_minutes: number;
  calories: number;
  source: string;
  created_at: string;
}

const workouts: WorkoutRecord[] = [
  {
    id: "w1",
    distance_km: 5.2,
    duration_minutes: 32,
    calories: 340,
    source: "manual",
    created_at: new Date(Date.now() - 86400000).toISOString(),
  },
  {
    id: "w2",
    distance_km: 3.8,
    duration_minutes: 24,
    calories: 210,
    source: "healthkit",
    created_at: new Date(Date.now() - 172800000).toISOString(),
  },
];

export const workoutsRouter = Router();

workoutsRouter.get("/", (_req, res) => {
  res.json(workouts);
});

workoutsRouter.post("/", (req, res) => {
  const { distance_km, duration_minutes, calories, source } = req.body ?? {};

  if (
    typeof distance_km !== "number" ||
    typeof duration_minutes !== "number"
  ) {
    return res.status(400).json({
      error: "distance_km and duration_minutes are required numbers",
    });
  }

  const workout: WorkoutRecord = {
    id: `w${Date.now()}`,
    distance_km,
    duration_minutes,
    calories: typeof calories === "number" ? calories : 0,
    source: typeof source === "string" ? source : "manual",
    created_at: new Date().toISOString(),
  };

  workouts.unshift(workout);

  const badgeEarned =
    workout.distance_km >= 3 && workout.duration_minutes >= 20;

  res.status(201).json({
    success: true,
    workout,
    badge: badgeEarned
      ? {
          id: `badge_${workout.id}`,
          name: "MidnightFit Badge",
          earned_at: workout.created_at,
        }
      : null,
  });
});