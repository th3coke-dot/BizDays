import type { Metadata } from "next";
import { CountryHolidaysIndex } from "@/components/CountryPages";
import { COUNTRIES } from "@/lib/countries";
import { createPageMetadata } from "@/lib/seo";

const country = COUNTRIES.fi;

export const metadata: Metadata = createPageMetadata({
  title: "Suomen pyhäpäivät",
  description: "Yhteenveto Suomen pyhäpäivistä 2026 ja 2027.",
  path: "/fi/pyhapaivat",
});

export default function Page() {
  return <CountryHolidaysIndex country={country} />;
}
