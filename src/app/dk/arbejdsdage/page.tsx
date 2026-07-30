import type { Metadata } from "next";
import { CountryWorkdaysPage } from "@/components/CountryPages";
import { withLocale } from "@/lib/countries";
import { createPageMetadata } from "@/lib/seo";

const country = withLocale("dk");

export const metadata: Metadata = createPageMetadata({
  title: "Beregn arbejdsdage",
  description: "Find danske arbejdsdage mellem to datoer.",
  path: "/dk/arbejdsdage",
});

export default function Page() {
  return <CountryWorkdaysPage country={country} />;
}
