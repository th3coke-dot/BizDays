import type { Metadata } from "next";
import Link from "next/link";
import { WorkdaysCalculator } from "@/components/WorkdaysCalculator";
import { AdSlot } from "@/components/AdSlot";
import { RelatedLinks } from "@/components/RelatedLinks";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Beregn arbeidsdager",
  description:
    "Finn antall arbeidsdager mellom to datoer i Norge. Tar hensyn til helligdager og helger.",
  path: "/arbeidsdager",
});

export default function ArbeidsdagerPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6 sm:py-12">
      <header className="mb-8">
        <h1 className="font-[family-name:var(--font-display)] text-3xl font-semibold tracking-tight text-[var(--primary)] sm:text-4xl">
          Beregn arbeidsdager
        </h1>
        <p className="mt-3 max-w-2xl text-[var(--muted)]">
          Velg en periode og se hvor mange arbeidsdager du har – ekskludert
          lørdager, søndager og norske helligdager.
        </p>
      </header>

      <WorkdaysCalculator />

      <AdSlot className="mt-8" />

      <aside className="mt-10 rounded-2xl border border-[var(--border)] bg-white/60 p-5 text-sm leading-relaxed text-[var(--muted)]">
        <p className="font-semibold text-[var(--primary)]">Slik teller vi</p>
        <p className="mt-2">
          Helger og norske helligdager er trukket fra. En arbeidsdag er en
          hverdag (man–fre) som ikke er helligdag. Se også{" "}
          <Link
            href="/helligdager"
            className="font-medium text-[var(--accent)] underline-offset-2 hover:underline"
          >
            norske helligdager
          </Link>{" "}
          for full oversikt.
        </p>
      </aside>

      <RelatedLinks keys={["helligdager", "feriepenger", "countdown"]} />
    </div>
  );
}
