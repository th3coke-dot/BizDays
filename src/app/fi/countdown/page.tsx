import type { Metadata } from "next";
import Link from "next/link";
import { CountdownBoard } from "@/components/CountdownBoard";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Countdown Suomi",
  description:
    "Countdown itsenäisyyspäivään, juhannukseen, jouluun ja uuteen vuoteen.",
  path: "/fi/countdown",
});

export default function Page() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6 sm:py-12">
      <header className="mb-8">
        <p className="text-sm font-medium text-[var(--muted)]">Suomi</p>
        <h1 className="mt-1 font-[family-name:var(--font-display)] text-3xl font-semibold tracking-tight text-[var(--primary)] sm:text-4xl">
          Countdown
        </h1>
        <p className="mt-3 max-w-2xl text-[var(--muted)]">
          Laske aikaa itsenäisyyspäivään, juhannukseen, jouluun ja uuteen vuoteen.
        </p>
      </header>
      <CountdownBoard country="fi" />
      <p className="mt-8 text-sm text-[var(--muted)]">
        <Link href="/fi/tyopaivat" className="text-[var(--accent)] hover:underline">
          Työpäivät
        </Link>
        {" · "}
        <Link href="/fi/pyhapaivat" className="text-[var(--accent)] hover:underline">
          Pyhäpäivät
        </Link>
      </p>
    </div>
  );
}
