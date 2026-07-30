import Link from "next/link";
import { ArrowRight } from "lucide-react";

export type RelatedLink = {
  href: string;
  title: string;
  description: string;
};

const CATALOG: Record<string, RelatedLink> = {
  arbeidsdager: {
    href: "/arbeidsdager",
    title: "Beregn arbeidsdager",
    description: "Finn antall arbeidsdager mellom to datoer.",
  },
  helligdager: {
    href: "/helligdager",
    title: "Norske helligdager",
    description: "Se røde dager for 2026 og 2027.",
  },
  feriepenger: {
    href: "/feriepenger",
    title: "Beregn feriepenger",
    description: "Regn ut feriepenger med riktig sats.",
  },
  countdown: {
    href: "/countdown",
    title: "Countdown",
    description: "Tell ned til ferie og merkedager.",
  },
  om: {
    href: "/om",
    title: "Om BizDays",
    description: "Hva siden er, og hvordan du tar kontakt.",
  },
};

type RelatedLinksProps = {
  /** Keys from the catalog to show */
  keys: (keyof typeof CATALOG)[];
  heading?: string;
};

export function RelatedLinks({
  keys,
  heading = "Se også",
}: RelatedLinksProps) {
  const links = keys.map((key) => CATALOG[key]).filter(Boolean);

  if (links.length === 0) return null;

  return (
    <section className="mt-12 border-t border-[var(--border)] pt-10">
      <h2 className="font-[family-name:var(--font-display)] text-xl font-semibold text-[var(--primary)]">
        {heading}
      </h2>
      <ul className="mt-4 grid gap-3 sm:grid-cols-2">
        {links.map((link) => (
          <li key={link.href}>
            <Link
              href={link.href}
              className="group flex items-start justify-between gap-3 rounded-xl border border-[var(--border)] bg-white/70 px-4 py-4 transition hover:border-[var(--accent)]"
            >
              <span>
                <span className="block font-semibold text-[var(--primary)]">
                  {link.title}
                </span>
                <span className="mt-1 block text-sm text-[var(--muted)]">
                  {link.description}
                </span>
              </span>
              <ArrowRight className="mt-1 h-4 w-4 shrink-0 text-[var(--accent)] transition group-hover:translate-x-0.5" />
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
