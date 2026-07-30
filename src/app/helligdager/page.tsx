import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { HolidayList } from "@/components/HolidayList";
import { AdSlot } from "@/components/AdSlot";
import { RelatedLinks } from "@/components/RelatedLinks";
import { holidaysNO } from "@/data/holidays-no";
import { formatDateNO } from "@/lib/utils";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Norske helligdager",
  description:
    "Oversikt over norske helligdager og røde dager for 2026 og 2027. Fast og bevegelige datoer.",
  path: "/helligdager",
});

export default function HelligdagerPage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6 sm:py-12">
      <header className="mb-10">
        <h1 className="font-[family-name:var(--font-display)] text-3xl font-semibold tracking-tight text-[var(--primary)] sm:text-4xl">
          Norske helligdager
        </h1>
        <p className="mt-3 max-w-2xl text-[var(--muted)]">
          Se alle røde dager for 2026 og 2027 – både faste og bevegelige
          helligdager. Bruk dem sammen med{" "}
          <Link
            href="/arbeidsdager"
            className="font-medium text-[var(--accent)] underline-offset-2 hover:underline"
          >
            arbeidsdagkalkulatoren
          </Link>
          .
        </p>
      </header>

      <div className="mb-8 grid gap-4 sm:grid-cols-2">
        {[2026, 2027].map((year) => (
          <Link
            key={year}
            href={`/helligdager/${year}`}
            className="group rounded-2xl border border-[var(--border)] bg-white/80 p-6 transition hover:border-[var(--accent)]"
          >
            <p className="font-[family-name:var(--font-display)] text-3xl font-bold text-[var(--primary)]">
              {year}
            </p>
            <p className="mt-2 text-sm text-[var(--muted)]">
              {holidaysNO[year as 2026 | 2027].length} helligdager
            </p>
            <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-[var(--accent)]">
              Åpne årsoversikt
              <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
            </span>
          </Link>
        ))}
      </div>

      <AdSlot format="horizontal" />

      <div className="grid gap-6 lg:grid-cols-2">
        <YearPreview year={2026} />
        <YearPreview year={2027} />
      </div>

      <RelatedLinks keys={["arbeidsdager", "countdown", "feriepenger"]} />
    </div>
  );
}

function YearPreview({ year }: { year: 2026 | 2027 }) {
  const holidays = holidaysNO[year];
  return (
    <div>
      <HolidayList
        holidays={holidays}
        title={`Helligdager ${year}`}
        emptyText="Ingen data"
      />
      <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-3">
        {holidays.slice(0, 6).map((h) => (
          <div
            key={h.date}
            className="rounded-xl border border-[var(--border)] bg-white/70 px-3 py-3 text-center"
          >
            <p className="text-xs uppercase tracking-wide text-[var(--muted)]">
              {formatDateNO(h.date, "MMM")}
            </p>
            <p className="font-[family-name:var(--font-display)] text-2xl font-semibold text-[var(--primary)]">
              {formatDateNO(h.date, "d")}
            </p>
            <p className="mt-1 truncate text-xs text-[var(--muted)]">{h.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
