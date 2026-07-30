import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { CountryHome } from "@/components/CountryHome";
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
    title: `${country.name} (English)`,
    absoluteTitle: `BizDays ${country.name} – workdays and holidays`,
    description: country.labels.heroSupport,
    path: `/en/${code}`,
  });
}

export default async function Page({ params }: Props) {
  const { country: code } = await params;
  if (!isCountryCode(code) || code === "uk") notFound();
  return <CountryHome country={withLocale(code, "en")} />;
}
