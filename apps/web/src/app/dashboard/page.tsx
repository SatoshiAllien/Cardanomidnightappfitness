"use client";

import { useEffect, useState } from "react";

interface Workout {
  id: string;
  distance_km: number;
  duration_minutes: number;
  calories: number;
  source: string;
  created_at: string;
}

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3001";

export default function DashboardPage() {
  const [workouts, setWorkouts] = useState<Workout[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch(`${API_URL}/workouts`)
      .then((res) => {
        if (!res.ok) throw new Error(`API error: ${res.status}`);
        return res.json();
      })
      .then((data) => setWorkouts(data))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="mx-auto max-w-4xl px-6 py-12">
      <h1 className="mb-2 text-3xl font-bold">Workout Dashboard</h1>
      <p className="mb-8 text-white/60">
        Fetched from API at {API_URL}/workouts
      </p>

      {loading && <p className="text-white/60">Loading workouts…</p>}
      {error && (
        <p className="rounded-lg border border-red-500/30 bg-red-500/10 p-4 text-red-300">
          {error} — make sure the API is running (`npm run dev`).
        </p>
      )}

      {!loading && !error && (
        <div className="space-y-4">
          {workouts.map((w) => (
            <div
              key={w.id}
              className="flex items-center justify-between rounded-xl border border-white/10 bg-white/5 p-5"
            >
              <div>
                <p className="font-semibold">
                  {w.distance_km} km · {w.duration_minutes} min
                </p>
                <p className="text-sm text-white/50">
                  {new Date(w.created_at).toLocaleDateString()} · {w.source}
                </p>
              </div>
              <span className="text-accent">{w.calories} kcal</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}