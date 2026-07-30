import type { Holiday, HolidayYear } from "@/types";

/**
 * Offisielle norske helligdager (røde dager).
 * Bevegelige datoer er basert på påskedag for hvert år.
 */
export const holidaysNO: Record<HolidayYear, Holiday[]> = {
  2025: [
    { date: "2025-01-01", name: "Nyttårsdag", type: "fixed" },
    { date: "2025-04-17", name: "Skjærtorsdag", type: "movable" },
    { date: "2025-04-18", name: "Langfredag", type: "movable" },
    { date: "2025-04-20", name: "Første påskedag", type: "movable" },
    { date: "2025-04-21", name: "Andre påskedag", type: "movable" },
    { date: "2025-05-01", name: "Arbeidernes dag", type: "fixed" },
    { date: "2025-05-17", name: "Grunnlovsdag", type: "fixed" },
    { date: "2025-05-29", name: "Kristi himmelfartsdag", type: "movable" },
    { date: "2025-06-08", name: "Første pinsedag", type: "movable" },
    { date: "2025-06-09", name: "Andre pinsedag", type: "movable" },
    { date: "2025-12-25", name: "Første juledag", type: "fixed" },
    { date: "2025-12-26", name: "Andre juledag", type: "fixed" },
  ],
  2026: [
    { date: "2026-01-01", name: "Nyttårsdag", type: "fixed" },
    { date: "2026-04-02", name: "Skjærtorsdag", type: "movable" },
    { date: "2026-04-03", name: "Langfredag", type: "movable" },
    { date: "2026-04-05", name: "Første påskedag", type: "movable" },
    { date: "2026-04-06", name: "Andre påskedag", type: "movable" },
    { date: "2026-05-01", name: "Arbeidernes dag", type: "fixed" },
    { date: "2026-05-14", name: "Kristi himmelfartsdag", type: "movable" },
    { date: "2026-05-17", name: "Grunnlovsdag", type: "fixed" },
    { date: "2026-05-24", name: "Første pinsedag", type: "movable" },
    { date: "2026-05-25", name: "Andre pinsedag", type: "movable" },
    { date: "2026-12-25", name: "Første juledag", type: "fixed" },
    { date: "2026-12-26", name: "Andre juledag", type: "fixed" },
  ],
  2027: [
    { date: "2027-01-01", name: "Nyttårsdag", type: "fixed" },
    { date: "2027-03-25", name: "Skjærtorsdag", type: "movable" },
    { date: "2027-03-26", name: "Langfredag", type: "movable" },
    { date: "2027-03-28", name: "Første påskedag", type: "movable" },
    { date: "2027-03-29", name: "Andre påskedag", type: "movable" },
    { date: "2027-05-01", name: "Arbeidernes dag", type: "fixed" },
    { date: "2027-05-06", name: "Kristi himmelfartsdag", type: "movable" },
    // Andre pinsedag faller på samme dag som 17. mai i 2027
    { date: "2027-05-16", name: "Første pinsedag", type: "movable" },
    {
      date: "2027-05-17",
      name: "Grunnlovsdag / Andre pinsedag",
      type: "fixed",
    },
    { date: "2027-12-25", name: "Første juledag", type: "fixed" },
    { date: "2027-12-26", name: "Andre juledag", type: "fixed" },
  ],
};

export const HOLIDAY_YEARS: HolidayYear[] = [2025, 2026, 2027];

export function getHolidaysForYear(year: number): Holiday[] {
  if (year === 2025 || year === 2026 || year === 2027) {
    return holidaysNO[year];
  }
  return [];
}

export function getAllHolidays(): Holiday[] {
  return HOLIDAY_YEARS.flatMap((year) => holidaysNO[year]);
}
