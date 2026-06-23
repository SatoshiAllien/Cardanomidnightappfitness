import Link from "next/link";

export default function LandingPage() {
  return (
    <div className="mx-auto max-w-4xl px-6 py-20 text-center">
      <p className="mb-4 text-sm uppercase tracking-widest text-accent">
        Cardano · Midnight · Fitness
      </p>
      <h1 className="mb-6 text-5xl font-bold leading-tight">
        Proof of Workout on Cardano
      </h1>
      <p className="mx-auto mb-10 max-w-2xl text-lg text-white/70">
        Track workouts, earn badges, and mint on-chain proof of your fitness
        journey. Web dashboard + native iOS app in one monorepo.
      </p>
      <div className="flex flex-wrap justify-center gap-4">
        <Link
          href="/dashboard"
          className="rounded-lg bg-primary px-6 py-3 font-semibold hover:bg-primary/90"
        >
          Open Dashboard
        </Link>
        <a
          href="https://github.com/SatoshiAllien/Cardanomidnightappfitness"
          className="rounded-lg border border-white/20 px-6 py-3 font-semibold hover:bg-white/5"
          target="_blank"
          rel="noopener noreferrer"
        >
          GitHub
        </a>
      </div>
    </div>
  );
}