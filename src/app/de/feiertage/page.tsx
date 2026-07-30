import type { Metadata } from "next";
import { CountryHolidaysIndex } from "@/components/CountryPages";
import { withLocale } from "@/lib/countries";
import { createPageMetadata } from "@/lib/seo";

const country = withLocale("de");

export const metadata: Metadata = createPageMetadata({
  title: "Deutsche Feiertage",
  description: "Bundesweite Feiertage 2026 und 2027.",
  path: "/de/feiertage",
});

export default function Page() {
  return <CountryHolidaysIndex country={country} />;
}
