"use client";

import { useMemo, useState } from "react";
import { Card, CardDescription, CardTitle } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import {
  FERIEPENGER_SATSER,
  calculateFeriepenger,
} from "@/lib/calculate-feriepenger";
import {
  DEFAULT_VACATION_DAYS,
  calculateJunePayslip,
  juneWorkdaysForYear,
} from "@/lib/calculate-june-payslip";
import {
  DEFAULT_TAX_TABLE_ID,
  TAX_TABLE_OPTIONS,
  isKnownTaxTableId,
  type TaxTableId,
} from "@/lib/skattetabell";
import { cn, formatNOK } from "@/lib/utils";
import type { FeriepengerSats } from "@/types";

function parseAmount(value: string) {
  const amount = Number(String(value).replace(/\s/g, "").replace(",", "."));
  return Number.isFinite(amount) ? amount : 0;
}

const SIM_YEAR = 2026;

type SalaryPeriod = "yearly" | "monthly";

export function FeriepengerCalculator() {
  const juneWorkdays = useMemo(() => juneWorkdaysForYear(SIM_YEAR), []);
  const [salaryPeriod, setSalaryPeriod] = useState<SalaryPeriod>("yearly");
  const [brutto, setBrutto] = useState("550000");
  const [sats, setSats] = useState<FeriepengerSats>(10.2);
  const [monthlySalary, setMonthlySalary] = useState(() =>
    String(Math.round(550000 / 12)),
  );
  const [vacationDays, setVacationDays] = useState(String(DEFAULT_VACATION_DAYS));
  const [taxMode, setTaxMode] = useState<"prosent" | "tabell">("tabell");
  const [taxPercent, setTaxPercent] = useState("25");
  const [taxTableId, setTaxTableId] = useState<TaxTableId>(DEFAULT_TAX_TABLE_ID);
  const [taxFreeFeriepenger, setTaxFreeFeriepenger] = useState(true);

  const taxTableIdTrimmed = taxTableId.trim();
  const taxTableIdKnown = taxTableIdTrimmed === "" || isKnownTaxTableId(taxTableIdTrimmed);

  const selected = useMemo(
    () => FERIEPENGER_SATSER.find((s) => s.value === sats),
    [sats],
  );

  const annualBasis = useMemo(() => {
    const amount = parseAmount(brutto);
    return salaryPeriod === "monthly" ? amount * 12 : amount;
  }, [brutto, salaryPeriod]);

  function handleSalaryPeriodChange(next: SalaryPeriod) {
    if (next === salaryPeriod) return;
    const amount = parseAmount(brutto);
    if (amount > 0) {
      const converted =
        next === "monthly" ? Math.round(amount / 12) : Math.round(amount * 12);
      setBrutto(String(converted));
    }
    setSalaryPeriod(next);
  }

  const feriepenger = useMemo(
    () => calculateFeriepenger(annualBasis, sats),
    [annualBasis, sats],
  );

  const payslip = useMemo(
    () =>
      calculateJunePayslip({
        monthlySalary: parseAmount(monthlySalary),
        feriepenger: feriepenger.belop,
        vacationDays: parseAmount(vacationDays) || DEFAULT_VACATION_DAYS,
        juneWorkdays,
        year: SIM_YEAR,
        taxMode,
        taxPercent: parseAmount(taxPercent),
        taxTableId: taxTableIdKnown && taxTableIdTrimmed ? taxTableIdTrimmed : DEFAULT_TAX_TABLE_ID,
        taxFreeFeriepenger,
      }),
    [
      monthlySalary,
      feriepenger.belop,
      vacationDays,
      juneWorkdays,
      taxMode,
      taxPercent,
      taxTableIdKnown,
      taxTableIdTrimmed,
      taxFreeFeriepenger,
    ],
  );

  return (
    <div className="grid gap-6">
      <Card>
        <CardTitle>Beregn feriepenger</CardTitle>
        <CardDescription>
          Oppgi feriepengegrunnlag og sats – deretter simulerer vi en typisk
          juni-lønnsslipp.
        </CardDescription>

        <div className="mt-5 grid gap-5">
          <div>
            <span className="text-sm font-medium text-[var(--primary)]">Lønn oppgitt som</span>
            <div className="mt-2 inline-flex rounded-lg border border-[var(--border)] bg-white/80 p-1">
              {(
                [
                  { id: "yearly" as const, label: "Årslønn" },
                  { id: "monthly" as const, label: "Månedslønn" },
                ] as const
              ).map((option) => {
                const active = salaryPeriod === option.id;
                return (
                  <button
                    key={option.id}
                    type="button"
                    onClick={() => handleSalaryPeriodChange(option.id)}
                    className={cn(
                      "rounded-md px-3 py-1.5 text-sm font-medium transition",
                      active
                        ? "bg-[var(--accent)] text-white"
                        : "text-[var(--muted)] hover:text-[var(--primary)]",
                    )}
                    aria-pressed={active}
                  >
                    {option.label}
                  </button>
                );
              })}
            </div>
          </div>

          <label className="grid gap-2 text-sm font-medium text-[var(--primary)]">
            {salaryPeriod === "yearly"
              ? "Brutto årslønn / feriepengegrunnlag (NOK)"
              : "Brutto månedslønn (NOK)"}
            <Input
              type="text"
              inputMode="decimal"
              value={brutto}
              onChange={(e) => {
                const next = e.target.value;
                setBrutto(next);
                const amount = parseAmount(next);
                const monthly = Math.round(
                  salaryPeriod === "yearly" ? amount / 12 : amount,
                );
                if (monthly > 0) setMonthlySalary(String(monthly));
              }}
              placeholder={salaryPeriod === "yearly" ? "f.eks. 550000" : "f.eks. 45833"}
              className="min-h-12 text-base sm:min-h-11 sm:text-sm"
            />
            <span className="text-xs font-normal text-[var(--muted)]">
              {salaryPeriod === "yearly"
                ? `Tilsvarer ${formatNOK(Math.round(parseAmount(brutto) / 12))} i måneden.`
                : `Tilsvarer ${formatNOK(Math.round(parseAmount(brutto) * 12))} i året.`}
            </span>
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
          Feriepengetrekk for {DEFAULT_VACATION_DAYS} feriedager, pluss
          prosenttrekk eller Skatteetatens ekte trekktabeller for 2026.
          Pensjonstrekk fra arbeidsgiver vises ikke på slippen.
        </CardDescription>

        <div className="mt-5 grid gap-5 sm:grid-cols-2">
          <label className="grid gap-2 text-sm font-medium text-[var(--primary)]">
            Ordinær månedslønn (NOK)
            <Input
              type="text"
              inputMode="decimal"
              value={monthlySalary}
              onChange={(e) => setMonthlySalary(e.target.value)}
              className="min-h-12 text-base sm:min-h-11 sm:text-sm"
            />
            <span className="text-xs font-normal text-[var(--muted)]">
              Fylles automatisk ut fra lønnen over — endre gjerne hvis
              nåværende lønn er annerledes enn feriepengegrunnlaget.
            </span>
          </label>

          <label className="grid gap-2 text-sm font-medium text-[var(--primary)]">
            Feriedager trukket
            <Input
              type="text"
              inputMode="decimal"
              value={vacationDays}
              onChange={(e) => setVacationDays(e.target.value)}
              className="min-h-12 text-base sm:min-h-11 sm:text-sm"
            />
            <span className="text-xs font-normal text-[var(--muted)]">
              Juni {SIM_YEAR} har {juneWorkdays} arbeidsdager. Dagssats ={" "}
              {formatNOK(payslip.dailyRate)}.
            </span>
          </label>
        </div>

        <fieldset className="mt-5">
          <legend className="text-sm font-medium text-[var(--primary)]">
            Skattetrekk
          </legend>
          <div className="mt-3 grid gap-3 sm:grid-cols-2">
            {(
              [
                {
                  id: "tabell" as const,
                  title: "Tabelltrekk",
                  body: "Skatteetatens ekte trekktabell (vanlig på skattekort).",
                },
                {
                  id: "prosent" as const,
                  title: "Prosenttrekk",
                  body: "Fast prosent av skattepliktig beløp.",
                },
              ] as const
            ).map((option) => {
              const active = taxMode === option.id;
              return (
                <label
                  key={option.id}
                  className={cn(
                    "flex cursor-pointer items-start gap-3 rounded-xl border px-4 py-3 transition",
                    active
                      ? "border-[var(--accent)] bg-teal-50/60 ring-1 ring-[var(--accent)]"
                      : "border-[var(--border)] bg-white/80 hover:border-[var(--accent)]/50",
                  )}
                >
                  <input
                    type="radio"
                    name="tax-mode"
                    className="mt-1 h-4 w-4 accent-[var(--accent)]"
                    checked={active}
                    onChange={() => setTaxMode(option.id)}
                  />
                  <span>
                    <span className="block font-semibold text-[var(--primary)]">
                      {option.title}
                    </span>
                    <span className="mt-0.5 block text-sm text-[var(--muted)]">
                      {option.body}
                    </span>
                  </span>
                </label>
              );
            })}
          </div>
        </fieldset>

        <div className="mt-5 grid gap-5 sm:grid-cols-2">
          {taxMode === "prosent" ? (
            <label className="grid gap-2 text-sm font-medium text-[var(--primary)]">
              Prosenttrekk (%)
              <Input
                type="text"
                inputMode="decimal"
                value={taxPercent}
                onChange={(e) => setTaxPercent(e.target.value)}
                className="min-h-12 text-base sm:min-h-11 sm:text-sm"
              />
            </label>
          ) : (
            <label className="grid gap-2 text-sm font-medium text-[var(--primary)]">
              Tabellnummer (fra skattekortet ditt)
              <Input
                type="text"
                inputMode="numeric"
                value={taxTableId}
                onChange={(e) => setTaxTableId(e.target.value)}
                placeholder={`f.eks. ${DEFAULT_TAX_TABLE_ID}`}
                className="min-h-12 text-base sm:min-h-11 sm:text-sm"
              />
              <span className="flex flex-wrap gap-1.5">
                {TAX_TABLE_OPTIONS.map((table) => (
                  <button
                    key={table.id}
                    type="button"
                    onClick={() => setTaxTableId(table.id)}
                    className={cn(
                      "rounded-md border px-2 py-1 text-xs font-medium transition",
                      taxTableIdTrimmed === table.id
                        ? "border-[var(--accent)] bg-teal-50/60 text-[var(--accent)]"
                        : "border-[var(--border)] text-[var(--muted)] hover:border-[var(--accent)]/50",
                    )}
                    title={table.description}
                  >
                    {table.id}
                  </button>
                ))}
              </span>
              {taxTableIdKnown ? (
                <span className="text-xs font-normal text-[var(--muted)]">
                  Ekte trekktabell fra Skatteetaten (2026). Nummeret finner du
                  øverst på skattekortet eller lønnsslippen din.
                </span>
              ) : (
                <span className="text-xs font-normal text-amber-700">
                  Kjenner ikke igjen tabell {taxTableIdTrimmed || "—"}. Bruker{" "}
                  {DEFAULT_TAX_TABLE_ID} som eksempel til du skriver inn et
                  gyldig tabellnummer.
                </span>
              )}
            </label>
          )}

          <label className="flex cursor-pointer items-start gap-3 self-end rounded-xl border border-[var(--border)] bg-white/80 px-4 py-3 text-sm text-[var(--muted)]">
            <input
              type="checkbox"
              className="mt-1 h-4 w-4 accent-[var(--accent)]"
              checked={taxFreeFeriepenger}
              onChange={(e) => setTaxFreeFeriepenger(e.target.checked)}
            />
            <span>
              Dette er den skattefrie feriemåneden min
              <span className="mt-0.5 block text-xs">
                Gjelder de fleste: har du jobbet hele opptjeningsåret hos
                arbeidsgiver, er både feriepengene og én vanlig månedslønn
                trekkfrie – uansett om du har tabell- eller prosenttrekk.
                Skru av hvis du er nyansatt eller får feriepenger utenom
                normal ferieavvikling.
              </span>
            </span>
          </label>
        </div>
      </Card>

      <Card className="animate-count-in overflow-hidden">
        <div className="flex flex-wrap items-end justify-between gap-3 border-b border-[var(--border)] pb-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--muted)]">
              Lønnsslipp
            </p>
            <CardTitle className="mt-1">Juni {SIM_YEAR} – simulering</CardTitle>
            <CardDescription>
              Forenklet modell – ikke en ekte lønnsslipp fra lønnssystemet.
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
                  (isGross || isNet) &&
                    "rounded-lg bg-[var(--surface-muted)]/50 px-3",
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
          <p className="font-semibold text-[var(--primary)]">
            Slik leser du slippen
          </p>
          <ul className="mt-2 list-disc space-y-1 pl-5">
            <li>
              <strong className="font-semibold text-[var(--primary)]">
                Feriepengetrekk
              </strong>{" "}
              = {payslip.vacationDays} feriedager × dagssats (månedslønn ÷{" "}
              {payslip.juneWorkdays} arbeidsdager i juni).
            </li>
            <li>
              <strong className="font-semibold text-[var(--primary)]">
                Skattetrekk
              </strong>{" "}
              bruker enten en fast prosent eller Skatteetatens offisielle
              trekktabeller for 2026 (
              <a
                href="https://www.skatteetaten.no/satser/trekktabeller-i-tekstformat/"
                target="_blank"
                rel="noreferrer"
                className="underline underline-offset-2 hover:text-[var(--accent)]"
              >
                kilde
              </a>
              ), interpolert til nærmeste krone.
            </li>
            {payslip.taxExempt && (
              <li>
                <strong className="font-semibold text-[var(--primary)]">
                  0 kr i skatt er normalt i juni.
                </strong>{" "}
                Ved tabellkort og prosentkort er både feriepengene og én
                vanlig månedslønn lovbestemt trekkfrie – skatten er i stedet
                fordelt på de øvrige 10,5 månedene i året. Det er ikke en
                skatterabatt, bare en annen fordeling gjennom året.
              </li>
            )}
            <li>
              Arbeidsgivers pensjonskostnad er ikke synlig her – den belastes
              arbeidsgiver, ikke som et vanlig trekk på din slip.
            </li>
          </ul>
        </div>
      </Card>
    </div>
  );
}
