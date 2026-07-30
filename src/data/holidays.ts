import type { Holiday, HolidayYear } from "@/types";
import type { CountryCode } from "@/lib/countries";
import { getAllHolidays, getHolidaysForYear } from "@/data/holidays-no";
import { getAllHolidaysSE, getHolidaysSEForYear } from "@/data/holidays-se";
import { getAllHolidaysDK, getHolidaysDKForYear } from "@/data/holidays-dk";
import { getAllHolidaysFI, getHolidaysFIForYear } from "@/data/holidays-fi";
import { getAllHolidaysUK, getHolidaysUKForYear } from "@/data/holidays-uk";
import { getAllHolidaysDE, getHolidaysDEForYear } from "@/data/holidays-de";
import { getAllHolidaysPL, getHolidaysPLForYear } from "@/data/holidays-pl";
import { getAllHolidaysIS, getHolidaysISForYear } from "@/data/holidays-is";

export function getHolidaysForCountryYear(
  country: CountryCode,
  year: number,
): Holiday[] {
  switch (country) {
    case "se":
      return getHolidaysSEForYear(year);
    case "dk":
      return getHolidaysDKForYear(year);
    case "fi":
      return getHolidaysFIForYear(year);
    case "uk":
      return getHolidaysUKForYear(year);
    case "de":
      return getHolidaysDEForYear(year);
    case "pl":
      return getHolidaysPLForYear(year);
    case "is":
      return getHolidaysISForYear(year);
    default:
      return getHolidaysForYear(year);
  }
}

export function getAllHolidaysForCountry(country: CountryCode): Holiday[] {
  switch (country) {
    case "se":
      return getAllHolidaysSE();
    case "dk":
      return getAllHolidaysDK();
    case "fi":
      return getAllHolidaysFI();
    case "uk":
      return getAllHolidaysUK();
    case "de":
      return getAllHolidaysDE();
    case "pl":
      return getAllHolidaysPL();
    case "is":
      return getAllHolidaysIS();
    default:
      return getAllHolidays();
  }
}

export function getHolidayYears(): HolidayYear[] {
  return [2025, 2026, 2027];
}
