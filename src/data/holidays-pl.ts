import type { Holiday, HolidayYear } from "@/types";

/** Polish public holidays. */
export const holidaysPL: Record<HolidayYear, Holiday[]> = {
  2025: [
    { date: "2025-01-01", name: "Nowy Rok", type: "fixed" },
    { date: "2025-01-06", name: "Trzech Króli", type: "fixed" },
    { date: "2025-04-20", name: "Wielkanoc", type: "movable" },
    { date: "2025-04-21", name: "Poniedziałek Wielkanocny", type: "movable" },
    { date: "2025-05-01", name: "Święto Pracy", type: "fixed" },
    { date: "2025-05-03", name: "Święto Konstytucji 3 Maja", type: "fixed" },
    { date: "2025-06-19", name: "Boże Ciało", type: "movable" },
    { date: "2025-08-15", name: "Wniebowzięcie NMP", type: "fixed" },
    { date: "2025-11-01", name: "Wszystkich Świętych", type: "fixed" },
    { date: "2025-11-11", name: "Święto Niepodległości", type: "fixed" },
    { date: "2025-12-25", name: "Boże Narodzenie", type: "fixed" },
    { date: "2025-12-26", name: "2. dzień Bożego Narodzenia", type: "fixed" },
  ],
  2026: [
    { date: "2026-01-01", name: "Nowy Rok", type: "fixed" },
    { date: "2026-01-06", name: "Trzech Króli", type: "fixed" },
    { date: "2026-04-05", name: "Wielkanoc", type: "movable" },
    { date: "2026-04-06", name: "Poniedziałek Wielkanocny", type: "movable" },
    { date: "2026-05-01", name: "Święto Pracy", type: "fixed" },
    { date: "2026-05-03", name: "Święto Konstytucji 3 Maja", type: "fixed" },
    { date: "2026-06-04", name: "Boże Ciało", type: "movable" },
    { date: "2026-08-15", name: "Wniebowzięcie NMP", type: "fixed" },
    { date: "2026-11-01", name: "Wszystkich Świętych", type: "fixed" },
    { date: "2026-11-11", name: "Święto Niepodległości", type: "fixed" },
    { date: "2026-12-25", name: "Boże Narodzenie", type: "fixed" },
    { date: "2026-12-26", name: "2. dzień Bożego Narodzenia", type: "fixed" },
  ],
  2027: [
    { date: "2027-01-01", name: "Nowy Rok", type: "fixed" },
    { date: "2027-01-06", name: "Trzech Króli", type: "fixed" },
    { date: "2027-03-28", name: "Wielkanoc", type: "movable" },
    { date: "2027-03-29", name: "Poniedziałek Wielkanocny", type: "movable" },
    { date: "2027-05-01", name: "Święto Pracy", type: "fixed" },
    { date: "2027-05-03", name: "Święto Konstytucji 3 Maja", type: "fixed" },
    { date: "2027-05-27", name: "Boże Ciało", type: "movable" },
    { date: "2027-08-15", name: "Wniebowzięcie NMP", type: "fixed" },
    { date: "2027-11-01", name: "Wszystkich Świętych", type: "fixed" },
    { date: "2027-11-11", name: "Święto Niepodległości", type: "fixed" },
    { date: "2027-12-25", name: "Boże Narodzenie", type: "fixed" },
    { date: "2027-12-26", name: "2. dzień Bożego Narodzenia", type: "fixed" },
  ],
};

export function getHolidaysPLForYear(year: number): Holiday[] {
  if (year === 2025 || year === 2026 || year === 2027) return holidaysPL[year];
  return [];
}
export function getAllHolidaysPL(): Holiday[] {
  return ([2025, 2026, 2027] as HolidayYear[]).flatMap((y) => holidaysPL[y]);
}
