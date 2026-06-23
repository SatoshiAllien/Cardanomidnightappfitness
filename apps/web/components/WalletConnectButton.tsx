"use client";

import { useState } from "react";
import { useAuthStore } from "@/lib/auth";
import { api } from "@/lib/apiClient";

export function WalletConnectButton() {
  const { token, user, setAuth } = useAuthStore();
  const [loading, setLoading] = useState(false);

  async function connectWallet() {
    if (!token) return;

    setLoading(true);
    try {
      // Production: use Mesh BrowserWallet (Lace, Eternl, Nami)
      const mockAddress =
        user?.walletAddress ??
        `addr_test1qmidnightfit${Math.random().toString(36).slice(2, 10)}`;

      const { user: updated } = await api.updateWallet(mockAddress, token);
      setAuth(token, updated);
    } catch (err) {
      console.error(err);
      alert("Failed to connect wallet");
    } finally {
      setLoading(false);
    }
  }

  if (!token) {
    return (
      <p className="text-sm text-white/60">Log in to connect your wallet.</p>
    );
  }

  if (user?.walletAddress) {
    return (
      <div className="rounded-xl border border-accent/30 bg-accent/10 p-4">
        <p className="text-sm text-accent">Wallet connected</p>
        <p className="mt-1 break-all font-mono text-xs text-white/80">
          {user.walletAddress}
        </p>
      </div>
    );
  }

  return (
    <button
      onClick={connectWallet}
      disabled={loading}
      className="w-full rounded-lg bg-primary px-4 py-2 font-semibold disabled:opacity-50"
    >
      {loading ? "Connecting…" : "Connect Cardano wallet"}
    </button>
  );
}