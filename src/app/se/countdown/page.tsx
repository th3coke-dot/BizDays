import type { Metadata } from "next";
import { CountryCountdownPage } from "@/components/CountryPages";
import { withLocale } from "@/lib/countries";
import { createPageMetadata } from "@/lib/seo";

const country = withLocale("se");

export const metadata: Metadata = createPageMetadata({
  title: "Countdown Sverige",
  description: "Countdown till nationaldagen, midsommar, jul och nyår.",
  path: "/se/countdown",
});

export default function Page() {
  return <CountryCountdownPage country={country} />;
}
