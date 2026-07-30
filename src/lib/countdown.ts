import type { AppLanguage, CountryCode } from "@/lib/countries";
import type { CountdownTarget } from "@/types";

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

function firstMondayOfMonth(year: number, month: number) {
  const d = new Date(year, month, 1);
  const day = d.getDay();
  const add = day === 0 ? 1 : day === 1 ? 0 : 8 - day;
  d.setDate(1 + add);
  return d;
}

function nextFirstMondayOfMonth(month: number, from = new Date()) {
  const today = new Date(from.getFullYear(), from.getMonth(), from.getDate());
  let d = firstMondayOfMonth(from.getFullYear(), month);
  if (d < today) d = firstMondayOfMonth(from.getFullYear() + 1, month);
  return d;
}

export function getCountdownTargets(
  country: CountryCode = "no",
  from = new Date(),
  lang: AppLanguage = "native",
): CountdownTarget[] {
  const en = lang === "en" || country === "uk";
  const christmasEve = nextOccurrence(11, 24, from);
  const christmas = nextOccurrence(11, 25, from);
  const newYear = nextOccurrence(0, 1, from);

  if (country === "uk") {
    return [
      {
        id: "christmas",
        name: "Christmas",
        date: toISO(christmas),
        description: "Christmas Day",
      },
      {
        id: "newyear",
        name: "New Year",
        date: toISO(newYear),
        description: "New Year's Day",
      },
      {
        id: "early-may",
        name: "Early May bank holiday",
        date: toISO(nextFirstMondayOfMonth(4, from)),
        description: "First Monday in May",
      },
      {
        id: "summer",
        name: "Summer holiday",
        date: toISO(nextOccurrence(6, 20, from)),
        description: "Late July summer break (approx.)",
      },
    ];
  }

  if (country === "de") {
    const unity = nextOccurrence(9, 3, from);
    return en
      ? [
          {
            id: "unity",
            name: "German Unity Day",
            date: toISO(unity),
            description: "3 October",
          },
          {
            id: "christmas",
            name: "Christmas",
            date: toISO(christmas),
            description: "Christmas Day",
          },
          {
            id: "newyear",
            name: "New Year",
            date: toISO(newYear),
            description: "New Year's Day",
          },
          {
            id: "labour",
            name: "Labour Day",
            date: toISO(nextOccurrence(4, 1, from)),
            description: "1 May",
          },
        ]
      : [
          {
            id: "unity",
            name: "Tag der Deutschen Einheit",
            date: toISO(unity),
            description: "3. Oktober",
          },
          {
            id: "weihnachten",
            name: "Weihnachten",
            date: toISO(christmas),
            description: "1. Weihnachtstag",
          },
          {
            id: "neujahr",
            name: "Neujahr",
            date: toISO(newYear),
            description: "Neujahrstag",
          },
          {
            id: "arbeit",
            name: "Tag der Arbeit",
            date: toISO(nextOccurrence(4, 1, from)),
            description: "1. Mai",
          },
        ];
  }

  if (country === "pl") {
    const independence = nextOccurrence(10, 11, from);
    return en
      ? [
          {
            id: "independence",
            name: "Independence Day",
            date: toISO(independence),
            description: "11 November",
          },
          {
            id: "christmas",
            name: "Christmas",
            date: toISO(christmas),
            description: "Christmas Day",
          },
          {
            id: "newyear",
            name: "New Year",
            date: toISO(newYear),
            description: "New Year's Day",
          },
          {
            id: "constitution",
            name: "Constitution Day",
            date: toISO(nextOccurrence(4, 3, from)),
            description: "3 May",
          },
        ]
      : [
          {
            id: "independence",
            name: "Święto Niepodległości",
            date: toISO(independence),
            description: "11 listopada",
          },
          {
            id: "christmas",
            name: "Boże Narodzenie",
            date: toISO(christmas),
            description: "25 grudnia",
          },
          {
            id: "newyear",
            name: "Nowy Rok",
            date: toISO(newYear),
            description: "1 stycznia",
          },
          {
            id: "constitution",
            name: "Święto Konstytucji",
            date: toISO(nextOccurrence(4, 3, from)),
            description: "3 maja",
          },
        ];
  }

  if (country === "is") {
    const national = nextOccurrence(5, 17, from);
    return en
      ? [
          {
            id: "national",
            name: "National Day",
            date: toISO(national),
            description: "17 June",
          },
          {
            id: "christmas",
            name: "Christmas",
            date: toISO(christmasEve),
            description: "Christmas Eve",
          },
          {
            id: "newyear",
            name: "New Year",
            date: toISO(newYear),
            description: "New Year's Day",
          },
          {
            id: "summer",
            name: "First Day of Summer",
            date: toISO(nextOccurrence(3, 24, from)),
            description: "First Thursday after 18 April (approx. next)",
          },
        ]
      : [
          {
            id: "national",
            name: "Þjóðhátíðardagurinn",
            date: toISO(national),
            description: "17. júní",
          },
          {
            id: "christmas",
            name: "Jól",
            date: toISO(christmasEve),
            description: "Aðfangadagur",
          },
          {
            id: "newyear",
            name: "Nýár",
            date: toISO(newYear),
            description: "Nýársdagur",
          },
          {
            id: "summer",
            name: "Sumardagurinn fyrsti",
            date: toISO(nextOccurrence(3, 24, from)),
            description: "Fyrsti fimmtudagur eftir 18. apríl",
          },
        ];
  }

  if (country === "se") {
    const national = nextOccurrence(5, 6, from);
    const midsummer = nextMidsummerEve(from);
    return en
      ? [
          {
            id: "nationaldagen",
            name: "National Day",
            date: toISO(national),
            description: "6 June",
          },
          {
            id: "midsommar",
            name: "Midsummer",
            date: toISO(midsummer),
            description: `Next Midsummer Eve (${toISO(midsummer)})`,
          },
          {
            id: "jul",
            name: "Christmas",
            date: toISO(christmasEve),
            description: "Christmas Eve",
          },
          {
            id: "nyttar",
            name: "New Year",
            date: toISO(newYear),
            description: "New Year's Day",
          },
        ]
      : [
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
    return en
      ? [
          {
            id: "grundlovsdag",
            name: "Constitution Day",
            date: toISO(grundlov),
            description: "5 June",
          },
          {
            id: "jul",
            name: "Christmas",
            date: toISO(christmasEve),
            description: "Christmas Eve",
          },
          {
            id: "nyttar",
            name: "New Year",
            date: toISO(newYear),
            description: "New Year's Day",
          },
          {
            id: "sommer",
            name: "Summer holiday",
            date: toISO(nextOccurrence(5, 20, from)),
            description: "Approx. 20 June",
          },
        ]
      : [
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
    return en
      ? [
          {
            id: "itsenaisyys",
            name: "Independence Day",
            date: toISO(independence),
            description: "6 December",
          },
          {
            id: "juhannus",
            name: "Midsummer",
            date: toISO(midsummer),
            description: `Next Midsummer Eve (${toISO(midsummer)})`,
          },
          {
            id: "joulu",
            name: "Christmas",
            date: toISO(christmasEve),
            description: "Christmas Eve",
          },
          {
            id: "uusiivuosi",
            name: "New Year",
            date: toISO(newYear),
            description: "New Year's Day",
          },
        ]
      : [
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

  // Norway
  const summer = nextOccurrence(5, 20, from);
  const constitution = nextOccurrence(4, 17, from);
  return en
    ? [
        {
          id: "sommerferie",
          name: "Summer holiday",
          date: toISO(summer),
          description: `Next summer holiday (20 June ${summer.getFullYear()})`,
        },
        {
          id: "17mai",
          name: "Constitution Day",
          date: toISO(constitution),
          description: "17 May",
        },
        {
          id: "jul",
          name: "Christmas",
          date: toISO(christmasEve),
          description: "Christmas Eve",
        },
        {
          id: "nyttar",
          name: "New Year",
          date: toISO(newYear),
          description: "New Year's Day",
        },
      ]
    : [
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
