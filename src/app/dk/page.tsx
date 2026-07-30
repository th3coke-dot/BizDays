import type { Metadata } from "next";
import { CountryHome } from "@/components/CountryHome";
import { COUNTRIES } from "@/lib/countries";
import { createPageMetadata } from "@/lib/seo";

const country = COUNTRIES.dk;

export const metadata: Metadata = createPageMetadata({
  title: "BizDays Danmark",
  absoluteTitle: "BizDays Danmark – arbejdsdage og helligdage",
  description:
    "Beregn danske arbejdsdage og se helligdage for 2026 og 2027.",
  path: "/dk",
});

export default function Page() {
  return <CountryHome country={country} />;
}
