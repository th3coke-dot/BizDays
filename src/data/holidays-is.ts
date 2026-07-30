import type { Holiday, HolidayYear } from "@/types";

/** Icelandic public holidays. */
export const holidaysIS: Record<HolidayYear, Holiday[]> = {
  2025: [
    { date: "2025-01-01", name: "Nýársdagur", type: "fixed" },
    { date: "2025-04-17", name: "Skírdagur", type: "movable" },
    { date: "2025-04-18", name: "Föstudagurinn langi", type: "movable" },
    { date: "2025-04-20", name: "Páskadagur", type: "movable" },
    { date: "2025-04-21", name: "Annar í páskum", type: "movable" },
    { date: "2025-04-24", name: "Sumardagurinn fyrsti", type: "movable" },
    { date: "2025-05-01", name: "Verkalýðsdagurinn", type: "fixed" },
    { date: "2025-05-29", name: "Uppstigningardagur", type: "movable" },
    { date: "2025-06-08", name: "Hvítasunnudagur", type: "movable" },
    { date: "2025-06-09", name: "Annar í hvítasunnu", type: "movable" },
    { date: "2025-06-17", name: "Þjóðhátíðardagurinn", type: "fixed" },
    { date: "2025-08-04", name: "Frídagur verslunarmanna", type: "movable" },
    { date: "2025-12-24", name: "Aðfangadagur", type: "fixed" },
    { date: "2025-12-25", name: "Jóladagur", type: "fixed" },
    { date: "2025-12-26", name: "Annar í jólum", type: "fixed" },
    { date: "2025-12-31", name: "Gamlársdagur", type: "fixed" },
  ],
  2026: [
    { date: "2026-01-01", name: "Nýársdagur", type: "fixed" },
    { date: "2026-04-02", name: "Skírdagur", type: "movable" },
    { date: "2026-04-03", name: "Föstudagurinn langi", type: "movable" },
    { date: "2026-04-05", name: "Páskadagur", type: "movable" },
    { date: "2026-04-06", name: "Annar í páskum", type: "movable" },
    { date: "2026-04-23", name: "Sumardagurinn fyrsti", type: "movable" },
    { date: "2026-05-01", name: "Verkalýðsdagurinn", type: "fixed" },
    { date: "2026-05-14", name: "Uppstigningardagur", type: "movable" },
    { date: "2026-05-24", name: "Hvítasunnudagur", type: "movable" },
    { date: "2026-05-25", name: "Annar í hvítasunnu", type: "movable" },
    { date: "2026-06-17", name: "Þjóðhátíðardagurinn", type: "fixed" },
    { date: "2026-08-03", name: "Frídagur verslunarmanna", type: "movable" },
    { date: "2026-12-24", name: "Aðfangadagur", type: "fixed" },
    { date: "2026-12-25", name: "Jóladagur", type: "fixed" },
    { date: "2026-12-26", name: "Annar í jólum", type: "fixed" },
    { date: "2026-12-31", name: "Gamlársdagur", type: "fixed" },
  ],
  2027: [
    { date: "2027-01-01", name: "Nýársdagur", type: "fixed" },
    { date: "2027-03-25", name: "Skírdagur", type: "movable" },
    { date: "2027-03-26", name: "Föstudagurinn langi", type: "movable" },
    { date: "2027-03-28", name: "Páskadagur", type: "movable" },
    { date: "2027-03-29", name: "Annar í páskum", type: "movable" },
    { date: "2027-04-22", name: "Sumardagurinn fyrsti", type: "movable" },
    { date: "2027-05-01", name: "Verkalýðsdagurinn", type: "fixed" },
    { date: "2027-05-06", name: "Uppstigningardagur", type: "movable" },
    { date: "2027-05-16", name: "Hvítasunnudagur", type: "movable" },
    { date: "2027-05-17", name: "Annar í hvítasunnu", type: "movable" },
    { date: "2027-06-17", name: "Þjóðhátíðardagurinn", type: "fixed" },
    { date: "2027-08-02", name: "Frídagur verslunarmanna", type: "movable" },
    { date: "2027-12-24", name: "Aðfangadagur", type: "fixed" },
    { date: "2027-12-25", name: "Jóladagur", type: "fixed" },
    { date: "2027-12-26", name: "Annar í jólum", type: "fixed" },
    { date: "2027-12-31", name: "Gamlársdagur", type: "fixed" },
  ],
};

export function getHolidaysISForYear(year: number): Holiday[] {
  if (year === 2025 || year === 2026 || year === 2027) return holidaysIS[year];
  return [];
}
export function getAllHolidaysIS(): Holiday[] {
  return ([2025, 2026, 2027] as HolidayYear[]).flatMap((y) => holidaysIS[y]);
}
