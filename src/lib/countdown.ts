import type { CountryCode } from "@/lib/countries";
import type { CountdownTarget } from "@/types";

/** Neste forekomst av en fast dato (måned 0–11). */
export function nextOccurrence(
  month: number,
  day: number,
  from = new Date(),
): Date {
  const year = from.getFullYear();
  let target = new Date(year, month, day, 0, 0, 0, 0);
  const today = new Date(from.getFullYear(), from.getMonth(), from.getDate());
  if (target < today) {
    target = new Date(year + 1, month, day, 0, 0, 0, 0);
  }
  return target;
}

function toISO(d: Date) {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

/** Midsommardagen / Juhannuspäivä: lördag mellan 20–26 juni. */
export function nextMidsummerDay(from = new Date()): Date {
  const today = new Date(from.getFullYear(), from.getMonth(), from.getDate());
  for (let year = from.getFullYear(); year <= from.getFullYear() + 1; year++) {
    for (let day = 20; day <= 26; day++) {
      const d = new Date(year, 5, day);
      if (d.getDay() === 6 && d >= today) return d;
    }
  }
  return new Date(from.getFullYear() + 1, 5, 20);
}

export function nextMidsummerEve(from = new Date()): Date {
  const day = nextMidsummerDay(from);
  const eve = new Date(day);
  eve.setDate(day.getDate() - 1);
  return eve;
}

export function getCountdownTargets(
  country: CountryCode = "no",
  from = new Date(),
): CountdownTarget[] {
  const christmasEve = nextOccurrence(11, 24, from);
  const newYear = nextOccurrence(0, 1, from);

  if (country === "se") {
    const national = nextOccurrence(5, 6, from);
    const midsummer = nextMidsummerEve(from);
    return [
      {
        id: "nationaldagen",
        name: "Nationaldagen",
        date: toISO(national),
        description: "Sveriges nationaldag (6 juni)",
      },
      {
        id: "midsommar",
        name: "Midsommar",
        date: toISO(midsummer),
        description: `Nästa midsommarafton (${toISO(midsummer)})`,
      },
      {
        id: "jul",
        name: "Jul",
        date: toISO(christmasEve),
        description: "Julafton",
      },
      {
        id: "nyttar",
        name: "Nyår",
        date: toISO(newYear),
        description: "Nyårsdagen",
      },
    ];
  }

  if (country === "dk") {
    const grundlov = nextOccurrence(5, 5, from);
    return [
      {
        id: "grundlovsdag",
        name: "Grundlovsdag",
        date: toISO(grundlov),
        description: "Danmarks grundlovsdag (5. juni)",
      },
      {
        id: "jul",
        name: "Jul",
        date: toISO(christmasEve),
        description: "Juleaften",
      },
      {
        id: "nyttar",
        name: "Nytår",
        date: toISO(newYear),
        description: "Nytårsdag",
      },
      {
        id: "sommer",
        name: "Sommerferie",
        date: toISO(nextOccurrence(5, 20, from)),
        description: "Ca. skolernes sommerferie (20. juni)",
      },
    ];
  }

  if (country === "fi") {
    const independence = nextOccurrence(11, 6, from);
    const midsummer = nextMidsummerEve(from);
    return [
      {
        id: "itsenaisyys",
        name: "Itsenäisyyspäivä",
        date: toISO(independence),
        description: "Suomen itsenäisyyspäivä (6.12.)",
      },
      {
        id: "juhannus",
        name: "Juhannus",
        date: toISO(midsummer),
        description: `Seuraava juhannusaatto (${toISO(midsummer)})`,
      },
      {
        id: "joulu",
        name: "Joulu",
        date: toISO(christmasEve),
        description: "Jouluaatto",
      },
      {
        id: "uusiivuosi",
        name: "Uusi vuosi",
        date: toISO(newYear),
        description: "Uudenvuodenpäivä",
      },
    ];
  }

  // Norway (default)
  const summer = nextOccurrence(5, 20, from);
  const constitution = nextOccurrence(4, 17, from);
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
      date: toISO(christmasEve),
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
