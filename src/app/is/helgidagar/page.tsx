import type { Metadata } from "next";
import { CountryHolidaysIndex } from "@/components/CountryPages";
import { withLocale } from "@/lib/countries";
import { createPageMetadata } from "@/lib/seo";

const country = withLocale("is");

export const metadata: Metadata = createPageMetadata({
  title: "Íslenskir helgidagar",
  description: "Helgidagar 2026 og 2027.",
  path: "/is/helgidagar",
});

export default function Page() {
  return <CountryHolidaysIndex country={country} />;
}
