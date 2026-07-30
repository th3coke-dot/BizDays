import type { Metadata } from "next";
import { CountryCountdownPage } from "@/components/CountryPages";
import { withLocale } from "@/lib/countries";
import { createPageMetadata } from "@/lib/seo";

const country = withLocale("dk");

export const metadata: Metadata = createPageMetadata({
  title: "Countdown Danmark",
  description: "Countdown til grundlovsdag, jul og nytår.",
  path: "/dk/countdown",
});

export default function Page() {
  return <CountryCountdownPage country={country} />;
}
