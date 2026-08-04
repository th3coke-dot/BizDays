import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  CalendarRange,
  Flag,
  Timer,
  Wallet,
} from "lucide-react";
import { AdSlot } from "@/components/AdSlot";
import { COUNTRY_LIST } from "@/lib/countries";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "BizDays",
  absoluteTitle:
    "BizDays – Workdays, holidays and employment costs for every country",
  description:
    "BizDays helps you calculate workdays, track public holidays, and estimate the total cost of employment across Norway, Sweden, Denmark, Finland, the UK, Germany, Poland and Iceland.",
  path: "/",
});

const features = [
  {
    title: "Workdays",
    description: "Count business days between two dates, holidays excluded.",
    icon: CalendarRange,
  },
  {
    title: "Public holidays",
    description: "Full 2026–2027 holiday calendars, country by country.",
    icon: Flag,
  },
  {
    title: "Countdown",
    description: "Share a live countdown to any date or deadline.",
    icon: Timer,
  },
  {
    title: "Employment cost",
    description: "Estimate the full employer cost on top of gross salary.",
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
            Workdays, holidays and employment costs — for every country
          </h1>
          <p className="animate-fade-up-delay-2 mt-5 max-w-xl text-base leading-relaxed text-[var(--muted)] sm:text-lg">
            One simple toolkit for planning, payroll and HR. Pick your country
            below to get local holidays, workday calculators and employer
            cost estimates.
          </p>
          <div className="animate-fade-up-delay-2 mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <Link
              href="#countries"
              className="inline-flex h-12 items-center justify-center gap-2 rounded-lg bg-[var(--accent)] px-6 text-base font-semibold text-white transition hover:bg-[var(--accent-hover)]"
            >
              Choose your country
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/en"
              className="inline-flex h-12 items-center justify-center rounded-lg border border-[var(--border)] bg-white/70 px-6 text-base font-semibold text-[var(--primary)] transition hover:border-[var(--accent)]"
            >
              Browse in English
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-16 sm:px-6 sm:pb-20">
        <h2 className="font-[family-name:var(--font-display)] text-2xl font-semibold text-[var(--primary)]">
          What you can do
        </h2>
        <p className="mt-2 max-w-2xl text-[var(--muted)]">
          The same set of tools, localized for every country BizDays supports.
        </p>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="rounded-2xl border border-[var(--border)] bg-white/75 p-6"
            >
              <feature.icon className="h-6 w-6 text-[var(--accent)]" aria-hidden />
              <h3 className="mt-4 font-[family-name:var(--font-display)] text-xl font-semibold text-[var(--primary)]">
                {feature.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-[var(--muted)]">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        <section className="mt-14 grid gap-4 sm:grid-cols-2">
          <Link
            href="/for-employees"
            className="group rounded-2xl border border-[var(--border)] bg-white/75 p-6 transition hover:border-[var(--accent)]"
          >
            <p className="text-sm font-semibold uppercase tracking-wide text-[var(--muted)]">
              For employees
            </p>
            <h3 className="mt-2 font-[family-name:var(--font-display)] text-xl font-semibold text-[var(--primary)]">
              Simple, no-fuss tools
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-[var(--muted)]">
              Workdays, holidays and countdowns — nothing complicated.
            </p>
            <span className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-[var(--accent)]">
              Explore
              <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
            </span>
          </Link>
          <Link
            href="/for-employers"
            className="group rounded-2xl border border-[var(--border)] bg-white/75 p-6 transition hover:border-[var(--accent)]"
          >
            <p className="text-sm font-semibold uppercase tracking-wide text-[var(--muted)]">
              For employers
            </p>
            <h3 className="mt-2 font-[family-name:var(--font-display)] text-xl font-semibold text-[var(--primary)]">
              CBA-aware employment cost
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-[var(--muted)]">
              Layer collective agreements or your own uploaded local
              agreement onto the total cost of employment.
            </p>
            <span className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-[var(--accent)]">
              Explore
              <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
            </span>
          </Link>
        </section>

        <AdSlot className="mt-12" format="horizontal" />

        <section id="countries" className="mt-14">
          <h2 className="font-[family-name:var(--font-display)] text-2xl font-semibold text-[var(--primary)]">
            Choose your country
          </h2>
          <p className="mt-2 text-[var(--muted)]">
            Every country is available in its own language, plus English.
          </p>
          <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {COUNTRY_LIST.map((c) => (
              <Link
                key={c.code}
                href={c.code === "no" ? "/" : `/${c.code}`}
                className="group rounded-xl border border-[var(--border)] bg-white/80 px-5 py-4 font-semibold text-[var(--primary)] transition hover:border-[var(--accent)] hover:shadow-[0_16px_40px_-28px_rgba(15,23,42,0.45)]"
              >
                <span className="flex items-center justify-between">
                  {c.name}
                  <ArrowRight className="h-4 w-4 text-[var(--accent)] opacity-0 transition group-hover:opacity-100" />
                </span>
                {c.name !== c.nativeName && (
                  <span className="mt-0.5 block text-xs font-normal text-[var(--muted)]">
                    {c.nativeName}
                  </span>
                )}
              </Link>
            ))}
          </div>
          <p className="mt-6 text-sm text-[var(--muted)]">
            Prefer to browse everything in English first?{" "}
            <Link href="/en" className="font-medium text-[var(--accent)] hover:underline">
              Open the English hub
            </Link>
            .
          </p>
        </section>
      </section>
    </>
  );
}
