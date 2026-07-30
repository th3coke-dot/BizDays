import type { Metadata } from "next";
import { CountryWorkdaysPage } from "@/components/CountryPages";
import { withLocale } from "@/lib/countries";
import { createPageMetadata } from "@/lib/seo";

const country = withLocale("pl");

export const metadata: Metadata = createPageMetadata({
  title: "Oblicz dni robocze",
  description: "Polskie dni robocze między dwiema datami.",
  path: "/pl/dni-robocze",
});

export default function Page() {
  return <CountryWorkdaysPage country={country} />;
}
