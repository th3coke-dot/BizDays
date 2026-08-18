import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { format, parseISO, type Locale } from "date-fns";
import { da, de, enGB, fi, is, nb, pl, sv } from "date-fns/locale";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export type DateLocaleCode = "nb" | "sv" | "da" | "fi" | "de" | "pl" | "is" | "en";

const DATE_LOCALES: Record<DateLocaleCode, Locale> = {
  nb,
  sv,
  da,
  fi,
  de,
  pl,
  is,
  en: enGB,
};

export function resolveDateLocale(
  countryOrLocale?: string,
  lang?: "native" | "en",
): DateLocaleCode {
  if (lang === "en") return "en";
  switch (countryOrLocale) {
    case "no":
    case "nb":
      return "nb";
    case "se":
    case "sv":
      return "sv";
    case "dk":
    case "da":
      return "da";
    case "fi":
      return "fi";
    case "de":
      return "de";
    case "pl":
      return "pl";
    case "is":
      return "is";
    case "uk":
    case "en":
      return "en";
    default:
      return "nb";
  }
}

export function formatDate(
  date: string | Date,
  pattern?: string,
  locale: DateLocaleCode = "nb",
) {
  const d = typeof date === "string" ? parseISO(date) : date;
  const resolvedPattern =
    pattern ?? (locale === "en" ? "d MMMM yyyy" : "d. MMMM yyyy");
  return format(d, resolvedPattern, {
    locale: DATE_LOCALES[locale] ?? enGB,
  });
}

export function holidayDatePattern(locale: DateLocaleCode) {
  return locale === "en" ? "EEEE, d MMMM yyyy" : "EEEE d. MMMM yyyy";
}

export function holidayName(holiday: { name: string; nameEn?: string }, lang?: "native" | "en") {
  return lang === "en" && holiday.nameEn ? holiday.nameEn : holiday.name;
}

export function formatDateNO(date: string | Date, pattern = "d. MMMM yyyy") {
  return formatDate(date, pattern, "nb");
}

export function formatNOK(amount: number) {
  return new Intl.NumberFormat("nb-NO", {
    style: "currency",
    currency: "NOK",
    maximumFractionDigits: 0,
  }).format(amount);
}

export function toISODate(date: Date) {
  return format(date, "yyyy-MM-dd");
}
