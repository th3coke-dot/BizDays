import Link from "next/link";

const footerLinks = [
  { href: "/arbeidsdager", label: "Arbeidsdager" },
  { href: "/helligdager", label: "Helligdager" },
  { href: "/feriepenger", label: "Feriepenger" },
  { href: "/countdown", label: "Countdown" },
  { href: "/om", label: "Om BizDays" },
];

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-auto border-t border-[var(--border)] bg-[var(--primary)] text-white">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-12 sm:px-6 md:grid-cols-[1.4fr_1fr]">
        <div>
          <p className="font-[family-name:var(--font-display)] text-2xl font-bold tracking-tight">
            Biz<span className="text-[var(--accent-soft)]">Days</span>
          </p>
          <p className="mt-3 max-w-md text-sm leading-relaxed text-slate-300">
            Enkle verktøy for arbeidsdager, helligdager og feriepenger i Norge.
          </p>
        </div>
        <div>
          <p className="text-sm font-semibold uppercase tracking-wider text-slate-400">
            Sider
          </p>
          <ul className="mt-4 grid gap-2 sm:grid-cols-2">
            {footerLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-sm text-slate-200 transition hover:text-white"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-6xl flex-col gap-2 px-4 py-5 text-xs text-slate-400 sm:flex-row sm:items-center sm:justify-between sm:px-6">
          <p>© {year} BizDays. Alle rettigheter forbeholdt.</p>
          <p>Laget for norske bedrifter og ansatte.</p>
        </div>
      </div>
    </footer>
  );
}
