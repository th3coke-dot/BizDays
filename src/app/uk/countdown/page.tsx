import type { Metadata } from "next";
import { CountryCountdownPage } from "@/components/CountryPages";
import { withLocale } from "@/lib/countries";
import { createPageMetadata } from "@/lib/seo";

const country = withLocale("uk");

export const metadata: Metadata = createPageMetadata({
  title: "Countdown UK",
  description: "Countdown to Christmas, New Year and bank holidays.",
  path: "/uk/countdown",
});

export default function Page() {
  return <CountryCountdownPage country={country} />;
}
