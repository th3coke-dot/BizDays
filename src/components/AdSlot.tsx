"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

const CLIENT = process.env.NEXT_PUBLIC_ADSENSE_CLIENT;
const ENABLED = process.env.NEXT_PUBLIC_ADSENSE_ENABLED === "true";

declare global {
  interface Window {
    adsbygoogle?: Record<string, unknown>[];
  }
}

type AdSlotProps = {
  slot?: string;
  format?: "auto" | "rectangle" | "horizontal";
  className?: string;
  label?: string;
};

/**
 * Diskret annonseplass. Vises kun når AdSense er aktivert via env.
 * Reservert høyde reduserer CLS (Core Web Vitals).
 */
export function AdSlot({
  slot,
  format = "auto",
  className,
  label = "Annonse",
}: AdSlotProps) {
  const pushed = useRef(false);
  const slotId = slot ?? process.env.NEXT_PUBLIC_ADSENSE_SLOT_DEFAULT;

  useEffect(() => {
    if (!ENABLED || !CLIENT || !slotId || pushed.current) return;
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
      pushed.current = true;
    } catch {
      // Ignorer før script er lastet / under utvikling
    }
  }, [slotId]);

  if (!ENABLED || !CLIENT || !slotId) {
    if (process.env.NODE_ENV === "development") {
      return (
        <div
          className={cn(
            "flex min-h-[90px] items-center justify-center rounded-xl border border-dashed border-[var(--border)] bg-[var(--surface-muted)]/60 text-xs text-[var(--muted)]",
            className,
          )}
          aria-hidden
        >
          Annonseplass (skjult til AdSense er aktivert)
        </div>
      );
    }
    return null;
  }

  return (
    <aside
      className={cn("my-8 w-full", className)}
      aria-label={label}
    >
      <p className="mb-2 text-center text-[10px] uppercase tracking-wider text-[var(--muted)]">
        {label}
      </p>
      <ins
        className="adsbygoogle"
        style={{ display: "block", minHeight: 90 }}
        data-ad-client={CLIENT}
        data-ad-slot={slotId}
        data-ad-format={format}
        data-full-width-responsive="true"
      />
    </aside>
  );
}
