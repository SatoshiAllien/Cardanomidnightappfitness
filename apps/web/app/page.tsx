import { FAQ } from "@/components/FAQ";
import { Features } from "@/components/Features";
import { Hero } from "@/components/Hero";

export default function LandingPage() {
  return (
    <>
      <Hero />
      <Features />
      <section className="mx-auto max-w-6xl px-4 py-20 text-center">
        <h2 className="mb-4 text-3xl font-bold">Why on-chain?</h2>
        <p className="mx-auto max-w-2xl text-white/70">
          Your badges are yours forever — transparent, portable, and verifiable
          proof of fitness achievements on Cardano.
        </p>
      </section>
      <FAQ />
    </>
  );
}