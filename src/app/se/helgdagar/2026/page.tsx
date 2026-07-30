import type { Metadata } from "next";
import { CountryHolidaysYear } from "@/components/CountryPages";
import { withLocale } from "@/lib/countries";
import { createPageMetadata } from "@/lib/seo";

const country = withLocale("se");

export const metadata: Metadata = createPageMetadata({
  title: "Helgdagar 2026",
  description: "Helgdagar 2026",
  path: "/se/helgdagar/2026",
});

export default function Page() {
  return <CountryHolidaysYear country={country} year={2026} />;
}
