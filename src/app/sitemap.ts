import type { MetadataRoute } from "next";
import { COUNTRY_LIST, getCountryPaths } from "@/lib/countries";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.bizdayz.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const noRoutes = [
    "",
    "/arbeidsdager",
    "/helligdager",
    "/helligdager/2026",
    "/helligdager/2027",
    "/feriepenger",
    "/arbeidsgiverkostnad",
    "/countdown",
    "/om",
    "/en",
  ];

  const routes = [...noRoutes];

  for (const c of COUNTRY_LIST) {
    if (c.code === "no") {
      // English Norway
      const en = getCountryPaths("no", "en");
      routes.push(
        en.homePath,
        en.workdaysPath,
        en.holidaysPath,
        `${en.holidaysPath}/2026`,
        `${en.holidaysPath}/2027`,
        en.countdownPath,
        en.employmentCostPath,
      );
      continue;
    }
    const native = getCountryPaths(c.code, "native");
    routes.push(
      native.homePath,
      native.workdaysPath,
      native.holidaysPath,
      `${native.holidaysPath}/2026`,
      `${native.holidaysPath}/2027`,
      native.countdownPath,
      native.employmentCostPath,
    );
    if (c.code !== "uk") {
      const en = getCountryPaths(c.code, "en");
      routes.push(
        en.homePath,
        en.workdaysPath,
        en.holidaysPath,
        `${en.holidaysPath}/2026`,
        `${en.holidaysPath}/2027`,
        en.countdownPath,
        en.employmentCostPath,
      );
    }
  }

  const lastModified = new Date();
  const unique = Array.from(new Set(routes));

  return unique.map((route) => ({
    url: `${siteUrl}${route}`,
    lastModified,
    changeFrequency: route === "" ? "weekly" : "monthly",
    priority: route === "" || route.includes("workday") || route.includes("arbeids")
      ? 1
      : 0.7,
  }));
}
