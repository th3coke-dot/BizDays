import { CalendarDays, Palmtree, PartyPopper } from "lucide-react";
import type { WorkdayResult } from "@/types";
import { Card, CardDescription, CardTitle } from "@/components/ui/Card";

interface ResultCardProps {
  result: WorkdayResult;
}

export function ResultCard({ result }: ResultCardProps) {
  const stats = [
    {
      label: "Arbeidsdager",
      value: result.workdays,
      icon: CalendarDays,
      accent: "text-[var(--accent)]",
      highlight: true,
    },
    {
      label: "Helligdager",
      value: result.holidays,
      icon: PartyPopper,
      accent: "text-rose-600",
      highlight: false,
    },
    {
      label: "Helger",
      value: result.weekendDays,
      icon: Palmtree,
      accent: "text-sky-700",
      highlight: false,
    },
  ];

  return (
    <Card className="animate-fade-up">
      <CardTitle>Resultat</CardTitle>
      <CardDescription>
        Totalt {result.totalDays} dager i perioden (fra og med – til og med).
      </CardDescription>

      <p className="mt-5 font-[family-name:var(--font-display)] text-5xl font-bold tracking-tight text-[var(--accent)] sm:text-6xl">
        {result.workdays}
        <span className="ml-2 text-lg font-semibold text-[var(--muted)] sm:text-xl">
          arbeidsdager
        </span>
      </p>

      <div className="mt-6 grid gap-3 sm:grid-cols-3">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className={
              stat.highlight
                ? "rounded-xl border border-[var(--accent)]/30 bg-teal-50/70 px-4 py-4"
                : "rounded-xl bg-[var(--surface-muted)] px-4 py-4"
            }
          >
            <div className="flex items-center gap-2 text-sm text-[var(--muted)]">
              <stat.icon className={`h-4 w-4 ${stat.accent}`} aria-hidden />
              {stat.label}
            </div>
            <p className="mt-2 font-[family-name:var(--font-display)] text-3xl font-bold text-[var(--primary)]">
              {stat.value}
            </p>
          </div>
        ))}
      </div>

      <p className="mt-5 text-sm leading-relaxed text-[var(--muted)]">
        Helger og norske helligdager er trukket fra.
      </p>
    </Card>
  );
}
