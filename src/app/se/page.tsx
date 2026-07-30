import type { Metadata } from "next";
import { CountryHome } from "@/components/CountryHome";
import { COUNTRIES } from "@/lib/countries";
import { createPageMetadata } from "@/lib/seo";

const country = COUNTRIES.se;

export const metadata: Metadata = createPageMetadata({
  title: "BizDays Sverige",
  absoluteTitle: "BizDays Sverige – arbetsdagar och helgdagar",
  description:
    "Beräkna svenska arbetsdagar och se röda dagar för 2026 och 2027.",
  path: "/se",
});

export default function SwedenHomePage() {
  return <CountryHome country={country} />;
}
