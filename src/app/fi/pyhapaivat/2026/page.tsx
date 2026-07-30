import type { Metadata } from "next";
import { CountryHolidaysYear } from "@/components/CountryPages";
import { withLocale } from "@/lib/countries";
import { createPageMetadata } from "@/lib/seo";

const country = withLocale("fi");

export const metadata: Metadata = createPageMetadata({
  title: "Pyhäpäivät 2026",
  description: "Pyhäpäivät 2026",
  path: "/fi/pyhapaivat/2026",
});

export default function Page() {
  return <CountryHolidaysYear country={country} year={2026} />;
}
