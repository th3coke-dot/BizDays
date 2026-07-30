import type { CountryCode } from "@/lib/countries";

/** Standard working-day basis for day-rate estimates. */
export const WORKING_DAYS_PER_YEAR = 260;

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
  /** Employer pension / occupational pension contribution */
  isPension?: boolean;
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
  /**
   * Default employer pension % when the resolved component list has no
   * pension line (or as fallback before override).
   */
  defaultPensionPercent: number;
  pensionName: string;
  pensionNameNative?: string;
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
      defaultPensionPercent: 2,
      pensionName: "Occupational pension (OTP)",
      pensionNameNative: "OTP / pensjon",
      disclaimer:
        "Forenklet modell for 2026. Inkluderer arbeidsgiveravgift etter sone og OTP/pensjon (redigerbar). Yrkeskadeforsikring og tariffavtaler kan komme i tillegg. Ikke skatteråd.",
      disclaimerEn:
        "Simplified 2026 model. Includes regional employer's NI and editable OTP/pension. Occupational injury insurance and collective agreements may come on top. Not tax advice.",
      defaultRegionId: "I",
      regions: NO_ZONES,
      baseComponents: [
        {
          id: "otp",
          name: "Occupational pension (OTP)",
          nameNative: "OTP / pensjon",
          ratePercent: 2,
          isPension: true,
          note: "Minimum often 2%; many schemes are higher — edit the pension field.",
        },
      ],
    },
    se: {
      country: "se",
      currency: "SEK",
      currencySymbol: "kr",
      year: 2026,
      defaultGross: 450000,
      defaultPensionPercent: 4.5,
      pensionName: "Occupational pension (tjänstepension)",
      pensionNameNative: "Tjänstepension",
      disclaimer:
        "Arbetsgivaravgift beror främst på ålder (2026). Tjänstepension är redigerbar (kollektivavtal varierar). Inte skatteråd.",
      disclaimerEn:
        "Swedish employer contributions mainly vary by employee age (2026). Occupational pension is editable (collective schemes vary). Not tax advice.",
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
      baseComponents: [
        {
          id: "tjanstepension",
          name: "Occupational pension (tjänstepension)",
          nameNative: "Tjänstepension",
          ratePercent: 4.5,
          isPension: true,
        },
      ],
    },
    dk: {
      country: "dk",
      currency: "DKK",
      currencySymbol: "kr",
      year: 2026,
      defaultGross: 450000,
      defaultPensionPercent: 8,
      pensionName: "Employer pension contribution",
      pensionNameNative: "Pension (arbejdsgiver)",
      disclaimer:
        "Danmark har ingen klassisk arbejdsgiver-socialskat. Modellen inkluderer feriegodtgørelse 12,5 %, ATP/øvrige bidrag og redigerbar pension. Barsel/AES m.m. kan variere. Ikke skatteråd.",
      disclaimerEn:
        "Denmark has no classic employer social security tax. Model includes holiday allowance 12.5%, ATP/other levies and editable pension. Maternity/AES etc. may vary. Not tax advice.",
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
        {
          id: "pension",
          name: "Employer pension contribution",
          nameNative: "Pension (arbejdsgiver)",
          ratePercent: 8,
          isPension: true,
        },
      ],
    },
    fi: {
      country: "fi",
      currency: "EUR",
      currencySymbol: "€",
      year: 2026,
      defaultGross: 45000,
      defaultPensionPercent: 17.4,
      pensionName: "Earnings-related pension (TyEL)",
      pensionNameNative: "TyEL (työnantaja)",
      disclaimer:
        "TyEL on yrityskohtainen ja muokattavissa. Malli sisältää myös muita työnantajan sivukuluja. Ei veroneuvontaa.",
      disclaimerEn:
        "TyEL is company-specific and editable. Model also includes other employer side costs. Not tax advice.",
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
              isPension: true,
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
              isPension: true,
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
              isPension: true,
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
      defaultPensionPercent: 3,
      pensionName: "Workplace pension (employer)",
      disclaimer:
        "UK Class 1 employer NI applies UK-wide. Model uses 15% above a £5,000 secondary threshold (simplified) plus editable workplace pension (auto-enrolment minimum often 3%). Employment Allowance is not applied. Not tax advice.",
      disclaimerEn:
        "UK Class 1 employer NI applies UK-wide. Model uses 15% above a £5,000 secondary threshold (simplified) plus editable workplace pension (auto-enrolment minimum often 3%). Employment Allowance is not applied. Not tax advice.",
      baseComponents: [
        {
          id: "ni",
          name: "Employer National Insurance (Class 1)",
          ratePercent: 15,
          thresholdAnnual: 5000,
        },
        {
          id: "pension",
          name: "Workplace pension (employer)",
          ratePercent: 3,
          isPension: true,
        },
      ],
    },
    de: {
      country: "de",
      currency: "EUR",
      currencySymbol: "€",
      year: 2026,
      defaultGross: 50000,
      defaultPensionPercent: 4,
      pensionName: "Company pension (bAV)",
      pensionNameNative: "Betriebliche Altersvorsorge (bAV)",
      disclaimer:
        "Bundesweite Arbeitgeberanteile (ca. 20 %) plus editierbare bAV. Zusatzbeitrag Krankenkasse und Pflegeversicherung können abweichen. Keine Steuerberatung.",
      disclaimerEn:
        "Nationwide employer shares (~20%) plus editable company pension (bAV). Health fund additional contribution and long-term care can vary. Not tax advice.",
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
      baseComponents: [
        {
          id: "bav",
          name: "Company pension (bAV)",
          nameNative: "Betriebliche Altersvorsorge (bAV)",
          ratePercent: 4,
          isPension: true,
        },
      ],
    },
    pl: {
      country: "pl",
      currency: "PLN",
      currencySymbol: "zł",
      year: 2026,
      defaultGross: 90000,
      defaultPensionPercent: 1.5,
      pensionName: "PPK / occupational pension (employer)",
      pensionNameNative: "PPK / emerytura (pracodawca)",
      disclaimer:
        "Składki pracodawcy ZUS + FP/FGŚP, składka wypadkowa oraz edytowalne PPK. To nie jest porada podatkowa.",
      disclaimerEn:
        "Employer ZUS + FP/FGŚP, accident contribution, and editable PPK pension. Not tax advice.",
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
      baseComponents: [
        {
          id: "ppk",
          name: "PPK / occupational pension (employer)",
          nameNative: "PPK / emerytura (pracodawca)",
          ratePercent: 1.5,
          isPension: true,
        },
      ],
    },
    is: {
      country: "is",
      currency: "ISK",
      currencySymbol: "kr",
      year: 2026,
      defaultGross: 9000000,
      defaultPensionPercent: 11.5,
      pensionName: "Employer pension contribution",
      pensionNameNative: "Lífeyrissjóður (vinnuveitandi)",
      disclaimer:
        "Tryggingagjald og breytanlegt lífeyrisiðgjald vinnuveitanda. Samið getur verið um hærri iðgjöld. Ekki skattaráðgjöf.",
      disclaimerEn:
        "Social security tax plus editable employer pension contribution. Collective agreements may set higher rates. Not tax advice.",
      baseComponents: [
        {
          id: "trygging",
          name: "Social security tax (tryggingagjald)",
          nameNative: "Tryggingagjald",
          ratePercent: 6.35,
        },
        {
          id: "pension",
          name: "Employer pension contribution",
          nameNative: "Lífeyrissjóður (vinnuveitandi)",
          ratePercent: 11.5,
          isPension: true,
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
  pensionPercent: number;
  lines: EmploymentCostLine[];
  currency: string;
  /** Period rates based on total employment cost */
  dayRate: number;
  weekRate: number;
  monthRate: number;
  yearRate: number;
};

export type EmploymentCostOptions = {
  regionId?: string;
  lang?: "native" | "en";
  /** Override employer pension contribution (% of gross) */
  pensionPercent?: number;
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

export function getDefaultPensionPercent(
  country: CountryCode,
  regionId?: string,
): number {
  const model = EMPLOYMENT_COST_MODELS[country];
  const components = resolveComponents(model, regionId);
  const pension = components.find(
    (c) => c.isPension && typeof c.ratePercent === "number",
  );
  if (pension && typeof pension.ratePercent === "number") {
    return pension.ratePercent;
  }
  return model.defaultPensionPercent;
}

function applyPensionOverride(
  model: EmploymentCostModel,
  components: CostComponent[],
  pensionPercent: number,
): CostComponent[] {
  const withoutPension = components.filter((c) => !c.isPension);
  const template = components.find((c) => c.isPension);
  return [
    ...withoutPension,
    {
      id: template?.id ?? "pension",
      name: template?.name ?? model.pensionName,
      nameNative: template?.nameNative ?? model.pensionNameNative,
      ratePercent: pensionPercent,
      isPension: true,
    },
  ];
}

export function calculateEmploymentCost(
  country: CountryCode,
  grossAnnual: number,
  regionIdOrOptions?: string | EmploymentCostOptions,
  langArg: "native" | "en" = "en",
): EmploymentCostResult {
  const options: EmploymentCostOptions =
    typeof regionIdOrOptions === "object" && regionIdOrOptions !== null
      ? regionIdOrOptions
      : { regionId: regionIdOrOptions, lang: langArg };

  const model = EMPLOYMENT_COST_MODELS[country];
  const lang = options.lang ?? "en";
  const gross = Number.isFinite(grossAnnual) && grossAnnual > 0 ? grossAnnual : 0;
  const defaultPension = getDefaultPensionPercent(country, options.regionId);
  const pensionPercent =
    typeof options.pensionPercent === "number" &&
    Number.isFinite(options.pensionPercent)
      ? Math.max(0, options.pensionPercent)
      : defaultPension;

  const components = applyPensionOverride(
    model,
    resolveComponents(model, options.regionId),
    pensionPercent,
  );
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
    pensionPercent,
    lines,
    currency: model.currency,
    dayRate: Math.round(total / WORKING_DAYS_PER_YEAR),
    weekRate: Math.round(total / 52),
    monthRate: Math.round(total / 12),
    yearRate: total,
  };
}
