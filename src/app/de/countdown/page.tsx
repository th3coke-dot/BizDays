import type { Metadata } from "next";
import { CountryCountdownPage } from "@/components/CountryPages";
import { withLocale } from "@/lib/countries";
import { createPageMetadata } from "@/lib/seo";

const country = withLocale("de");

export const metadata: Metadata = createPageMetadata({
  title: "Countdown Deutschland",
  description: "Countdown zu Feiertagen in Deutschland.",
  path: "/de/countdown",
});

export default function Page() {
  return <CountryCountdownPage country={country} />;
}
