import Link from "next/link";

export function Header() {
  return (
    <header className="border-b border-white/10">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link href="/" className="text-lg font-bold text-primary">
          Midnight Fitness
        </Link>
        <nav className="flex gap-6 text-sm text-white/70">
          <Link href="/" className="hover:text-white">
            Home
          </Link>
          <Link href="/dashboard" className="hover:text-white">
            Dashboard
          </Link>
        </nav>
      </div>
    </header>
  );
}