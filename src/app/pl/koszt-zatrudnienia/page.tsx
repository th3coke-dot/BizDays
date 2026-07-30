import type { Metadata } from "next";
import { CountryEmploymentCostPage } from "@/components/CountryPages";
import { withLocale } from "@/lib/countries";
import { createPageMetadata } from "@/lib/seo";

const country = withLocale("pl");

export const metadata: Metadata = createPageMetadata({
  title: "Całkowity koszt zatrudnienia",
  description: "Oszacuj polski koszt pracodawcy z ZUS i składką wypadkową.",
  path: "/pl/koszt-zatrudnienia",
});

export default function Page() {
  return <CountryEmploymentCostPage country={country} />;
}
