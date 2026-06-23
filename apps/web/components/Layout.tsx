import Link from "next/link";

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-navy text-white">
      <header className="border-b border-white/10">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
          <Link href="/" className="text-xl font-bold text-primary">
            Midnight Fitness
          </Link>
          <nav className="flex gap-4 text-sm text-white/80">
            <Link href="/login">Login</Link>
            <Link href="/dashboard">Dashboard</Link>
            <Link href="/workout">Workout</Link>
            <Link href="/badges">Badges</Link>
          </nav>
        </div>
      </header>
      <main>{children}</main>
      <footer className="border-t border-white/10 py-8 text-center text-sm text-white/50">
        Cardano Midnight · Proof-of-Workout
      </footer>
    </div>
  );
}