import type { Holiday, HolidayYear } from "@/types";

/** UK bank holidays (England & Wales baseline). */
export const holidaysUK: Record<HolidayYear, Holiday[]> = {
  2025: [
    { date: "2025-01-01", name: "New Year's Day", type: "fixed" },
    { date: "2025-04-18", name: "Good Friday", type: "movable" },
    { date: "2025-04-21", name: "Easter Monday", type: "movable" },
    { date: "2025-05-05", name: "Early May bank holiday", type: "movable" },
    { date: "2025-05-26", name: "Spring bank holiday", type: "movable" },
    { date: "2025-08-25", name: "Summer bank holiday", type: "movable" },
    { date: "2025-12-25", name: "Christmas Day", type: "fixed" },
    { date: "2025-12-26", name: "Boxing Day", type: "fixed" },
  ],
  2026: [
    { date: "2026-01-01", name: "New Year's Day", type: "fixed" },
    { date: "2026-04-03", name: "Good Friday", type: "movable" },
    { date: "2026-04-06", name: "Easter Monday", type: "movable" },
    { date: "2026-05-04", name: "Early May bank holiday", type: "movable" },
    { date: "2026-05-25", name: "Spring bank holiday", type: "movable" },
    { date: "2026-08-31", name: "Summer bank holiday", type: "movable" },
    { date: "2026-12-25", name: "Christmas Day", type: "fixed" },
    { date: "2026-12-28", name: "Boxing Day (substitute)", type: "fixed" },
  ],
  2027: [
    { date: "2027-01-01", name: "New Year's Day", type: "fixed" },
    { date: "2027-03-26", name: "Good Friday", type: "movable" },
    { date: "2027-03-29", name: "Easter Monday", type: "movable" },
    { date: "2027-05-03", name: "Early May bank holiday", type: "movable" },
    { date: "2027-05-31", name: "Spring bank holiday", type: "movable" },
    { date: "2027-08-30", name: "Summer bank holiday", type: "movable" },
    { date: "2027-12-27", name: "Christmas Day (substitute)", type: "fixed" },
    { date: "2027-12-28", name: "Boxing Day (substitute)", type: "fixed" },
  ],
};

export function getHolidaysUKForYear(year: number): Holiday[] {
  if (year === 2025 || year === 2026 || year === 2027) return holidaysUK[year];
  return [];
}
export function getAllHolidaysUK(): Holiday[] {
  return ([2025, 2026, 2027] as HolidayYear[]).flatMap((y) => holidaysUK[y]);
}
