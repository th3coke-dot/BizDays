import type { CostComponent } from "@/lib/calculate-employment-cost";
import type { CountryCode } from "@/lib/countries";

/**
 * Seed catalogue of collective bargaining agreements (CBAs) per country.
 *
 * IMPORTANT — data provenance:
 * This is a small, illustrative starter set, not a licensed or continuously
 * synced feed of real agreements. Collective agreements are typically
 * published (and updated) by the signing unions/employer associations
 * themselves, are sometimes paywalled, and change every bargaining round.
 * Every entry below is marked `verified: false` unless a maintainer has
 * cross-checked the numbers against the agreement's official text and
 * recorded a source. Treat the percentages as a starting point for
 * discussion, not as payroll-grade figures — always confirm against the
 * signed agreement (or your HR/legal counsel) before running payroll.
 *
 * To add a real, verified agreement: set `verified: true` and fill in
 * `sourceNote` with the document title, publisher and revision date.
 */

export type CbaOverride = {
  /** Overrides the model's employer pension % when this CBA is applied. */
  pensionPercent?: number;
  /** Additional line items layered on top of the base country model. */
  extraComponents?: CostComponent[];
};

export type CollectiveAgreement = {
  id: string;
  country: CountryCode;
  /** English display name */
  name: string;
  /** Native-language name, if different */
  nameNative?: string;
  /** Signing parties, e.g. "NHO / LO" */
  parties: string;
  sector: string;
  /** Has a maintainer verified these figures against the primary source? */
  verified: boolean;
  sourceNote: string;
  overrides: CbaOverride;
};

