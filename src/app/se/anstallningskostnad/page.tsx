import type { Metadata } from "next";
import { CountryEmploymentCostPage } from "@/components/CountryPages";
import { withLocale } from "@/lib/countries";
import { createPageMetadata } from "@/lib/seo";

const country = withLocale("se");

export const metadata: Metadata = createPageMetadata({
  title: "Total kostnad för anställning",
  description: "Beräkna svensk arbetsgivarkostnad inklusive arbetsgivaravgifter.",
  path: "/se/anstallningskostnad",
});

export default function Page() {
  return <CountryEmploymentCostPage country={country} />;
}
