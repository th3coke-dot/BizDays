import type { Metadata } from "next";
import Link from "next/link";
import { COUNTRY_LIST } from "@/lib/countries";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "English",
  absoluteTitle: "BizDays – Workdays and holidays in English",
  description:
    "Choose a country and calculate workdays, view holidays, and countdowns – in English.",
  path: "/en",
});

export default function EnglishHubPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
      <h1 className="font-[family-name:var(--font-display)] text-4xl font-semibold text-[var(--primary)]">
        Choose a country
      </h1>
      <p className="mt-3 text-[var(--muted)]">
        All country tools are available in English.
      </p>
      <ul className="mt-8 grid gap-3 sm:grid-cols-2">
        {COUNTRY_LIST.map((c) => (
          <li key={c.code}>
            <Link
              href={c.code === "uk" ? "/uk" : `/en/${c.code}`}
              className="block rounded-xl border border-[var(--border)] bg-white/80 px-4 py-4 font-semibold text-[var(--primary)] hover:border-[var(--accent)]"
            >
              {c.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
