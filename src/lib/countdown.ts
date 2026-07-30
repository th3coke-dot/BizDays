import type { CountdownTarget } from "@/types";

/** Neste forekomst av en fast dato (måned 0–11). */
export function nextOccurrence(month: number, day: number, from = new Date()): Date {
  const year = from.getFullYear();
  let target = new Date(year, month, day, 0, 0, 0, 0);
  const today = new Date(from.getFullYear(), from.getMonth(), from.getDate());
  if (target < today) {
    target = new Date(year + 1, month, day, 0, 0, 0, 0);
  }
  return target;
}

export function getCountdownTargets(from = new Date()): CountdownTarget[] {
  const summer = nextOccurrence(5, 20, from); // ca. skolestart sommerferie
  const constitution = nextOccurrence(4, 17, from);
  const christmas = nextOccurrence(11, 24, from);
  const newYear = nextOccurrence(0, 1, from);

  const toISO = (d: Date) => {
    const y = d.getFullYear();
    const m = String(d.getMonth() + 1).padStart(2, "0");
    const day = String(d.getDate()).padStart(2, "0");
    return `${y}-${m}-${day}`;
  };

  return [
    {
      id: "sommerferie",
      name: "Sommerferie",
      date: toISO(summer),
      description: `Neste sommerferie (20. juni ${summer.getFullYear()})`,
    },
    {
      id: "17mai",
      name: "17. mai",
      date: toISO(constitution),
      description: "Norges nasjonaldag",
    },
    {
      id: "jul",
      name: "Jul",
      date: toISO(christmas),
      description: "Julaften",
    },
    {
      id: "nyttar",
      name: "Nyttår",
      date: toISO(newYear),
      description: "Nyttårsdag",
    },
  ];
}

export function diffParts(targetISO: string, now = new Date()) {
  const target = new Date(`${targetISO}T00:00:00`);
  const ms = target.getTime() - now.getTime();
  if (ms <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0, totalMs: 0 };
  }
  const totalSeconds = Math.floor(ms / 1000);
  const days = Math.floor(totalSeconds / 86400);
  const hours = Math.floor((totalSeconds % 86400) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  return { days, hours, minutes, seconds, totalMs: ms };
}
