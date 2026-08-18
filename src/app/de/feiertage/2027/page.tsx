import type { Metadata } from "next";
import { CountryHolidaysYear } from "@/components/CountryPages";
import { withLocale } from "@/lib/countries";
import { createPageMetadata } from "@/lib/seo";

const country = withLocale("de");

export const metadata: Metadata = createPageMetadata({
  title: "Feiertage 2027",
  description: "Deutsche Feiertage 2027 – bundesweit und nach Bundesland.",
  path: "/de/feiertage/2027",
});

export default function Page() {
  return <CountryHolidaysYear country={country} year={2027} />;
}
