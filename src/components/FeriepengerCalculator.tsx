"use client";

import { useMemo, useState } from "react";
import { Card, CardDescription, CardTitle } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import {
  FERIEPENGER_SATSER,
  calculateFeriepenger,
} from "@/lib/calculate-feriepenger";
import { calculateJunePayslip } from "@/lib/calculate-june-payslip";
import { cn, formatNOK } from "@/lib/utils";
import type { FeriepengerSats } from "@/types";

function parseAmount(value: string) {
  const amount = Number(String(value).replace(/\s/g, "").replace(",", "."));
  return Number.isFinite(amount) ? amount : 0;
}

export function FeriepengerCalculator() {
  const [brutto, setBrutto] = useState("550000");
  const [sats, setSats] = useState<FeriepengerSats>(10.2);
  const [monthlySalary, setMonthlySalary] = useState(() =>
    String(Math.round(550000 / 12)),
  );
  const [feriepengetrekk, setFeriepengetrekk] = useState(() =>
    String(Math.round(550000 / 12)),
  );
  const [syncTrekk, setSyncTrekk] = useState(true);
  const [taxPercent, setTaxPercent] = useState("25");
  const [pensionPercent, setPensionPercent] = useState("2");

  const selected = useMemo(
    () => FERIEPENGER_SATSER.find((s) => s.value === sats),
    [sats],
  );

  const feriepenger = useMemo(
    () => calculateFeriepenger(parseAmount(brutto), sats),
    [brutto, sats],
  );

  const payslip = useMemo(
    () =>
      calculateJunePayslip({
        monthlySalary: parseAmount(monthlySalary),
        feriepenger: feriepenger.belop,
        feriepengetrekk: parseAmount(feriepengetrekk),
        taxPercent: parseAmount(taxPercent),
        pensionPercent: parseAmount(pensionPercent),
      }),
    [
      monthlySalary,
      feriepenger.belop,
      feriepengetrekk,
      taxPercent,
      pensionPercent,
    ],
  );

  function updateMonthlySalary(value: string) {
    setMonthlySalary(value);
    if (syncTrekk) setFeriepengetrekk(value);
  }

  return (
    <div className="grid gap-6">
      <Card>
        <CardTitle>Beregn feriepenger</CardTitle>
        <CardDescription>
          Oppgi feriepengegrunnlag og sats – deretter simulerer vi en typisk
          juni-lønnsslipp.
        </CardDescription>

        <div className="mt-5 grid gap-5">
          <label className="grid gap-2 text-sm font-medium text-[var(--primary)]">
            Brutto feriepengegrunnlag (NOK)
            <Input
              type="text"
              inputMode="decimal"
              value={brutto}
              onChange={(e) => {
                const next = e.target.value;
                setBrutto(next);
                const monthly = Math.round(parseAmount(next) / 12);
                if (monthly > 0) {
                  updateMonthlySalary(String(monthly));
                }
              }}
              placeholder="f.eks. 550000"
              className="min-h-12 text-base sm:min-h-11 sm:text-sm"
            />
          </label>

          <fieldset>
            <legend className="text-sm font-medium text-[var(--primary)]">
              Velg sats
            </legend>
            <div className="mt-3 grid gap-3">
              {FERIEPENGER_SATSER.map((option) => {
                const active = sats === option.value;
                return (
                  <label
                    key={option.value}
                    className={cn(
                      "flex cursor-pointer items-start gap-3 rounded-xl border px-4 py-3 transition",
                      active
                        ? "border-[var(--accent)] bg-teal-50/60 ring-1 ring-[var(--accent)]"
                        : "border-[var(--border)] bg-white/80 hover:border-[var(--accent)]/50",
                    )}
                  >
                    <input
                      type="radio"
                      name="feriepenger-sats"
                      className="mt-1 h-4 w-4 accent-[var(--accent)]"
                      checked={active}
                      onChange={() => setSats(option.value)}
                    />
                    <span>
                      <span className="block font-semibold text-[var(--primary)]">
                        {option.label}
                      </span>
                      <span className="mt-0.5 block text-sm text-[var(--muted)]">
                        {option.description}
                      </span>
                    </span>
                  </label>
                );
              })}
            </div>
          </fieldset>
        </div>
      </Card>

      <Card className="animate-count-in">
        <CardTitle>Dine feriepenger</CardTitle>
        <CardDescription>
          {formatNOK(feriepenger.brutto)} ×{" "}
          {String(feriepenger.sats).replace(".", ",")} %
          {selected ? ` (${selected.label})` : ""}
        </CardDescription>
        <p className="mt-4 font-[family-name:var(--font-display)] text-5xl font-bold tracking-tight text-[var(--accent)] sm:text-6xl">
          {formatNOK(feriepenger.belop)}
        </p>
        <p className="mt-4 text-sm leading-relaxed text-[var(--muted)]">
          Feriepenger beregnes vanligvis av forrige års feriepengegrunnlag og
          utbetales ofte i juni (eller etter avtale / tariff).
        </p>
      </Card>

      <Card>
        <CardTitle>Simuler juni-lønnsslipp</CardTitle>
        <CardDescription>
          Se hvordan lønn, feriepenger, feriepengetrekk og skatt kan se ut i juni.
        </CardDescription>

        <div className="mt-5 grid gap-5 sm:grid-cols-2">
          <label className="grid gap-2 text-sm font-medium text-[var(--primary)]">
            Ordinær månedslønn (NOK)
            <Input
              type="text"
              inputMode="decimal"
              value={monthlySalary}
              onChange={(e) => updateMonthlySalary(e.target.value)}
              className="min-h-12 text-base sm:min-h-11 sm:text-sm"
            />
          </label>

          <label className="grid gap-2 text-sm font-medium text-[var(--primary)]">
            Feriepengetrekk (NOK)
            <Input
              type="text"
              inputMode="decimal"
              value={feriepengetrekk}
              onChange={(e) => {
                setSyncTrekk(false);
                setFeriepengetrekk(e.target.value);
              }}
              className="min-h-12 text-base sm:min-h-11 sm:text-sm"
            />
          </label>

          <label className="grid gap-2 text-sm font-medium text-[var(--primary)]">
            Skattetrekk (%)
            <Input
              type="text"
              inputMode="decimal"
              value={taxPercent}
              onChange={(e) => setTaxPercent(e.target.value)}
              className="min-h-12 text-base sm:min-h-11 sm:text-sm"
            />
          </label>

          <label className="grid gap-2 text-sm font-medium text-[var(--primary)]">
            Pensjonstrekk ansatt (%)
            <Input
              type="text"
              inputMode="decimal"
              value={pensionPercent}
              onChange={(e) => setPensionPercent(e.target.value)}
              className="min-h-12 text-base sm:min-h-11 sm:text-sm"
            />
          </label>
        </div>

        <label className="mt-4 flex cursor-pointer items-start gap-3 text-sm text-[var(--muted)]">
          <input
            type="checkbox"
            className="mt-1 h-4 w-4 accent-[var(--accent)]"
            checked={syncTrekk}
            onChange={(e) => {
              const next = e.target.checked;
              setSyncTrekk(next);
              if (next) setFeriepengetrekk(monthlySalary);
            }}
          />
          <span>
            Sett feriepengetrekk lik månedslønn (vanlig ved full feriemåned).
          </span>
        </label>
      </Card>

      <Card className="animate-count-in overflow-hidden">
        <div className="flex flex-wrap items-end justify-between gap-3 border-b border-[var(--border)] pb-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--muted)]">
              Lønnsslipp
            </p>
            <CardTitle className="mt-1">Juni – simulering</CardTitle>
            <CardDescription>
              Forenklet modell for illustrasjon – ikke en ekte lønnsslipp.
            </CardDescription>
          </div>
          <p className="font-[family-name:var(--font-display)] text-sm font-semibold text-[var(--accent)]">
            BizDays
          </p>
        </div>

        <div className="mt-2 divide-y divide-[var(--border)]">
          {payslip.lines.map((line) => {
            const isNet = line.id === "net";
            const isGross = line.id === "gross";
            return (
              <div
                key={line.id}
                className={cn(
                  "flex items-center justify-between gap-4 py-3 text-sm",
                  (isGross || isNet) && "bg-[var(--surface-muted)]/50 px-3 -mx-0 rounded-lg",
                )}
              >
                <span
                  className={cn(
                    "text-[var(--muted)]",
                    (isGross || isNet) && "font-semibold text-[var(--primary)]",
                  )}
                >
                  {line.label}
                </span>
                <span
                  className={cn(
                    "font-semibold tabular-nums",
                    line.amount < 0
                      ? "text-rose-700"
                      : "text-[var(--primary)]",
                    isNet &&
                      "font-[family-name:var(--font-display)] text-xl text-[var(--accent)]",
                  )}
                >
                  {formatNOK(line.amount)}
                </span>
              </div>
            );
          })}
        </div>

        <div className="mt-6 rounded-xl border border-dashed border-[var(--border)] bg-white/50 px-4 py-3 text-sm leading-relaxed text-[var(--muted)]">
          <p className="font-semibold text-[var(--primary)]">Slik leser du slippen</p>
          <ul className="mt-2 list-disc space-y-1 pl-5">
            <li>
              <strong className="font-semibold text-[var(--primary)]">Feriepenger</strong>{" "}
              er utbetaling basert på fjorårets grunnlag.
            </li>
            <li>
              <strong className="font-semibold text-[var(--primary)]">Feriepengetrekk</strong>{" "}
              trekker ofte bort juni-lønnen når du tar ferie den måneden.
            </li>
            <li>
              <strong className="font-semibold text-[var(--primary)]">Skatt og pensjon</strong>{" "}
              er forenklet med prosent – ekte trekk følger skattetabell og avtale.
            </li>
          </ul>
        </div>
      </Card>
    </div>
  );
}
