import type { Metadata } from "next";
import { CountryCountdownPage } from "@/components/CountryPages";
import { withLocale } from "@/lib/countries";
import { createPageMetadata } from "@/lib/seo";

const country = withLocale("fi");

export const metadata: Metadata = createPageMetadata({
  title: "Countdown Suomi",
  description: "Countdown itsenäisyyspäivään, juhannukseen ja jouluun.",
  path: "/fi/countdown",
});

export default function Page() {
  return <CountryCountdownPage country={country} />;
}
