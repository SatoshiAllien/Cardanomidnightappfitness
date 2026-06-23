import type { Badge } from "@/lib/apiClient";

export function BadgeGrid({ badges }: { badges: Badge[] }) {
  if (badges.length === 0) {
    return <p className="text-white/60">No badges minted yet.</p>;
  }

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {badges.map((badge) => (
        <article
          key={badge.id}
          className="rounded-2xl border border-primary/30 bg-gradient-to-br from-primary/20 to-navy p-5"
        >
          <div className="mb-4 flex h-24 items-center justify-center rounded-xl bg-navy/50 text-4xl">
            🏅
          </div>
          <h3 className="font-bold">{badge.metadata_json.name}</h3>
          <p className="mt-1 text-sm text-white/70">
            {badge.metadata_json.description}
          </p>
          <p className="mt-3 text-xs text-white/50">
            {badge.workout.distance_km} km · {badge.workout.duration_minutes}{" "}
            min
          </p>
          <p className="mt-1 break-all font-mono text-[10px] text-white/40">
            {badge.cardano_tx_hash}
          </p>
        </article>
      ))}
    </div>
  );
}