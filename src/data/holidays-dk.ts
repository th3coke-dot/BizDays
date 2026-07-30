import type { Holiday, HolidayYear } from "@/types";

/**
 * Danske helligdage (officielle).
 * Store bededag er afskaffet fra 2024 og medtages ikke.
 */
export const holidaysDK: Record<HolidayYear, Holiday[]> = {
  2025: [
    { date: "2025-01-01", name: "Nytårsdag", type: "fixed" },
    { date: "2025-04-17", name: "Skærtorsdag", type: "movable" },
    { date: "2025-04-18", name: "Langfredag", type: "movable" },
    { date: "2025-04-20", name: "Påskedag", type: "movable" },
    { date: "2025-04-21", name: "Anden påskedag", type: "movable" },
    { date: "2025-05-29", name: "Kristi himmelfartsdag", type: "movable" },
    { date: "2025-06-08", name: "Pinsedag", type: "movable" },
    { date: "2025-06-09", name: "Anden pinsedag", type: "movable" },
    { date: "2025-12-25", name: "Juledag", type: "fixed" },
    { date: "2025-12-26", name: "Anden juledag", type: "fixed" },
  ],
  2026: [
    { date: "2026-01-01", name: "Nytårsdag", type: "fixed" },
    { date: "2026-04-02", name: "Skærtorsdag", type: "movable" },
    { date: "2026-04-03", name: "Langfredag", type: "movable" },
    { date: "2026-04-05", name: "Påskedag", type: "movable" },
    { date: "2026-04-06", name: "Anden påskedag", type: "movable" },
    { date: "2026-05-14", name: "Kristi himmelfartsdag", type: "movable" },
    { date: "2026-05-24", name: "Pinsedag", type: "movable" },
    { date: "2026-05-25", name: "Anden pinsedag", type: "movable" },
    { date: "2026-12-25", name: "Juledag", type: "fixed" },
    { date: "2026-12-26", name: "Anden juledag", type: "fixed" },
  ],
  2027: [
    { date: "2027-01-01", name: "Nytårsdag", type: "fixed" },
    { date: "2027-03-25", name: "Skærtorsdag", type: "movable" },
    { date: "2027-03-26", name: "Langfredag", type: "movable" },
    { date: "2027-03-28", name: "Påskedag", type: "movable" },
    { date: "2027-03-29", name: "Anden påskedag", type: "movable" },
    { date: "2027-05-06", name: "Kristi himmelfartsdag", type: "movable" },
    { date: "2027-05-16", name: "Pinsedag", type: "movable" },
    { date: "2027-05-17", name: "Anden pinsedag", type: "movable" },
    { date: "2027-12-25", name: "Juledag", type: "fixed" },
    { date: "2027-12-26", name: "Anden juledag", type: "fixed" },
  ],
};

export function getHolidaysDKForYear(year: number): Holiday[] {
  if (year === 2025 || year === 2026 || year === 2027) return holidaysDK[year];
  return [];
}

export function getAllHolidaysDK(): Holiday[] {
  return (Object.keys(holidaysDK) as unknown as HolidayYear[]).flatMap(
    (y) => holidaysDK[y],
  );
}
