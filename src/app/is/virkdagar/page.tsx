import type { Metadata } from "next";
import { CountryWorkdaysPage } from "@/components/CountryPages";
import { withLocale } from "@/lib/countries";
import { createPageMetadata } from "@/lib/seo";

const country = withLocale("is");

export const metadata: Metadata = createPageMetadata({
  title: "Reikna virkdaga",
  description: "Íslenskir virkdagar milli tveggja dagsetninga.",
  path: "/is/virkdagar",
});

export default function Page() {
  return <CountryWorkdaysPage country={country} />;
}
