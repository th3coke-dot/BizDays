import type { Metadata } from "next";
import Link from "next/link";
import { RelatedLinks } from "@/components/RelatedLinks";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Om",
  description:
    "Hva BizDays er, hvordan verktøyene fungerer, og hvordan du kan gi feedback.",
  path: "/om",
});

export default function OmPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6 sm:py-12">
      <header className="mb-8">
        <h1 className="font-[family-name:var(--font-display)] text-3xl font-semibold tracking-tight text-[var(--primary)] sm:text-4xl">
          Om BizDays
        </h1>
      </header>

      <div className="space-y-5 text-base leading-relaxed text-[var(--muted)]">
        <p>
          BizDays er en enkel norsk tjeneste for å beregne arbeidsdager, se
          helligdager og regne ut feriepenger. Målet er å spare tid for ansatte,
          ledere og lønnsansvarlige – uten unødvendig støy.
        </p>
        <p>
          Vi starter med fokus på Norge: korrekte røde dager, tydelige
          beregninger og raske svar. Flere verktøy kommer etter hvert.
        </p>
        <p>
          Har du spørsmål, feil eller ønsker? Send en e-post til{" "}
          <a
            href="mailto:hei@bizdays.com"
            className="font-semibold text-[var(--accent)] underline-offset-2 hover:underline"
          >
            hei@bizdays.com
          </a>
          .
        </p>
      </div>

      <section className="mt-10 rounded-2xl border border-[var(--border)] bg-white/70 p-6">
        <h2 className="font-[family-name:var(--font-display)] text-xl font-semibold text-[var(--primary)]">
          Gi oss feedback
        </h2>
        <p className="mt-2 text-sm leading-relaxed text-[var(--muted)]">
          Fortell oss hva som mangler – flere land, engelsk versjon, ICS-eksport
          av helligdager, eller noe annet. Jo mer konkret, jo bedre.
        </p>
        <a
          href="mailto:hei@bizdays.com?subject=Feedback%20BizDays"
          className="mt-4 inline-flex h-11 items-center rounded-lg bg-[var(--accent)] px-5 text-sm font-semibold text-white transition hover:bg-[var(--accent-hover)]"
        >
          Send feedback
        </a>
      </section>

      <section className="mt-10">
        <h2 className="font-[family-name:var(--font-display)] text-xl font-semibold text-[var(--primary)]">
          Planlagte funksjoner
        </h2>
        <ul className="mt-4 list-disc space-y-2 pl-5 text-sm text-[var(--muted)]">
          <li>Flere land (Sverige, Danmark, …)</li>
          <li>Engelsk versjon</li>
          <li>ICS-eksport av helligdager til kalender</li>
          <li>Flere år og bedriftskalendere</li>
        </ul>
        <p className="mt-4 text-sm text-[var(--muted)]">
          Start med{" "}
          <Link
            href="/arbeidsdager"
            className="font-medium text-[var(--accent)] underline-offset-2 hover:underline"
          >
            arbeidsdager
          </Link>{" "}
          eller{" "}
          <Link
            href="/helligdager"
            className="font-medium text-[var(--accent)] underline-offset-2 hover:underline"
          >
            helligdager
          </Link>
          .
        </p>
      </section>

      <RelatedLinks keys={["arbeidsdager", "helligdager", "feriepenger", "countdown"]} />
    </div>
  );
}
