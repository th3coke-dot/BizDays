import type { Metadata } from "next";
import { CountryHolidaysIndex } from "@/components/CountryPages";
import { withLocale } from "@/lib/countries";
import { createPageMetadata } from "@/lib/seo";

const country = withLocale("dk");

export const metadata: Metadata = createPageMetadata({
  title: "Danske helligdage",
  description: "Oversigt over danske helligdage 2026 og 2027.",
  path: "/dk/helligdage",
});

export default function Page() {
  return <CountryHolidaysIndex country={country} />;
}
