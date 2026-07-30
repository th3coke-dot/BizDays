import type { Metadata } from "next";
import { CountryEmploymentCostPage } from "@/components/CountryPages";
import { withLocale } from "@/lib/countries";
import { createPageMetadata } from "@/lib/seo";

const country = withLocale("dk");

export const metadata: Metadata = createPageMetadata({
  title: "Samlede omkostninger ved ansættelse",
  description: "Estimer danske arbejdsgiveromkostninger inkl. feriepenge.",
  path: "/dk/ansaettelsesomkostninger",
});

export default function Page() {
  return <CountryEmploymentCostPage country={country} />;
}
