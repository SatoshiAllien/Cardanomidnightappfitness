"use client";

import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { BadgeGrid } from "@/components/BadgeGrid";
import { api } from "@/lib/apiClient";
import { useAuthStore } from "@/lib/auth";

export default function BadgesPage() {
  const token = useAuthStore((s) => s.token);

  const { data: badges = [], isLoading } = useQuery({
    queryKey: ["badges", token],
    queryFn: () => api.badges(token!),
    enabled: !!token,
  });

  if (!token) {
    return (
      <div className="mx-auto max-w-6xl px-4 py-16 text-center">
        <Link href="/login" className="text-primary hover:underline">
          Log in to view badges
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <h1 className="mb-8 text-3xl font-bold">Badge gallery</h1>
      {isLoading ? (
        <p className="text-white/60">Loading…</p>
      ) : (
        <BadgeGrid badges={badges} />
      )}
    </div>
  );
}