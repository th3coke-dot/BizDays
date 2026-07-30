import type { Holiday, HolidayYear } from "@/types";

/**
 * Svenska röda dagar / helgdagar.
 * Midsommarafton och midsommardagen ingår (vanliga ledighetsdagar).
 */
export const holidaysSE: Record<HolidayYear, Holiday[]> = {
  2025: [
    { date: "2025-01-01", name: "Nyårsdagen", type: "fixed" },
    { date: "2025-01-06", name: "Trettondedag jul", type: "fixed" },
    { date: "2025-04-18", name: "Långfredagen", type: "movable" },
    { date: "2025-04-20", name: "Påskdagen", type: "movable" },
    { date: "2025-04-21", name: "Annandag påsk", type: "movable" },
    { date: "2025-05-01", name: "Första maj", type: "fixed" },
    { date: "2025-05-29", name: "Kristi himmelsfärdsdag", type: "movable" },
    { date: "2025-06-06", name: "Sveriges nationaldag", type: "fixed" },
    { date: "2025-06-20", name: "Midsommarafton", type: "movable" },
    { date: "2025-06-21", name: "Midsommardagen", type: "movable" },
    { date: "2025-11-01", name: "Alla helgons dag", type: "movable" },
    { date: "2025-12-25", name: "Juldagen", type: "fixed" },
    { date: "2025-12-26", name: "Annandag jul", type: "fixed" },
  ],
  2026: [
    { date: "2026-01-01", name: "Nyårsdagen", type: "fixed" },
    { date: "2026-01-06", name: "Trettondedag jul", type: "fixed" },
    { date: "2026-04-03", name: "Långfredagen", type: "movable" },
    { date: "2026-04-05", name: "Påskdagen", type: "movable" },
    { date: "2026-04-06", name: "Annandag påsk", type: "movable" },
    { date: "2026-05-01", name: "Första maj", type: "fixed" },
    { date: "2026-05-14", name: "Kristi himmelsfärdsdag", type: "movable" },
    { date: "2026-06-06", name: "Sveriges nationaldag", type: "fixed" },
    { date: "2026-06-19", name: "Midsommarafton", type: "movable" },
    { date: "2026-06-20", name: "Midsommardagen", type: "movable" },
    { date: "2026-10-31", name: "Alla helgons dag", type: "movable" },
    { date: "2026-12-25", name: "Juldagen", type: "fixed" },
    { date: "2026-12-26", name: "Annandag jul", type: "fixed" },
  ],
  2027: [
    { date: "2027-01-01", name: "Nyårsdagen", type: "fixed" },
    { date: "2027-01-06", name: "Trettondedag jul", type: "fixed" },
    { date: "2027-03-26", name: "Långfredagen", type: "movable" },
    { date: "2027-03-28", name: "Påskdagen", type: "movable" },
    { date: "2027-03-29", name: "Annandag påsk", type: "movable" },
    { date: "2027-05-01", name: "Första maj", type: "fixed" },
    { date: "2027-05-06", name: "Kristi himmelsfärdsdag", type: "movable" },
    { date: "2027-06-06", name: "Sveriges nationaldag", type: "fixed" },
    { date: "2027-06-25", name: "Midsommarafton", type: "movable" },
    { date: "2027-06-26", name: "Midsommardagen", type: "movable" },
    { date: "2027-11-06", name: "Alla helgons dag", type: "movable" },
    { date: "2027-12-25", name: "Juldagen", type: "fixed" },
    { date: "2027-12-26", name: "Annandag jul", type: "fixed" },
  ],
};

export function getHolidaysSEForYear(year: number): Holiday[] {
  if (year === 2025 || year === 2026 || year === 2027) return holidaysSE[year];
  return [];
}

export function getAllHolidaysSE(): Holiday[] {
  return (Object.keys(holidaysSE) as unknown as HolidayYear[]).flatMap(
    (y) => holidaysSE[y],
  );
}
