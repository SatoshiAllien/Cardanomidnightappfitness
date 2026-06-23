const steps = [
  {
    title: "Track your workout",
    description: "Log runs manually or sync from Apple Health / Google Fit.",
  },
  {
    title: "Hit the threshold",
    description: "Meet distance, duration, and calorie goals to mint your badge.",
  },
  {
    title: "Mint your badge",
    description: "Receive a Cardano NFT as permanent proof of your effort.",
  },
];

export function Features() {
  return (
    <section id="how-it-works" className="mx-auto max-w-6xl px-4 py-20">
      <h2 className="mb-12 text-center text-3xl font-bold">How it works</h2>
      <div className="grid gap-6 md:grid-cols-3">
        {steps.map((step, i) => (
          <div
            key={step.title}
            className="rounded-2xl border border-white/10 bg-white/5 p-6"
          >
            <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-full bg-primary text-lg font-bold">
              {i + 1}
            </div>
            <h3 className="mb-2 text-xl font-semibold">{step.title}</h3>
            <p className="text-white/70">{step.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}