import type { Holiday, HolidayYear } from "@/types";

/** German nationwide public holidays (federal). */
export const holidaysDE: Record<HolidayYear, Holiday[]> = {
  2025: [
    { date: "2025-01-01", name: "Neujahr", type: "fixed" },
    { date: "2025-04-18", name: "Karfreitag", type: "movable" },
    { date: "2025-04-21", name: "Ostermontag", type: "movable" },
    { date: "2025-05-01", name: "Tag der Arbeit", type: "fixed" },
    { date: "2025-05-29", name: "Christi Himmelfahrt", type: "movable" },
    { date: "2025-06-09", name: "Pfingstmontag", type: "movable" },
    { date: "2025-10-03", name: "Tag der Deutschen Einheit", type: "fixed" },
    { date: "2025-12-25", name: "1. Weihnachtstag", type: "fixed" },
    { date: "2025-12-26", name: "2. Weihnachtstag", type: "fixed" },
  ],
  2026: [
    { date: "2026-01-01", name: "Neujahr", type: "fixed" },
    { date: "2026-04-03", name: "Karfreitag", type: "movable" },
    { date: "2026-04-06", name: "Ostermontag", type: "movable" },
    { date: "2026-05-01", name: "Tag der Arbeit", type: "fixed" },
    { date: "2026-05-14", name: "Christi Himmelfahrt", type: "movable" },
    { date: "2026-05-25", name: "Pfingstmontag", type: "movable" },
    { date: "2026-10-03", name: "Tag der Deutschen Einheit", type: "fixed" },
    { date: "2026-12-25", name: "1. Weihnachtstag", type: "fixed" },
    { date: "2026-12-26", name: "2. Weihnachtstag", type: "fixed" },
  ],
  2027: [
    { date: "2027-01-01", name: "Neujahr", type: "fixed" },
    { date: "2027-03-26", name: "Karfreitag", type: "movable" },
    { date: "2027-03-29", name: "Ostermontag", type: "movable" },
    { date: "2027-05-01", name: "Tag der Arbeit", type: "fixed" },
    { date: "2027-05-06", name: "Christi Himmelfahrt", type: "movable" },
    { date: "2027-05-17", name: "Pfingstmontag", type: "movable" },
    { date: "2027-10-03", name: "Tag der Deutschen Einheit", type: "fixed" },
    { date: "2027-12-25", name: "1. Weihnachtstag", type: "fixed" },
    { date: "2027-12-26", name: "2. Weihnachtstag", type: "fixed" },
  ],
};

export function getHolidaysDEForYear(year: number): Holiday[] {
  if (year === 2025 || year === 2026 || year === 2027) return holidaysDE[year];
  return [];
}
export function getAllHolidaysDE(): Holiday[] {
  return ([2025, 2026, 2027] as HolidayYear[]).flatMap((y) => holidaysDE[y]);
}
