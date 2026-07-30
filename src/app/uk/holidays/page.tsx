import type { Metadata } from "next";
import { CountryHolidaysIndex } from "@/components/CountryPages";
import { withLocale } from "@/lib/countries";
import { createPageMetadata } from "@/lib/seo";

const country = withLocale("uk");

export const metadata: Metadata = createPageMetadata({
  title: "UK bank holidays",
  description: "England & Wales bank holidays 2026 and 2027.",
  path: "/uk/holidays",
});

export default function Page() {
  return <CountryHolidaysIndex country={country} />;
}
