import type { CountryCode } from "@/lib/countries";

export type CostComponent = {
  id: string;
  /** Display name (English; UI can map later) */
  name: string;
  nameNative?: string;
  /** Percentage of gross (0–100) */
  ratePercent?: number;
  /** Fixed annual amount in local currency */
  fixedAnnual?: number;
  /** Only apply percentage above this annual threshold */
  thresholdAnnual?: number;
  note?: string;
};

export type RegionOption = {
  id: string;
  label: string;
  labelEn: string;
  components: CostComponent[];
};

export type EmploymentCostModel = {
  country: CountryCode;
  currency: string;
  currencySymbol: string;
  year: number;
  defaultGross: number;
  disclaimer: string;
  disclaimerEn: string;
  /** Used when no region picker / default region */
  baseComponents: CostComponent[];
  regions?: RegionOption[];
  defaultRegionId?: string;
};

const NO_ZONES: RegionOption[] = [
  {
    id: "I",
    label: "Sone I (14,1 %)",
    labelEn: "Zone I (14.1%)",
    components: [
      {
        id: "aga",
        name: "Employer's NI (arbeidsgiveravgift)",
        nameNative: "Arbeidsgiveravgift",
        ratePercent: 14.1,
      },
    ],
  },
  {
    id: "Ia",
    label: "Sone Ia (10,6 %*)",
    labelEn: "Zone Ia (10.6%*)",
    components: [
      {
        id: "aga",
        name: "Employer's NI (zone Ia)",
        nameNative: "Arbeidsgiveravgift (sone Ia)",
        ratePercent: 10.6,
        note: "Ceiling/aid rules may apply; simplified rate used here.",
      },
    ],
  },
  {
    id: "II",
    label: "Sone II (10,6 %)",
    labelEn: "Zone II (10.6%)",
    components: [
      {
        id: "aga",
        name: "Employer's NI",
        nameNative: "Arbeidsgiveravgift",
        ratePercent: 10.6,
      },
    ],
  },
  {
    id: "III",
    label: "Sone III (6,4 %)",
    labelEn: "Zone III (6.4%)",
    components: [
      {
        id: "aga",
        name: "Employer's NI",
        nameNative: "Arbeidsgiveravgift",
        ratePercent: 6.4,
      },
    ],
  },
  {
    id: "IV",
    label: "Sone IV (5,1 %)",
    labelEn: "Zone IV (5.1%)",
    components: [
      {
        id: "aga",
        name: "Employer's NI",
        nameNative: "Arbeidsgiveravgift",
        ratePercent: 5.1,
      },
    ],
  },
  {
    id: "IVa",
    label: "Sone IVa (7,9 %)",
    labelEn: "Zone IVa (7.9%)",
    components: [
      {
        id: "aga",
        name: "Employer's NI",
        nameNative: "Arbeidsgiveravgift",
        ratePercent: 7.9,
      },
    ],
  },
  {
    id: "V",
    label: "Sone V (0 %)",
    labelEn: "Zone V (0%)",
    components: [
      {
        id: "aga",
        name: "Employer's NI",
        nameNative: "Arbeidsgiveravgift",
        ratePercent: 0,
      },
    ],
  },
];

