import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { CountryHolidaysIndex } from "@/components/CountryPages";
import { isCountryCode, withLocale } from "@/lib/countries";
import { createPageMetadata } from "@/lib/seo";

type Props = { params: Promise<{ country: string }> };

export async function generateStaticParams() {
  return ["no", "se", "dk", "fi", "de", "pl", "is"].map((country) => ({
    country,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { country: code } = await params;
  if (!isCountryCode(code) || code === "uk") return {};
  const country = withLocale(code, "en");
  return createPageMetadata({
    title: `Holidays – ${country.name}`,
    description:
      code === "de"
        ? "Germany public holidays 2026 and 2027, including differences by federal state."
        : `${country.name} public holidays 2026 and 2027.`,
    path: `/en/${code}/holidays`,
  });
}

export default async function Page({ params }: Props) {
  const { country: code } = await params;
  if (!isCountryCode(code) || code === "uk") notFound();
  return <CountryHolidaysIndex country={withLocale(code, "en")} />;
}
