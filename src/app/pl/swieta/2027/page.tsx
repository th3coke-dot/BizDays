import type { Metadata } from "next";
import { CountryHolidaysYear } from "@/components/CountryPages";
import { withLocale } from "@/lib/countries";
import { createPageMetadata } from "@/lib/seo";

const country = withLocale("pl");

export const metadata: Metadata = createPageMetadata({
  title: "Święta 2027",
  description: "Polskie święta 2027.",
  path: "/pl/swieta/2027",
});

export default function Page() {
  return <CountryHolidaysYear country={country} year={2027} />;
}
