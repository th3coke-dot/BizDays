import type { Metadata } from "next";
import { CountryWorkdaysPage } from "@/components/CountryPages";
import { COUNTRIES } from "@/lib/countries";
import { createPageMetadata } from "@/lib/seo";

const country = COUNTRIES.fi;

export const metadata: Metadata = createPageMetadata({
  title: "Laske työpäivät",
  description:
    "Laske Suomen työpäivät kahden päivämäärän välillä. Viikonloput ja pyhäpäivät vähennetään.",
  path: "/fi/tyopaivat",
});

export default function Page() {
  return <CountryWorkdaysPage country={country} />;
}
