# Cardano Midnight App Fitness

Proof-of-Workout badge system on **Cardano** with **Midnight** privacy layer support.

Track workouts, hit thresholds, mint on-chain NFT badges — private fitness proofs on Cardano.

## Stack

- **Web / PWA** — Next.js 15, TypeScript, Tailwind CSS
- **API** — Fastify, Prisma, PostgreSQL
- **Blockchain** — Cardano (Lucid + Blockfrost) · Midnight-ready architecture

## Structure

```
apps/
├── api/    # Backend API + Cardano minting
└── web/    # Next.js web app + PWA workout screen
```

## Quick start (Mac / Linux)

```bash
git clone https://github.com/SatoshiAllien/Cardanomidnightappfitness.git
cd Cardanomidnightappfitness
cp apps/api/.env.example apps/api/.env
cp apps/web/.env.example apps/web/.env.local
npm install
npm run db:migrate -w @cardano-midnight-fitness/api
npm run dev
```

- API: http://localhost:4000
- Web: http://localhost:3000

## License

MIT