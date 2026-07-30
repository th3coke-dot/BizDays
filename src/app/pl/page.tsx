import type { Metadata } from "next";
import { CountryHome } from "@/components/CountryHome";
import { withLocale } from "@/lib/countries";
import { createPageMetadata } from "@/lib/seo";

const country = withLocale("pl");

export const metadata: Metadata = createPageMetadata({
  title: "BizDays Polska",
  absoluteTitle: "BizDays Polska – dni robocze i święta",
  description: "Oblicz dni robocze i zobacz święta.",
  path: "/pl",
});

export default function Page() {
  return <CountryHome country={country} />;
}
