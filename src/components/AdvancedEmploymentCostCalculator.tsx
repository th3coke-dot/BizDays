"use client";

import { useMemo, useState } from "react";
import { CheckCircle2, XCircle } from "lucide-react";
import { Card, CardDescription, CardTitle } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { LocalAgreementUpload } from "@/components/LocalAgreementUpload";
import {
  EMPLOYMENT_COST_MODELS,
  WORKING_DAYS_PER_YEAR,
  calculateEmploymentCost,
  getDefaultPensionPercent,
  type CostComponent,
} from "@/lib/calculate-employment-cost";
import { COUNTRY_LIST, type CountryCode } from "@/lib/countries";
import { getCbasForCountry } from "@/data/cba-seed";
import type { AgreementExtraction } from "@/lib/document-analysis";
import { EN_LABELS } from "@/lib/i18n";

function formatMoney(amount: number, currency: string) {
  return new Intl.NumberFormat("en-GB", {
    style: "currency",
    currency,
    maximumFractionDigits: 0,
  }).format(amount);
}

function parseNumber(value: string) {
  const amount = Number(String(value).replace(/\s/g, "").replace(",", "."));
  return Number.isFinite(amount) ? amount : 0;
}

type Override = {
  name: string;
  pensionPercent?: number;
  extraComponents: CostComponent[];
  verified?: boolean;
};

