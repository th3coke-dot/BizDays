import type { Metadata } from "next";
import { CountryCountdownPage } from "@/components/CountryPages";
import { withLocale } from "@/lib/countries";
import { createPageMetadata } from "@/lib/seo";

const country = withLocale("is");

export const metadata: Metadata = createPageMetadata({
  title: "Countdown Ísland",
  description: "Countdown að helgidögum á Íslandi.",
  path: "/is/countdown",
});

export default function Page() {
  return <CountryCountdownPage country={country} />;
}
