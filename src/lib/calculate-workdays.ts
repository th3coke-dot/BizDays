import {
  eachDayOfInterval,
  getDay,
  isSaturday,
  isSunday,
  parseISO,
  startOfDay,
} from "date-fns";
import {
  getAllHolidaysForCountry,
  getHolidaysForCountryYear,
} from "@/data/holidays";
import type { CountryCode } from "@/lib/countries";
import type { Holiday, WorkdayResult } from "@/types";

function holidayMap(holidays: Holiday[]): Map<string, Holiday> {
  return new Map(holidays.map((h) => [h.date, h]));
}

export function isWeekend(date: Date): boolean {
  return isSaturday(date) || isSunday(date);
}

function toDateKey(date: Date): string {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

export function isHoliday(
  date: Date | string,
  country: CountryCode = "no",
): Holiday | undefined {
  const iso = typeof date === "string" ? date.slice(0, 10) : toDateKey(date);
  return holidayMap(getAllHolidaysForCountry(country)).get(iso);
}

/**
 * Beregner arbeidsdager mellom to datoer (inkluderende).
 * Arbeidsdag = hverdag som ikke er helligdag i valgt land.
 */
export function calculateWorkdays(
  startDate: string | Date,
  endDate: string | Date,
  country: CountryCode = "no",
): WorkdayResult {
  const start = startOfDay(
    typeof startDate === "string" ? parseISO(startDate) : startDate,
  );
  const end = startOfDay(
    typeof endDate === "string" ? parseISO(endDate) : endDate,
  );

  if (end < start) {
    return {
      workdays: 0,
      holidays: 0,
      weekendDays: 0,
      totalDays: 0,
      holidayList: [],
    };
  }

  const years = new Set<number>();
  for (let y = start.getFullYear(); y <= end.getFullYear(); y++) {
    years.add(y);
  }

  const relevantHolidays = Array.from(years).flatMap((y) =>
    getHolidaysForCountryYear(country, y),
  );
  const map = holidayMap(relevantHolidays);

  const days = eachDayOfInterval({ start, end });
  let workdays = 0;
  let weekendDays = 0;
  let holidays = 0;
  const holidayList: Holiday[] = [];

  for (const day of days) {
    const key = toDateKey(day);
    const holiday = map.get(key);
    const weekend = getDay(day) === 0 || getDay(day) === 6;

    if (holiday) {
      holidays += 1;
      holidayList.push(holiday);
      if (weekend) weekendDays += 1;
    } else if (weekend) {
      weekendDays += 1;
    } else {
      workdays += 1;
    }
  }

  return {
    workdays,
    holidays,
    weekendDays,
    totalDays: days.length,
    holidayList,
  };
}
