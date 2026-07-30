import type { Metadata } from "next";
import Link from "next/link";
import { CountdownBoard } from "@/components/CountdownBoard";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Countdown Danmark",
  description:
    "Countdown til grundlovsdag, jul, nytår og sommerferie i Danmark.",
  path: "/dk/countdown",
});

export default function Page() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6 sm:py-12">
      <header className="mb-8">
        <p className="text-sm font-medium text-[var(--muted)]">Danmark</p>
        <h1 className="mt-1 font-[family-name:var(--font-display)] text-3xl font-semibold tracking-tight text-[var(--primary)] sm:text-4xl">
          Countdown
        </h1>
        <p className="mt-3 max-w-2xl text-[var(--muted)]">
          Tæl ned til grundlovsdag, jul, nytår og sommerferie.
        </p>
      </header>
      <CountdownBoard country="dk" />
      <p className="mt-8 text-sm text-[var(--muted)]">
        <Link href="/dk/arbejdsdage" className="text-[var(--accent)] hover:underline">
          Arbejdsdage
        </Link>
        {" · "}
        <Link href="/dk/helligdage" className="text-[var(--accent)] hover:underline">
          Helligdage
        </Link>
      </p>
    </div>
  );
}
