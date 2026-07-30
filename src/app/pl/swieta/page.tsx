import type { Metadata } from "next";
import { CountryHolidaysIndex } from "@/components/CountryPages";
import { withLocale } from "@/lib/countries";
import { createPageMetadata } from "@/lib/seo";

const country = withLocale("pl");

export const metadata: Metadata = createPageMetadata({
  title: "Polskie święta",
  description: "Święta państwowe 2026 i 2027.",
  path: "/pl/swieta",
});

export default function Page() {
  return <CountryHolidaysIndex country={country} />;
}
