"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { GermanStateSelect } from "@/components/GermanStateSelect";
import { HolidayList } from "@/components/HolidayList";
import { useGermanState } from "@/components/useGermanState";
import { GERMAN_STATES, type GermanStateCode } from "@/data/holidays-de";
import { getHolidaysForCountryYear } from "@/data/holidays";
import type { AppLanguage, LocalizedCountry } from "@/lib/countries";
import { formatDateNO } from "@/lib/utils";
import type { HolidayYear } from "@/types";

const YEARS: HolidayYear[] = [2026, 2027];

function stateLabel(state: GermanStateCode | "", lang: AppLanguage) {
  if (!state) return "";
  const found = GERMAN_STATES.find((item) => item.id === state);
  if (!found) return "";
  return lang === "en" ? found.nameEn : found.name;
}

function holidaysTitle(
  country: LocalizedCountry,
  year: HolidayYear,
  state: GermanStateCode | "",
) {
  const name = stateLabel(state, country.lang);
  return name
    ? `${country.labels.holidays} ${year} · ${name}`
    : `${country.labels.holidays} ${year}`;
}

export function GermanHolidaysIndex({ country }: { country: LocalizedCountry }) {
  const [germanState, setGermanState] = useGermanState();
  const region = germanState || undefined;

  return (
    <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6 sm:py-12">
      <header className="mb-10">
        <p className="text-sm font-medium text-[var(--muted)]">
          {country.lang === "en" ? country.name : country.nativeName}
        </p>
        <h1 className="mt-1 font-[family-name:var(--font-display)] text-3xl font-semibold tracking-tight text-[var(--primary)] sm:text-4xl">
          {country.labels.holidays}
        </h1>
        <div className="mt-6 max-w-md">
          <GermanStateSelect
            value={germanState}
            onChange={setGermanState}
            labels={country.labels}
            lang={country.lang}
          />
        </div>
      </header>

      <div className="mb-8 grid gap-4 sm:grid-cols-2">
        {YEARS.map((year) => {
          const holidays = getHolidaysForCountryYear(country.code, year, region);
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
                {holidays.length} {country.labels.holidayCount}
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
        {YEARS.map((year) => (
          <HolidayList
            key={year}
            holidays={getHolidaysForCountryYear(country.code, year, region)}
            title={holidaysTitle(country, year, germanState)}
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

export function GermanHolidaysYear({
  country,
  year,
}: {
  country: LocalizedCountry;
  year: HolidayYear;
}) {
  const [germanState, setGermanState] = useGermanState();
  const holidays = getHolidaysForCountryYear(
    country.code,
    year,
    germanState || undefined,
  );

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
          {holidaysTitle(country, year, germanState)}
        </h1>
        <div className="mt-6 max-w-md">
          <GermanStateSelect
            value={germanState}
            onChange={setGermanState}
            labels={country.labels}
            lang={country.lang}
          />
        </div>
      </header>
      <div className="mb-6 grid grid-cols-2 gap-2 sm:grid-cols-4">
        {holidays.map((holiday) => (
          <div
            key={`${holiday.date}-${holiday.name}`}
            className="rounded-xl border border-[var(--border)] bg-white/75 px-3 py-4 text-center"
          >
            <p className="text-xs uppercase tracking-wide text-[var(--muted)]">
              {formatDateNO(holiday.date, "EEEE")}
            </p>
            <p className="mt-1 font-[family-name:var(--font-display)] text-2xl font-semibold text-[var(--primary)]">
              {formatDateNO(holiday.date, "d. MMM")}
            </p>
            <p className="mt-2 text-xs font-medium text-[var(--muted)]">
              {holiday.name}
            </p>
          </div>
        ))}
      </div>
      <HolidayList
        holidays={holidays}
        title={holidaysTitle(country, year, germanState)}
        showWeekendBadge
        weekendBadgeLabel={country.labels.weekendBadge}
        fixedLabel={country.labels.fixed}
        movableLabel={country.labels.movable}
      />
    </div>
  );
}
