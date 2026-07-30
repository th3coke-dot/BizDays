import type { Metadata } from "next";
import { CountryHolidaysYear } from "@/components/CountryPages";
import { withLocale } from "@/lib/countries";
import { createPageMetadata } from "@/lib/seo";

const country = withLocale("dk");

export const metadata: Metadata = createPageMetadata({
  title: "Helligdage 2027",
  description: "Helligdage 2027",
  path: "/dk/helligdage/2027",
});

export default function Page() {
  return <CountryHolidaysYear country={country} year={2027} />;
}
