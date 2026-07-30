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

export interface CountdownTarget {
  id: string;
  name: string;
  date: string; // YYYY-MM-DD
  description: string;
}
