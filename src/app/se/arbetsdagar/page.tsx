import type { Metadata } from "next";
import { CountryWorkdaysPage } from "@/components/CountryPages";
import { withLocale } from "@/lib/countries";
import { createPageMetadata } from "@/lib/seo";

const country = withLocale("se");

export const metadata: Metadata = createPageMetadata({
  title: "Beräkna arbetsdagar",
  description: "Räkna svenska arbetsdagar mellan två datum.",
  path: "/se/arbetsdagar",
});

export default function Page() {
  return <CountryWorkdaysPage country={country} />;
}
