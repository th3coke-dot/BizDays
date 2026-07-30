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
  /**
   * Optional override for feriepengetrekk.
   * When omitted, calculated as vacationDays × (monthlySalary / juneWorkdays).
   */
  feriepengetrekk?: number;
  /** Vacation days deducted from June salary (default 25) */
  vacationDays?: number;
  /** Working days in June used for day-rate (optional override) */
  juneWorkdays?: number;
  /** Year used to count June workdays */
  year?: number;
  /** Withholding mode */
  taxMode?: "prosent" | "tabell";
  /** Withholding tax percent (prosent mode) */
  taxPercent?: number;
  /** Simplified tax table id (tabell mode) */
  taxTableId?: "7100" | "8000" | "7300";
  /**
   * When true, feriepenger are excluded from the tax base
   * (common with tabelltrekk in June).
   */
  taxFreeFeriepenger?: boolean;
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
  netPay: number;
  taxPercent: number;
  taxMode: "prosent" | "tabell";
  taxTableId: "7100" | "8000" | "7300";
  taxFreeFeriepenger: boolean;
  taxableBase: number;
  vacationDays: number;
  juneWorkdays: number;
  dailyRate: number;
  year: number;
  lines: JunePayslipLine[];
}

export interface CountdownTarget {
  id: string;
  name: string;
  date: string; // YYYY-MM-DD
  description: string;
}
