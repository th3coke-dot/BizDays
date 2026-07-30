import type { HolidayYear } from "@/types";

export type CountryCode = "no" | "se" | "dk" | "fi";

export type CountryConfig = {
  code: CountryCode;
  name: string;
  nativeName: string;
  locale: string;
  htmlLang: string;
  /** URL prefix; empty for Norway (default). */
  prefix: string;
  homePath: string;
  workdaysPath: string;
  holidaysPath: string;
  labels: {
    workdays: string;
    holidays: string;
    home: string;
    calculateWorkdays: string;
    choosePeriod: string;
    fromDate: string;
    toDate: string;
    result: string;
    workdayCount: string;
    holidayCount: string;
    weekendCount: string;
    redDaysTitle: string;
    noHolidays: string;
    explanation: string;
    weekendBadge: string;
    fixed: string;
    movable: string;
    yearOverview: string;
    toolsHeading: string;
    heroTitle: string;
    heroSupport: string;
    ctaWorkdays: string;
    ctaHolidays: string;
  };
};

export const COUNTRIES: Record<CountryCode, CountryConfig> = {
  no: {
    code: "no",
    name: "Norge",
    nativeName: "Norge",
    locale: "nb",
    htmlLang: "nb",
    prefix: "",
    homePath: "/",
    workdaysPath: "/arbeidsdager",
    holidaysPath: "/helligdager",
    labels: {
      workdays: "Arbeidsdager",
      holidays: "Helligdager",
      home: "Forside",
      calculateWorkdays: "Beregn arbeidsdager",
      choosePeriod: "Velg periode",
      fromDate: "Fra dato",
      toDate: "Til dato",
      result: "Resultat",
      workdayCount: "arbeidsdager",
      holidayCount: "Helligdager",
      weekendCount: "Helger",
      redDaysTitle: "Røde dager trukket fra",
      noHolidays: "Ingen helligdager i valgt periode.",
      explanation: "Helger og norske helligdager er trukket fra.",
      weekendBadge: "Faller på helg",
      fixed: "Fast",
      movable: "Bevegelig",
      yearOverview: "Åpne årsoversikt",
      toolsHeading: "Velg et verktøy",
      heroTitle:
        "Norske arbeidsdager, helligdager og feriepenger – klart på sekunder",
      heroSupport: "Enkle verktøy for planlegging, lønn og ferie. Bygget for Norge.",
      ctaWorkdays: "Beregn arbeidsdager",
      ctaHolidays: "Se helligdager",
    },
  },
  se: {
    code: "se",
    name: "Sverige",
    nativeName: "Sverige",
    locale: "sv",
    htmlLang: "sv",
    prefix: "/se",
    homePath: "/se",
    workdaysPath: "/se/arbetsdagar",
    holidaysPath: "/se/helgdagar",
    labels: {
      workdays: "Arbetsdagar",
      holidays: "Helgdagar",
      home: "Startsida",
      calculateWorkdays: "Beräkna arbetsdagar",
      choosePeriod: "Välj period",
      fromDate: "Från datum",
      toDate: "Till datum",
      result: "Resultat",
      workdayCount: "arbetsdagar",
      holidayCount: "Helgdagar",
      weekendCount: "Helger",
      redDaysTitle: "Röda dagar som dragits av",
      noHolidays: "Inga helgdagar i vald period.",
      explanation: "Helger och svenska helgdagar har dragits av.",
      weekendBadge: "Infaller på helg",
      fixed: "Fast",
      movable: "Rörlig",
      yearOverview: "Öppna årsöversikt",
      toolsHeading: "Välj ett verktyg",
      heroTitle: "Svenska arbetsdagar och helgdagar – klart på sekunder",
      heroSupport: "Enkla verktyg för planering. Byggt för Sverige.",
      ctaWorkdays: "Beräkna arbetsdagar",
      ctaHolidays: "Se helgdagar",
    },
  },
  dk: {
    code: "dk",
    name: "Danmark",
    nativeName: "Danmark",
    locale: "da",
    htmlLang: "da",
    prefix: "/dk",
    homePath: "/dk",
    workdaysPath: "/dk/arbejdsdage",
    holidaysPath: "/dk/helligdage",
    labels: {
      workdays: "Arbejdsdage",
      holidays: "Helligdage",
      home: "Forside",
      calculateWorkdays: "Beregn arbejdsdage",
      choosePeriod: "Vælg periode",
      fromDate: "Fra dato",
      toDate: "Til dato",
      result: "Resultat",
      workdayCount: "arbejdsdage",
      holidayCount: "Helligdage",
      weekendCount: "Weekender",
      redDaysTitle: "Røde dage trukket fra",
      noHolidays: "Ingen helligdage i valgt periode.",
      explanation: "Weekender og danske helligdage er trukket fra.",
      weekendBadge: "Falder i weekend",
      fixed: "Fast",
      movable: "Bevægelig",
      yearOverview: "Åbn årsoversigt",
      toolsHeading: "Vælg et værktøj",
      heroTitle: "Danske arbejdsdage og helligdage – klart på sekunder",
      heroSupport: "Enkle værktøjer til planlægning. Bygget til Danmark.",
      ctaWorkdays: "Beregn arbejdsdage",
      ctaHolidays: "Se helligdage",
    },
  },
  fi: {
    code: "fi",
    name: "Finland",
    nativeName: "Suomi",
    locale: "fi",
    htmlLang: "fi",
    prefix: "/fi",
    homePath: "/fi",
    workdaysPath: "/fi/tyopaivat",
    holidaysPath: "/fi/pyhapaivat",
    labels: {
      workdays: "Työpäivät",
      holidays: "Pyhäpäivät",
      home: "Etusivu",
      calculateWorkdays: "Laske työpäivät",
      choosePeriod: "Valitse ajanjakso",
      fromDate: "Alkupäivä",
      toDate: "Loppupäivä",
      result: "Tulos",
      workdayCount: "työpäivää",
      holidayCount: "Pyhäpäivät",
      weekendCount: "Viikonloput",
      redDaysTitle: "Vähennetyt pyhäpäivät",
      noHolidays: "Ei pyhäpäiviä valitulla jaksolla.",
      explanation: "Viikonloput ja Suomen pyhäpäivät on vähennetty.",
      weekendBadge: "Osui viikonloppuun",
      fixed: "Kiinteä",
      movable: "Siirtyvä",
      yearOverview: "Avaa vuosikatsaus",
      toolsHeading: "Valitse työkalu",
      heroTitle: "Suomen työpäivät ja pyhäpäivät – sekunneissa",
      heroSupport: "Yksinkertaiset työkalut suunnitteluun. Rakennettu Suomelle.",
      ctaWorkdays: "Laske työpäivät",
      ctaHolidays: "Katso pyhäpäivät",
    },
  },
};

export const COUNTRY_LIST = Object.values(COUNTRIES);

export function getCountryFromPath(pathname: string): CountryCode {
  if (pathname === "/se" || pathname.startsWith("/se/")) return "se";
  if (pathname === "/dk" || pathname.startsWith("/dk/")) return "dk";
  if (pathname === "/fi" || pathname.startsWith("/fi/")) return "fi";
  return "no";
}

export function isHolidayYear(year: number): year is HolidayYear {
  return year === 2025 || year === 2026 || year === 2027;
}
