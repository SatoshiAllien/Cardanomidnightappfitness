import type { Badge, Workout } from "@/lib/apiClient";

export function DashboardStats({
  workouts,
  badges,
  name,
}: {
  workouts: Workout[];
  badges: Badge[];
  name: string;
}) {
  const lastWorkout = workouts[0];

  return (
    <div className="grid gap-4 sm:grid-cols-3">
      <StatCard label="Greeting" value={`Hi, ${name}`} />
      <StatCard label="Total workouts" value={String(workouts.length)} />
      <StatCard label="Total badges" value={String(badges.length)} />
      {lastWorkout && (
        <StatCard
          label="Last workout"
          value={`${lastWorkout.distance_km} km · ${lastWorkout.duration_minutes} min`}
          className="sm:col-span-3"
        />
      )}
    </div>
  );
}

function StatCard({
  label,
  value,
  className = "",
}: {
  label: string;
  value: string;
  className?: string;
}) {
  return (
    <div
      className={`rounded-2xl border border-white/10 bg-white/5 p-5 ${className}`}
    >
      <p className="text-sm text-white/60">{label}</p>
      <p className="mt-1 text-2xl font-bold">{value}</p>
    </div>
  );
}