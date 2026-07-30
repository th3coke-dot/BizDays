import type { MetadataRoute } from "next";
import { COUNTRY_LIST } from "@/lib/countries";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.bizdayz.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const noRoutes = [
    "",
    "/arbeidsdager",
    "/helligdager",
    "/helligdager/2026",
    "/helligdager/2027",
    "/feriepenger",
    "/countdown",
    "/om",
  ];

  const countryRoutes = COUNTRY_LIST.filter((c) => c.code !== "no").flatMap(
    (c) => [
      c.homePath,
      c.workdaysPath,
      c.holidaysPath,
      c.countdownPath,
      `${c.holidaysPath}/2026`,
      `${c.holidaysPath}/2027`,
    ],
  );

  const routes = [...noRoutes, ...countryRoutes];
  const lastModified = new Date();

  return routes.map((route) => ({
    url: `${siteUrl}${route}`,
    lastModified,
    changeFrequency: route === "" ? "weekly" : "monthly",
    priority:
      route === "" || route.endsWith("arbeidsdager") || route.endsWith("arbetsdagar")
        ? 1
        : 0.7,
  }));
}
