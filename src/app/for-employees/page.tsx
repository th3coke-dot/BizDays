import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, CalendarRange, Coins, Flag, Timer } from "lucide-react";
import { COUNTRY_LIST, getCountryPaths } from "@/lib/countries";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "For employees",
  absoluteTitle: "For employees – workdays, holidays & countdowns | BizDays",
  description:
    "Simple, no-fuss tools for employees: workdays, public holidays, and countdowns for every country BizDays supports.",
  path: "/for-employees",
});

const tools = [
  { key: "workdays", label: "Workdays", icon: CalendarRange },
  { key: "holidays", label: "Public holidays", icon: Flag },
  { key: "countdown", label: "Countdown", icon: Timer },
] as const;

export default function ForEmployeesPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6 sm:py-12">
      <header className="mb-8">
        <p className="text-sm font-medium text-[var(--muted)]">For employees</p>
        <h1 className="mt-1 font-[family-name:var(--font-display)] text-3xl font-semibold tracking-tight text-[var(--primary)] sm:text-4xl">
          Just the essentials — no spreadsheets required
        </h1>
        <p className="mt-3 max-w-2xl text-[var(--muted)]">
          Quick answers for planning time off: how many workdays are left,
          which days are public holidays, and a shareable countdown to
          whatever you&apos;re looking forward to.
        </p>
      </header>

      <div className="grid gap-3">
        {COUNTRY_LIST.map((c) => {
          const paths = getCountryPaths(c.code, "native");
          return (
            <div
              key={c.code}
              className="rounded-2xl border border-[var(--border)] bg-white/75 p-5"
            >
              <p className="font-[family-name:var(--font-display)] text-lg font-semibold text-[var(--primary)]">
                {c.name}
              </p>
              <div className="mt-3 flex flex-wrap gap-2">
                {tools.map((tool) => {
                  const href =
                    tool.key === "workdays"
                      ? paths.workdaysPath
                      : tool.key === "holidays"
                        ? paths.holidaysPath
                        : paths.countdownPath;
                  return (
                    <Link
                      key={tool.key}
                      href={href}
                      className="inline-flex items-center gap-1.5 rounded-lg border border-[var(--border)] px-3 py-1.5 text-sm font-medium text-[var(--primary)] transition hover:border-[var(--accent)]"
                    >
                      <tool.icon className="h-3.5 w-3.5 text-[var(--accent)]" aria-hidden />
                      {tool.label}
                    </Link>
                  );
                })}
                {c.code === "no" && (
                  <Link
                    href="/feriepenger"
                    className="inline-flex items-center gap-1.5 rounded-lg border border-[var(--border)] px-3 py-1.5 text-sm font-medium text-[var(--primary)] transition hover:border-[var(--accent)]"
                  >
                    <Coins className="h-3.5 w-3.5 text-[var(--accent)]" aria-hidden />
                    Feriepenger
                  </Link>
                )}
              </div>
            </div>
          );
        })}
      </div>

      <p className="mt-8 text-sm text-[var(--muted)]">
        Curious about the total cost of employing someone?{" "}
        <Link href="/for-employers" className="text-[var(--accent)] hover:underline">
          Visit the employer tools
          <ArrowRight className="ml-1 inline h-3.5 w-3.5" />
        </Link>
      </p>
    </div>
  );
}
