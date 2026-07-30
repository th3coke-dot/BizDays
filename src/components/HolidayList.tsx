import { getDay, parseISO } from "date-fns";
import type { Holiday } from "@/types";
import { formatDateNO } from "@/lib/utils";
import { Card, CardDescription, CardTitle } from "@/components/ui/Card";

interface HolidayListProps {
  holidays: Holiday[];
  title?: string;
  emptyText?: string;
  showWeekendBadge?: boolean;
  weekendBadgeLabel?: string;
  fixedLabel?: string;
  movableLabel?: string;
  dateLocale?: "nb" | "sv" | "da" | "fi";
}

function isWeekendDate(iso: string) {
  const day = getDay(parseISO(iso));
  return day === 0 || day === 6;
}

export function HolidayList({
  holidays,
  title = "Røde dager i perioden",
  emptyText = "Ingen helligdager i valgt periode.",
  showWeekendBadge = false,
  weekendBadgeLabel = "Faller på helg",
  fixedLabel = "Fast",
  movableLabel = "Bevegelig",
}: HolidayListProps) {
  return (
    <Card>
      <CardTitle>{title}</CardTitle>
      <CardDescription>
        {holidays.length > 0 ? String(holidays.length) : emptyText}
      </CardDescription>

      {holidays.length > 0 && (
        <ul className="mt-5 divide-y divide-[var(--border)]">
          {holidays.map((holiday) => {
            const onWeekend = isWeekendDate(holiday.date);
            return (
              <li
                key={`${holiday.date}-${holiday.name}`}
                className="flex flex-col gap-2 py-3 sm:flex-row sm:items-center sm:justify-between"
              >
                <div>
                  <p className="font-medium text-[var(--primary)]">
                    {holiday.name}
                  </p>
                  <p className="text-sm text-[var(--muted)]">
                    {formatDateNO(holiday.date, "EEEE d. MMMM yyyy")}
                  </p>
                </div>
                <div className="flex flex-wrap gap-2">
                  {showWeekendBadge && onWeekend && (
                    <span className="inline-flex w-fit rounded-md bg-sky-50 px-2.5 py-1 text-xs font-medium text-sky-800">
                      {weekendBadgeLabel}
                    </span>
                  )}
                  <span className="inline-flex w-fit rounded-md bg-rose-50 px-2.5 py-1 text-xs font-medium text-rose-700">
                    {holiday.type === "fixed" ? fixedLabel : movableLabel}
                  </span>
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </Card>
  );
}
