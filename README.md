# Cardanomidnightappfitness

Monorepo for **Cardano Midnight App Fitness** — Proof-of-Workout on Cardano.

| App | Stack | Port |
|-----|-------|------|
| API | Express + TypeScript | 3001 |
| Web | Next.js 14 + Tailwind | 3000 |
| iOS | SwiftUI + MVVM | Xcode |

**Repository:** https://github.com/SatoshiAllien/Cardanomidnightappfitness

---

## 1. Clone

```bash
git clone https://github.com/SatoshiAllien/Cardanomidnightappfitness.git
cd Cardanomidnightappfitness
```

## 2. Setup env

```bash
cp apps/api/.env.example apps/api/.env
cp apps/web/.env.example apps/web/.env.local
```

## 3. Install

```bash
npm install
npm run install:all
```

(`npm install` at root installs `concurrently` and then API + Web deps.)

## 4. Run (API + Web together)

```bash
npm run dev
```

- Web: http://localhost:3000
- API: http://localhost:3001
- Health check: http://localhost:3001/health

## 5. Open iOS app in Xcode

```bash
open apps/ios/RunBadgeApp/RunBadgeApp.xcodeproj
```

1. Set **Team** in Signing & Capabilities
2. Select iPhone or Simulator
3. Press **Run** (⌘R)

See [apps/ios/RunBadgeApp/README_IOS.md](apps/ios/RunBadgeApp/README_IOS.md).

---

## Project structure

```
Cardanomidnightappfitness/
├── apps/
│   ├── api/          Express API
│   ├── web/          Next.js web app
│   └── ios/
│       └── RunBadgeApp/
│           ├── RunBadgeApp.xcodeproj
│           ├── Sources/
│           └── Assets/
├── package.json
└── README.md
```

## API endpoints

| Method | Path | Description |
|--------|------|-------------|
| GET | `/health` | `{ status: "ok" }` |
| GET | `/workouts` | Mock workout list |
| POST | `/workouts` | Save workout, returns badge if threshold met |

## License

MIT