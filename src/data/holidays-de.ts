import type { Holiday, HolidayYear } from "@/types";

export const GERMAN_STATE_CODES = [
  "bw",
  "by",
  "be",
  "bb",
  "hb",
  "hh",
  "he",
  "mv",
  "ni",
  "nw",
  "rp",
  "sl",
  "sn",
  "st",
  "sh",
  "th",
] as const;

export type GermanStateCode = (typeof GERMAN_STATE_CODES)[number];

export const GERMAN_STATES: {
  id: GermanStateCode;
  name: string;
  nameEn: string;
}[] = [
  { id: "bw", name: "Baden-Württemberg", nameEn: "Baden-Württemberg" },
  { id: "by", name: "Bayern", nameEn: "Bavaria" },
  { id: "be", name: "Berlin", nameEn: "Berlin" },
  { id: "bb", name: "Brandenburg", nameEn: "Brandenburg" },
  { id: "hb", name: "Bremen", nameEn: "Bremen" },
  { id: "hh", name: "Hamburg", nameEn: "Hamburg" },
  { id: "he", name: "Hessen", nameEn: "Hesse" },
  {
    id: "mv",
    name: "Mecklenburg-Vorpommern",
    nameEn: "Mecklenburg-Western Pomerania",
  },
  { id: "ni", name: "Niedersachsen", nameEn: "Lower Saxony" },
  { id: "nw", name: "Nordrhein-Westfalen", nameEn: "North Rhine-Westphalia" },
  { id: "rp", name: "Rheinland-Pfalz", nameEn: "Rhineland-Palatinate" },
  { id: "sl", name: "Saarland", nameEn: "Saarland" },
  { id: "sn", name: "Sachsen", nameEn: "Saxony" },
  { id: "st", name: "Sachsen-Anhalt", nameEn: "Saxony-Anhalt" },
  { id: "sh", name: "Schleswig-Holstein", nameEn: "Schleswig-Holstein" },
  { id: "th", name: "Thüringen", nameEn: "Thuringia" },
];

export function isGermanStateCode(value: string | null | undefined): value is GermanStateCode {
  return !!value && (GERMAN_STATE_CODES as readonly string[]).includes(value);
}

const EPIPHANY = ["bw", "by", "st"] as const;
const WOMENS_DAY = ["be", "mv"] as const;
const CORPUS_CHRISTI = ["bw", "by", "he", "nw", "rp", "sl"] as const;
const ASSUMPTION = ["by", "sl"] as const;
const CHILDRENS_DAY = ["th"] as const;
const REFORMATION = ["bb", "hb", "hh", "mv", "ni", "sn", "st", "sh", "th"] as const;
const ALL_SAINTS = ["bw", "by", "nw", "rp", "sl"] as const;
const REPENTANCE = ["sn"] as const;

