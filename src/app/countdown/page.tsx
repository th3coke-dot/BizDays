import type { Metadata } from "next";
import { CountdownBoard } from "@/components/CountdownBoard";
import { RelatedLinks } from "@/components/RelatedLinks";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Countdown til ferie og merkedager",
  description:
    "Countdown til sommerferie, jul, 17. mai og nyttår. Enkel og delbar.",
  path: "/countdown",
});

export default function CountdownPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6 sm:py-12">
      <header className="mb-8">
        <h1 className="font-[family-name:var(--font-display)] text-3xl font-semibold tracking-tight text-[var(--primary)] sm:text-4xl">
          Countdown
        </h1>
        <p className="mt-3 max-w-2xl text-[var(--muted)]">
          Tell ned til sommerferie, 17. mai, jul og nyttår – og del med kolleger.
        </p>
      </header>

      <CountdownBoard country="no" />
      <RelatedLinks keys={["helligdager", "arbeidsdager", "feriepenger"]} />
    </div>
  );
}
