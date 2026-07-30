import type { Metadata } from "next";
import { CountryEmploymentCostPage } from "@/components/CountryPages";
import { RelatedLinks } from "@/components/RelatedLinks";
import { withLocale } from "@/lib/countries";
import { createPageMetadata } from "@/lib/seo";

const country = withLocale("no");

export const metadata: Metadata = createPageMetadata({
  title: "Total kostnad ved ansettelse",
  description:
    "Estimer total arbeidsgiverkostnad i Norge med sone for arbeidsgiveravgift og OTP.",
  path: "/arbeidsgiverkostnad",
});

export default function Page() {
  return (
    <>
      <CountryEmploymentCostPage country={country} />
      <div className="mx-auto max-w-3xl px-4 pb-12 sm:px-6">
        <RelatedLinks keys={["arbeidsdager", "feriepenger", "countdown"]} />
      </div>
    </>
  );
}
