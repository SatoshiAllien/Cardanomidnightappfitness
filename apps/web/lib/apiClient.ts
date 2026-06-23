const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:4000";

export interface User {
  id: string;
  email: string;
  name: string;
  avatarUrl: string | null;
  walletAddress: string | null;
  createdAt: string;
}

export interface Workout {
  id: string;
  distance_km: number;
  duration_minutes: number;
  calories: number | null;
  source: string;
  created_at: string;
  badge?: {
    id: string;
    cardano_tx_hash: string;
    policy_id: string;
    asset_name: string;
  } | null;
}

export interface Badge {
  id: string;
  cardano_tx_hash: string;
  policy_id: string;
  asset_name: string;
  metadata_json: {
    name: string;
    description: string;
    attributes: Array<{ trait_type: string; value: string | number }>;
  };
  created_at: string;
  workout: {
    distance_km: number;
    duration_minutes: number;
    calories: number | null;
    source: string;
    created_at: string;
  };
}

async function request<T>(
  path: string,
  options: RequestInit = {},
  token?: string | null
): Promise<T> {
  const headers: HeadersInit = {
    "Content-Type": "application/json",
    ...(options.headers ?? {}),
  };
  if (token) {
    (headers as Record<string, string>)["Authorization"] = `Bearer ${token}`;
  }

  const res = await fetch(`${API_URL}${path}`, { ...options, headers });
  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    throw new Error(body.error ?? `Request failed: ${res.status}`);
  }
  return res.json() as Promise<T>;
}

export const api = {
  register: (body: { email: string; password: string; name: string }) =>
    request<{ user: User; token: string }>("/api/auth/register", {
      method: "POST",
      body: JSON.stringify(body),
    }),

  login: (body: { email: string; password: string }) =>
    request<{ user: User; token: string }>("/api/auth/login", {
      method: "POST",
      body: JSON.stringify(body),
    }),

  me: (token: string) =>
    request<{ user: User }>("/api/me", {}, token),

  updateWallet: (walletAddress: string, token: string) =>
    request<{ user: User }>(
      "/api/me/wallet",
      { method: "PUT", body: JSON.stringify({ wallet_address: walletAddress }) },
      token
    ),

  workouts: (token: string) =>
    request<Workout[]>("/api/workouts", {}, token),

  createWorkout: (
    body: {
      distance_km: number;
      duration_minutes: number;
      calories?: number;
      source: "manual" | "healthkit" | "google_fit";
    },
    token: string
  ) =>
    request<{ workout: Workout; badge: Badge | null }>(
      "/api/workouts",
      { method: "POST", body: JSON.stringify(body) },
      token
    ),

  badges: (token: string) =>
    request<Badge[]>("/api/badges", {}, token),
};