import type { Holiday } from "@/types";
import { formatDateNO } from "@/lib/utils";
import { Card, CardDescription, CardTitle } from "@/components/ui/Card";

interface HolidayListProps {
  holidays: Holiday[];
  title?: string;
  emptyText?: string;
}

export function HolidayList({
  holidays,
  title = "Røde dager i perioden",
  emptyText = "Ingen helligdager i valgt periode.",
}: HolidayListProps) {
  return (
    <Card>
      <CardTitle>{title}</CardTitle>
      <CardDescription>
        {holidays.length > 0
          ? `${holidays.length} helligdag${holidays.length === 1 ? "" : "er"}`
          : emptyText}
      </CardDescription>

      {holidays.length > 0 && (
        <ul className="mt-5 divide-y divide-[var(--border)]">
          {holidays.map((holiday) => (
            <li
              key={`${holiday.date}-${holiday.name}`}
              className="flex flex-col gap-1 py-3 sm:flex-row sm:items-center sm:justify-between"
            >
              <div>
                <p className="font-medium text-[var(--primary)]">
                  {holiday.name}
                </p>
                <p className="text-sm text-[var(--muted)]">
                  {formatDateNO(holiday.date, "EEEE d. MMMM yyyy")}
                </p>
              </div>
              <span className="inline-flex w-fit rounded-md bg-rose-50 px-2.5 py-1 text-xs font-medium text-rose-700">
                {holiday.type === "fixed" ? "Fast" : "Bevegelig"}
              </span>
            </li>
          ))}
        </ul>
      )}
    </Card>
  );
}
