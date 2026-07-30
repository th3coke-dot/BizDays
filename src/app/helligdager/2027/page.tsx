import type { Metadata } from "next";
import Link from "next/link";
import { HolidayList } from "@/components/HolidayList";
import { RelatedLinks } from "@/components/RelatedLinks";
import { holidaysNO } from "@/data/holidays-no";
import { formatDateNO } from "@/lib/utils";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Helligdager 2027",
  description:
    "Komplett liste over norske helligdager og røde dager i 2027. Merk: 17. mai faller sammen med andre pinsedag.",
  path: "/helligdager/2027",
});

export default function Helligdager2027Page() {
  const holidays = holidaysNO[2027];

  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6 sm:py-12">
      <nav className="mb-6 text-sm text-[var(--muted)]" aria-label="Brødsmule">
        <Link href="/helligdager" className="hover:text-[var(--accent)]">
          Helligdager
        </Link>
        <span className="mx-2">/</span>
        <span>2027</span>
      </nav>

      <header className="mb-8">
        <h1 className="font-[family-name:var(--font-display)] text-3xl font-semibold tracking-tight text-[var(--primary)] sm:text-4xl">
          Helligdager 2027
        </h1>
        <p className="mt-3 text-[var(--muted)]">
          {holidays.length} røde dager i Norge i 2027. Merk: 17. mai faller
          sammen med andre pinsedag. Se også{" "}
          <Link
            href="/helligdager/2026"
            className="font-medium text-[var(--accent)] underline-offset-2 hover:underline"
          >
            helligdager 2026
          </Link>
          .
        </p>
      </header>

      <div className="mb-6 grid grid-cols-2 gap-2 sm:grid-cols-4">
        {holidays.map((h) => (
          <div
            key={h.date}
            className="rounded-xl border border-[var(--border)] bg-white/75 px-3 py-4 text-center"
          >
            <p className="text-xs uppercase tracking-wide text-[var(--muted)]">
              {formatDateNO(h.date, "EEEE")}
            </p>
            <p className="mt-1 font-[family-name:var(--font-display)] text-2xl font-semibold text-[var(--primary)]">
              {formatDateNO(h.date, "d. MMM")}
            </p>
            <p className="mt-2 text-xs font-medium text-[var(--muted)]">
              {h.name}
            </p>
          </div>
        ))}
      </div>

      <HolidayList holidays={holidays} title="Alle helligdager 2027" />
      <RelatedLinks keys={["arbeidsdager", "helligdager", "feriepenger"]} />
    </div>
  );
}
