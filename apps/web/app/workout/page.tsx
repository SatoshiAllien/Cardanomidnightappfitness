"use client";

/**
 * Mobile-first PWA workout screen.
 * Replaces a separate React Native app for MVP — installable via manifest.json.
 */
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { api } from "@/lib/apiClient";
import { useAuthStore } from "@/lib/auth";

type Phase = "idle" | "active" | "manual" | "done";

export default function WorkoutScreen() {
  const router = useRouter();
  const token = useAuthStore((s) => s.token);

  const [phase, setPhase] = useState<Phase>("idle");
  const [seconds, setSeconds] = useState(0);
  const [distanceKm, setDistanceKm] = useState(0);
  const [manualDistance, setManualDistance] = useState("");
  const [manualDuration, setManualDuration] = useState("");
  const [mintedBadge, setMintedBadge] = useState<{
    name: string;
    txHash: string;
  } | null>(null);
  const [saving, setSaving] = useState(false);

  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (phase === "active") {
      timerRef.current = setInterval(() => setSeconds((s) => s + 1), 1000);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [phase]);

  // Simulated GPS distance increment during active workout
  useEffect(() => {
    if (phase !== "active") return;
    const gps = setInterval(() => {
      setDistanceKm((d) => +(d + 0.01).toFixed(2));
    }, 3000);
    return () => clearInterval(gps);
  }, [phase]);

  function formatTime(total: number) {
    const m = Math.floor(total / 60)
      .toString()
      .padStart(2, "0");
    const s = (total % 60).toString().padStart(2, "0");
    return `${m}:${s}`;
  }

  async function saveWorkout(distance: number, durationMinutes: number) {
    if (!token) return;
    setSaving(true);
    try {
      const result = await api.createWorkout(
        {
          distance_km: distance,
          duration_minutes: durationMinutes,
          source: "manual",
        },
        token
      );

      if (result.badge) {
        setMintedBadge({
          name: result.badge.metadata_json.name,
          txHash: result.badge.cardano_tx_hash,
        });
      }
      setPhase("done");
    } catch (err) {
      alert(err instanceof Error ? err.message : "Failed to save workout");
    } finally {
      setSaving(false);
    }
  }

  async function stopWorkout() {
    const durationMinutes = Math.max(1, Math.round(seconds / 60));
    await saveWorkout(distanceKm, durationMinutes);
  }

  async function submitManual() {
    const distance = parseFloat(manualDistance);
    const duration = parseInt(manualDuration, 10);
    if (isNaN(distance) || isNaN(duration)) {
      alert("Enter valid distance and duration");
      return;
    }
    await saveWorkout(distance, duration);
  }

  if (!token) {
    return (
      <div className="flex min-h-[70vh] flex-col items-center justify-center px-4">
        <p className="mb-4 text-white/70">Log in to track workouts.</p>
        <button
          onClick={() => router.push("/login")}
          className="rounded-lg bg-primary px-6 py-3 font-semibold"
        >
          Log in
        </button>
      </div>
    );
  }

  return (
    <div className="mx-auto flex min-h-[80vh] max-w-lg flex-col px-4 py-8">
      {phase === "idle" && (
        <div className="flex flex-1 flex-col items-center justify-center gap-6">
          <h1 className="text-2xl font-bold">Ready to move?</h1>
          <button
            onClick={() => setPhase("active")}
            className="h-32 w-32 rounded-full bg-accent text-xl font-bold text-navy shadow-lg shadow-accent/30"
          >
            Start
          </button>
          <button
            onClick={() => setPhase("manual")}
            className="text-sm text-white/60 underline"
          >
            Enter workout manually
          </button>
        </div>
      )}

      {phase === "active" && (
        <div className="flex flex-1 flex-col items-center justify-center gap-8">
          <p className="text-sm uppercase tracking-widest text-accent">Active</p>
          <p className="text-7xl font-bold tabular-nums">{formatTime(seconds)}</p>
          <p className="text-3xl text-white/80">{distanceKm.toFixed(2)} km</p>
          <button
            onClick={stopWorkout}
            disabled={saving}
            className="mt-8 rounded-full bg-red-500 px-10 py-4 text-lg font-bold disabled:opacity-50"
          >
            {saving ? "Saving…" : "Stop"}
          </button>
        </div>
      )}

      {phase === "manual" && (
        <div className="flex flex-1 flex-col justify-center gap-4">
          <h1 className="text-2xl font-bold">Manual entry</h1>
          <input
            type="number"
            step="0.1"
            placeholder="Distance (km)"
            value={manualDistance}
            onChange={(e) => setManualDistance(e.target.value)}
            className="rounded-lg border border-white/10 bg-white/5 px-4 py-3"
          />
          <input
            type="number"
            placeholder="Duration (minutes)"
            value={manualDuration}
            onChange={(e) => setManualDuration(e.target.value)}
            className="rounded-lg border border-white/10 bg-white/5 px-4 py-3"
          />
          <button
            onClick={submitManual}
            disabled={saving}
            className="rounded-lg bg-primary py-3 font-semibold disabled:opacity-50"
          >
            {saving ? "Saving…" : "Save workout"}
          </button>
          <button
            onClick={() => setPhase("idle")}
            className="text-sm text-white/60"
          >
            Cancel
          </button>
        </div>
      )}

      {phase === "done" && (
        <div className="flex flex-1 flex-col items-center justify-center gap-6 text-center">
          <p className="text-4xl">✓</p>
          <h1 className="text-2xl font-bold">Workout saved</h1>
          {mintedBadge ? (
            <div className="animate-pulse rounded-2xl border border-accent/40 bg-accent/10 p-6">
              <p className="text-lg font-bold text-accent">Badge minted!</p>
              <p className="mt-2">{mintedBadge.name}</p>
              <p className="mt-1 font-mono text-xs text-white/50">
                {mintedBadge.txHash}
              </p>
            </div>
          ) : (
            <p className="text-white/60">
              Threshold not met — keep going next time!
            </p>
          )}
          <button
            onClick={() => router.push("/dashboard")}
            className="rounded-lg bg-primary px-6 py-3 font-semibold"
          >
            Back to dashboard
          </button>
        </div>
      )}
    </div>
  );
}