export const EMPLOYMENT_COST_MODELS: Record<CountryCode, EmploymentCostModel> =
  {
    no: {
      country: "no",
      currency: "NOK",
      currencySymbol: "kr",
      year: 2026,
      defaultGross: 650000,
      disclaimer:
        "Forenklet modell for 2026. Inkluderer arbeidsgiveravgift etter sone og lovpålagt OTP (2 %). Yrkeskadeforsikring og tariffavtaler kommer i tillegg. Ikke skatteråd.",
      disclaimerEn:
        "Simplified 2026 model. Includes regional employer's NI and mandatory OTP (2%). Occupational injury insurance and collective agreements come on top. Not tax advice.",
      defaultRegionId: "I",
      regions: NO_ZONES,
      baseComponents: [
        {
          id: "otp",
          name: "Mandatory occupational pension (OTP min.)",
          nameNative: "OTP (lovpålagt minimum)",
          ratePercent: 2,
          note: "Minimum 2% between 1G–12G; modelled as 2% of gross for simplicity.",
        },
      ],
    },
    se: {
      country: "se",
      currency: "SEK",
      currencySymbol: "kr",
      year: 2026,
      defaultGross: 450000,
      disclaimer:
        "Arbetsgivaravgift beror främst på ålder (2026). Kollektivavtalad tjänstepension tillkommer ofta. Inte skatteråd.",
      disclaimerEn:
        "Swedish employer contributions mainly vary by employee age (2026). Collective occupational pension often comes on top. Not tax advice.",
      defaultRegionId: "standard",
      regions: [
        {
          id: "standard",
          label: "Ordinarie arbetsgivaravgift (31,42 %)",
          labelEn: "Standard employer contribution (31.42%)",
          components: [
            {
              id: "arbetsgivaravgift",
              name: "Employer contributions",
              nameNative: "Arbetsgivaravgift",
              ratePercent: 31.42,
            },
          ],
        },
        {
          id: "youth",
          label: "Ungdom / nedsättning (ca 19,8 %)",
          labelEn: "Youth / reduced rate (~19.8%)",
          components: [
            {
              id: "arbetsgivaravgift",
              name: "Reduced employer contributions",
              nameNative: "Nedsatt arbetsgivaravgift",
              ratePercent: 19.8,
              note: "Simplified youth/special reduction estimate.",
            },
          ],
        },
        {
          id: "older",
          label: "Äldre arbetstagare (ca 10,2 %)",
          labelEn: "Older employee (~10.2%)",
          components: [
            {
              id: "arbetsgivaravgift",
              name: "Age-reduced employer contributions",
              nameNative: "Åldersnedsatt arbetsgivaravgift",
              ratePercent: 10.21,
              note: "Simplified rate for older workers; exact band depends on birth year.",
            },
          ],
        },
      ],
      baseComponents: [],
    },
    dk: {
      country: "dk",
      currency: "DKK",
      currencySymbol: "kr",
      year: 2026,
      defaultGross: 450000,
      disclaimer:
        "Danmark har ingen klassisk arbejdsgiver-socialskat. Modellen inkluderer feriegodtgørelse 12,5 % samt typiske ATP/øvrige arbejdsgiverbidrag. Barsel/AES m.m. kan variere. Ikke skatteråd.",
      disclaimerEn:
        "Denmark has no classic employer social security tax. Model includes holiday allowance 12.5% plus typical ATP/other employer levies. Maternity/AES etc. may vary. Not tax advice.",
      baseComponents: [
        {
          id: "ferie",
          name: "Holiday allowance (feriegodtgørelse)",
          nameNative: "Feriegodtgørelse",
          ratePercent: 12.5,
        },
        {
          id: "atp-other",
          name: "ATP & other employer levies (estimate)",
          nameNative: "ATP og øvrige bidrag (estimat)",
          ratePercent: 1.5,
          note: "Simplified combined estimate for ATP and related schemes.",
        },
      ],
    },
    fi: {
      country: "fi",
      currency: "EUR",
      currencySymbol: "€",
      year: 2026,
      defaultGross: 45000,
      disclaimer:
        "TyEL-maksu on yrityskohtainen. Malli sisältää tyypillisiä työnantajan sivukuluja; tapaturmavakuutus vaihtelee toimialan mukaan. Ei veroneuvontaa.",
      disclaimerEn:
        "TyEL is company-specific. Model uses typical employer side costs; accident insurance varies by industry. Not tax advice.",
      defaultRegionId: "avg",
      regions: [
        {
          id: "avg",
          label: "Keskimääräinen TyEL (~17,4 %)",
          labelEn: "Average TyEL (~17.4%)",
          components: [
            {
              id: "tyel",
              name: "Earnings-related pension (TyEL, employer)",
              nameNative: "TyEL (työnantaja)",
              ratePercent: 17.4,
            },
          ],
        },
        {
          id: "low",
          label: "Matala TyEL (~16,0 %)",
          labelEn: "Lower TyEL (~16.0%)",
          components: [
            {
              id: "tyel",
              name: "Earnings-related pension (TyEL, employer)",
              nameNative: "TyEL (työnantaja)",
              ratePercent: 16.0,
            },
          ],
        },
        {
          id: "high",
          label: "Korkea TyEL (~19,0 %)",
          labelEn: "Higher TyEL (~19.0%)",
          components: [
            {
              id: "tyel",
              name: "Earnings-related pension (TyEL, employer)",
              nameNative: "TyEL (työnantaja)",
              ratePercent: 19.0,
            },
          ],
        },
      ],
      baseComponents: [
        {
          id: "other-fi",
          name: "Unemployment, health, accident (employer est.)",
          nameNative: "Muut työnantajamaksut (arvio)",
          ratePercent: 3.1,
        },
      ],
    },
    uk: {
      country: "uk",
      currency: "GBP",
      currencySymbol: "£",
      year: 2026,
      defaultGross: 40000,
      disclaimer:
        "UK Class 1 employer NI applies UK-wide (England, Scotland, Wales, Northern Ireland). Model uses 15% above a £5,000 secondary threshold (simplified) plus 3% auto-enrolment pension. Employment Allowance is not applied. Not tax advice.",
      disclaimerEn:
        "UK Class 1 employer NI applies UK-wide (England, Scotland, Wales, Northern Ireland). Model uses 15% above a £5,000 secondary threshold (simplified) plus 3% auto-enrolment pension. Employment Allowance is not applied. Not tax advice.",
      baseComponents: [
        {
          id: "ni",
          name: "Employer National Insurance (Class 1)",
          ratePercent: 15,
          thresholdAnnual: 5000,
        },
        {
          id: "pension",
          name: "Auto-enrolment pension (employer min.)",
          ratePercent: 3,
        },
      ],
    },
    de: {
      country: "de",
      currency: "EUR",
      currencySymbol: "€",
      year: 2026,
      defaultGross: 50000,
      disclaimer:
        "Bundesweite Arbeitgeberanteile (ca. 20 %). Zusatzbeitrag Krankenkasse und Pflegeversicherung können leicht abweichen. Keine Steuerberatung.",
      disclaimerEn:
        "Nationwide employer shares (~20%). Health fund additional contribution and long-term care can vary slightly. Not tax advice.",
      regions: [
        {
          id: "standard",
          label: "Bundesweit (Standard)",
          labelEn: "Nationwide (standard)",
          components: [
            {
              id: "rv",
              name: "Pension insurance (employer)",
              nameNative: "Rentenversicherung (AG)",
              ratePercent: 9.3,
            },
            {
              id: "kv",
              name: "Health insurance (employer avg.)",
              nameNative: "Krankenversicherung (AG, Schnitt)",
              ratePercent: 8.05,
              note: "Includes average Zusatzbeitrag share.",
            },
            {
              id: "av",
              name: "Unemployment insurance (employer)",
              nameNative: "Arbeitslosenversicherung (AG)",
              ratePercent: 1.3,
            },
            {
              id: "pv",
              name: "Long-term care (employer)",
              nameNative: "Pflegeversicherung (AG)",
              ratePercent: 1.8,
            },
          ],
        },
        {
          id: "sachsen",
          label: "Sachsen (Pflege abweichend)",
          labelEn: "Saxony (care insurance differs)",
          components: [
            {
              id: "rv",
              name: "Pension insurance (employer)",
              nameNative: "Rentenversicherung (AG)",
              ratePercent: 9.3,
            },
            {
              id: "kv",
              name: "Health insurance (employer avg.)",
              nameNative: "Krankenversicherung (AG, Schnitt)",
              ratePercent: 8.05,
            },
            {
              id: "av",
              name: "Unemployment insurance (employer)",
              nameNative: "Arbeitslosenversicherung (AG)",
              ratePercent: 1.3,
            },
            {
              id: "pv",
              name: "Long-term care (Saxony employer)",
              nameNative: "Pflegeversicherung Sachsen (AG)",
              ratePercent: 2.3,
              note: "Saxony historically allocates a higher employer care share.",
            },
          ],
        },
      ],
      defaultRegionId: "standard",
      baseComponents: [],
    },
    pl: {
      country: "pl",
      currency: "PLN",
      currencySymbol: "zł",
      year: 2026,
      defaultGross: 90000,
      disclaimer:
        "Składki pracodawcy ZUS + FP/FGŚP oraz przeciętna składka wypadkowa. Składka wypadkowa zależy od branży (0,67–3,33 %). To nie jest porada podatkowa.",
      disclaimerEn:
        "Employer ZUS + FP/FGŚP plus average accident contribution. Accident rate depends on industry (0.67–3.33%). Not tax advice.",
      regions: [
        {
          id: "avg",
          label: "Przeciętna składka wypadkowa (~1,67 %)",
          labelEn: "Average accident rate (~1.67%)",
          components: [
            {
              id: "emerytalna",
              name: "Pension (employer)",
              nameNative: "Emerytalna (płatnik)",
              ratePercent: 9.76,
            },
            {
              id: "rentowa",
              name: "Disability (employer)",
              nameNative: "Rentowa (płatnik)",
              ratePercent: 6.5,
            },
            {
              id: "wypadkowa",
              name: "Accident insurance",
              nameNative: "Wypadkowa",
              ratePercent: 1.67,
            },
            {
              id: "fp",
              name: "Labour Fund (FP)",
              nameNative: "Fundusz Pracy",
              ratePercent: 2.45,
            },
            {
              id: "fgsp",
              name: "FGŚP",
              nameNative: "FGŚP",
              ratePercent: 0.1,
            },
          ],
        },
        {
          id: "low",
          label: "Niska wypadkowa (0,67 %)",
          labelEn: "Low accident rate (0.67%)",
          components: [
            {
              id: "emerytalna",
              name: "Pension (employer)",
              ratePercent: 9.76,
            },
            {
              id: "rentowa",
              name: "Disability (employer)",
              ratePercent: 6.5,
            },
            {
              id: "wypadkowa",
              name: "Accident insurance",
              ratePercent: 0.67,
            },
            { id: "fp", name: "Labour Fund (FP)", ratePercent: 2.45 },
            { id: "fgsp", name: "FGŚP", ratePercent: 0.1 },
          ],
        },
        {
          id: "high",
          label: "Wysoka wypadkowa (3,33 %)",
          labelEn: "High accident rate (3.33%)",
          components: [
            {
              id: "emerytalna",
              name: "Pension (employer)",
              ratePercent: 9.76,
            },
            {
              id: "rentowa",
              name: "Disability (employer)",
              ratePercent: 6.5,
            },
            {
              id: "wypadkowa",
              name: "Accident insurance",
              ratePercent: 3.33,
            },
            { id: "fp", name: "Labour Fund (FP)", ratePercent: 2.45 },
            { id: "fgsp", name: "FGŚP", ratePercent: 0.1 },
          ],
        },
      ],
      defaultRegionId: "avg",
      baseComponents: [],
    },
    is: {
      country: "is",
      currency: "ISK",
      currencySymbol: "kr",
      year: 2026,
      defaultGross: 9000000,
      disclaimer:
        "Tryggingagjald og dæmigerð lífeyrissjóðsgreiðsla vinnuveitanda. Samið getur verið um hærri lífeyrisiðgjöld. Ekki skattaráðgjöf.",
      disclaimerEn:
        "Social security tax plus typical employer pension contribution. Collective agreements may set higher pension rates. Not tax advice.",
      baseComponents: [
        {
          id: "trygging",
          name: "Social security tax (tryggingagjald)",
          nameNative: "Tryggingagjald",
          ratePercent: 6.35,
        },
        {
          id: "pension",
          name: "Employer pension contribution (typical)",
          nameNative: "Lífeyrissjóður (vinnuveitandi)",
          ratePercent: 11.5,
        },
      ],
    },
  };

