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

export const GERMAN_LOCALITY_IDS = [
  "statewide",
  "katholisch",
  "evangelisch",
  "augsburg",
] as const;

export type GermanLocalityId = (typeof GERMAN_LOCALITY_IDS)[number];

export type GermanLocalityOption = {
  id: GermanLocalityId;
  name: string;
  nameEn: string;
};

export type GermanRegionSelection = {
  state?: GermanStateCode;
  locality: GermanLocalityId;
};

const BAVARIA_LOCALITIES: GermanLocalityOption[] = [
  {
    id: "katholisch",
    name: "Überwiegend katholische Gemeinde",
    nameEn: "Catholic-majority municipality",
  },
  {
    id: "evangelisch",
    name: "Überwiegend evangelische Gemeinde",
    nameEn: "Protestant-majority municipality",
  },
  {
    id: "augsburg",
    name: "Stadt Augsburg",
    nameEn: "City of Augsburg",
  },
];

const CORPUS_CHRISTI_LOCALITIES: GermanLocalityOption[] = [
  {
    id: "statewide",
    name: "Landesweit (ohne Fronleichnam)",
    nameEn: "Statewide (without Corpus Christi)",
  },
  {
    id: "katholisch",
    name: "Gemeinde mit Fronleichnam",
    nameEn: "Municipality with Corpus Christi",
  },
];

export const GERMAN_STATE_LOCALITIES: Partial<
  Record<GermanStateCode, GermanLocalityOption[]>
> = {
  by: BAVARIA_LOCALITIES,
  sn: CORPUS_CHRISTI_LOCALITIES,
  th: CORPUS_CHRISTI_LOCALITIES,
};

export const GERMAN_STATE_LOCALITY_HINT: Partial<
  Record<GermanStateCode, { de: string; en: string }>
> = {
  by: {
    de: "Mariä Himmelfahrt (15.8.) gilt nur in Gemeinden mit überwiegend katholischer Bevölkerung. Das Augsburger Friedensfest (8.8.) nur in der Stadt Augsburg.",
    en: "Assumption Day (15 Aug) is a holiday only in Catholic-majority municipalities. Augsburg Peace Festival (8 Aug) is observed only in the city of Augsburg.",
  },
  sn: {
    de: "Fronleichnam ist in Sachsen nur in vom Innenministerium bestimmten Regionen ein gesetzlicher Feiertag.",
    en: "In Saxony, Corpus Christi is a public holiday only in designated Catholic regions.",
  },
  th: {
    de: "Fronleichnam ist in Thüringen nur in Gemeinden mit überwiegend katholischer Bevölkerung ein gesetzlicher Feiertag.",
    en: "In Thuringia, Corpus Christi is a public holiday only in Catholic-majority municipalities.",
  },
};

export function isGermanLocalityId(
  value: string | null | undefined,
): value is GermanLocalityId {
  return !!value && (GERMAN_LOCALITY_IDS as readonly string[]).includes(value);
}

export function defaultGermanLocality(state?: GermanStateCode): GermanLocalityId {
  if (state === "by") return "katholisch";
  return "statewide";
}

export function parseGermanRegion(region?: string): GermanRegionSelection {
  if (!region) return { locality: "statewide" };
  const [statePart, localityPart] = region.split(":");
  if (!isGermanStateCode(statePart)) return { locality: "statewide" };
  const localities = GERMAN_STATE_LOCALITIES[statePart];
  if (isGermanLocalityId(localityPart) && localities?.some((item) => item.id === localityPart)) {
    return { state: statePart, locality: localityPart };
  }
  return { state: statePart, locality: defaultGermanLocality(statePart) };
}

export function serializeGermanRegion(
  state: GermanStateCode | "",
  locality?: GermanLocalityId,
): string {
  if (!state) return "";
  const resolved = locality ?? defaultGermanLocality(state);
  if (!GERMAN_STATE_LOCALITIES[state] || resolved === "statewide") return state;
  return `${state}:${resolved}`;
}

export function formatGermanRegionLabel(
  region: string | undefined,
  lang: "native" | "en",
): string {
  const { state, locality } = parseGermanRegion(region);
  if (!state) return "";
  const stateInfo = GERMAN_STATES.find((item) => item.id === state);
  const stateName = stateInfo
    ? lang === "en"
      ? stateInfo.nameEn
      : stateInfo.name
    : state;
  const option = GERMAN_STATE_LOCALITIES[state]?.find((item) => item.id === locality);
  if (!option || option.id === "statewide") return stateName;
  return `${stateName} · ${lang === "en" ? option.nameEn : option.name}`;
}

