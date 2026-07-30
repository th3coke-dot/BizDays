import type { Metadata } from "next";
import { CountryWorkdaysPage } from "@/components/CountryPages";
import { withLocale } from "@/lib/countries";
import { createPageMetadata } from "@/lib/seo";

const country = withLocale("fi");

export const metadata: Metadata = createPageMetadata({
  title: "Laske työpäivät",
  description: "Laske Suomen työpäivät kahden päivämäärän välillä.",
  path: "/fi/tyopaivat",
});

export default function Page() {
  return <CountryWorkdaysPage country={country} />;
}
