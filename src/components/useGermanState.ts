"use client";

import { useState } from "react";
import type { GermanStateCode } from "@/data/holidays-de";

let rememberedState: GermanStateCode | "" = "";

export function useGermanState() {
  const [state, setState] = useState<GermanStateCode | "">(rememberedState);

  function update(next: GermanStateCode | "") {
    rememberedState = next;
    setState(next);
  }

  return [state, update] as const;
}
