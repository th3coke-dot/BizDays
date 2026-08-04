import type { Metadata } from "next";
import Link from "next/link";
import { ShieldCheck } from "lucide-react";
import { AdvancedEmploymentCostCalculator } from "@/components/AdvancedEmploymentCostCalculator";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "For employers",
  absoluteTitle: "For employers – CBA-aware total cost of employment | BizDays",
  description:
    "Calculate the total cost of employment with collective bargaining agreements (CBA) and uploaded local agreements factored in.",
  path: "/for-employers",
});

export default function ForEmployersPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6 sm:py-12">
      <header className="mb-8">
        <p className="text-sm font-medium text-[var(--muted)]">For employers</p>
        <h1 className="mt-1 font-[family-name:var(--font-display)] text-3xl font-semibold tracking-tight text-[var(--primary)] sm:text-4xl">
          Total cost of employment, with your agreements factored in
        </h1>
        <p className="mt-3 max-w-2xl text-[var(--muted)]">
          Start from a country&apos;s standard employer charges, then layer on
          a collective bargaining agreement or your own local agreement to
          see the real cost of a hire.
        </p>
      </header>

      <AdvancedEmploymentCostCalculator />

      <section className="mt-10 rounded-2xl border border-[var(--border)] bg-white/60 p-6">
        <div className="flex items-start gap-3">
          <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-[var(--accent)]" aria-hidden />
          <div>
            <h2 className="font-[family-name:var(--font-display)] text-lg font-semibold text-[var(--primary)]">
              How we protect your data
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-[var(--muted)]">
              Uploaded agreements are processed in memory to extract figures
              and are never written to a database or disk. If AI-assisted
              analysis is enabled, only the document text is sent to the
              configured AI provider for that single request — nothing is
              used to train models, and nothing is retained by BizDays
              afterwards.
            </p>
            <Link
              href="/security"
              className="mt-3 inline-flex text-sm font-semibold text-[var(--accent)] hover:underline"
            >
              Read the full data-handling policy →
            </Link>
          </div>
        </div>
      </section>

      <p className="mt-8 text-sm text-[var(--muted)]">
        Looking for something simpler?{" "}
        <Link href="/for-employees" className="text-[var(--accent)] hover:underline">
          Visit the employee tools
        </Link>
        .
      </p>
    </div>
  );
}
