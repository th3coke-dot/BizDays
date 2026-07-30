import type { HolidayYear } from "@/types";
import { EN_LABELS, englishLabelsForCountry, type UiLabels } from "@/lib/i18n";

export type CountryCode = "no" | "se" | "dk" | "fi" | "uk" | "de" | "pl" | "is";
export type AppLanguage = "native" | "en";

export type CountryConfig = {
  code: CountryCode;
  name: string;
  nativeName: string;
  /** Default/native locale code for html lang */
  locale: string;
  htmlLang: string;
  /** Native-language URL prefix; empty for Norway. */
  prefix: string;
  /** Native path segments for tools */
  nativeSegments: {
    workdays: string;
    holidays: string;
    countdown: string;
    employmentCost: string;
  };
  labels: UiLabels;
  /** English labels (always available). */
  labelsEn: UiLabels;
};

function pathsFor(country: CountryConfig, lang: AppLanguage) {
  if (lang === "en") {
    // UK's native language is English – prefer /uk over /en/uk
    if (country.code === "uk") {
      return {
        homePath: "/uk",
        workdaysPath: "/uk/workdays",
        holidaysPath: "/uk/holidays",
        countdownPath: "/uk/countdown",
        employmentCostPath: "/uk/employment-cost",
      };
    }
    const base = `/en/${country.code}`;
    return {
      homePath: base,
      workdaysPath: `${base}/workdays`,
      holidaysPath: `${base}/holidays`,
      countdownPath: `${base}/countdown`,
      employmentCostPath: `${base}/employment-cost`,
    };
  }

  const prefix = country.prefix;
  if (!prefix) {
    return {
      homePath: "/",
      workdaysPath: `/${country.nativeSegments.workdays}`,
      holidaysPath: `/${country.nativeSegments.holidays}`,
      countdownPath: `/${country.nativeSegments.countdown}`,
      employmentCostPath: `/${country.nativeSegments.employmentCost}`,
    };
  }
  return {
    homePath: prefix,
    workdaysPath: `${prefix}/${country.nativeSegments.workdays}`,
    holidaysPath: `${prefix}/${country.nativeSegments.holidays}`,
    countdownPath: `${prefix}/${country.nativeSegments.countdown}`,
    employmentCostPath: `${prefix}/${country.nativeSegments.employmentCost}`,
  };
}

