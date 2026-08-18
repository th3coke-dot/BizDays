"use client";

import { useState } from "react";

let rememberedRegion = "";

export function useGermanState() {
  const [region, setRegion] = useState(rememberedRegion);

  function update(next: string) {
    rememberedRegion = next;
    setRegion(next);
  }

  return [region, update] as const;
}
