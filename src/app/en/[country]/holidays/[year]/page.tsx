import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { CountryHolidaysYear } from "@/components/CountryPages";
import { isCountryCode, isHolidayYear, withLocale } from "@/lib/countries";
import { createPageMetadata } from "@/lib/seo";

type Props = { params: Promise<{ country: string; year: string }> };

export async function generateStaticParams() {
  const countries = ["no", "se", "dk", "fi", "de", "pl", "is"];
  const years = ["2026", "2027"];
  return countries.flatMap((country) =>
    years.map((year) => ({ country, year })),
  );
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { country: code, year } = await params;
  if (!isCountryCode(code) || code === "uk") return {};
  const country = withLocale(code, "en");
  return createPageMetadata({
    title: `Holidays ${year} – ${country.name}`,
    description: `${country.name} public holidays ${year}.`,
    path: `/en/${code}/holidays/${year}`,
  });
}

export default async function Page({ params }: Props) {
  const { country: code, year: yearStr } = await params;
  const year = Number(yearStr);
  if (!isCountryCode(code) || code === "uk" || !isHolidayYear(year)) notFound();
  return <CountryHolidaysYear country={withLocale(code, "en")} year={year} />;
}
