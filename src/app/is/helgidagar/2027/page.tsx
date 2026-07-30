import type { Metadata } from "next";
import { CountryHolidaysYear } from "@/components/CountryPages";
import { withLocale } from "@/lib/countries";
import { createPageMetadata } from "@/lib/seo";

const country = withLocale("is");

export const metadata: Metadata = createPageMetadata({
  title: "Helgidagar 2027",
  description: "Íslenskir helgidagar 2027.",
  path: "/is/helgidagar/2027",
});

export default function Page() {
  return <CountryHolidaysYear country={country} year={2027} />;
}
