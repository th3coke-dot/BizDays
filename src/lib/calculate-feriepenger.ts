import type { FeriepengerResult, FeriepengerSats } from "@/types";

export const FERIEPENGER_SATSER: {
  value: FeriepengerSats;
  label: string;
  description: string;
}[] = [
  {
    value: 10.2,
    label: "10,2 %",
    description: "Lovfestet minstesats",
  },
  {
    value: 12,
    label: "12 %",
    description: "Vanlig i tariffavtaler",
  },
  {
    value: 12.5,
    label: "12,5 % (over 60)",
    description: "10,2 % + 2,3 % ekstra for arbeidstakere over 60 år",
  },
];

/**
 * Beregner feriepenger ut fra brutto feriepengegrunnlag og sats.
 */
export function calculateFeriepenger(
  brutto: number,
  sats: FeriepengerSats,
): FeriepengerResult {
  const safeBrutto = Number.isFinite(brutto) && brutto > 0 ? brutto : 0;
  const belop = Math.round(safeBrutto * (sats / 100));

  return {
    brutto: safeBrutto,
    sats,
    belop,
  };
}