export const COUNTRIES: Record<CountryCode, CountryConfig> = {
  no: {
    code: "no",
    name: "Norway",
    nativeName: "Norge",
    locale: "nb",
    htmlLang: "nb",
    prefix: "",
    nativeSegments: {
      workdays: "arbeidsdager",
      holidays: "helligdager",
      countdown: "countdown",
      employmentCost: "arbeidsgiverkostnad",
    },
    labels: {
      ...EN_LABELS,
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
      heroSupport:
        "Enkle verktøy for planlegging, lønn og ferie. Bygget for Norge.",
      ctaWorkdays: "Beregn arbeidsdager",
      ctaHolidays: "Se helligdager",
      countdown: "Countdown",
      shareCountdown: "Del countdown",
      copied: "Kopiert!",
      days: "Dager",
      hours: "Timer",
      minutes: "Minutt",
      seconds: "Sekund",
      language: "Språk",
      country: "Land",
      employmentCost: "Arbeidsgiverkostnad",
      employmentCostTitle: "Total kostnad ved ansettelse",
      employmentCostSupport: "Estimer arbeidsgiveravgift og andre påslag oppå bruttolønn.",
      grossSalary: "Brutto årslønn",
      regionFactor: "Regional faktor (sone)",
      employerCharges: "Arbeidsgiverkostnader",
      totalEmploymentCost: "Total ansettelseskostnad",
      effectiveEmployerRate: "Effektiv arbeidsgiversats",
      calculateCost: "Beregn kostnad",
      costDisclaimerTitle: "Viktig",
      pensionRate: "OTP / pensjon (%)",
      pensionRateHint: "Endre for å matche din pensjonsordning.",
      rateBreakdown: "Kostnad per periode",
      dayRate: "Dagsats",
      weekRate: "Ukesats",
      monthRate: "Månedssats",
      yearRate: "Årssats",
      workingDaysBasis: "Dagsats er basert på 260 arbeidsdager per år.",
    },
    labelsEn: englishLabelsForCountry("Norway", "public holidays"),
  },
  se: {
    code: "se",
    name: "Sweden",
    nativeName: "Sverige",
    locale: "sv",
    htmlLang: "sv",
    prefix: "/se",
    nativeSegments: {
      workdays: "arbetsdagar",
      holidays: "helgdagar",
      countdown: "countdown",
      employmentCost: "anstallningskostnad",
    },
    labels: {
      ...EN_LABELS,
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
      countdown: "Countdown",
      shareCountdown: "Dela countdown",
      copied: "Kopierat!",
      days: "Dagar",
      hours: "Timmar",
      minutes: "Minuter",
      seconds: "Sekunder",
      language: "Språk",
      country: "Land",
      employmentCost: "Anställningskostnad",
      employmentCostTitle: "Total kostnad för anställning",
      employmentCostSupport: "Uppskatta arbetsgivaravgifter ovanpå bruttolön.",
      grossSalary: "Bruttoårslön",
      regionFactor: "Regional / särskild faktor",
      employerCharges: "Arbetsgivarkostnader",
      totalEmploymentCost: "Total anställningskostnad",
      effectiveEmployerRate: "Effektiv arbetsgivaravgift",
      calculateCost: "Beräkna kostnad",
      costDisclaimerTitle: "Viktigt",
      pensionRate: "Tjänstepension (%)",
      pensionRateHint: "Justera efter ditt kollektivavtal / pensionsupplägg.",
      rateBreakdown: "Kostnad per period",
      dayRate: "Dagssats",
      weekRate: "Veckosats",
      monthRate: "Månadssats",
      yearRate: "Årssats",
      workingDaysBasis: "Dagssatsen bygger på 260 arbetsdagar per år.",
    },
    labelsEn: englishLabelsForCountry("Sweden", "public holidays"),
  },
  dk: {
    code: "dk",
    name: "Denmark",
    nativeName: "Danmark",
    locale: "da",
    htmlLang: "da",
    prefix: "/dk",
    nativeSegments: {
      workdays: "arbejdsdage",
      holidays: "helligdage",
      countdown: "countdown",
      employmentCost: "ansaettelsesomkostninger",
    },
    labels: {
      ...EN_LABELS,
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
      countdown: "Countdown",
      shareCountdown: "Del countdown",
      copied: "Kopieret!",
      days: "Dage",
      hours: "Timer",
      minutes: "Minutter",
      seconds: "Sekunder",
      language: "Sprog",
      country: "Land",
      employmentCost: "Ansættelsesomkostninger",
      employmentCostTitle: "Samlede omkostninger ved ansættelse",
      employmentCostSupport: "Estimer arbejdsgiveromkostninger oven på bruttoløn.",
      grossSalary: "Bruttoårsløn",
      regionFactor: "Regional / branchefaktor",
      employerCharges: "Arbejdsgiveromkostninger",
      totalEmploymentCost: "Samlede ansættelsesomkostninger",
      effectiveEmployerRate: "Effektiv arbejdsgiversats",
      calculateCost: "Beregn omkostning",
      costDisclaimerTitle: "Vigtigt",
      pensionRate: "Pension (arbejdsgiver) (%)",
      pensionRateHint: "Tilpas til din pensionsordning.",
      rateBreakdown: "Omkostning pr. periode",
      dayRate: "Dagssats",
      weekRate: "Ugesats",
      monthRate: "Månedssats",
      yearRate: "Årssats",
      workingDaysBasis: "Dagssatsen er baseret på 260 arbejdsdage om året.",
    },
    labelsEn: englishLabelsForCountry("Denmark", "public holidays"),
  },
  fi: {
    code: "fi",
    name: "Finland",
    nativeName: "Suomi",
    locale: "fi",
    htmlLang: "fi",
    prefix: "/fi",
    nativeSegments: {
      workdays: "tyopaivat",
      holidays: "pyhapaivat",
      countdown: "countdown",
      employmentCost: "tyonantajakustannukset",
    },
    labels: {
      ...EN_LABELS,
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
      countdown: "Countdown",
      shareCountdown: "Jaa countdown",
      copied: "Kopioitu!",
      days: "Päivää",
      hours: "Tuntia",
      minutes: "Minuuttia",
      seconds: "Sekuntia",
      language: "Kieli",
      country: "Maa",
      employmentCost: "Työnantajakustannukset",
      employmentCostTitle: "Työllistämisen kokonaiskustannus",
      employmentCostSupport: "Arvioi työnantajan sivukulut bruttöpalkan päälle.",
      grossSalary: "Bruttovuosipalkka",
      regionFactor: "Alue- / toimialatekijä",
      employerCharges: "Työnantajakustannukset",
      totalEmploymentCost: "Kokonaiskustannus",
      effectiveEmployerRate: "Efektiivinen työnantajaprosentti",
      calculateCost: "Laske kustannus",
      costDisclaimerTitle: "Tärkeää",
      pensionRate: "TyEL / eläke (%)",
      pensionRateHint: "Muokkaa vastaamaan yrityksesi TyEL-maksua.",
      rateBreakdown: "Kustannus jaksoittain",
      dayRate: "Päivähinta",
      weekRate: "Viikkohinta",
      monthRate: "Kuukausihinta",
      yearRate: "Vuosihinta",
      workingDaysBasis: "Päivähinta perustuu 260 työpäivään vuodessa.",
    },
    labelsEn: englishLabelsForCountry("Finland", "public holidays"),
  },
  uk: {
    code: "uk",
    name: "United Kingdom",
    nativeName: "United Kingdom",
    locale: "en",
    htmlLang: "en",
    prefix: "/uk",
    nativeSegments: {
      workdays: "workdays",
      holidays: "holidays",
      countdown: "countdown",
      employmentCost: "employment-cost",
    },
    labels: englishLabelsForCountry("UK", "bank holidays"),
    labelsEn: englishLabelsForCountry("UK", "bank holidays"),
  },
  de: {
    code: "de",
    name: "Germany",
    nativeName: "Deutschland",
    locale: "de",
    htmlLang: "de",
    prefix: "/de",
    nativeSegments: {
      workdays: "arbeitstage",
      holidays: "feiertage",
      countdown: "countdown",
      employmentCost: "lohnnebenkosten",
    },
    labels: {
      ...EN_LABELS,
      workdays: "Arbeitstage",
      holidays: "Feiertage",
      home: "Startseite",
      calculateWorkdays: "Arbeitstage berechnen",
      choosePeriod: "Zeitraum wählen",
      fromDate: "Von",
      toDate: "Bis",
      result: "Ergebnis",
      workdayCount: "Arbeitstage",
      holidayCount: "Feiertage",
      weekendCount: "Wochenenden",
      redDaysTitle: "Abgezogene Feiertage",
      noHolidays: "Keine Feiertage im gewählten Zeitraum.",
      explanation: "Wochenenden und deutsche Feiertage wurden abgezogen.",
      weekendBadge: "Fällt auf ein Wochenende",
      fixed: "Fest",
      movable: "Beweglich",
      yearOverview: "Jahresübersicht öffnen",
      toolsHeading: "Werkzeug wählen",
      heroTitle: "Deutsche Arbeitstage und Feiertage – in Sekunden",
      heroSupport: "Einfache Tools für die Planung. Für Deutschland.",
      ctaWorkdays: "Arbeitstage berechnen",
      ctaHolidays: "Feiertage ansehen",
      countdown: "Countdown",
      shareCountdown: "Countdown teilen",
      copied: "Kopiert!",
      days: "Tage",
      hours: "Stunden",
      minutes: "Minuten",
      seconds: "Sekunden",
      language: "Sprache",
      country: "Land",
      employmentCost: "Lohnnebenkosten",
      employmentCostTitle: "Gesamtkosten der Beschäftigung",
      employmentCostSupport: "Schätzen Sie Arbeitgeberanteile auf das Bruttogehalt.",
      grossSalary: "Bruttojahresgehalt",
      regionFactor: "Regionaler Faktor",
      employerCharges: "Arbeitgeberkosten",
      totalEmploymentCost: "Gesamte Beschäftigungskosten",
      effectiveEmployerRate: "Effektiver Arbeitgeberanteil",
      calculateCost: "Kosten berechnen",
      costDisclaimerTitle: "Wichtig",
      pensionRate: "Betriebliche Altersvorsorge (%)",
      pensionRateHint: "Anpassen an Ihre bAV-/Pensionsregelung.",
      rateBreakdown: "Kosten pro Periode",
      dayRate: "Tagessatz",
      weekRate: "Wochensatz",
      monthRate: "Monatssatz",
      yearRate: "Jahressatz",
      workingDaysBasis: "Tagessatz auf Basis von 260 Arbeitstagen pro Jahr.",
    },
    labelsEn: englishLabelsForCountry("Germany", "public holidays"),
  },
  pl: {
    code: "pl",
    name: "Poland",
    nativeName: "Polska",
    locale: "pl",
    htmlLang: "pl",
    prefix: "/pl",
    nativeSegments: {
      workdays: "dni-robocze",
      holidays: "swieta",
      countdown: "countdown",
      employmentCost: "koszt-zatrudnienia",
    },
    labels: {
      ...EN_LABELS,
      workdays: "Dni robocze",
      holidays: "Święta",
      home: "Strona główna",
      calculateWorkdays: "Oblicz dni robocze",
      choosePeriod: "Wybierz okres",
      fromDate: "Od",
      toDate: "Do",
      result: "Wynik",
      workdayCount: "dni roboczych",
      holidayCount: "Święta",
      weekendCount: "Weekendy",
      redDaysTitle: "Odjęte święta",
      noHolidays: "Brak świąt w wybranym okresie.",
      explanation: "Weekendy i polskie święta zostały odjęte.",
      weekendBadge: "Wypada w weekend",
      fixed: "Stałe",
      movable: "Ruchome",
      yearOverview: "Otwórz przegląd roku",
      toolsHeading: "Wybierz narzędzie",
      heroTitle: "Polskie dni robocze i święta – w kilka sekund",
      heroSupport: "Proste narzędzia do planowania. Dla Polski.",
      ctaWorkdays: "Oblicz dni robocze",
      ctaHolidays: "Zobacz święta",
      countdown: "Countdown",
      shareCountdown: "Udostępnij countdown",
      copied: "Skopiowano!",
      days: "Dni",
      hours: "Godziny",
      minutes: "Minuty",
      seconds: "Sekundy",
      language: "Język",
      country: "Kraj",
      employmentCost: "Koszt zatrudnienia",
      employmentCostTitle: "Całkowity koszt zatrudnienia",
      employmentCostSupport: "Oszacuj koszty pracodawcy ponad wynagrodzenie brutto.",
      grossSalary: "Roczne wynagrodzenie brutto",
      regionFactor: "Czynnik regionalny / branżowy",
      employerCharges: "Koszty pracodawcy",
      totalEmploymentCost: "Całkowity koszt zatrudnienia",
      effectiveEmployerRate: "Efektywna stawka pracodawcy",
      calculateCost: "Oblicz koszt",
      costDisclaimerTitle: "Ważne",
      pensionRate: "PPK / emerytura pracodawcy (%)",
      pensionRateHint: "Dostosuj do swojej składki emerytalnej.",
      rateBreakdown: "Koszt w okresie",
      dayRate: "Stawka dzienna",
      weekRate: "Stawka tygodniowa",
      monthRate: "Stawka miesięczna",
      yearRate: "Stawka roczna",
      workingDaysBasis: "Stawka dzienna przy 260 dniach roboczych w roku.",
    },
    labelsEn: englishLabelsForCountry("Poland", "public holidays"),
  },
  is: {
    code: "is",
    name: "Iceland",
    nativeName: "Ísland",
    locale: "is",
    htmlLang: "is",
    prefix: "/is",
    nativeSegments: {
      workdays: "virkdagar",
      holidays: "helgidagar",
      countdown: "countdown",
      employmentCost: "radningarkostnadur",
    },
    labels: {
      ...EN_LABELS,
      workdays: "Virkdagar",
      holidays: "Helgidagar",
      home: "Forsíða",
      calculateWorkdays: "Reikna virkdaga",
      choosePeriod: "Veldu tímabil",
      fromDate: "Frá",
      toDate: "Til",
      result: "Niðurstaða",
      workdayCount: "virkdagar",
      holidayCount: "Helgidagar",
      weekendCount: "Helgar",
      redDaysTitle: "Frádregnir helgidagar",
      noHolidays: "Engir helgidagar á völdu tímabili.",
      explanation: "Helgar og íslenskir helgidagar hafa verið dregnir frá.",
      weekendBadge: "Fellur á helgi",
      fixed: "Fastur",
      movable: "Hreyfanlegur",
      yearOverview: "Opna ársyfirlit",
      toolsHeading: "Veldu verkfæri",
      heroTitle: "Íslenskir virkdagar og helgidagar – á sekúndum",
      heroSupport: "Einföld verkfæri til skipulagningar. Fyrir Ísland.",
      ctaWorkdays: "Reikna virkdaga",
      ctaHolidays: "Sjá helgidaga",
      countdown: "Countdown",
      shareCountdown: "Deila countdown",
      copied: "Afritað!",
      days: "Dagar",
      hours: "Klukkustundir",
      minutes: "Mínútur",
      seconds: "Sekúndur",
      language: "Tungumál",
      country: "Land",
      employmentCost: "Ráðningarkostnaður",
      employmentCostTitle: "Heildarkostnaður við ráðningu",
      employmentCostSupport: "Áætlaðu kostnað vinnuveitanda ofan á laun.",
      grossSalary: "Árslaun brúttó",
      regionFactor: "Svæðisbundinn þáttur",
      employerCharges: "Kostnaður vinnuveitanda",
      totalEmploymentCost: "Heildarkostnaður",
      effectiveEmployerRate: "Raunverulegt hlutfall vinnuveitanda",
      calculateCost: "Reikna kostnað",
      costDisclaimerTitle: "Mikilvægt",
      pensionRate: "Lífeyrisiðgjald (%)",
      pensionRateHint: "Aðlagaðu að lífeyriskerfi fyrirtækisins.",
      rateBreakdown: "Kostnaður á tímabil",
      dayRate: "Dagstaxti",
      weekRate: "Vikutaxti",
      monthRate: "Mánaðartaxti",
      yearRate: "Árstaxti",
      workingDaysBasis: "Dagstaxti miðað við 260 virka daga á ári.",
    },
    labelsEn: englishLabelsForCountry("Iceland", "public holidays"),
  },
};

