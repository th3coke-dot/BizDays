import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, CalendarRange, Coins, Flag, Wallet } from "lucide-react";
import { AdSlot } from "@/components/AdSlot";
import { RelatedLinks } from "@/components/RelatedLinks";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "BizDays",
  absoluteTitle: "BizDays – Arbeidsdager, helligdager og feriepenger",
  description:
    "BizDays hjelper deg å beregne arbeidsdager, holde oversikt over norske helligdager og regne ut feriepenger.",
  path: "/",
});

const tools = [
  {
    href: "/arbeidsdager",
    title: "Arbeidsdager",
    description: "Finn antall arbeidsdager mellom to datoer – med helligdager.",
    icon: CalendarRange,
  },
  {
    href: "/helligdager",
    title: "Helligdager",
    description: "Komplett oversikt over røde dager i 2026 og 2027.",
    icon: Flag,
  },
  {
    href: "/feriepenger",
    title: "Feriepenger",
    description: "Beregn feriepenger med 10,2 %, 12 % eller sats for over 60.",
    icon: Coins,
  },
  {
    href: "/arbeidsgiverkostnad",
    title: "Arbeidsgiverkostnad",
    description:
      "Estimer total kostnad ved ansettelse med sone for arbeidsgiveravgift.",
    icon: Wallet,
  },
];

export default function HomePage() {
  return (
    <>
      <section className="relative overflow-hidden">
        <div className="hero-grid pointer-events-none absolute inset-0" aria-hidden />
        <div
          className="animate-soft-pulse pointer-events-none absolute -left-24 top-10 h-72 w-72 rounded-full bg-teal-400/20 blur-3xl"
          aria-hidden
        />
        <div
          className="animate-soft-pulse pointer-events-none absolute -right-16 top-32 h-80 w-80 rounded-full bg-slate-400/20 blur-3xl"
          aria-hidden
        />

        <div className="relative mx-auto flex min-h-[min(78vh,720px)] max-w-6xl flex-col justify-center px-4 py-16 sm:px-6 sm:py-20">
          <p className="animate-fade-up font-[family-name:var(--font-display)] text-5xl font-bold tracking-tight text-[var(--primary)] sm:text-6xl md:text-7xl">
            Biz<span className="text-[var(--accent)]">Days</span>
          </p>
          <h1 className="animate-fade-up-delay mt-5 max-w-2xl font-[family-name:var(--font-display)] text-3xl font-semibold leading-tight text-[var(--primary)] sm:text-4xl">
            Norske arbeidsdager, helligdager og feriepenger – klart på sekunder
          </h1>
          <p className="animate-fade-up-delay-2 mt-5 max-w-xl text-base leading-relaxed text-[var(--muted)] sm:text-lg">
            Enkle verktøy for planlegging, lønn og ferie. Bygget for Norge.
          </p>
          <div className="animate-fade-up-delay-2 mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <Link
              href="/arbeidsdager"
              className="inline-flex h-12 items-center justify-center gap-2 rounded-lg bg-[var(--accent)] px-6 text-base font-semibold text-white transition hover:bg-[var(--accent-hover)]"
            >
              Beregn arbeidsdager
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/helligdager"
              className="inline-flex h-12 items-center justify-center rounded-lg border border-[var(--border)] bg-white/70 px-6 text-base font-semibold text-[var(--primary)] transition hover:border-[var(--accent)]"
            >
              Se helligdager
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-16 sm:px-6 sm:pb-20">
        <h2 className="font-[family-name:var(--font-display)] text-2xl font-semibold text-[var(--primary)]">
          Velg et verktøy
        </h2>
        <p className="mt-2 max-w-2xl text-[var(--muted)]">
          Hurtigvalg for det du trenger oftest i arbeidshverdagen.
        </p>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {tools.map((tool) => (
            <Link
              key={tool.href}
              href={tool.href}
              className="group rounded-2xl border border-[var(--border)] bg-white/75 p-6 transition hover:-translate-y-0.5 hover:border-[var(--accent)] hover:shadow-[0_16px_40px_-28px_rgba(15,23,42,0.45)]"
            >
              <tool.icon className="h-6 w-6 text-[var(--accent)]" aria-hidden />
              <h3 className="mt-4 font-[family-name:var(--font-display)] text-xl font-semibold text-[var(--primary)]">
                {tool.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-[var(--muted)]">
                {tool.description}
              </p>
              <span className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-[var(--accent)]">
                Åpne
                <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
              </span>
            </Link>
          ))}
        </div>

        <AdSlot className="mt-12" format="horizontal" />

        <section className="mt-14">
          <h2 className="font-[family-name:var(--font-display)] text-2xl font-semibold text-[var(--primary)]">
            Flere land
          </h2>
          <p className="mt-2 text-[var(--muted)]">
            Sverige, Danmark, Finland, UK, Tyskland, Polen og Island — alle med
            engelsk språkvalg.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            {[
              ["/se", "Sverige"],
              ["/dk", "Danmark"],
              ["/fi", "Suomi"],
              ["/uk", "UK"],
              ["/de", "Deutschland"],
              ["/pl", "Polska"],
              ["/is", "Ísland"],
              ["/en", "English"],
            ].map(([href, label]) => (
              <Link
                key={href}
                href={href}
                className="rounded-lg border border-[var(--border)] bg-white/80 px-4 py-3 text-sm font-semibold text-[var(--primary)] hover:border-[var(--accent)]"
              >
                {label}
              </Link>
            ))}
          </div>
        </section>

        <RelatedLinks
          keys={["countdown", "om"]}
          heading="Mer fra BizDays"
        />
      </section>
    </>
  );
}
