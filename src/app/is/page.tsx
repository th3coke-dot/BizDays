import type { Metadata } from "next";
import { CountryHome } from "@/components/CountryHome";
import { withLocale } from "@/lib/countries";
import { createPageMetadata } from "@/lib/seo";

const country = withLocale("is");

export const metadata: Metadata = createPageMetadata({
  title: "BizDays Ísland",
  absoluteTitle: "BizDays Ísland – virkdagar og helgidagar",
  description: "Reikna virkdaga og sjá helgidaga.",
  path: "/is",
});

export default function Page() {
  return <CountryHome country={country} />;
}
