import type { Holiday, HolidayYear } from "@/types";
import type { CountryCode } from "@/lib/countries";
import { getAllHolidays, getHolidaysForYear } from "@/data/holidays-no";
import { getAllHolidaysSE, getHolidaysSEForYear } from "@/data/holidays-se";
import { getAllHolidaysDK, getHolidaysDKForYear } from "@/data/holidays-dk";
import { getAllHolidaysFI, getHolidaysFIForYear } from "@/data/holidays-fi";

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
    default:
      return getAllHolidays();
  }
}

export function getHolidayYears(): HolidayYear[] {
  return [2025, 2026, 2027];
}
