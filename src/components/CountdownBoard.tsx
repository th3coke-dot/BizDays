"use client";

import { useEffect, useMemo, useState } from "react";
import { Share2 } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Card, CardDescription, CardTitle } from "@/components/ui/Card";
import {
  getCountryPaths,
  type AppLanguage,
  type CountryCode,
  resolveLabels,
} from "@/lib/countries";
import { diffParts, getCountdownTargets } from "@/lib/countdown";
import { cn, formatDateNO } from "@/lib/utils";

type Props = {
  country?: CountryCode;
  lang?: AppLanguage;
};

export function CountdownBoard({ country = "no", lang = "native" }: Props) {
  const labels = resolveLabels(country, lang);
  const path = getCountryPaths(country, lang).countdownPath;
  const targets = useMemo(
    () => getCountdownTargets(country, new Date(), lang),
    [country, lang],
  );
  const [activeId, setActiveId] = useState<string | null>(null);
  const [now, setNow] = useState(() => new Date());
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const id = window.setInterval(() => setNow(new Date()), 1000);
    return () => window.clearInterval(id);
  }, []);

  const resolvedId =
    activeId && targets.some((t) => t.id === activeId)
      ? activeId
      : (targets[0]?.id ?? "");
  const active = targets.find((t) => t.id === resolvedId) ?? targets[0];
  if (!active) return null;
  const parts = diffParts(active.date, now);

  async function share() {
    const text = `${parts.days} → ${active.name} (${formatDateNO(active.date)}) – BizDays`;
    const url =
      typeof window !== "undefined"
        ? `${window.location.origin}${path}?t=${active.id}`
        : path;

    if (navigator.share) {
      await navigator.share({ title: "BizDays Countdown", text, url });
      return;
    }

    await navigator.clipboard.writeText(`${text}\n${url}`);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 2000);
  }

  const units = [
    { label: labels.days, value: parts.days },
    { label: labels.hours, value: parts.hours },
    { label: labels.minutes, value: parts.minutes },
    { label: labels.seconds, value: parts.seconds },
  ];

  return (
    <div className="grid gap-6">
      <div className="flex flex-wrap gap-2">
        {targets.map((target) => (
          <button
            key={target.id}
            type="button"
            onClick={() => setActiveId(target.id)}
            className={cn(
              "rounded-lg px-4 py-2 text-sm font-semibold transition",
              resolvedId === target.id
                ? "bg-[var(--accent)] text-white"
                : "bg-white/80 text-[var(--primary)] ring-1 ring-[var(--border)] hover:ring-[var(--accent)]",
            )}
          >
            {target.name}
          </button>
        ))}
      </div>

      <Card className="overflow-hidden">
        <CardTitle>{active.name}</CardTitle>
        <CardDescription>
          {active.description} · {formatDateNO(active.date, "EEEE d. MMMM yyyy")}
        </CardDescription>

        <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4">
          {units.map((unit) => (
            <div
              key={unit.label}
              className="animate-count-in rounded-xl bg-[var(--surface-muted)] px-3 py-5 text-center"
            >
              <p className="font-[family-name:var(--font-display)] text-4xl font-bold tabular-nums text-[var(--primary)] sm:text-5xl">
                {unit.value}
              </p>
              <p className="mt-2 text-xs font-semibold uppercase tracking-wider text-[var(--muted)]">
                {unit.label}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-6">
          <Button type="button" variant="outline" onClick={share}>
            <Share2 className="h-4 w-4" />
            {copied ? labels.copied : labels.shareCountdown}
          </Button>
        </div>
      </Card>
    </div>
  );
}
