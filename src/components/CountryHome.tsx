import Link from "next/link";
import { ArrowRight, CalendarRange, Flag, Timer } from "lucide-react";
import type { CountryConfig } from "@/lib/countries";

export function CountryHome({ country }: { country: CountryConfig }) {
  const tools = [
    {
      href: country.workdaysPath,
      title: country.labels.workdays,
      description: country.labels.explanation,
      icon: CalendarRange,
    },
    {
      href: country.holidaysPath,
      title: country.labels.holidays,
      description: `${country.labels.holidays} 2026–2027`,
      icon: Flag,
    },
    {
      href: country.countdownPath,
      title: country.labels.countdown,
      description: country.labels.countdown,
      icon: Timer,
    },
  ];

  return (
    <>
      <section className="relative overflow-hidden">
        <div className="hero-grid pointer-events-none absolute inset-0" aria-hidden />
        <div className="relative mx-auto flex min-h-[min(70vh,640px)] max-w-6xl flex-col justify-center px-4 py-16 sm:px-6">
          <p className="font-[family-name:var(--font-display)] text-5xl font-bold tracking-tight text-[var(--primary)] sm:text-6xl">
            Biz<span className="text-[var(--accent)]">Days</span>
            <span className="ml-3 align-middle text-lg font-semibold text-[var(--muted)] sm:text-xl">
              {country.nativeName}
            </span>
          </p>
          <h1 className="mt-5 max-w-2xl font-[family-name:var(--font-display)] text-3xl font-semibold leading-tight text-[var(--primary)] sm:text-4xl">
            {country.labels.heroTitle}
          </h1>
          <p className="mt-5 max-w-xl text-base leading-relaxed text-[var(--muted)] sm:text-lg">
            {country.labels.heroSupport}
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link
              href={country.workdaysPath}
              className="inline-flex h-12 items-center justify-center gap-2 rounded-lg bg-[var(--accent)] px-6 font-semibold text-white hover:bg-[var(--accent-hover)]"
            >
              {country.labels.ctaWorkdays}
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href={country.holidaysPath}
              className="inline-flex h-12 items-center justify-center rounded-lg border border-[var(--border)] bg-white/70 px-6 font-semibold text-[var(--primary)]"
            >
              {country.labels.ctaHolidays}
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-16 sm:px-6">
        <h2 className="font-[family-name:var(--font-display)] text-2xl font-semibold text-[var(--primary)]">
          {country.labels.toolsHeading}
        </h2>
        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {tools.map((tool) => (
            <Link
              key={tool.href}
              href={tool.href}
              className="group rounded-2xl border border-[var(--border)] bg-white/75 p-6 transition hover:border-[var(--accent)]"
            >
              <tool.icon className="h-6 w-6 text-[var(--accent)]" aria-hidden />
              <h3 className="mt-4 font-[family-name:var(--font-display)] text-xl font-semibold text-[var(--primary)]">
                {tool.title}
              </h3>
              <p className="mt-2 text-sm text-[var(--muted)]">{tool.description}</p>
              <span className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-[var(--accent)]">
                <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
              </span>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
