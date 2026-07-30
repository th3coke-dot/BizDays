import type { Metadata } from "next";
import { CountryCountdownPage } from "@/components/CountryPages";
import { withLocale } from "@/lib/countries";
import { createPageMetadata } from "@/lib/seo";

const country = withLocale("pl");

export const metadata: Metadata = createPageMetadata({
  title: "Countdown Polska",
  description: "Countdown do świąt w Polsce.",
  path: "/pl/countdown",
});

export default function Page() {
  return <CountryCountdownPage country={country} />;
}
