import type { Metadata } from "next";
import { CountryHolidaysYear } from "@/components/CountryPages";
import { COUNTRIES } from "@/lib/countries";
import { createPageMetadata } from "@/lib/seo";

const country = COUNTRIES.dk;

export const metadata: Metadata = createPageMetadata({
  title: "Helligdage 2026",
  description: "Danske helligdage 2026.",
  path: "/dk/helligdage/2026",
});

export default function Page() {
  return <CountryHolidaysYear country={country} year={2026} />;
}
