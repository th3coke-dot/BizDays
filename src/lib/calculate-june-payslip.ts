import { calculateWorkdays } from "@/lib/calculate-workdays";
import {
  DEFAULT_TAX_TABLE_ID,
  tableWithholding,
  type TaxTableId,
} from "@/lib/skattetabell";
import type {
  JunePayslipInput,
  JunePayslipLine,
  JunePayslipResult,
} from "@/types";

export const DEFAULT_VACATION_DAYS = 25;

function safeAmount(value: number) {
  return Number.isFinite(value) && value > 0 ? value : 0;
}

function safeNonNeg(value: number) {
  return Number.isFinite(value) && value > 0 ? value : 0;
}

function safePercent(value: number) {
  if (!Number.isFinite(value) || value < 0) return 0;
  return Math.min(value, 100);
}

export function juneWorkdaysForYear(year: number): number {
  const start = `${year}-06-01`;
  const end = `${year}-06-30`;
  return calculateWorkdays(start, end, "no").workdays;
}

export function calculateFeriepengetrekkForDays(options: {
  monthlySalary: number;
  vacationDays?: number;
  juneWorkdays?: number;
  year?: number;
}): {
  feriepengetrekk: number;
  dailyRate: number;
  vacationDays: number;
  juneWorkdays: number;
} {
  const monthlySalary = safeAmount(options.monthlySalary);
  const vacationDays =
    options.vacationDays && options.vacationDays > 0
      ? options.vacationDays
      : DEFAULT_VACATION_DAYS;
  const juneWorkdays =
    options.juneWorkdays && options.juneWorkdays > 0
      ? options.juneWorkdays
      : juneWorkdaysForYear(options.year ?? new Date().getFullYear());
  const dailyRate = juneWorkdays > 0 ? monthlySalary / juneWorkdays : 0;
  return {
    feriepengetrekk: Math.round(dailyRate * vacationDays),
    dailyRate: Math.round(dailyRate),
    vacationDays,
    juneWorkdays,
  };
}

/**
 * Simplified June payslip for Norway when feriepenger are paid out.
 *
 * Feriepengetrekk = vacation days (default 25) × June day rate
 * (månedslønn / arbeidsdager i juni).
 *
 * Tax-free holiday month: by Norwegian law (see Skatteetaten's guidance on
 * forskuddstrekk), an employee who has worked the full accrual year for
 * their employer gets ONE ordinary month's salary plus the feriepenger
 * completely exempt from withholding — this is true for both tabelltrekk
 * and prosenttrekk. It's not a discount: tax on that income was already
 * collected by withholding slightly more in the other 10.5 months of the
 * year. This is why a June payslip commonly shows 0 kr in tax, even with a
 * "real" table number selected. Set taxFreeFeriepenger to false to see the
 * ordinary (non-exempt) withholding instead, e.g. for a new hire who
 * hasn't worked the full accrual year.
 *
 * Employer pension is not shown — it is an employer cost, not a
 * visible employee payslip deduction in this model.
 */
export function calculateJunePayslip(
  input: JunePayslipInput,
): JunePayslipResult {
  const year = input.year ?? new Date().getFullYear();
  const monthlySalary = safeAmount(input.monthlySalary);
  const feriepenger = safeAmount(input.feriepenger);
  const vacationDays =
    input.vacationDays && input.vacationDays > 0
      ? input.vacationDays
      : DEFAULT_VACATION_DAYS;
  const juneWorkdays =
    input.juneWorkdays && input.juneWorkdays > 0
      ? input.juneWorkdays
      : juneWorkdaysForYear(year);

  const computedTrekk = calculateFeriepengetrekkForDays({
    monthlySalary,
    vacationDays,
    juneWorkdays,
  });

  const feriepengetrekk =
    typeof input.feriepengetrekk === "number" &&
    Number.isFinite(input.feriepengetrekk)
      ? Math.round(safeNonNeg(input.feriepengetrekk))
      : computedTrekk.feriepengetrekk;

  const taxMode = input.taxMode ?? "prosent";
  const taxPercent = safePercent(input.taxPercent ?? 25);
  const taxTableId: TaxTableId = input.taxTableId ?? DEFAULT_TAX_TABLE_ID;
  const taxFreeFeriepenger = input.taxFreeFeriepenger ?? true;

  const grossBeforeTax = Math.round(
    monthlySalary + feriepenger - feriepengetrekk,
  );

  const taxExempt = taxFreeFeriepenger;
  const taxableBase = Math.max(0, taxExempt ? 0 : grossBeforeTax);

  let taxAmount = 0;
  let taxLabel = "";
  if (taxExempt) {
    taxAmount = 0;
    taxLabel = "Skattetrekk (skattefri feriemåned)";
  } else if (taxMode === "tabell") {
    taxAmount = tableWithholding(taxableBase, taxTableId);
    taxLabel = `Skattetrekk (tabell ${taxTableId})`;
  } else {
    taxAmount = Math.round((taxableBase * taxPercent) / 100);
    taxLabel = `Skattetrekk (${String(taxPercent).replace(".", ",")} %)`;
  }

  const netPay = Math.round(grossBeforeTax - taxAmount);

  const lines: JunePayslipLine[] = [
    {
      id: "salary",
      label: "Ordinær månedslønn",
      amount: Math.round(monthlySalary),
      kind: "earning",
    },
    {
      id: "feriepenger",
      label: "Feriepenger",
      amount: Math.round(feriepenger),
      kind: "earning",
    },
    {
      id: "feriepengetrekk",
      label: `Feriepengetrekk (${vacationDays} dager × ${computedTrekk.dailyRate.toLocaleString("nb-NO")} kr)`,
      amount: -Math.round(feriepengetrekk),
      kind: "deduction",
    },
    {
      id: "gross",
      label: "Brutto på slippen",
      amount: grossBeforeTax,
      kind: "total",
    },
    {
      id: "tax",
      label: taxLabel,
      amount: -taxAmount,
      kind: "deduction",
    },
    {
      id: "net",
      label: "Til utbetaling",
      amount: netPay,
      kind: "total",
    },
  ];

  return {
    monthlySalary: Math.round(monthlySalary),
    feriepenger: Math.round(feriepenger),
    feriepengetrekk: Math.round(feriepengetrekk),
    grossBeforeTax,
    taxAmount,
    netPay,
    taxPercent,
    taxMode,
    taxTableId,
    taxFreeFeriepenger,
    taxExempt,
    taxableBase: Math.round(taxableBase),
    vacationDays,
    juneWorkdays,
    dailyRate: computedTrekk.dailyRate,
    year,
    lines,
  };
}