export const COUNTRY_LIST = Object.values(COUNTRIES);
export const COUNTRY_CODES = Object.keys(COUNTRIES) as CountryCode[];

export function getCountryConfig(code: CountryCode): CountryConfig {
  return COUNTRIES[code];
}

export function resolveLabels(country: CountryCode, lang: AppLanguage): UiLabels {
  const c = COUNTRIES[country];
  return lang === "en" ? c.labelsEn : c.labels;
}

export function getCountryPaths(country: CountryCode, lang: AppLanguage = "native") {
  return pathsFor(COUNTRIES[country], lang);
}

/** Attach resolved paths + labels for rendering. */
export function withLocale(country: CountryCode, lang: AppLanguage = "native") {
  const base = COUNTRIES[country];
  const paths = pathsFor(base, lang);
  const labels = resolveLabels(country, lang);
  return {
    ...base,
    ...paths,
    labels,
    lang,
    htmlLang: lang === "en" ? "en" : base.htmlLang,
  };
}

export type LocalizedCountry = ReturnType<typeof withLocale>;

export function getLanguageFromPath(pathname: string): AppLanguage {
  if (pathname === "/en" || pathname.startsWith("/en/")) return "en";
  return "native";
}

export function getCountryFromPath(pathname: string): CountryCode {
  const parts = pathname.split("/").filter(Boolean);
  if (parts[0] === "en" && parts[1] && COUNTRY_CODES.includes(parts[1] as CountryCode)) {
    return parts[1] as CountryCode;
  }
  const first = parts[0];
  if (first && COUNTRY_CODES.includes(first as CountryCode) && first !== "no") {
    return first as CountryCode;
  }
  // Norway native routes have no prefix
  return "no";
}

