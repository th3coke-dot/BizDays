import type { Metadata } from "next";
import { CountryHolidaysIndex } from "@/components/CountryPages";
import { COUNTRIES } from "@/lib/countries";
import { createPageMetadata } from "@/lib/seo";

const country = COUNTRIES.se;

export const metadata: Metadata = createPageMetadata({
  title: "Svenska helgdagar",
  description: "Översikt över svenska röda dagar 2026 och 2027.",
  path: "/se/helgdagar",
});

export default function Page() {
  return <CountryHolidaysIndex country={country} />;
}
