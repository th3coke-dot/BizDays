import type { Metadata } from "next";
import Link from "next/link";
import { FeriepengerCalculator } from "@/components/FeriepengerCalculator";
import { AdSlot } from "@/components/AdSlot";
import { RelatedLinks } from "@/components/RelatedLinks";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Beregn feriepenger",
  description:
    "Regn ut feriepenger og simuler en typisk juni-lønnsslipp med feriepengetrekk, skatt og netto.",
  path: "/feriepenger",
});

export default function FeriepengerPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6 sm:py-12">
      <header className="mb-8">
        <h1 className="font-[family-name:var(--font-display)] text-3xl font-semibold tracking-tight text-[var(--primary)] sm:text-4xl">
          Beregn feriepenger
        </h1>
        <p className="mt-3 max-w-2xl text-[var(--muted)]">
          Se feriepengebeløpet – og hvordan en juni-lønnsslipp kan se ut med
          lønn, feriepengetrekk, skatt og netto utbetaling.
        </p>
      </header>

      <FeriepengerCalculator />
      <AdSlot className="mt-8" />

      <aside className="mt-10 rounded-2xl border border-[var(--border)] bg-white/60 p-5 text-sm leading-relaxed text-[var(--muted)]">
        <p className="font-semibold text-[var(--primary)]">Kort forklart</p>
        <p className="mt-2">
          Lovfestet minstesats er 10,2 %. Mange tariffavtaler bruker 12 %.
          Arbeidstakere over 60 år har rett til et tillegg på 2,3 prosentpoeng
          (her vist som 12,5 % med lovfestet basis).
        </p>
        <p className="mt-2">
          Grunnlaget er vanligvis fjorårets lønn, og feriepengene utbetales ofte
          i juni. Juni-lønnsslippen er en forenklet simulering: mange får
          feriepenger utbetalt samtidig som ordinær juni-lønn trekkes
          (feriepengetrekk). Faktisk skattetrekk følger skattetabell, ikke bare
          en fast prosent. Planlegg ferien med{" "}
          <Link
            href="/arbeidsdager"
            className="font-medium text-[var(--accent)] underline-offset-2 hover:underline"
          >
            arbeidsdagkalkulatoren
          </Link>
          .
        </p>
      </aside>

      <RelatedLinks keys={["arbeidsdager", "helligdager", "countdown"]} />
    </div>
  );
}
