import type { Metadata } from "next";
import { CountryHolidaysYear } from "@/components/CountryPages";
import { COUNTRIES } from "@/lib/countries";
import { createPageMetadata } from "@/lib/seo";

const country = COUNTRIES.fi;

export const metadata: Metadata = createPageMetadata({
  title: "Pyhäpäivät 2027",
  description: "Suomen pyhäpäivät vuonna 2027.",
  path: "/fi/pyhapaivat/2027",
});

export default function Page() {
  return <CountryHolidaysYear country={country} year={2027} />;
}
