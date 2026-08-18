"use client";

import {
  GERMAN_STATE_LOCALITIES,
  GERMAN_STATE_LOCALITY_HINT,
  GERMAN_STATES,
  defaultGermanLocality,
  parseGermanRegion,
  serializeGermanRegion,
  type GermanLocalityId,
  type GermanStateCode,
} from "@/data/holidays-de";
import type { AppLanguage } from "@/lib/countries";
import type { UiLabels } from "@/lib/i18n";
import { Select } from "@/components/ui/Select";

type Props = {
  value: string;
  onChange: (value: string) => void;
  labels: UiLabels;
  lang?: AppLanguage;
};

export function GermanStateSelect({
  value,
  onChange,
  labels,
  lang = "native",
}: Props) {
  const { state, locality } = parseGermanRegion(value);
  const localities = state ? GERMAN_STATE_LOCALITIES[state] : undefined;
  const hint = state ? GERMAN_STATE_LOCALITY_HINT[state] : undefined;

  return (
    <div className="grid gap-4">
      <label className="grid gap-2 text-sm font-medium text-[var(--primary)]">
        <span>{labels.federalState}</span>
        <Select
          value={state ?? ""}
          onChange={(event) => {
            const next = event.target.value as GermanStateCode | "";
            onChange(
              next ? serializeGermanRegion(next, defaultGermanLocality(next)) : "",
            );
          }}
          aria-describedby="de-state-hint"
        >
          <option value="">{labels.nationwide}</option>
          {GERMAN_STATES.map((item) => (
            <option key={item.id} value={item.id}>
              {lang === "en" ? item.nameEn : item.name}
            </option>
          ))}
        </Select>
        <span id="de-state-hint" className="text-xs font-normal text-[var(--muted)]">
          {labels.stateHolidaysHint}
        </span>
      </label>

      {state && localities && localities.length > 0 && (
        <label className="grid gap-2 text-sm font-medium text-[var(--primary)]">
          <span>{labels.localRule}</span>
          <Select
            value={locality}
            onChange={(event) =>
              onChange(
                serializeGermanRegion(state, event.target.value as GermanLocalityId),
              )
            }
            aria-describedby="de-locality-hint"
          >
            {localities.map((item) => (
              <option key={item.id} value={item.id}>
                {lang === "en" ? item.nameEn : item.name}
              </option>
            ))}
          </Select>
          {hint && (
            <span
              id="de-locality-hint"
              className="text-xs font-normal text-[var(--muted)]"
            >
              {lang === "en" ? hint.en : hint.de}
            </span>
          )}
        </label>
      )}
    </div>
  );
}
