import type { Metadata } from "next";
import { CountryHome } from "@/components/CountryHome";
import { withLocale } from "@/lib/countries";
import { createPageMetadata } from "@/lib/seo";

const country = withLocale("uk");

export const metadata: Metadata = createPageMetadata({
  title: "BizDays UK",
  absoluteTitle: "BizDays UK – workdays and bank holidays",
  description: "Calculate UK workdays and view bank holidays.",
  path: "/uk",
});

export default function Page() {
  return <CountryHome country={country} />;
}
