import type { CostComponent } from "@/lib/calculate-employment-cost";

/**
 * Extraction of payroll-relevant figures from an uploaded local agreement.
 *
 * SECURITY NOTE: functions in this module must stay pure / side-effect
 * free with respect to persistence. They receive plain text already
 * extracted from a document and return structured data — they never write
 * to disk, a database, or any logging sink. See SECURITY.md for the full
 * data-handling policy.
 */

export type ExtractedField = {
  label: string;
  value: string;
  confidence: "high" | "medium" | "low";
};

export type AgreementExtraction = {
  /** How the extraction was produced. */
  method: "ai" | "heuristic";
  /** Suggested employer pension % to apply, if detected. */
  pensionPercent?: number;
  /** Suggested extra cost line items to layer onto the calculation. */
  extraComponents: CostComponent[];
  /** Human-readable fields found, for the user to review before applying anything. */
  fields: ExtractedField[];
  /** Warnings / caveats to show the user (e.g. "no pension clause found"). */
  warnings: string[];
};

const PENSION_PATTERNS: RegExp[] = [
  /pension[^\n%]{0,40}?(\d{1,2}(?:[.,]\d{1,2})?)\s?%/i,
  /(?:otp|tjänstepension|tyel|bav|ppk|lífeyri)[^\n%]{0,40}?(\d{1,2}(?:[.,]\d{1,2})?)\s?%/i,
  /(\d{1,2}(?:[.,]\d{1,2})?)\s?%[^\n]{0,40}?pension/i,
];

const HOLIDAY_PAY_PATTERNS: RegExp[] = [
  /(?:holiday|vacation|ferie|semester|lomaraha)[^\n%]{0,40}?(\d{1,2}(?:[.,]\d{1,2})?)\s?%/i,
];

const NOTICE_PATTERNS: RegExp[] = [
  /notice period[^\n]{0,40}?(\d{1,2})\s?(?:months|weeks|days)/i,
  /oppsigelsestid[^\n]{0,40}?(\d{1,2})\s?(?:måneder|uker|dager)/i,
];

function parseLocaleNumber(raw: string): number {
  return Number(raw.replace(",", "."));
}

function firstMatch(patterns: RegExp[], text: string): RegExpMatchArray | null {
  for (const pattern of patterns) {
    const match = text.match(pattern);
    if (match) return match;
  }
  return null;
}

/**
 * Best-effort, fully local (no network) heuristic extractor. Used whenever
 * no AI provider key is configured, or as a safety net if the AI call
 * fails. Deliberately conservative: it only ever returns numbers it found
 * verbatim in the text, and always flags itself as low/medium confidence.
 */
export function heuristicExtract(text: string): AgreementExtraction {
  const fields: ExtractedField[] = [];
  const warnings: string[] = [
    "Extracted with simple pattern matching (no AI configured) — treat as a rough starting point and confirm every figure against the source document.",
  ];
  const extraComponents: CostComponent[] = [];
  let pensionPercent: number | undefined;

  const pensionMatch = firstMatch(PENSION_PATTERNS, text);
  if (pensionMatch) {
    pensionPercent = parseLocaleNumber(pensionMatch[1]);
    fields.push({
      label: "Pension contribution",
      value: `${pensionMatch[1]}%`,
      confidence: "medium",
    });
  } else {
    warnings.push("No pension percentage was found in the document text.");
  }

  const holidayMatch = firstMatch(HOLIDAY_PAY_PATTERNS, text);
  if (holidayMatch) {
    const rate = parseLocaleNumber(holidayMatch[1]);
    extraComponents.push({
      id: "doc-holiday-pay",
      name: "Holiday pay / allowance (from uploaded agreement)",
      ratePercent: rate,
      note: "Detected via keyword match — verify wording and eligibility rules in the source document.",
    });
    fields.push({
      label: "Holiday pay / allowance",
      value: `${holidayMatch[1]}%`,
      confidence: "medium",
    });
  }

  const noticeMatch = firstMatch(NOTICE_PATTERNS, text);
  if (noticeMatch) {
    fields.push({
      label: "Notice period",
      value: noticeMatch[0].trim(),
      confidence: "low",
    });
  }

  if (fields.length === 0) {
    warnings.push(
      "No recognizable payroll figures were found. This document format may not be supported yet — consider entering figures manually.",
    );
  }

  return { method: "heuristic", pensionPercent, extraComponents, fields, warnings };
}

const AI_SYSTEM_PROMPT = `You extract payroll-relevant figures from a local employment/collective agreement excerpt.
Return STRICT JSON only, matching this shape:
{
  "pensionPercent": number | null,
  "extraComponents": [{ "name": string, "ratePercent": number, "note": string }],
  "fields": [{ "label": string, "value": string, "confidence": "high"|"medium"|"low" }],
  "warnings": [string]
}
Rules:
- Only report numbers that literally appear in the text; never invent figures.
- "extraComponents" should cover employer-paid percentages beyond a base pension (e.g. holiday pay top-ups, collectively agreed insurance, supplementary funds). Do not include the base pension there — put it in "pensionPercent".
- If you are not confident, omit the field and add a warning instead.
- Output JSON only, no prose, no markdown fences.`;

async function callAnthropic(text: string): Promise<AgreementExtraction | null> {
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) return null;

  const response = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: {
      "content-type": "application/json",
      "x-api-key": apiKey,
      "anthropic-version": "2023-06-01",
    },
    body: JSON.stringify({
      model: "claude-3-5-haiku-latest",
      max_tokens: 1024,
      system: AI_SYSTEM_PROMPT,
      messages: [
        { role: "user", content: text.slice(0, 20000) },
      ],
    }),
  });

  if (!response.ok) {
    return null;
  }

  const data = (await response.json()) as {
    content?: { type: string; text?: string }[];
  };
  const raw = data.content?.find((c) => c.type === "text")?.text;
  if (!raw) return null;

  try {
    const parsed = JSON.parse(raw) as {
      pensionPercent?: number | null;
      extraComponents?: { name: string; ratePercent: number; note?: string }[];
      fields?: ExtractedField[];
      warnings?: string[];
    };
    return {
      method: "ai",
      pensionPercent:
        typeof parsed.pensionPercent === "number" ? parsed.pensionPercent : undefined,
      extraComponents: (parsed.extraComponents ?? []).map((c, i) => ({
        id: `ai-extra-${i}`,
        name: c.name,
        ratePercent: c.ratePercent,
        note: c.note ?? "Extracted by AI from the uploaded agreement — verify before relying on it.",
      })),
      fields: parsed.fields ?? [],
      warnings: parsed.warnings ?? [],
    };
  } catch {
    return null;
  }
}

/**
 * Extracts payroll-relevant figures from agreement text. Uses an AI
 * provider only if an API key is configured server-side (never sent from
 * the client); otherwise falls back to the local heuristic extractor so
 * the feature keeps working — and keeps document content out of any
 * third party — for teams that don't want to enable AI analysis.
 */
export async function analyzeAgreementText(text: string): Promise<AgreementExtraction> {
  const aiResult = await callAnthropic(text).catch(() => null);
  if (aiResult) return aiResult;
  return heuristicExtract(text);
}

export function isAiAnalysisEnabled(): boolean {
  return Boolean(process.env.ANTHROPIC_API_KEY);
}
