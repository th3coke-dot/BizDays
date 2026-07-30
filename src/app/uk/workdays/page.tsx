import type { Metadata } from "next";
import { CountryWorkdaysPage } from "@/components/CountryPages";
import { withLocale } from "@/lib/countries";
import { createPageMetadata } from "@/lib/seo";

const country = withLocale("uk");

export const metadata: Metadata = createPageMetadata({
  title: "Calculate workdays",
  description: "Count UK workdays between two dates.",
  path: "/uk/workdays",
});

export default function Page() {
  return <CountryWorkdaysPage country={country} />;
}
