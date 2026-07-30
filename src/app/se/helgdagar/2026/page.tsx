import type { Metadata } from "next";
import { CountryHolidaysYear } from "@/components/CountryPages";
import { COUNTRIES } from "@/lib/countries";
import { createPageMetadata } from "@/lib/seo";

const country = COUNTRIES.se;

export const metadata: Metadata = createPageMetadata({
  title: "Helgdagar 2026",
  description: "Svenska helgdagar och röda dagar 2026.",
  path: "/se/helgdagar/2026",
});

export default function Page() {
  return <CountryHolidaysYear country={country} year={2026} />;
}
