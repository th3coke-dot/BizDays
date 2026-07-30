"use client";

import { useMemo, useState } from "react";
import { Button } from "@/components/ui/Button";
import { Card, CardDescription, CardTitle } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import {
  FERIEPENGER_SATSER,
  calculateFeriepenger,
} from "@/lib/calculate-feriepenger";
import { formatNOK } from "@/lib/utils";
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

        <div className="mt-5 grid gap-4">
          <label className="grid gap-2 text-sm font-medium text-[var(--primary)]">
            Brutto feriepengegrunnlag (NOK)
            <Input
              type="text"
              inputMode="decimal"
              value={brutto}
              onChange={(e) => setBrutto(e.target.value)}
              placeholder="f.eks. 550000"
            />
          </label>

          <label className="grid gap-2 text-sm font-medium text-[var(--primary)]">
            Sats
            <Select
              value={String(sats)}
              onChange={(e) => setSats(Number(e.target.value) as FeriepengerSats)}
            >
              {FERIEPENGER_SATSER.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label} – {option.description}
                </option>
              ))}
            </Select>
          </label>

          {selected && (
            <p className="text-sm text-[var(--muted)]">{selected.description}</p>
          )}

          <div>
            <Button type="button" size="lg" onClick={handleCalculate}>
              Beregn feriepenger
            </Button>
          </div>
        </div>
      </Card>

      {result && (
        <Card className="animate-count-in">
          <CardTitle>Dine feriepenger</CardTitle>
          <CardDescription>
            {formatNOK(result.brutto)} × {String(result.sats).replace(".", ",")}{" "}
            %
          </CardDescription>
          <p className="mt-4 font-[family-name:var(--font-display)] text-4xl font-bold text-[var(--accent)]">
            {formatNOK(result.belop)}
          </p>
        </Card>
      )}
    </div>
  );
}