/** German public holidays: nationwide plus state-specific (gesetzliche Feiertage). */
export const holidaysDE: Record<HolidayYear, Holiday[]> = {
  2025: [
    { date: "2025-01-01", name: "Neujahr", type: "fixed" },
    {
      date: "2025-01-06",
      name: "Heilige Drei Könige",
      type: "fixed",
      regions: [...EPIPHANY],
    },
    {
      date: "2025-03-08",
      name: "Internationaler Frauentag",
      type: "fixed",
      regions: [...WOMENS_DAY],
    },
    { date: "2025-04-18", name: "Karfreitag", type: "movable" },
    { date: "2025-04-21", name: "Ostermontag", type: "movable" },
    { date: "2025-05-01", name: "Tag der Arbeit", type: "fixed" },
    { date: "2025-05-29", name: "Christi Himmelfahrt", type: "movable" },
    { date: "2025-06-09", name: "Pfingstmontag", type: "movable" },
    {
      date: "2025-06-19",
      name: "Fronleichnam",
      type: "movable",
      regions: [...CORPUS_CHRISTI],
    },
    {
      date: "2025-08-15",
      name: "Mariä Himmelfahrt",
      type: "fixed",
      regions: [...ASSUMPTION],
    },
    {
      date: "2025-09-20",
      name: "Weltkindertag",
      type: "fixed",
      regions: [...CHILDRENS_DAY],
    },
    { date: "2025-10-03", name: "Tag der Deutschen Einheit", type: "fixed" },
    {
      date: "2025-10-31",
      name: "Reformationstag",
      type: "fixed",
      regions: [...REFORMATION],
    },
    {
      date: "2025-11-01",
      name: "Allerheiligen",
      type: "fixed",
      regions: [...ALL_SAINTS],
    },
    {
      date: "2025-11-19",
      name: "Buß- und Bettag",
      type: "movable",
      regions: [...REPENTANCE],
    },
    { date: "2025-12-25", name: "1. Weihnachtstag", type: "fixed" },
    { date: "2025-12-26", name: "2. Weihnachtstag", type: "fixed" },
  ],
  2026: [
    { date: "2026-01-01", name: "Neujahr", type: "fixed" },
    {
      date: "2026-01-06",
      name: "Heilige Drei Könige",
      type: "fixed",
      regions: [...EPIPHANY],
    },
    {
      date: "2026-03-08",
      name: "Internationaler Frauentag",
      type: "fixed",
      regions: [...WOMENS_DAY],
    },
    { date: "2026-04-03", name: "Karfreitag", type: "movable" },
    { date: "2026-04-06", name: "Ostermontag", type: "movable" },
    { date: "2026-05-01", name: "Tag der Arbeit", type: "fixed" },
    { date: "2026-05-14", name: "Christi Himmelfahrt", type: "movable" },
    { date: "2026-05-25", name: "Pfingstmontag", type: "movable" },
    {
      date: "2026-06-04",
      name: "Fronleichnam",
      type: "movable",
      regions: [...CORPUS_CHRISTI],
    },
    {
      date: "2026-08-15",
      name: "Mariä Himmelfahrt",
      type: "fixed",
      regions: [...ASSUMPTION],
    },
    {
      date: "2026-09-20",
      name: "Weltkindertag",
      type: "fixed",
      regions: [...CHILDRENS_DAY],
    },
    { date: "2026-10-03", name: "Tag der Deutschen Einheit", type: "fixed" },
    {
      date: "2026-10-31",
      name: "Reformationstag",
      type: "fixed",
      regions: [...REFORMATION],
    },
    {
      date: "2026-11-01",
      name: "Allerheiligen",
      type: "fixed",
      regions: [...ALL_SAINTS],
    },
    {
      date: "2026-11-18",
      name: "Buß- und Bettag",
      type: "movable",
      regions: [...REPENTANCE],
    },
    { date: "2026-12-25", name: "1. Weihnachtstag", type: "fixed" },
    { date: "2026-12-26", name: "2. Weihnachtstag", type: "fixed" },
  ],
  2027: [
    { date: "2027-01-01", name: "Neujahr", type: "fixed" },
    {
      date: "2027-01-06",
      name: "Heilige Drei Könige",
      type: "fixed",
      regions: [...EPIPHANY],
    },
    {
      date: "2027-03-08",
      name: "Internationaler Frauentag",
      type: "fixed",
      regions: [...WOMENS_DAY],
    },
    { date: "2027-03-26", name: "Karfreitag", type: "movable" },
    { date: "2027-03-29", name: "Ostermontag", type: "movable" },
    { date: "2027-05-01", name: "Tag der Arbeit", type: "fixed" },
    { date: "2027-05-06", name: "Christi Himmelfahrt", type: "movable" },
    { date: "2027-05-17", name: "Pfingstmontag", type: "movable" },
    {
      date: "2027-05-27",
      name: "Fronleichnam",
      type: "movable",
      regions: [...CORPUS_CHRISTI],
    },
    {
      date: "2027-08-15",
      name: "Mariä Himmelfahrt",
      type: "fixed",
      regions: [...ASSUMPTION],
    },
    {
      date: "2027-09-20",
      name: "Weltkindertag",
      type: "fixed",
      regions: [...CHILDRENS_DAY],
    },
    { date: "2027-10-03", name: "Tag der Deutschen Einheit", type: "fixed" },
    {
      date: "2027-10-31",
      name: "Reformationstag",
      type: "fixed",
      regions: [...REFORMATION],
    },
    {
      date: "2027-11-01",
      name: "Allerheiligen",
      type: "fixed",
      regions: [...ALL_SAINTS],
    },
    {
      date: "2027-11-17",
      name: "Buß- und Bettag",
      type: "movable",
      regions: [...REPENTANCE],
    },
    { date: "2027-12-25", name: "1. Weihnachtstag", type: "fixed" },
    { date: "2027-12-26", name: "2. Weihnachtstag", type: "fixed" },
  ],
};

function appliesToState(holiday: Holiday, state?: GermanStateCode): boolean {
  if (!holiday.regions || holiday.regions.length === 0) return true;
  if (!state) return false;
  return holiday.regions.includes(state);
}

export function getHolidaysDEForYear(
  year: number,
  state?: GermanStateCode,
): Holiday[] {
  if (year !== 2025 && year !== 2026 && year !== 2027) return [];
  return holidaysDE[year].filter((holiday) => appliesToState(holiday, state));
}

export function getAllHolidaysDE(state?: GermanStateCode): Holiday[] {
  return ([2025, 2026, 2027] as HolidayYear[]).flatMap((year) =>
    getHolidaysDEForYear(year, state),
  );
}
