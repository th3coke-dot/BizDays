import type { Metadata } from "next";
import { CountryHolidaysYear } from "@/components/CountryPages";
import { COUNTRIES } from "@/lib/countries";
import { createPageMetadata } from "@/lib/seo";

const country = COUNTRIES.dk;

export const metadata: Metadata = createPageMetadata({
  title: "Helligdage 2027",
  description: "Danske helligdage 2027.",
  path: "/dk/helligdage/2027",
});

export default function Page() {
  return <CountryHolidaysYear country={country} year={2027} />;
}
