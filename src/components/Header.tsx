"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import {
  COUNTRY_LIST,
  getCountryFromPath,
  getCountryPaths,
  getLanguageFromPath,
  resolveLabels,
  switchLanguagePath,
  type AppLanguage,
  type CountryCode,
} from "@/lib/countries";
import { cn } from "@/lib/utils";

function navFor(country: CountryCode, lang: AppLanguage) {
  const paths = getCountryPaths(country, lang);
  const labels = resolveLabels(country, lang);
  const links = [
    { href: paths.workdaysPath, label: labels.workdays },
    { href: paths.holidaysPath, label: labels.holidays },
    { href: paths.countdownPath, label: labels.countdown },
  ];
  if (country === "no" && lang === "native") {
    links.splice(2, 0, { href: "/feriepenger", label: "Feriepenger" });
    links.push({ href: "/om", label: "Om" });
  }
  return { links, paths, labels };
}

export function Header() {
  const pathname = usePathname();
  const country = getCountryFromPath(pathname);
  const lang = getLanguageFromPath(pathname);
  const { links, paths, labels } = navFor(country, lang);
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-[var(--border)]/70 bg-[var(--surface)]/85 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-2 px-3 sm:px-6">
        <Link
          href={paths.homePath}
          className="shrink-0 font-[family-name:var(--font-display)] text-xl font-bold tracking-tight text-[var(--primary)] transition hover:text-[var(--accent)] sm:text-2xl"
          onClick={() => setOpen(false)}
        >
          Biz<span className="text-[var(--accent)]">Days</span>
        </Link>

        <nav className="hidden items-center gap-1 lg:flex">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "rounded-lg px-3 py-2 text-sm font-medium transition",
                pathname === link.href || pathname.startsWith(`${link.href}/`)
                  ? "bg-[var(--surface-muted)] text-[var(--accent)]"
                  : "text-[var(--muted)] hover:text-[var(--primary)]",
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-1.5 sm:gap-2">
          <select
            className="h-9 max-w-[7.5rem] rounded-lg border border-[var(--border)] bg-white px-1.5 text-xs font-medium text-[var(--primary)] sm:max-w-none sm:px-2 sm:text-sm"
            value={country}
            aria-label={labels.country}
            onChange={(e) => {
              const next = e.target.value as CountryCode;
              window.location.href = getCountryPaths(next, lang).homePath;
            }}
          >
            {COUNTRY_LIST.map((c) => (
              <option key={c.code} value={c.code}>
                {lang === "en" ? c.name : c.nativeName}
              </option>
            ))}
          </select>

          <select
            className="h-9 rounded-lg border border-[var(--border)] bg-white px-1.5 text-xs font-medium text-[var(--primary)] sm:px-2 sm:text-sm"
            value={lang}
            aria-label={labels.language}
            onChange={(e) => {
              const next = e.target.value as AppLanguage;
              window.location.href = switchLanguagePath(pathname, country, next);
            }}
          >
            <option value="native">
              {country === "no"
                ? "NO"
                : country === "se"
                  ? "SV"
                  : country === "dk"
                    ? "DA"
                    : country === "fi"
                      ? "FI"
                      : country === "de"
                        ? "DE"
                        : country === "pl"
                          ? "PL"
                          : country === "is"
                            ? "IS"
                            : "EN"}
            </option>
            {country !== "uk" && <option value="en">EN</option>}
          </select>

          <button
            type="button"
            className="inline-flex h-10 w-10 items-center justify-center rounded-lg text-[var(--primary)] lg:hidden"
            aria-label={open ? "Close" : "Menu"}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {open && (
        <nav className="border-t border-[var(--border)] bg-[var(--surface)] px-4 py-3 lg:hidden">
          <div className="flex flex-col gap-1">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className={cn(
                  "rounded-lg px-3 py-3 text-sm font-medium",
                  pathname === link.href || pathname.startsWith(`${link.href}/`)
                    ? "bg-[var(--surface-muted)] text-[var(--accent)]"
                    : "text-[var(--muted)]",
                )}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </nav>
      )}
    </header>
  );
}
