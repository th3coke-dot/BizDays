import type { Metadata } from "next";
import { CountryHome } from "@/components/CountryHome";
import { withLocale } from "@/lib/countries";
import { createPageMetadata } from "@/lib/seo";

const country = withLocale("se");

export const metadata: Metadata = createPageMetadata({
  title: "BizDays Sverige",
  absoluteTitle: "BizDays Sverige – arbetsdagar och helgdagar",
  description: "Beräkna svenska arbetsdagar och se röda dagar.",
  path: "/se",
});

export default function Page() {
  return <CountryHome country={country} />;
}
