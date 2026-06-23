import Link from "next/link";

export function Hero() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-24 text-center">
      <p className="mb-4 text-sm uppercase tracking-widest text-accent">
        Cardano · Midnight · Fitness
      </p>
      <h1 className="mb-6 text-5xl font-bold leading-tight">
        Private Proof of Workout on Cardano
      </h1>
      <p className="mx-auto mb-10 max-w-2xl text-lg text-white/70">
        Earn on-chain badges every time you move. Built for Cardano with
        Midnight privacy — your data, your proof, your wallet.
      </p>
      <div className="flex flex-wrap justify-center gap-4">
        <Link
          href="/login"
          className="rounded-lg bg-primary px-6 py-3 font-semibold text-white hover:bg-primary/90"
        >
          Start now
        </Link>
        <a
          href="#how-it-works"
          className="rounded-lg border border-white/20 px-6 py-3 font-semibold hover:bg-white/5"
        >
          Learn more
        </a>
      </div>
    </section>
  );
}