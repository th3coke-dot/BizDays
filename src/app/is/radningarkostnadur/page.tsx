import type { Metadata } from "next";
import { CountryEmploymentCostPage } from "@/components/CountryPages";
import { withLocale } from "@/lib/countries";
import { createPageMetadata } from "@/lib/seo";

const country = withLocale("is");

export const metadata: Metadata = createPageMetadata({
  title: "Heildarkostnaður við ráðningu",
  description: "Áætlaðu íslenskan kostnað vinnuveitanda með tryggingagjaldi.",
  path: "/is/radningarkostnadur",
});

export default function Page() {
  return <CountryEmploymentCostPage country={country} />;
}
