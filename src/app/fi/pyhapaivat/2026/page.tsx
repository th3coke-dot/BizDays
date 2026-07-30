import type { Metadata } from "next";
import { CountryHolidaysYear } from "@/components/CountryPages";
import { COUNTRIES } from "@/lib/countries";
import { createPageMetadata } from "@/lib/seo";

const country = COUNTRIES.fi;

export const metadata: Metadata = createPageMetadata({
  title: "Pyhäpäivät 2026",
  description: "Suomen pyhäpäivät vuonna 2026.",
  path: "/fi/pyhapaivat/2026",
});

export default function Page() {
  return <CountryHolidaysYear country={country} year={2026} />;
}
