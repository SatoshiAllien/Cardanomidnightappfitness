import type { Metadata } from "next";
import { Header } from "@/components/Header";
import "./globals.css";

export const metadata: Metadata = {
  title: "Cardano Midnight App Fitness",
  description: "Proof-of-Workout on Cardano Midnight",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-navy text-white">
        <Header />
        <main>{children}</main>
      </body>
    </html>
  );
}