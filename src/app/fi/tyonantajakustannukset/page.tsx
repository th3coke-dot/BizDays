import type { Metadata } from "next";
import { CountryEmploymentCostPage } from "@/components/CountryPages";
import { withLocale } from "@/lib/countries";
import { createPageMetadata } from "@/lib/seo";

const country = withLocale("fi");

export const metadata: Metadata = createPageMetadata({
  title: "Työllistämisen kokonaiskustannus",
  description: "Arvioi suomalaisen työnantajan sivukulut bruttöpalkan päälle.",
  path: "/fi/tyonantajakustannukset",
});

export default function Page() {
  return <CountryEmploymentCostPage country={country} />;
}
