import type { Metadata } from "next";
import { CountryWorkdaysPage } from "@/components/CountryPages";
import { COUNTRIES } from "@/lib/countries";
import { createPageMetadata } from "@/lib/seo";

const country = COUNTRIES.dk;

export const metadata: Metadata = createPageMetadata({
  title: "Beregn arbejdsdage",
  description:
    "Find antal danske arbejdsdage mellem to datoer. Weekender og helligdage trækkes fra.",
  path: "/dk/arbejdsdage",
});

export default function Page() {
  return <CountryWorkdaysPage country={country} />;
}
