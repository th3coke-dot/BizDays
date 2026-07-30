"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import {
  COUNTRIES,
  COUNTRY_LIST,
  getCountryFromPath,
  type CountryCode,
} from "@/lib/countries";
import { cn } from "@/lib/utils";

function navFor(country: CountryCode) {
  const c = COUNTRIES[country];
  const links = [
    { href: c.workdaysPath, label: c.labels.workdays },
    { href: c.holidaysPath, label: c.labels.holidays },
    { href: c.countdownPath, label: c.labels.countdown },
  ];
  if (country === "no") {
    links.splice(2, 0, { href: "/feriepenger", label: "Feriepenger" });
    links.push({ href: "/om", label: "Om" });
  }
  return links;
}

export function Header() {
  const pathname = usePathname();
  const country = getCountryFromPath(pathname);
  const links = navFor(country);
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-[var(--border)]/70 bg-[var(--surface)]/85 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-3 px-4 sm:px-6">
        <Link
          href={COUNTRIES[country].homePath}
          className="font-[family-name:var(--font-display)] text-2xl font-bold tracking-tight text-[var(--primary)] transition hover:text-[var(--accent)]"
          onClick={() => setOpen(false)}
        >
          Biz<span className="text-[var(--accent)]">Days</span>
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
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

        <div className="flex items-center gap-2">
          <label className="sr-only" htmlFor="country-select">
            Country
          </label>
          <select
            id="country-select"
            className="h-9 rounded-lg border border-[var(--border)] bg-white px-2 text-sm font-medium text-[var(--primary)]"
            value={country}
            onChange={(e) => {
              const next = e.target.value as CountryCode;
              window.location.href = COUNTRIES[next].homePath;
            }}
            aria-label="Country"
          >
            {COUNTRY_LIST.map((c) => (
              <option key={c.code} value={c.code}>
                {c.nativeName}
              </option>
            ))}
          </select>

          <button
            type="button"
            className="inline-flex h-11 w-11 items-center justify-center rounded-lg text-[var(--primary)] md:hidden"
            aria-label={open ? "Close" : "Menu"}
            aria-expanded={open}
            aria-controls="mobile-nav"
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {open && (
        <nav
          id="mobile-nav"
          className="border-t border-[var(--border)] bg-[var(--surface)] px-4 py-3 md:hidden"
        >
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
