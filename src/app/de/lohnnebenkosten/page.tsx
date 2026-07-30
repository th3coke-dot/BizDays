import type { Metadata } from "next";
import { CountryEmploymentCostPage } from "@/components/CountryPages";
import { withLocale } from "@/lib/countries";
import { createPageMetadata } from "@/lib/seo";

const country = withLocale("de");

export const metadata: Metadata = createPageMetadata({
  title: "Gesamtkosten der Beschäftigung",
  description: "Schätzen Sie deutsche Lohnnebenkosten inkl. Sozialversicherungsanteile.",
  path: "/de/lohnnebenkosten",
});

export default function Page() {
  return <CountryEmploymentCostPage country={country} />;
}
