"use client";

import { useState } from "react";
import { DateRangePicker } from "@/components/DateRangePicker";
import { ResultCard } from "@/components/ResultCard";
import { HolidayList } from "@/components/HolidayList";
import { Button } from "@/components/ui/Button";
import { Card, CardDescription, CardTitle } from "@/components/ui/Card";
import { calculateWorkdays } from "@/lib/calculate-workdays";
import { toISODate } from "@/lib/utils";
import type { WorkdayResult } from "@/types";

function defaultRange() {
  const now = new Date();
  const start = new Date(now.getFullYear(), now.getMonth(), 1);
  const end = new Date(now.getFullYear(), now.getMonth() + 1, 0);
  return { start: toISODate(start), end: toISODate(end) };
}

function compute(start: string, end: string): {
  result: WorkdayResult | null;
  error: string | null;
} {
  if (!start || !end) {
    return { result: null, error: "Velg både fra- og til-dato." };
  }
  if (end < start) {
    return { result: null, error: "Til-dato må være etter fra-dato." };
  }
  return { result: calculateWorkdays(start, end), error: null };
}

export function WorkdaysCalculator() {
  const defaults = defaultRange();
  const [startDate, setStartDate] = useState(defaults.start);
  const [endDate, setEndDate] = useState(defaults.end);
  const initial = compute(defaults.start, defaults.end);
  const [result, setResult] = useState<WorkdayResult | null>(initial.result);
  const [error, setError] = useState<string | null>(initial.error);

  function apply(nextStart: string, nextEnd: string) {
    const next = compute(nextStart, nextEnd);
    setError(next.error);
    setResult(next.result);
  }

  return (
    <div className="grid gap-6">
      <Card>
        <CardTitle>Velg periode</CardTitle>
        <CardDescription>
          Velg fra- og til-dato. Helger og norske helligdager trekkes fra.
        </CardDescription>
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
            Beregn arbeidsdager
          </Button>
        </div>
      </Card>

      {result && (
        <>
          <ResultCard result={result} />
          <HolidayList
            holidays={result.holidayList}
            title="Røde dager trukket fra"
            emptyText="Ingen helligdager i valgt periode."
            showWeekendBadge
          />
        </>
      )}
    </div>
  );
}
