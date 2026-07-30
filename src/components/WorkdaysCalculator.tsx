"use client";

import { useState } from "react";
import { DateRangePicker } from "@/components/DateRangePicker";
import { ResultCard } from "@/components/ResultCard";
import { HolidayList } from "@/components/HolidayList";
import { Button } from "@/components/ui/Button";
import { Card, CardDescription, CardTitle } from "@/components/ui/Card";
import { calculateWorkdays } from "@/lib/calculate-workdays";
import { COUNTRIES, type CountryCode } from "@/lib/countries";
import { toISODate } from "@/lib/utils";
import type { WorkdayResult } from "@/types";

function defaultRange() {
  const now = new Date();
  const start = new Date(now.getFullYear(), now.getMonth(), 1);
  const end = new Date(now.getFullYear(), now.getMonth() + 1, 0);
  return { start: toISODate(start), end: toISODate(end) };
}

function compute(
  start: string,
  end: string,
  country: CountryCode,
): { result: WorkdayResult | null; error: string | null } {
  if (!start || !end) {
    return { result: null, error: "—" };
  }
  if (end < start) {
    return { result: null, error: "—" };
  }
  return { result: calculateWorkdays(start, end, country), error: null };
}

type Props = {
  country?: CountryCode;
};

export function WorkdaysCalculator({ country = "no" }: Props) {
  const labels = COUNTRIES[country].labels;
  const defaults = defaultRange();
  const [startDate, setStartDate] = useState(defaults.start);
  const [endDate, setEndDate] = useState(defaults.end);
  const initial = compute(defaults.start, defaults.end, country);
  const [result, setResult] = useState<WorkdayResult | null>(initial.result);
  const [error, setError] = useState<string | null>(null);

  function apply(nextStart: string, nextEnd: string) {
    if (!nextStart || !nextEnd) {
      setError(
        country === "se"
          ? "Välj både från- och tilldatum."
          : country === "dk"
            ? "Vælg både fra- og til-dato."
            : country === "fi"
              ? "Valitse alku- ja loppupäivä."
              : "Velg både fra- og til-dato.",
      );
      setResult(null);
      return;
    }
    if (nextEnd < nextStart) {
      setError(
        country === "se"
          ? "Tilldatum måste vara efter från-datum."
          : country === "dk"
            ? "Til-dato skal være efter fra-dato."
            : country === "fi"
              ? "Loppupäivän on oltava alkupäivän jälkeen."
              : "Til-dato må være etter fra-dato.",
      );
      setResult(null);
      return;
    }
    setError(null);
    setResult(calculateWorkdays(nextStart, nextEnd, country));
  }

  return (
    <div className="grid gap-6">
      <Card>
        <CardTitle>{labels.choosePeriod}</CardTitle>
        <CardDescription>{labels.explanation}</CardDescription>
        <div className="mt-5">
          <DateRangePicker
            startDate={startDate}
            endDate={endDate}
            onStartChange={(value) => {
              setStartDate(value);
              apply(value, endDate);
            }}
            onEndChange={(value) => {
              setEndDate(value);
              apply(startDate, value);
            }}
            fromLabel={labels.fromDate}
            toLabel={labels.toDate}
          />
        </div>
        {error && (
          <p className="mt-3 text-sm font-medium text-rose-600" role="alert">
            {error}
          </p>
        )}
        <div className="mt-5">
          <Button
            type="button"
            onClick={() => apply(startDate, endDate)}
            size="lg"
            className="w-full sm:w-auto"
          >
            {labels.calculateWorkdays}
          </Button>
        </div>
      </Card>

      {result && (
        <>
          <ResultCard result={result} labels={labels} />
          <HolidayList
            holidays={result.holidayList}
            title={labels.redDaysTitle}
            emptyText={labels.noHolidays}
            showWeekendBadge
            weekendBadgeLabel={labels.weekendBadge}
            fixedLabel={labels.fixed}
            movableLabel={labels.movable}
          />
        </>
      )}
    </div>
  );
}
