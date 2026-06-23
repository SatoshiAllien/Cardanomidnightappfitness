"use client";

import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { BadgeGrid } from "@/components/BadgeGrid";
import { DashboardStats } from "@/components/DashboardStats";
import { WalletConnectButton } from "@/components/WalletConnectButton";
import { WorkoutList } from "@/components/WorkoutList";
import { api } from "@/lib/apiClient";
import { useAuthStore } from "@/lib/auth";

export default function DashboardPage() {
  const { token, user } = useAuthStore();

  const workoutsQuery = useQuery({
    queryKey: ["workouts", token],
    queryFn: () => api.workouts(token!),
    enabled: !!token,
  });

  const badgesQuery = useQuery({
    queryKey: ["badges", token],
    queryFn: () => api.badges(token!),
    enabled: !!token,
  });

  if (!token || !user) {
    return (
      <div className="mx-auto max-w-6xl px-4 py-16 text-center">
        <p className="mb-4 text-white/70">Please log in to view your dashboard.</p>
        <Link href="/login" className="text-primary hover:underline">
          Go to login
        </Link>
      </div>
    );
  }

  const workouts = workoutsQuery.data ?? [];
  const badges = badgesQuery.data ?? [];

  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <DashboardStats workouts={workouts} badges={badges} name={user.name} />

      <div className="mt-10 grid gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-8">
          <section>
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-xl font-bold">Workout history</h2>
              <Link
                href="/workout"
                className="rounded-lg bg-accent px-4 py-2 text-sm font-semibold text-navy"
              >
                Start workout
              </Link>
            </div>
            {workoutsQuery.isLoading ? (
              <p className="text-white/60">Loading workouts…</p>
            ) : (
              <WorkoutList workouts={workouts} />
            )}
          </section>

          <section>
            <h2 className="mb-4 text-xl font-bold">Recent badges</h2>
            {badgesQuery.isLoading ? (
              <p className="text-white/60">Loading badges…</p>
            ) : (
              <BadgeGrid badges={badges.slice(0, 3)} />
            )}
          </section>
        </div>

        <aside className="space-y-4">
          <h2 className="text-xl font-bold">Wallet</h2>
          <WalletConnectButton />
        </aside>
      </div>
    </div>
  );
}