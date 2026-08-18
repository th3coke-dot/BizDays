"use client";

import { useState } from "react";
import { DateRangePicker } from "@/components/DateRangePicker";
import { GermanStateSelect } from "@/components/GermanStateSelect";
import { ResultCard } from "@/components/ResultCard";
import { HolidayList } from "@/components/HolidayList";
import { Button } from "@/components/ui/Button";
import { Card, CardDescription, CardTitle } from "@/components/ui/Card";
import { useGermanState } from "@/components/useGermanState";
import { calculateWorkdays } from "@/lib/calculate-workdays";
import { COUNTRIES, type AppLanguage, type CountryCode } from "@/lib/countries";
import type { UiLabels } from "@/lib/i18n";
import { toISODate } from "@/lib/utils";
import type { WorkdayResult } from "@/types";

function defaultRange() {
  const now = new Date();
  const start = new Date(now.getFullYear(), now.getMonth(), 1);
  const end = new Date(now.getFullYear(), now.getMonth() + 1, 0);
  return { start: toISODate(start), end: toISODate(end) };
}

type Props = {
  country?: CountryCode;
  labels?: UiLabels;
  lang?: AppLanguage;
};

export function WorkdaysCalculator({ country = "no", labels, lang = "native" }: Props) {
  const l = labels ?? COUNTRIES[country].labels;
  const defaults = defaultRange();
  const [startDate, setStartDate] = useState(defaults.start);
  const [endDate, setEndDate] = useState(defaults.end);
  const [germanState, setGermanState] = useGermanState();
  const [result, setResult] = useState<WorkdayResult | null>(() =>
    calculateWorkdays(
      defaults.start,
      defaults.end,
      country,
      country === "de" ? germanState || undefined : undefined,
    ),
  );
  const [error, setError] = useState<string | null>(null);
  const showGermanStates = country === "de";

  function apply(
    nextStart: string,
    nextEnd: string,
    nextRegion = germanState,
  ) {
    if (!nextStart || !nextEnd) {
      setError(`${l.fromDate} / ${l.toDate}`);
      setResult(null);
      return;
    }
    if (nextEnd < nextStart) {
      setError(`${l.toDate} → ${l.fromDate}`);
      setResult(null);
      return;
    }
    setError(null);
    setResult(
      calculateWorkdays(
        nextStart,
        nextEnd,
        country,
        nextRegion || undefined,
      ),
    );
  }

  return (
    <div className="grid gap-6">
      <Card>
        <CardTitle>{l.choosePeriod}</CardTitle>
        <CardDescription>{l.explanation}</CardDescription>
        <div className="mt-5 grid gap-4">
          {showGermanStates && (
            <GermanStateSelect
              value={germanState}
              onChange={(value) => {
                setGermanState(value);
                apply(startDate, endDate, value);
              }}
              labels={l}
              lang={lang}
            />
          )}
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
            fromLabel={l.fromDate}
            toLabel={l.toDate}
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
            {l.calculateWorkdays}
          </Button>
        </div>
      </Card>

      {result && (
        <>
          <ResultCard result={result} labels={l} />
          <HolidayList
            holidays={result.holidayList}
            title={l.redDaysTitle}
            emptyText={l.noHolidays}
            showWeekendBadge
            weekendBadgeLabel={l.weekendBadge}
            fixedLabel={l.fixed}
            movableLabel={l.movable}
          />
        </>
      )}
    </div>
  );
}