const EPIPHANY = ["bw", "by", "st"] as const;
const WOMENS_DAY = ["be", "mv"] as const;
const CORPUS_CHRISTI = [
  "bw",
  "by",
  "he",
  "nw",
  "rp",
  "sl",
  "sn:katholisch",
  "th:katholisch",
] as const;
const ASSUMPTION = ["sl", "by:katholisch"] as const;
const ASSUMPTION_NOTE = {
  note: "In Bayern nur in Gemeinden mit überwiegend katholischer Bevölkerung. Im Saarland landesweit.",
  noteEn:
    "In Bavaria only in Catholic-majority municipalities. Statewide in Saarland.",
};
const FRIEDENSFEST = ["by:augsburg"] as const;
const FRIEDENSFEST_NOTE = {
  note: "Nur in der Stadt Augsburg.",
  noteEn: "Only in the city of Augsburg.",
};
const CORPUS_CHRISTI_NOTE = {
  note: "In Sachsen und Thüringen nur in bestimmten katholischen Gemeinden; in den anderen genannten Ländern landesweit.",
  noteEn:
    "In Saxony and Thuringia only in designated Catholic municipalities; statewide in the other listed states.",
};
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
      ...CORPUS_CHRISTI_NOTE,
    },
    {
      date: "2025-08-08",
      name: "Augsburger Friedensfest",
      type: "fixed",
      regions: [...FRIEDENSFEST],
      ...FRIEDENSFEST_NOTE,
    },
    {
      date: "2025-08-15",
      name: "Mariä Himmelfahrt",
      type: "fixed",
      regions: [...ASSUMPTION],
      ...ASSUMPTION_NOTE,
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
      ...CORPUS_CHRISTI_NOTE,
    },
    {
      date: "2026-08-08",
      name: "Augsburger Friedensfest",
      type: "fixed",
      regions: [...FRIEDENSFEST],
      ...FRIEDENSFEST_NOTE,
    },
    {
      date: "2026-08-15",
      name: "Mariä Himmelfahrt",
      type: "fixed",
      regions: [...ASSUMPTION],
      ...ASSUMPTION_NOTE,
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
      ...CORPUS_CHRISTI_NOTE,
    },
    {
      date: "2027-08-08",
      name: "Augsburger Friedensfest",
      type: "fixed",
      regions: [...FRIEDENSFEST],
      ...FRIEDENSFEST_NOTE,
    },
    {
      date: "2027-08-15",
      name: "Mariä Himmelfahrt",
      type: "fixed",
      regions: [...ASSUMPTION],
      ...ASSUMPTION_NOTE,
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

function appliesToRegion(holiday: Holiday, region?: string): boolean {
  if (!holiday.regions || holiday.regions.length === 0) return true;
  const { state, locality } = parseGermanRegion(region);
  if (!state) return false;

  const accepted = new Set<string>([state]);
  if (locality !== "statewide") {
    accepted.add(`${state}:${locality}`);
    if (locality === "augsburg") accepted.add(`${state}:katholisch`);
  }
  return holiday.regions.some((code) => accepted.has(code));
}

const DE_HOLIDAY_NAME_EN: Record<string, string> = {
  Neujahr: "New Year's Day",
  "Heilige Drei Könige": "Epiphany",
  "Internationaler Frauentag": "International Women's Day",
  Karfreitag: "Good Friday",
  Ostermontag: "Easter Monday",
  "Tag der Arbeit": "Labour Day",
  "Christi Himmelfahrt": "Ascension Day",
  Pfingstmontag: "Whit Monday",
  Fronleichnam: "Corpus Christi",
  "Augsburger Friedensfest": "Augsburg Peace Festival",
  "Mariä Himmelfahrt": "Assumption Day",
  Weltkindertag: "World Children's Day",
  "Tag der Deutschen Einheit": "German Unity Day",
  Reformationstag: "Reformation Day",
  Allerheiligen: "All Saints' Day",
  "Buß- und Bettag": "Day of Prayer and Repentance",
  "1. Weihnachtstag": "Christmas Day",
  "2. Weihnachtstag": "Boxing Day",
};

function withEnglishName(holiday: Holiday): Holiday {
  return {
    ...holiday,
    nameEn: DE_HOLIDAY_NAME_EN[holiday.name] ?? holiday.name,
  };
}

function withoutNote(holiday: Holiday): Holiday {
  return {
    date: holiday.date,
    name: holiday.name,
    nameEn: holiday.nameEn,
    type: holiday.type,
    regions: holiday.regions,
  };
}

function withLocalNote(holiday: Holiday, state?: GermanStateCode): Holiday {
  if (!holiday.note) return holiday;
  if (holiday.name === "Mariä Himmelfahrt" && state === "sl") {
    return withoutNote(holiday);
  }
  if (holiday.name === "Fronleichnam" && state !== "sn" && state !== "th") {
    return withoutNote(holiday);
  }
  return holiday;
}

export function getHolidaysDEForYear(year: number, region?: string): Holiday[] {
  if (year !== 2025 && year !== 2026 && year !== 2027) return [];
  const { state } = parseGermanRegion(region);
  return holidaysDE[year]
    .filter((holiday) => appliesToRegion(holiday, region))
    .map((holiday) => withEnglishName(withLocalNote(holiday, state)));
}

export function getAllHolidaysDE(region?: string): Holiday[] {
  return ([2025, 2026, 2027] as HolidayYear[]).flatMap((year) =>
    getHolidaysDEForYear(year, region),
  );
}
