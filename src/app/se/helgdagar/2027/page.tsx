import type { Metadata } from "next";
import { CountryHolidaysYear } from "@/components/CountryPages";
import { COUNTRIES } from "@/lib/countries";
import { createPageMetadata } from "@/lib/seo";

const country = COUNTRIES.se;

export const metadata: Metadata = createPageMetadata({
  title: "Helgdagar 2027",
  description: "Svenska helgdagar och röda dagar 2027.",
  path: "/se/helgdagar/2027",
});

export default function Page() {
  return <CountryHolidaysYear country={country} year={2027} />;
}
