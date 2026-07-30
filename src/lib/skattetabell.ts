/**
 * Simplified Norwegian withholding-tax tables for illustration.
 * Not official Skatteetaten tables — labeled clearly in the UI.
 */

export type TaxTableId = "7100" | "8000" | "7300";

export type TaxTableOption = {
  id: TaxTableId;
  label: string;
  description: string;
};

export const TAX_TABLE_OPTIONS: TaxTableOption[] = [
  {
    id: "7100",
    label: "Tabell 7100 (forenklet)",
    description: "Vanlig lønnstaker, standard fradrag",
  },
  {
    id: "8000",
    label: "Tabell 8000 (forenklet)",
    description: "Nyere tabellserie, standard fradrag",
  },
  {
    id: "7300",
    label: "Tabell 7300 (forenklet)",
    description: "Høyere trekk (f.eks. biinntekt-stil)",
  },
];

/** Monthly gross → approximate monthly withholding (NOK). */
const TABLE_POINTS: Record<TaxTableId, Array<[number, number]>> = {
  // Anchored to commonly cited 7100-style examples, then interpolated.
  "7100": [
    [0, 0],
    [15000, 1200],
    [20000, 4016],
    [30000, 7800],
    [40000, 11874],
    [50000, 16000],
    [60000, 20440],
    [70000, 25200],
    [80000, 30460],
    [100000, 42000],
    [120000, 54000],
  ],
  // Slightly lower effective draw than classic 7100 examples (newer series feel).
  "8000": [
    [0, 0],
    [15000, 1000],
    [20000, 3600],
    [30000, 7200],
    [40000, 11000],
    [50000, 15000],
    [60000, 19200],
    [70000, 23800],
    [80000, 28800],
    [100000, 40000],
    [120000, 52000],
  ],
  // Higher withholding (side-income style).
  "7300": [
    [0, 0],
    [15000, 4500],
    [20000, 7000],
    [30000, 12000],
    [40000, 17000],
    [50000, 22500],
    [60000, 28200],
    [70000, 34300],
    [80000, 40800],
    [100000, 54000],
    [120000, 68000],
  ],
};

function interpolate(points: Array<[number, number]>, gross: number): number {
  if (gross <= 0) return 0;
  for (let i = 1; i < points.length; i++) {
    const [x0, y0] = points[i - 1];
    const [x1, y1] = points[i];
    if (gross <= x1) {
      const t = (gross - x0) / (x1 - x0);
      return y0 + t * (y1 - y0);
    }
  }
  const [x0, y0] = points[points.length - 2];
  const [x1, y1] = points[points.length - 1];
  const marginal = (y1 - y0) / (x1 - x0);
  return y1 + (gross - x1) * marginal;
}

/** Approximate monthly table withholding for a monthly gross amount. */
export function tableWithholding(
  monthlyGross: number,
  tableId: TaxTableId = "7100",
): number {
  const gross = Number.isFinite(monthlyGross) ? Math.max(0, monthlyGross) : 0;
  return Math.round(interpolate(TABLE_POINTS[tableId], gross));
}
