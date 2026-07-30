import type { Metadata } from "next";
import { CountryHome } from "@/components/CountryHome";
import { withLocale } from "@/lib/countries";
import { createPageMetadata } from "@/lib/seo";

const country = withLocale("dk");

export const metadata: Metadata = createPageMetadata({
  title: "BizDays Danmark",
  absoluteTitle: "BizDays Danmark – arbejdsdage og helligdage",
  description: "Beregn danske arbejdsdage og se helligdage.",
  path: "/dk",
});

export default function Page() {
  return <CountryHome country={country} />;
}
