"use client";

import { useMemo, useState } from "react";
import { Card, CardDescription, CardTitle } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import {
  EMPLOYMENT_COST_MODELS,
  calculateEmploymentCost,
} from "@/lib/calculate-employment-cost";
import type { CountryCode } from "@/lib/countries";
import type { UiLabels } from "@/lib/i18n";

type Props = {
  country: CountryCode;
  labels: UiLabels;
  lang?: "native" | "en";
};

function formatMoney(amount: number, currency: string, locale: string) {
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency,
    maximumFractionDigits: 0,
  }).format(amount);
}

export function EmploymentCostCalculator({
  country,
  labels,
  lang = "native",
}: Props) {
  const model = EMPLOYMENT_COST_MODELS[country];
  const [gross, setGross] = useState(String(model.defaultGross));
  const [regionId, setRegionId] = useState(
    model.defaultRegionId ?? model.regions?.[0]?.id ?? "",
  );

  const locale = lang === "en" ? "en-GB" : model.country === "no" ? "nb-NO" : "en-GB";
  const calcLang = lang === "en" ? "en" : "native";

  const result = useMemo(() => {
    const amount = Number(String(gross).replace(/\s/g, "").replace(",", "."));
    return calculateEmploymentCost(
      country,
      Number.isFinite(amount) ? amount : 0,
      regionId || undefined,
      calcLang,
    );
  }, [country, gross, regionId, calcLang]);

  const disclaimer = lang === "en" ? model.disclaimerEn : model.disclaimer;
  const hasRegions = Boolean(model.regions && model.regions.length > 0);

  return (
    <div className="grid gap-6">
      <Card>
        <CardTitle>{labels.employmentCostTitle}</CardTitle>
        <CardDescription>{labels.employmentCostSupport}</CardDescription>

        <div className="mt-5 grid gap-5">
          <label className="grid gap-2 text-sm font-medium text-[var(--primary)]">
            {labels.grossSalary} ({model.currency})
            <Input
              type="text"
              inputMode="decimal"
              value={gross}
              onChange={(e) => setGross(e.target.value)}
              className="min-h-12 text-base sm:min-h-11 sm:text-sm"
            />
          </label>

          {hasRegions && (
            <label className="grid gap-2 text-sm font-medium text-[var(--primary)]">
              {labels.regionFactor}
              <Select
                value={regionId}
                onChange={(e) => setRegionId(e.target.value)}
              >
                {model.regions!.map((region) => (
                  <option key={region.id} value={region.id}>
                    {lang === "en" ? region.labelEn : region.label}
                  </option>
                ))}
              </Select>
            </label>
          )}
        </div>
      </Card>

      <Card className="animate-count-in">
        <CardTitle>{labels.totalEmploymentCost}</CardTitle>
        <CardDescription>
          {formatMoney(result.gross, result.currency, locale)} +{" "}
          {labels.employerCharges.toLowerCase()}
        </CardDescription>
        <p className="mt-4 font-[family-name:var(--font-display)] text-5xl font-bold tracking-tight text-[var(--accent)] sm:text-6xl">
          {formatMoney(result.total, result.currency, locale)}
        </p>
        <p className="mt-2 text-sm font-medium text-[var(--muted)]">
          {labels.effectiveEmployerRate}: {String(result.effectiveRatePercent).replace(".", ",")} %
        </p>

        <ul className="mt-6 divide-y divide-[var(--border)] border-t border-[var(--border)]">
          <li className="flex items-start justify-between gap-4 py-3 text-sm">
            <span className="text-[var(--muted)]">{labels.grossSalary}</span>
            <span className="font-semibold text-[var(--primary)]">
              {formatMoney(result.gross, result.currency, locale)}
            </span>
          </li>
          {result.lines.map((line) => (
            <li
              key={line.id}
              className="flex items-start justify-between gap-4 py-3 text-sm"
            >
              <span>
                <span className="block text-[var(--primary)]">{line.name}</span>
                <span className="mt-0.5 block text-xs text-[var(--muted)]">
                  {line.detail}
                </span>
              </span>
              <span className="shrink-0 font-semibold text-[var(--primary)]">
                {formatMoney(line.amount, result.currency, locale)}
              </span>
            </li>
          ))}
          <li className="flex items-start justify-between gap-4 py-3 text-sm">
            <span className="font-semibold text-[var(--primary)]">
              {labels.employerCharges}
            </span>
            <span className="font-semibold text-[var(--primary)]">
              {formatMoney(result.employerCost, result.currency, locale)}
            </span>
          </li>
        </ul>
      </Card>

      <aside className="rounded-2xl border border-[var(--border)] bg-white/60 p-5 text-sm leading-relaxed text-[var(--muted)]">
        <p className="font-semibold text-[var(--primary)]">
          {labels.costDisclaimerTitle}
        </p>
        <p className="mt-2">{disclaimer}</p>
      </aside>
    </div>
  );
}
