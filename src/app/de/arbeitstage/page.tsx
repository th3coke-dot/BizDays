import type { Metadata } from "next";
import { CountryWorkdaysPage } from "@/components/CountryPages";
import { withLocale } from "@/lib/countries";
import { createPageMetadata } from "@/lib/seo";

const country = withLocale("de");

export const metadata: Metadata = createPageMetadata({
  title: "Arbeitstage berechnen",
  description: "Deutsche Arbeitstage zwischen zwei Daten – inkl. Feiertage nach Bundesland.",
  path: "/de/arbeitstage",
});

export default function Page() {
  return <CountryWorkdaysPage country={country} />;
}
