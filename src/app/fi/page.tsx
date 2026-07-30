import type { Metadata } from "next";
import { CountryHome } from "@/components/CountryHome";
import { withLocale } from "@/lib/countries";
import { createPageMetadata } from "@/lib/seo";

const country = withLocale("fi");

export const metadata: Metadata = createPageMetadata({
  title: "BizDays Suomi",
  absoluteTitle: "BizDays Suomi – työpäivät ja pyhäpäivät",
  description: "Laske Suomen työpäivät ja katso pyhäpäivät.",
  path: "/fi",
});

export default function Page() {
  return <CountryHome country={country} />;
}
