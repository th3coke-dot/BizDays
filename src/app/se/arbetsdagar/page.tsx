import type { Metadata } from "next";
import { CountryWorkdaysPage } from "@/components/CountryPages";
import { COUNTRIES } from "@/lib/countries";
import { createPageMetadata } from "@/lib/seo";

const country = COUNTRIES.se;

export const metadata: Metadata = createPageMetadata({
  title: "Beräkna arbetsdagar",
  description:
    "Räkna svenska arbetsdagar mellan två datum. Helger och helgdagar dras av.",
  path: "/se/arbetsdagar",
});

export default function Page() {
  return <CountryWorkdaysPage country={country} />;
}
