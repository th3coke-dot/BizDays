import type { Holiday, HolidayYear } from "@/types";

/**
 * Suomen viralliset pyhäpäivät + juhannusaatto ja jouluaatto
 * (yleisiä vapaapäiviä työelämässä).
 */
export const holidaysFI: Record<HolidayYear, Holiday[]> = {
  2025: [
    { date: "2025-01-01", name: "Uudenvuodenpäivä", type: "fixed" },
    { date: "2025-01-06", name: "Loppiainen", type: "fixed" },
    { date: "2025-04-18", name: "Pitkäperjantai", type: "movable" },
    { date: "2025-04-20", name: "Pääsiäispäivä", type: "movable" },
    { date: "2025-04-21", name: "2. pääsiäispäivä", type: "movable" },
    { date: "2025-05-01", name: "Vappu", type: "fixed" },
    { date: "2025-05-29", name: "Helatorstai", type: "movable" },
    { date: "2025-06-08", name: "Helluntaipäivä", type: "movable" },
    { date: "2025-06-20", name: "Juhannusaatto", type: "movable" },
    { date: "2025-06-21", name: "Juhannuspäivä", type: "movable" },
    { date: "2025-11-01", name: "Pyhäinpäivä", type: "movable" },
    { date: "2025-12-06", name: "Itsenäisyyspäivä", type: "fixed" },
    { date: "2025-12-24", name: "Jouluaatto", type: "fixed" },
    { date: "2025-12-25", name: "Joulupäivä", type: "fixed" },
    { date: "2025-12-26", name: "Tapaninpäivä", type: "fixed" },
  ],
  2026: [
    { date: "2026-01-01", name: "Uudenvuodenpäivä", type: "fixed" },
    { date: "2026-01-06", name: "Loppiainen", type: "fixed" },
    { date: "2026-04-03", name: "Pitkäperjantai", type: "movable" },
    { date: "2026-04-05", name: "Pääsiäispäivä", type: "movable" },
    { date: "2026-04-06", name: "2. pääsiäispäivä", type: "movable" },
    { date: "2026-05-01", name: "Vappu", type: "fixed" },
    { date: "2026-05-14", name: "Helatorstai", type: "movable" },
    { date: "2026-05-24", name: "Helluntaipäivä", type: "movable" },
    { date: "2026-06-19", name: "Juhannusaatto", type: "movable" },
    { date: "2026-06-20", name: "Juhannuspäivä", type: "movable" },
    { date: "2026-10-31", name: "Pyhäinpäivä", type: "movable" },
    { date: "2026-12-06", name: "Itsenäisyyspäivä", type: "fixed" },
    { date: "2026-12-24", name: "Jouluaatto", type: "fixed" },
    { date: "2026-12-25", name: "Joulupäivä", type: "fixed" },
    { date: "2026-12-26", name: "Tapaninpäivä", type: "fixed" },
  ],
  2027: [
    { date: "2027-01-01", name: "Uudenvuodenpäivä", type: "fixed" },
    { date: "2027-01-06", name: "Loppiainen", type: "fixed" },
    { date: "2027-03-26", name: "Pitkäperjantai", type: "movable" },
    { date: "2027-03-28", name: "Pääsiäispäivä", type: "movable" },
    { date: "2027-03-29", name: "2. pääsiäispäivä", type: "movable" },
    { date: "2027-05-01", name: "Vappu", type: "fixed" },
    { date: "2027-05-06", name: "Helatorstai", type: "movable" },
    { date: "2027-05-16", name: "Helluntaipäivä", type: "movable" },
    { date: "2027-06-25", name: "Juhannusaatto", type: "movable" },
    { date: "2027-06-26", name: "Juhannuspäivä", type: "movable" },
    { date: "2027-11-06", name: "Pyhäinpäivä", type: "movable" },
    { date: "2027-12-06", name: "Itsenäisyyspäivä", type: "fixed" },
    { date: "2027-12-24", name: "Jouluaatto", type: "fixed" },
    { date: "2027-12-25", name: "Joulupäivä", type: "fixed" },
    { date: "2027-12-26", name: "Tapaninpäivä", type: "fixed" },
  ],
};

export function getHolidaysFIForYear(year: number): Holiday[] {
  if (year === 2025 || year === 2026 || year === 2027) return holidaysFI[year];
  return [];
}

export function getAllHolidaysFI(): Holiday[] {
  return (Object.keys(holidaysFI) as unknown as HolidayYear[]).flatMap(
    (y) => holidaysFI[y],
  );
}
