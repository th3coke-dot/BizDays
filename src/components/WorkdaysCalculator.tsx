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

export function WorkdaysCalculator() {
  const defaults = defaultRange();
  const [startDate, setStartDate] = useState(defaults.start);
  const [endDate, setEndDate] = useState(defaults.end);
  const [result, setResult] = useState<WorkdayResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  function handleCalculate() {
    if (!startDate || !endDate) {
      setError("Velg både fra- og til-dato.");
      setResult(null);
      return;
    }
    if (endDate < startDate) {
      setError("Til-dato må være etter fra-dato.");
      setResult(null);
      return;
    }
    setError(null);
    setResult(calculateWorkdays(startDate, endDate));
  }

  return (
    <div className="grid gap-6">
      <Card>
        <CardTitle>Velg periode</CardTitle>
        <CardDescription>
          Tell arbeidsdager mellom to datoer. Helligdager og helger trekkes fra.
        </CardDescription>
        <div className="mt-5">
          <DateRangePicker
            startDate={startDate}
            endDate={endDate}
            onStartChange={setStartDate}
            onEndChange={setEndDate}
          />
        </div>
        {error && (
          <p className="mt-3 text-sm font-medium text-rose-600" role="alert">
            {error}
          </p>
        )}
        <div className="mt-5">
          <Button type="button" onClick={handleCalculate} size="lg">
            Beregn arbeidsdager
          </Button>
        </div>
      </Card>

      {result && (
        <>
          <ResultCard result={result} />
          <HolidayList holidays={result.holidayList} />
        </>
      )}
    </div>
  );
}
