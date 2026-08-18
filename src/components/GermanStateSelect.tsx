"use client";

import { GERMAN_STATES, type GermanStateCode } from "@/data/holidays-de";
import type { AppLanguage } from "@/lib/countries";
import type { UiLabels } from "@/lib/i18n";
import { Select } from "@/components/ui/Select";

type Props = {
  value: GermanStateCode | "";
  onChange: (value: GermanStateCode | "") => void;
  labels: UiLabels;
  lang?: AppLanguage;
};

export function GermanStateSelect({
  value,
  onChange,
  labels,
  lang = "native",
}: Props) {
  return (
    <label className="grid gap-2 text-sm font-medium text-[var(--primary)]">
      <span>{labels.federalState}</span>
      <Select
        value={value}
        onChange={(event) =>
          onChange(event.target.value as GermanStateCode | "")
        }
        aria-describedby="de-state-hint"
      >
        <option value="">{labels.nationwide}</option>
        {GERMAN_STATES.map((state) => (
          <option key={state.id} value={state.id}>
            {lang === "en" ? state.nameEn : state.name}
          </option>
        ))}
      </Select>
      <span id="de-state-hint" className="text-xs font-normal text-[var(--muted)]">
        {labels.stateHolidaysHint}
      </span>
    </label>
  );
}
