import type { Metadata } from "next";
import { CountryHolidaysYear } from "@/components/CountryPages";
import { withLocale } from "@/lib/countries";
import { createPageMetadata } from "@/lib/seo";

const country = withLocale("de");

export const metadata: Metadata = createPageMetadata({
  title: "Feiertage 2026",
  description: "Deutsche Feiertage 2026.",
  path: "/de/feiertage/2026",
});

export default function Page() {
  return <CountryHolidaysYear country={country} year={2026} />;
}
