export type HolidayType = "fixed" | "movable";

export interface Holiday {
  date: string; // YYYY-MM-DD
  name: string;
  type: HolidayType;
}

export type HolidayYear = 2025 | 2026 | 2027;

export interface WorkdayResult {
  workdays: number;
  holidays: number;
  weekendDays: number;
  totalDays: number;
  holidayList: Holiday[];
}

export type FeriepengerSats = 10.2 | 12 | 12.5;

export interface FeriepengerResult {
  brutto: number;
  sats: FeriepengerSats;
  belop: number;
}

export interface JunePayslipInput {
  /** Current gross monthly salary */
  monthlySalary: number;
  /** Feriepenger paid out in June */
  feriepenger: number;
  /** Deduction replacing salary while on holiday (often = monthly salary) */
  feriepengetrekk: number;
  /** Withholding tax percent */
  taxPercent: number;
  /** Employee pension deduction percent of taxable/gross base */
  pensionPercent: number;
}

export interface JunePayslipLine {
  id: string;
  label: string;
  amount: number;
  kind: "earning" | "deduction" | "total" | "info";
}

export interface JunePayslipResult {
  monthlySalary: number;
  feriepenger: number;
  feriepengetrekk: number;
  grossBeforeTax: number;
  taxAmount: number;
  pensionAmount: number;
  netPay: number;
  taxPercent: number;
  pensionPercent: number;
  lines: JunePayslipLine[];
}

export interface CountdownTarget {
  id: string;
  name: string;
  date: string; // YYYY-MM-DD
  description: string;
}
