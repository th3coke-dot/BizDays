import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { CountryEmploymentCostPage } from "@/components/CountryPages";
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
    title: `Total cost of employment – ${country.name}`,
    description: country.labels.employmentCostSupport,
    path: `/en/${code}/employment-cost`,
  });
}

export default async function Page({ params }: Props) {
  const { country: code } = await params;
  if (!isCountryCode(code) || code === "uk") notFound();
  return <CountryEmploymentCostPage country={withLocale(code, "en")} />;
}
