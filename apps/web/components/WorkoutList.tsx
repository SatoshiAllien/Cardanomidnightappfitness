import type { Workout } from "@/lib/apiClient";

export function WorkoutList({ workouts }: { workouts: Workout[] }) {
  if (workouts.length === 0) {
    return (
      <p className="text-white/60">No workouts yet. Start your first run!</p>
    );
  }

  return (
    <div className="space-y-3">
      {workouts.map((w) => (
        <div
          key={w.id}
          className="flex items-center justify-between rounded-xl border border-white/10 bg-white/5 p-4"
        >
          <div>
            <p className="font-semibold">
              {w.distance_km} km · {w.duration_minutes} min
            </p>
            <p className="text-sm text-white/60">
              {new Date(w.created_at).toLocaleDateString()} · {w.source}
            </p>
          </div>
          {w.badge ? (
            <span className="rounded-full bg-accent/20 px-3 py-1 text-xs text-accent">
              Badge minted
            </span>
          ) : (
            <span className="text-xs text-white/40">No badge</span>
          )}
        </div>
      ))}
    </div>
  );
}