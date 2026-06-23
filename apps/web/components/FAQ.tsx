const faqs = [
  {
    q: "Do I need a Cardano wallet?",
    a: "You can track workouts without one. Connect Lace or Eternl to receive badges in your wallet.",
  },
  {
    q: "What workouts qualify?",
    a: "By default: 3 km, 20 minutes, and optional calorie minimum. Admins can adjust thresholds.",
  },
  {
    q: "Is my health data stored on-chain?",
    a: "Only badge metadata (distance, duration, date) is minted. Raw health data stays in your account.",
  },
];

export function FAQ() {
  return (
    <section className="mx-auto max-w-3xl px-4 py-20">
      <h2 className="mb-8 text-center text-3xl font-bold">FAQ</h2>
      <div className="space-y-4">
        {faqs.map((item) => (
          <details
            key={item.q}
            className="rounded-xl border border-white/10 bg-white/5 p-4"
          >
            <summary className="cursor-pointer font-semibold">{item.q}</summary>
            <p className="mt-2 text-white/70">{item.a}</p>
          </details>
        ))}
      </div>
    </section>
  );
}