export function switchLanguagePath(
  pathname: string,
  country: CountryCode,
  nextLang: AppLanguage,
): string {
  // Map current tool from path roughly
  const lower = pathname.toLowerCase();
  const paths = getCountryPaths(country, nextLang);
  if (
    lower.includes("workday") ||
    lower.includes("arbeids") ||
    lower.includes("arbets") ||
    lower.includes("arbejds") ||
    lower.includes("tyopaivat") ||
    lower.includes("arbeitstage") ||
    lower.includes("dni-robocze") ||
    lower.includes("virkdagar")
  ) {
    return paths.workdaysPath;
  }
  if (
    lower.includes("holiday") ||
    lower.includes("helig") ||
    lower.includes("helg") ||
    lower.includes("feiert") ||
    lower.includes("swieta") ||
    lower.includes("pyhapaivat") ||
    lower.includes("hellig")
  ) {
    // Keep year if present
    const year = lower.match(/20(2[5-7])/)?.[0];
    return year ? `${paths.holidaysPath}/${year}` : paths.holidaysPath;
  }
  if (lower.includes("countdown")) return paths.countdownPath;
  if (
    lower.includes("employment-cost") ||
    lower.includes("arbeidsgiverkostnad") ||
    lower.includes("anstallningskostnad") ||
    lower.includes("ansaettelsesomkostninger") ||
    lower.includes("tyonantajakustannukset") ||
    lower.includes("lohnnebenkosten") ||
    lower.includes("koszt-zatrudnienia") ||
    lower.includes("radningarkostnadur")
  ) {
    return paths.employmentCostPath;
  }
  return paths.homePath;
}

export function isHolidayYear(year: number): year is HolidayYear {
  return year === 2025 || year === 2026 || year === 2027;
}

export function isCountryCode(value: string): value is CountryCode {
  return COUNTRY_CODES.includes(value as CountryCode);
}
