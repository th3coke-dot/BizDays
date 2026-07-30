import type { Metadata } from "next";
import { CountryHome } from "@/components/CountryHome";
import { COUNTRIES } from "@/lib/countries";
import { createPageMetadata } from "@/lib/seo";

const country = COUNTRIES.fi;

export const metadata: Metadata = createPageMetadata({
  title: "BizDays Suomi",
  absoluteTitle: "BizDays Suomi – työpäivät ja pyhäpäivät",
  description:
    "Laske Suomen työpäivät ja katso pyhäpäivät vuodelle 2026 ja 2027.",
  path: "/fi",
});

export default function Page() {
  return <CountryHome country={country} />;
}
