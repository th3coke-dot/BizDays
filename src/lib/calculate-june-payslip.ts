import type { JunePayslipInput, JunePayslipResult } from "@/types";

function safeAmount(value: number) {
  return Number.isFinite(value) && value > 0 ? value : 0;
}

function safePercent(value: number) {
  if (!Number.isFinite(value) || value < 0) return 0;
  return Math.min(value, 100);
}

/**
 * Simplified June payslip for Norway when feriepenger are paid out.
 *
 * Classic teaching model:
 * + monthly salary
 * + feriepenger
 * − feriepengetrekk (often one month's salary for a full holiday month)
 * = gross
 * − tax
 * − employee pension
 * = net
 */
export function calculateJunePayslip(
  input: JunePayslipInput,
): JunePayslipResult {
  const monthlySalary = safeAmount(input.monthlySalary);
  const feriepenger = safeAmount(input.feriepenger);
  const feriepengetrekk = Math.min(
    safeAmount(input.feriepengetrekk),
    monthlySalary + feriepenger,
  );
  const taxPercent = safePercent(input.taxPercent);
  const pensionPercent = safePercent(input.pensionPercent);

  const grossBeforeTax = Math.round(
    monthlySalary + feriepenger - feriepengetrekk,
  );
  const taxableBase = Math.max(0, grossBeforeTax);
  const taxAmount = Math.round((taxableBase * taxPercent) / 100);
  const pensionAmount = Math.round((taxableBase * pensionPercent) / 100);
  const netPay = Math.round(grossBeforeTax - taxAmount - pensionAmount);

  return {
    monthlySalary: Math.round(monthlySalary),
    feriepenger: Math.round(feriepenger),
    feriepengetrekk: Math.round(feriepengetrekk),
    grossBeforeTax,
    taxAmount,
    pensionAmount,
    netPay,
    taxPercent,
    pensionPercent,
    lines: [
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
        label: "Feriepengetrekk",
        amount: -Math.round(feriepengetrekk),
        kind: "deduction",
      },
      {
        id: "gross",
        label: "Brutto til skatt",
        amount: grossBeforeTax,
        kind: "total",
      },
      {
        id: "tax",
        label: `Skattetrekk (${String(taxPercent).replace(".", ",")} %)`,
        amount: -taxAmount,
        kind: "deduction",
      },
      {
        id: "pension",
        label: `Pensjonstrekk ansatt (${String(pensionPercent).replace(".", ",")} %)`,
        amount: -pensionAmount,
        kind: "deduction",
      },
      {
        id: "net",
        label: "Til utbetaling",
        amount: netPay,
        kind: "total",
      },
    ],
  };
}
