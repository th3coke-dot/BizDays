import type { Metadata } from "next";
import { CountryHolidaysYear } from "@/components/CountryPages";
import { withLocale } from "@/lib/countries";
import { createPageMetadata } from "@/lib/seo";

const country = withLocale("uk");

export const metadata: Metadata = createPageMetadata({
  title: "Bank holidays 2026",
  description: "UK bank holidays 2026.",
  path: "/uk/holidays/2026",
});

export default function Page() {
  return <CountryHolidaysYear country={country} year={2026} />;
}
