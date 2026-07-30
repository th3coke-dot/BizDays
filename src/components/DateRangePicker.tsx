"use client";

import { Input } from "@/components/ui/Input";

interface DateRangePickerProps {
  startDate: string;
  endDate: string;
  onStartChange: (value: string) => void;
  onEndChange: (value: string) => void;
  fromLabel?: string;
  toLabel?: string;
}

export function DateRangePicker({
  startDate,
  endDate,
  onStartChange,
  onEndChange,
  fromLabel = "Fra dato",
  toLabel = "Til dato",
}: DateRangePickerProps) {
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      <label className="grid gap-2 text-sm font-medium text-[var(--primary)]">
        <span>{fromLabel}</span>
        <Input
          type="date"
          value={startDate}
          onChange={(e) => onStartChange(e.target.value)}
          max={endDate || undefined}
          className="min-h-12 text-base sm:min-h-11 sm:text-sm"
          autoComplete="off"
        />
      </label>
      <label className="grid gap-2 text-sm font-medium text-[var(--primary)]">
        <span>{toLabel}</span>
        <Input
          type="date"
          value={endDate}
          onChange={(e) => onEndChange(e.target.value)}
          min={startDate || undefined}
          className="min-h-12 text-base sm:min-h-11 sm:text-sm"
          autoComplete="off"
        />
      </label>
    </div>
  );
}