export type EmploymentCostLine = {
  id: string;
  name: string;
  amount: number;
  detail: string;
};

export type EmploymentCostResult = {
  gross: number;
  employerCost: number;
  total: number;
  effectiveRatePercent: number;
  lines: EmploymentCostLine[];
  currency: string;
};

function resolveComponents(
  model: EmploymentCostModel,
  regionId?: string,
): CostComponent[] {
  const region =
    model.regions?.find((r) => r.id === (regionId ?? model.defaultRegionId)) ??
    model.regions?.[0];
  return [...(region?.components ?? []), ...model.baseComponents];
}

export function calculateEmploymentCost(
  country: CountryCode,
  grossAnnual: number,
  regionId?: string,
  lang: "native" | "en" = "en",
): EmploymentCostResult {
  const model = EMPLOYMENT_COST_MODELS[country];
  const gross = Number.isFinite(grossAnnual) && grossAnnual > 0 ? grossAnnual : 0;
  const components = resolveComponents(model, regionId);
  const lines: EmploymentCostLine[] = [];
  let employerCost = 0;

  for (const c of components) {
    let amount = 0;
    let detail = "";
    if (typeof c.fixedAnnual === "number") {
      amount = c.fixedAnnual;
      detail = `${model.currencySymbol} ${c.fixedAnnual}/year`;
    } else if (typeof c.ratePercent === "number") {
      const base =
        typeof c.thresholdAnnual === "number"
          ? Math.max(0, gross - c.thresholdAnnual)
          : gross;
      amount = (base * c.ratePercent) / 100;
      detail =
        typeof c.thresholdAnnual === "number"
          ? `${c.ratePercent}% above ${model.currencySymbol}${c.thresholdAnnual.toLocaleString("en-GB")}`
          : `${c.ratePercent}%`;
    }
    amount = Math.round(amount);
    employerCost += amount;
    const name =
      lang === "native" && c.nameNative ? c.nameNative : c.name;
    lines.push({ id: c.id, name, amount, detail });
  }

  const total = Math.round(gross + employerCost);
  const effectiveRatePercent =
    gross > 0 ? Math.round((employerCost / gross) * 1000) / 10 : 0;

  return {
    gross: Math.round(gross),
    employerCost,
    total,
    effectiveRatePercent,
    lines,
    currency: model.currency,
  };
}
