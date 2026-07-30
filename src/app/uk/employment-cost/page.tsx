import type { Metadata } from "next";
import { CountryEmploymentCostPage } from "@/components/CountryPages";
import { withLocale } from "@/lib/countries";
import { createPageMetadata } from "@/lib/seo";

const country = withLocale("uk");

export const metadata: Metadata = createPageMetadata({
  title: "Total cost of employment",
  description:
    "Estimate UK employer cost including National Insurance and pension auto-enrolment.",
  path: "/uk/employment-cost",
});

export default function Page() {
  return <CountryEmploymentCostPage country={country} />;
}
