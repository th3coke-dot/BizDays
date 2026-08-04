/**
 * Norwegian withholding-tax ("tabelltrekk") lookup, backed by Skatteetaten's
 * official 2026 trekktabeller. See src/data/skattetabeller-2026.ts for the
 * source, methodology and accuracy notes.
 */
import { SKATTETABELL_2026 } from "@/data/skattetabeller-2026";

export type TaxTableId = string;

export type TaxTableOption = {
  id: TaxTableId;
  label: string;
  description: string;
};

/** All table numbers we have real 2026 data for, sorted numerically. */
export const KNOWN_TAX_TABLE_IDS: TaxTableId[] = Object.keys(SKATTETABELL_2026).sort(
  (a, b) => Number(a) - Number(b),
);

export function isKnownTaxTableId(id: string): boolean {
  return Object.prototype.hasOwnProperty.call(SKATTETABELL_2026, id.trim());
}

export const DEFAULT_TAX_TABLE_ID: TaxTableId = "7350";

/**
 * A handful of commonly seen table numbers to show as quick picks. Every
 * taxpayer gets their own individually calculated number on their
 * skattekort — these are just convenient starting points, not fixed
 * categories. For an accurate result, always use the number printed on
 * your own tax card or payslip.
 */
export const TAX_TABLE_OPTIONS: TaxTableOption[] = [
  {
    id: "7350",
    label: "Tabell 7350",
    description: "Vanlig eksempeltabell for lønnstakere med standard fradrag.",
  },
  {
    id: "7300",
    label: "Tabell 7300",
    description: "Vanlig eksempeltabell, litt høyere trekk enn 7350.",
  },
  {
    id: "7700",
    label: "Tabell 7700",
    description: "Ofte brukt som tilleggstabell ved flere inntektskilder.",
  },
  {
    id: "8000",
    label: "Tabell 8000",
    description: "Eksempel fra 8000-serien (finjusterte fradragsnivåer).",
  },
];

function interpolate(points: Array<[number, number]>, gross: number): number {
  if (gross <= 0) return 0;
  for (let i = 1; i < points.length; i++) {
    const [x0, y0] = points[i - 1];
    const [x1, y1] = points[i];
    if (gross <= x1) {
      const t = x1 === x0 ? 0 : (gross - x0) / (x1 - x0);
      return y0 + t * (y1 - y0);
    }
  }
  const [x0, y0] = points[points.length - 2];
  const [x1, y1] = points[points.length - 1];
  const marginal = x1 === x0 ? 0 : (y1 - y0) / (x1 - x0);
  return y1 + (gross - x1) * marginal;
}

/**
 * Approximate monthly table withholding for a monthly gross amount, using
 * Skatteetaten's real 2026 trekktabeller (see src/data/skattetabeller-2026.ts).
 * Falls back to DEFAULT_TAX_TABLE_ID if the requested table number isn't one
 * we have data for.
 */
export function tableWithholding(
  monthlyGross: number,
  tableId: TaxTableId = DEFAULT_TAX_TABLE_ID,
): number {
  const gross = Number.isFinite(monthlyGross) ? Math.max(0, monthlyGross) : 0;
  const points =
    SKATTETABELL_2026[tableId.trim()] ?? SKATTETABELL_2026[DEFAULT_TAX_TABLE_ID];
  return Math.round(interpolate(points, gross));
}
