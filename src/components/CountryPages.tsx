import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { HolidayList } from "@/components/HolidayList";
import { WorkdaysCalculator } from "@/components/WorkdaysCalculator";
import { getHolidaysForCountryYear } from "@/data/holidays";
import type { CountryConfig } from "@/lib/countries";
import { formatDateNO } from "@/lib/utils";
import type { HolidayYear } from "@/types";

export function CountryWorkdaysPage({ country }: { country: CountryConfig }) {
  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6 sm:py-12">
      <header className="mb-8">
        <p className="text-sm font-medium text-[var(--muted)]">
          {country.nativeName}
        </p>
        <h1 className="mt-1 font-[family-name:var(--font-display)] text-3xl font-semibold tracking-tight text-[var(--primary)] sm:text-4xl">
          {country.labels.calculateWorkdays}
        </h1>
        <p className="mt-3 max-w-2xl text-[var(--muted)]">
          {country.labels.explanation}
        </p>
      </header>
      <WorkdaysCalculator country={country.code} />
      <aside className="mt-10 text-sm text-[var(--muted)]">
        <Link
          href={country.holidaysPath}
          className="font-medium text-[var(--accent)] underline-offset-2 hover:underline"
        >
          {country.labels.holidays}
        </Link>
      </aside>
    </div>
  );
}

export function CountryHolidaysIndex({ country }: { country: CountryConfig }) {
  const years: HolidayYear[] = [2026, 2027];
  return (
    <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6 sm:py-12">
      <header className="mb-10">
        <p className="text-sm font-medium text-[var(--muted)]">
          {country.nativeName}
        </p>
        <h1 className="mt-1 font-[family-name:var(--font-display)] text-3xl font-semibold tracking-tight text-[var(--primary)] sm:text-4xl">
          {country.labels.holidays}
        </h1>
      </header>

      <div className="mb-8 grid gap-4 sm:grid-cols-2">
        {years.map((year) => {
          const holidays = getHolidaysForCountryYear(country.code, year);
          return (
            <Link
              key={year}
              href={`${country.holidaysPath}/${year}`}
              className="group rounded-2xl border border-[var(--border)] bg-white/80 p-6 transition hover:border-[var(--accent)]"
            >
              <p className="font-[family-name:var(--font-display)] text-3xl font-bold text-[var(--primary)]">
                {year}
              </p>
              <p className="mt-2 text-sm text-[var(--muted)]">
                {holidays.length}
              </p>
              <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-[var(--accent)]">
                {country.labels.yearOverview}
                <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
              </span>
            </Link>
          );
        })}
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {years.map((year) => (
          <HolidayList
            key={year}
            holidays={getHolidaysForCountryYear(country.code, year)}
            title={`${country.labels.holidays} ${year}`}
            showWeekendBadge
            weekendBadgeLabel={country.labels.weekendBadge}
            fixedLabel={country.labels.fixed}
            movableLabel={country.labels.movable}
          />
        ))}
      </div>
    </div>
  );
}

export function CountryHolidaysYear({
  country,
  year,
}: {
  country: CountryConfig;
  year: HolidayYear;
}) {
  const holidays = getHolidaysForCountryYear(country.code, year);
  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6 sm:py-12">
      <nav className="mb-6 text-sm text-[var(--muted)]">
        <Link href={country.holidaysPath} className="hover:text-[var(--accent)]">
          {country.labels.holidays}
        </Link>
        <span className="mx-2">/</span>
        <span>{year}</span>
      </nav>
      <header className="mb-8">
        <h1 className="font-[family-name:var(--font-display)] text-3xl font-semibold tracking-tight text-[var(--primary)] sm:text-4xl">
          {country.labels.holidays} {year}
        </h1>
        <p className="mt-3 text-[var(--muted)]">
          {country.nativeName} · {holidays.length}
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
      <HolidayList
        holidays={holidays}
        title={`${country.labels.holidays} ${year}`}
        showWeekendBadge
        weekendBadgeLabel={country.labels.weekendBadge}
        fixedLabel={country.labels.fixed}
        movableLabel={country.labels.movable}
      />
    </div>
  );
}