export function AdvancedEmploymentCostCalculator() {
  const [country, setCountry] = useState<CountryCode>("no");
  const model = EMPLOYMENT_COST_MODELS[country];
  const cbas = getCbasForCountry(country);
  const pensionSchemes = useMemo(() => model.pensionSchemes ?? [], [model]);

  const [gross, setGross] = useState(String(model.defaultGross));
  const [regionId, setRegionId] = useState(
    model.defaultRegionId ?? model.regions?.[0]?.id ?? "",
  );
  const [pensionInput, setPensionInput] = useState("");
  const [pensionTouched, setPensionTouched] = useState(false);
  const [selectedCbaId, setSelectedCbaId] = useState<string>("");
  const [selectedSchemeId, setSelectedSchemeId] = useState<string>("");
  const [cbaOverride, setCbaOverride] = useState<Override | null>(null);
  const [uploadOverride, setUploadOverride] = useState<Override | null>(null);

  function switchCountry(next: CountryCode) {
    const nextModel = EMPLOYMENT_COST_MODELS[next];
    setCountry(next);
    setGross(String(nextModel.defaultGross));
    setRegionId(nextModel.defaultRegionId ?? nextModel.regions?.[0]?.id ?? "");
    setPensionTouched(false);
    setPensionInput("");
    setSelectedCbaId("");
    setSelectedSchemeId("");
    setCbaOverride(null);
    setUploadOverride(null);
  }

  function applyCba(id: string) {
    setSelectedCbaId(id);
    if (!id) {
      setCbaOverride(null);
      return;
    }
    const cba = cbas.find((c) => c.id === id);
    if (!cba) return;
    setCbaOverride({
      name: cba.name,
      pensionPercent: cba.overrides.pensionPercent,
      extraComponents: cba.overrides.extraComponents ?? [],
      verified: cba.verified,
    });
    setPensionTouched(false);
  }

  function applyUpload(extraction: AgreementExtraction) {
    setUploadOverride({
      name: "Uploaded local agreement",
      pensionPercent: extraction.pensionPercent,
      extraComponents: extraction.extraComponents,
      verified: false,
    });
    setPensionTouched(false);
  }

  const selectedScheme = useMemo(
    () => pensionSchemes.find((s) => s.id === selectedSchemeId),
    [pensionSchemes, selectedSchemeId],
  );

  const defaultPensionPercent = useMemo(
    () => getDefaultPensionPercent(country, regionId || undefined),
    [country, regionId],
  );
  const overridePensionPercent = cbaOverride?.pensionPercent ?? uploadOverride?.pensionPercent;
  const effectivePensionPercent = pensionTouched
    ? parseNumber(pensionInput)
    : overridePensionPercent ?? defaultPensionPercent;
  const pensionDisplayValue = pensionTouched
    ? pensionInput
    : String(overridePensionPercent ?? defaultPensionPercent);

  const combinedExtraComponents = useMemo(
    () => [
      ...(cbaOverride?.extraComponents ?? []),
      ...(selectedScheme?.extraComponents ?? []),
      ...(uploadOverride?.extraComponents ?? []),
    ],
    [cbaOverride, selectedScheme, uploadOverride],
  );

  const appliedNames = [cbaOverride?.name, selectedScheme?.label, uploadOverride?.name].filter(
    (v): v is string => Boolean(v),
  );

  const result = useMemo(() => {
    return calculateEmploymentCost(country, parseNumber(gross), {
      regionId: regionId || undefined,
      lang: "en",
      pensionPercent: effectivePensionPercent,
      extraComponents: combinedExtraComponents,
      appliedAgreementName: appliedNames.join(" + ") || undefined,
    });
  }, [country, gross, regionId, effectivePensionPercent, combinedExtraComponents, appliedNames]);

  const hasRegions = Boolean(model.regions && model.regions.length > 0);
  const periodRates = [
    { label: "Day rate", amount: result.dayRate },
    { label: "Week rate", amount: result.weekRate },
    { label: "Month rate", amount: result.monthRate },
    { label: "Year rate", amount: result.yearRate },
  ];

  return (
    <div className="grid gap-6">
      <Card>
        <CardTitle>Total cost of employment</CardTitle>
        <CardDescription>
          Pick a country, layer on a collective agreement or an uploaded
          local agreement, and see the full employer cost update instantly.
        </CardDescription>

        <div className="mt-5 grid gap-5">
          <label className="grid gap-2 text-sm font-medium text-[var(--primary)]">
            Country
            <Select
              value={country}
              onChange={(e) => switchCountry(e.target.value as CountryCode)}
            >
              {COUNTRY_LIST.map((c) => (
                <option key={c.code} value={c.code}>
                  {c.name}
                </option>
              ))}
            </Select>
          </label>

          <label className="grid gap-2 text-sm font-medium text-[var(--primary)]">
            {EN_LABELS.grossSalary} ({model.currency})
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
              {EN_LABELS.regionFactor}
              <Select value={regionId} onChange={(e) => setRegionId(e.target.value)}>
                {model.regions!.map((region) => (
                  <option key={region.id} value={region.id}>
                    {region.labelEn}
                  </option>
                ))}
              </Select>
            </label>
          )}

          <label className="grid gap-2 text-sm font-medium text-[var(--primary)]">
            Employer pension (%)
            <Input
              type="text"
              inputMode="decimal"
              value={pensionDisplayValue}
              onChange={(e) => {
                setPensionTouched(true);
                setPensionInput(e.target.value);
              }}
              className="min-h-12 text-base sm:min-h-11 sm:text-sm"
            />
            <span className="text-xs font-normal text-[var(--muted)]">
              Auto-filled from the selected agreement below — edit any time to
              override.
            </span>
          </label>
        </div>
      </Card>

      <Card>
        <CardTitle>Collective bargaining agreement (CBA)</CardTitle>
        <CardDescription>
          Illustrative starter set — always verify against the signed
          agreement before relying on these figures for payroll.
        </CardDescription>
        <label className="mt-4 grid gap-2 text-sm font-medium text-[var(--primary)]">
          Select a CBA for {COUNTRY_LIST.find((c) => c.code === country)?.name}
          <Select value={selectedCbaId} onChange={(e) => applyCba(e.target.value)}>
            <option value="">No CBA — use standard rates</option>
            {cbas.map((cba) => (
              <option key={cba.id} value={cba.id}>
                {cba.name} ({cba.parties})
              </option>
            ))}
          </Select>
        </label>
        {cbas.length === 0 && (
          <p className="mt-2 text-sm text-[var(--muted)]">
            No seed agreements yet for this country — upload a local
            agreement below instead.
          </p>
        )}
        {selectedCbaId && (
          <div className="mt-3 flex items-start gap-2 rounded-lg border border-amber-200 bg-amber-50 p-3 text-xs text-amber-800">
            {cbas.find((c) => c.id === selectedCbaId)?.verified ? (
              <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0" />
            ) : (
              <XCircle className="mt-0.5 h-4 w-4 shrink-0" />
            )}
            <span>
              {cbas.find((c) => c.id === selectedCbaId)?.sourceNote}
            </span>
          </div>
        )}
      </Card>

      {pensionSchemes.length > 0 && (
        <Card>
          <CardTitle>Pension / early-retirement scheme</CardTitle>
          <CardDescription>
            Some countries have opt-in schemes that add employer costs on
            top of standard occupational pension — for example Norway&apos;s
            AFP.
          </CardDescription>
          <label className="mt-4 grid gap-2 text-sm font-medium text-[var(--primary)]">
            Scheme for {COUNTRY_LIST.find((c) => c.code === country)?.name}
            <Select
              value={selectedSchemeId}
              onChange={(e) => setSelectedSchemeId(e.target.value)}
            >
              {pensionSchemes.map((scheme) => (
                <option key={scheme.id} value={scheme.id === "none" ? "" : scheme.id}>
                  {scheme.label}
                </option>
              ))}
            </Select>
          </label>
          {selectedScheme?.note && (
            <div className="mt-3 flex items-start gap-2 rounded-lg border border-teal-200 bg-teal-50 p-3 text-xs text-teal-900">
              <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0" />
              <span>{selectedScheme.note}</span>
            </div>
          )}
        </Card>
      )}

      <Card>
        <CardTitle>Or upload a local agreement</CardTitle>
        <CardDescription>
          Drag in a company-specific agreement (.txt or text-based .pdf) and
          BizDays will pull out payroll figures for you to review before
          applying them.
        </CardDescription>
        <div className="mt-4">
          <LocalAgreementUpload onApply={applyUpload} />
        </div>
      </Card>

      <Card className="animate-count-in">
        <CardTitle>Total employment cost</CardTitle>
        <CardDescription>
          {formatMoney(result.gross, result.currency)} + employer charges
          {appliedNames.map((name) => (
            <span
              key={name}
              className="ml-2 inline-flex items-center rounded-full bg-teal-100 px-2 py-0.5 text-xs font-semibold text-teal-800"
            >
              {name}
            </span>
          ))}
        </CardDescription>
        <p className="mt-4 font-[family-name:var(--font-display)] text-5xl font-bold tracking-tight text-[var(--accent)] sm:text-6xl">
          {formatMoney(result.total, result.currency)}
        </p>
        <p className="mt-2 text-sm font-medium text-[var(--muted)]">
          Effective employer rate: {String(result.effectiveRatePercent).replace(".", ",")}%
        </p>

        <div className="mt-6">
          <p className="text-sm font-semibold text-[var(--primary)]">Cost per period</p>
          <div className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-4">
            {periodRates.map((rate) => (
              <div
                key={rate.label}
                className="rounded-xl border border-[var(--border)] bg-white/70 px-3 py-3"
              >
                <p className="text-xs font-medium uppercase tracking-wide text-[var(--muted)]">
                  {rate.label}
                </p>
                <p className="mt-1 font-[family-name:var(--font-display)] text-lg font-semibold text-[var(--primary)]">
                  {formatMoney(rate.amount, result.currency)}
                </p>
              </div>
            ))}
          </div>
          <p className="mt-2 text-xs text-[var(--muted)]">
            Day rate uses {WORKING_DAYS_PER_YEAR} working days per year.
          </p>
        </div>

        <ul className="mt-6 divide-y divide-[var(--border)] border-t border-[var(--border)]">
          <li className="flex items-start justify-between gap-4 py-3 text-sm">
            <span className="text-[var(--muted)]">Gross salary</span>
            <span className="font-semibold text-[var(--primary)]">
              {formatMoney(result.gross, result.currency)}
            </span>
          </li>
          {result.lines.map((line) => (
            <li key={line.id} className="flex items-start justify-between gap-4 py-3 text-sm">
              <span>
                <span className="block text-[var(--primary)]">{line.name}</span>
                <span className="mt-0.5 block text-xs text-[var(--muted)]">{line.detail}</span>
              </span>
              <span className="shrink-0 font-semibold text-[var(--primary)]">
                {formatMoney(line.amount, result.currency)}
              </span>
            </li>
          ))}
          <li className="flex items-start justify-between gap-4 py-3 text-sm">
            <span className="font-semibold text-[var(--primary)]">Employer charges</span>
            <span className="font-semibold text-[var(--primary)]">
              {formatMoney(result.employerCost, result.currency)}
            </span>
          </li>
        </ul>
      </Card>

      <aside className="rounded-2xl border border-[var(--border)] bg-white/60 p-5 text-sm leading-relaxed text-[var(--muted)]">
        <p className="font-semibold text-[var(--primary)]">Important</p>
        <p className="mt-2">{model.disclaimerEn}</p>
        <p className="mt-2">
          CBA and uploaded-agreement figures are starting points, not payroll
          advice — always confirm with the signed agreement, your HR/legal
          team, or a local accountant.
        </p>
      </aside>
    </div>
  );
}
