import type { Metadata } from "next";
import { CountryHome } from "@/components/CountryHome";
import { withLocale } from "@/lib/countries";
import { createPageMetadata } from "@/lib/seo";

const country = withLocale("de");

export const metadata: Metadata = createPageMetadata({
  title: "BizDays Deutschland",
  absoluteTitle: "BizDays Deutschland – Arbeitstage und Feiertage",
  description: "Arbeitstage berechnen und Feiertage ansehen.",
  path: "/de",
});

export default function Page() {
  return <CountryHome country={country} />;
}
