"use client";

import { useMemo, useState } from "react";
import { Button } from "@/components/ui/Button";
import { Card, CardDescription, CardTitle } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import {
  FERIEPENGER_SATSER,
  calculateFeriepenger,
} from "@/lib/calculate-feriepenger";
import { cn, formatNOK } from "@/lib/utils";
import type { FeriepengerResult, FeriepengerSats } from "@/types";

export function FeriepengerCalculator() {
  const [brutto, setBrutto] = useState("550000");
  const [sats, setSats] = useState<FeriepengerSats>(10.2);
  const [result, setResult] = useState<FeriepengerResult | null>(null);

  const selected = useMemo(
    () => FERIEPENGER_SATSER.find((s) => s.value === sats),
    [sats],
  );

  function handleCalculate() {
    const amount = Number(String(brutto).replace(/\s/g, "").replace(",", "."));
    setResult(calculateFeriepenger(amount, sats));
  }

  return (
    <div className="grid gap-6">
      <Card>
        <CardTitle>Beregn feriepenger</CardTitle>
        <CardDescription>
          Oppgi brutto feriepengegrunnlag og velg sats.
        </CardDescription>

        <div className="mt-5 grid gap-5">
          <label className="grid gap-2 text-sm font-medium text-[var(--primary)]">
            Brutto feriepengegrunnlag (NOK)
            <Input
              type="text"
              inputMode="decimal"
              value={brutto}
              onChange={(e) => setBrutto(e.target.value)}
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

          <div>
            <Button
              type="button"
              size="lg"
              onClick={handleCalculate}
              className="w-full sm:w-auto"
            >
              Beregn feriepenger
            </Button>
          </div>
        </div>
      </Card>

      {result && (
        <Card className="animate-count-in">
          <CardTitle>Dine feriepenger</CardTitle>
          <CardDescription>
            {formatNOK(result.brutto)} ×{" "}
            {String(result.sats).replace(".", ",")} %
            {selected ? ` (${selected.label})` : ""}
          </CardDescription>
          <p className="mt-4 font-[family-name:var(--font-display)] text-5xl font-bold tracking-tight text-[var(--accent)] sm:text-6xl">
            {formatNOK(result.belop)}
          </p>
          <p className="mt-4 text-sm leading-relaxed text-[var(--muted)]">
            Feriepenger beregnes vanligvis av forrige års feriepengegrunnlag og
            utbetales ofte i juni (eller etter avtale / tariff).
          </p>
        </Card>
      )}
    </div>
  );
}
