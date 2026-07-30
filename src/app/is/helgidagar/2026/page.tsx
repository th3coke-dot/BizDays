import type { Metadata } from "next";
import { CountryHolidaysYear } from "@/components/CountryPages";
import { withLocale } from "@/lib/countries";
import { createPageMetadata } from "@/lib/seo";

const country = withLocale("is");

export const metadata: Metadata = createPageMetadata({
  title: "Helgidagar 2026",
  description: "Íslenskir helgidagar 2026.",
  path: "/is/helgidagar/2026",
});

export default function Page() {
  return <CountryHolidaysYear country={country} year={2026} />;
}
