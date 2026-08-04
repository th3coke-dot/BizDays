import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Briefcase, User } from "lucide-react";
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

const paths = [
  {
    href: "/for-employees",
    icon: User,
    eyebrow: "For employees",
    title: "Just the essentials",
    description:
      "Workdays, public holidays, countdowns and feriepenger — simple tools, no clutter.",
  },
  {
    href: "/for-employers",
    icon: Briefcase,
    eyebrow: "For employers",
    title: "Total cost of employment",
    description:
      "Country-by-country employer costs, collective agreements, and your own uploaded local agreements.",
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

        <div className="relative mx-auto flex max-w-5xl flex-col items-center px-4 py-16 text-center sm:px-6 sm:py-20">
          <p className="animate-fade-up font-[family-name:var(--font-display)] text-5xl font-bold tracking-tight text-[var(--primary)] sm:text-6xl">
            Biz<span className="text-[var(--accent)]">Days</span>
          </p>
          <h1 className="animate-fade-up-delay mt-5 max-w-2xl font-[family-name:var(--font-display)] text-2xl font-semibold leading-tight text-[var(--primary)] sm:text-3xl">
            Workdays, holidays and employment costs — for every country
          </h1>
          <p className="animate-fade-up-delay-2 mt-4 max-w-lg text-base leading-relaxed text-[var(--muted)]">
            Start by telling us who you are.
          </p>

          <div className="animate-fade-up-delay-2 mt-10 grid w-full gap-4 sm:grid-cols-2">
            {paths.map((path) => (
              <Link
                key={path.href}
                href={path.href}
                className="group flex flex-col items-start rounded-2xl border border-[var(--border)] bg-white/80 p-7 text-left transition hover:-translate-y-0.5 hover:border-[var(--accent)] hover:shadow-[0_20px_50px_-28px_rgba(15,23,42,0.5)]"
              >
                <span className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-[var(--accent)]/10 text-[var(--accent)]">
                  <path.icon className="h-6 w-6" aria-hidden />
                </span>
                <p className="mt-4 text-sm font-semibold uppercase tracking-wide text-[var(--muted)]">
                  {path.eyebrow}
                </p>
                <h2 className="mt-1 font-[family-name:var(--font-display)] text-xl font-semibold text-[var(--primary)]">
                  {path.title}
                </h2>
                <p className="mt-2 text-sm leading-relaxed text-[var(--muted)]">
                  {path.description}
                </p>
                <span className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-[var(--accent)]">
                  Continue
                  <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-16 sm:px-6 sm:pb-20">
        <AdSlot format="horizontal" />

        <div className="mt-12 rounded-2xl border border-[var(--border)] bg-white/60 p-6 sm:p-8">
          <h2 className="font-[family-name:var(--font-display)] text-lg font-semibold text-[var(--primary)]">
            Just want a specific country?
          </h2>
          <p className="mt-2 text-sm text-[var(--muted)]">
            Every tool is also available directly, in the local language plus English.
          </p>
          <div className="mt-5 flex flex-wrap gap-2">
            {COUNTRY_LIST.map((c) => (
              <Link
                key={c.code}
                href={c.code === "no" ? "/" : `/${c.code}`}
                className="rounded-lg border border-[var(--border)] bg-white/80 px-3.5 py-2 text-sm font-medium text-[var(--primary)] transition hover:border-[var(--accent)]"
              >
                {c.name}
              </Link>
            ))}
            <Link
              href="/en"
              className="rounded-lg border border-[var(--border)] bg-white/80 px-3.5 py-2 text-sm font-medium text-[var(--accent)] transition hover:border-[var(--accent)]"
            >
              English hub
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
