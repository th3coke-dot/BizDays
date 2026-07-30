export type UiLabels = {
  workdays: string;
  holidays: string;
  home: string;
  calculateWorkdays: string;
  choosePeriod: string;
  fromDate: string;
  toDate: string;
  result: string;
  workdayCount: string;
  holidayCount: string;
  weekendCount: string;
  redDaysTitle: string;
  noHolidays: string;
  explanation: string;
  weekendBadge: string;
  fixed: string;
  movable: string;
  yearOverview: string;
  toolsHeading: string;
  heroTitle: string;
  heroSupport: string;
  ctaWorkdays: string;
  ctaHolidays: string;
  countdown: string;
  shareCountdown: string;
  copied: string;
  days: string;
  hours: string;
  minutes: string;
  seconds: string;
  language: string;
  country: string;
};

/** Shared English UI for every country. */
export const EN_LABELS: UiLabels = {
  workdays: "Workdays",
  holidays: "Holidays",
  home: "Home",
  calculateWorkdays: "Calculate workdays",
  choosePeriod: "Choose period",
  fromDate: "From date",
  toDate: "To date",
  result: "Result",
  workdayCount: "workdays",
  holidayCount: "Holidays",
  weekendCount: "Weekends",
  redDaysTitle: "Public holidays excluded",
  noHolidays: "No public holidays in the selected period.",
  explanation: "Weekends and public holidays are excluded.",
  weekendBadge: "Falls on a weekend",
  fixed: "Fixed",
  movable: "Movable",
  yearOverview: "Open year overview",
  toolsHeading: "Choose a tool",
  heroTitle: "Workdays, holidays and countdowns – in seconds",
  heroSupport: "Simple tools for planning time off and work schedules.",
  ctaWorkdays: "Calculate workdays",
  ctaHolidays: "View holidays",
  countdown: "Countdown",
  shareCountdown: "Share countdown",
  copied: "Copied!",
  days: "Days",
  hours: "Hours",
  minutes: "Minutes",
  seconds: "Seconds",
  language: "Language",
  country: "Country",
};

export function englishLabelsForCountry(
  countryName: string,
  holidayWord = "public holidays",
): UiLabels {
  return {
    ...EN_LABELS,
    explanation: `Weekends and ${countryName} ${holidayWord} are excluded.`,
    heroTitle: `${countryName} workdays and holidays – in seconds`,
    heroSupport: `Simple planning tools built for ${countryName}.`,
  };
}
