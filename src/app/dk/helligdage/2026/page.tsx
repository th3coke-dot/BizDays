import type { Metadata } from "next";
import { CountryHolidaysYear } from "@/components/CountryPages";
import { withLocale } from "@/lib/countries";
import { createPageMetadata } from "@/lib/seo";

const country = withLocale("dk");

export const metadata: Metadata = createPageMetadata({
  title: "Helligdage 2026",
  description: "Helligdage 2026",
  path: "/dk/helligdage/2026",
});

export default function Page() {
  return <CountryHolidaysYear country={country} year={2026} />;
}