export const CBA_SEED: CollectiveAgreement[] = [
  // ---- Norway ----
  {
    id: "no-fellesoverenskomsten-industri",
    country: "no",
    name: "Industry agreement (illustrative)",
    nameNative: "Fellesoverenskomsten for industrien (illustrativ)",
    parties: "NHO / Fellesforbundet",
    sector: "Industry / manufacturing",
    verified: false,
    sourceNote:
      "Placeholder based on commonly cited public figures for OTP top-ups in industry agreements. Verify against the current NHO–Fellesforbundet text before use.",
    overrides: {
      pensionPercent: 4,
      extraComponents: [
        {
          id: "cba-avtalefestet-ferie",
          name: "Agreement-based extra holiday (CBA)",
          nameNative: "Avtalefestet ferie (tariff)",
          ratePercent: 0.8,
          note: "Illustrative estimate of the extra 5th holiday week funded via the agreement.",
        },
      ],
    },
  },
  {
    id: "no-virke-varehandel",
    country: "no",
    name: "Retail agreement (illustrative)",
    nameNative: "Landsoverenskomsten for varehandel (illustrativ)",
    parties: "Virke / Handel og Kontor",
    sector: "Retail",
    verified: false,
    sourceNote:
      "Placeholder figures — confirm against the current Virke–HK agreement.",
    overrides: {
      pensionPercent: 3,
    },
  },

  // ---- Sweden ----
  {
    id: "se-unionen-tjanstemannaavtal",
    country: "se",
    name: "White-collar agreement (illustrative)",
    nameNative: "Tjänstemannaavtalet (illustrativ)",
    parties: "Almega / Unionen",
    sector: "Services / office",
    verified: false,
    sourceNote:
      "Placeholder — verify against the current Almega–Unionen ITP-linked agreement text.",
    overrides: {
      pensionPercent: 5.5,
      extraComponents: [
        {
          id: "cba-avtalsforsakring",
          name: "Collective insurance package (CBA)",
          nameNative: "Avtalsförsäkringar",
          ratePercent: 0.4,
          note: "Illustrative combined estimate for TGL/TFA-type collectively agreed insurance.",
        },
      ],
    },
  },

  // ---- Denmark ----
  {
    id: "dk-da-lo-industriens",
    country: "dk",
    name: "Industry agreement (illustrative)",
    nameNative: "Industriens Overenskomst (illustrativ)",
    parties: "DI / CO-industri",
    sector: "Industry",
    verified: false,
    sourceNote: "Placeholder — verify against the current DI–CO-industri text.",
    overrides: {
      pensionPercent: 12,
      extraComponents: [
        {
          id: "cba-fritvalg",
          name: "Freely disposable contribution (CBA)",
          nameNative: "Fritvalgskonto",
          ratePercent: 5,
          note: "Illustrative estimate of the collectively agreed 'fritvalg' contribution.",
        },
      ],
    },
  },

  // ---- Finland ----
  {
    id: "fi-teknologiateollisuus",
    country: "fi",
    name: "Technology industry agreement (illustrative)",
    nameNative: "Teknologiateollisuuden työehtosopimus (illustrativ)",
    parties: "Teknologiateollisuus / Teollisuusliitto",
    sector: "Technology / manufacturing",
    verified: false,
    sourceNote: "Placeholder — verify against the current sector agreement.",
    overrides: {
      pensionPercent: 17.4,
      extraComponents: [
        {
          id: "cba-lomaraha",
          name: "Holiday bonus top-up (CBA)",
          nameNative: "Lomaraha",
          ratePercent: 2.1,
          note: "Illustrative estimate of an agreement-based holiday bonus accrual.",
        },
      ],
    },
  },

  // ---- United Kingdom ----
  {
    id: "uk-usdaw-retail-illustrative",
    country: "uk",
    name: "Retail sector agreement (illustrative)",
    parties: "Retail employer / USDAW",
    sector: "Retail",
    verified: false,
    sourceNote:
      "Placeholder — UK collective agreements vary widely by employer; confirm against your recognised agreement.",
    overrides: {
      pensionPercent: 4,
    },
  },

  // ---- Germany ----
  {
    id: "de-ig-metall-illustrative",
    country: "de",
    name: "Metal & electrical industry agreement (illustrative)",
    nameNative: "Tarifvertrag Metall- und Elektroindustrie (illustrativ)",
    parties: "Gesamtmetall / IG Metall",
    sector: "Metal & electrical industry",
    verified: false,
    sourceNote: "Placeholder — verify against the current regional Tarifvertrag.",
    overrides: {
      pensionPercent: 5,
      extraComponents: [
        {
          id: "cba-tarifliches-zusatzgeld",
          name: "Collective supplementary payment (CBA)",
          nameNative: "Tarifliches Zusatzgeld",
          ratePercent: 1.2,
          note: "Illustrative estimate of an agreement-based supplementary payment.",
        },
      ],
    },
  },

  // ---- Poland ----
  {
    id: "pl-solidarnosc-illustrative",
    country: "pl",
    name: "Manufacturing sector agreement (illustrative)",
    nameNative: "Zakładowy układ zbiorowy pracy (illustrativ)",
    parties: "Employer / NSZZ Solidarność",
    sector: "Manufacturing",
    verified: false,
    sourceNote: "Placeholder — verify against your registered company agreement.",
    overrides: {
      pensionPercent: 2,
    },
  },

  // ---- Iceland ----
  {
    id: "is-sa-vr-illustrative",
    country: "is",
    name: "General/commercial agreement (illustrative)",
    nameNative: "Kjarasamningur SA og VR (illustrativ)",
    parties: "SA / VR",
    sector: "General / commercial",
    verified: false,
    sourceNote: "Placeholder — verify against the current SA–VR agreement.",
    overrides: {
      pensionPercent: 11.5,
      extraComponents: [
        {
          id: "cba-orlofssjodur",
          name: "Vacation & sick fund contribution (CBA)",
          nameNative: "Orlofs- og sjúkrasjóður",
          ratePercent: 1,
          note: "Illustrative estimate of collectively agreed fund contributions.",
        },
      ],
    },
  },
];

export function getCbasForCountry(country: CountryCode): CollectiveAgreement[] {
  return CBA_SEED.filter((cba) => cba.country === country);
}

export function getCbaById(id: string): CollectiveAgreement | undefined {
  return CBA_SEED.find((cba) => cba.id === id);
}
