import type { MetadataRoute } from "next";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://bizdays.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    "",
    "/arbeidsdager",
    "/helligdager",
    "/helligdager/2026",
    "/helligdager/2027",
    "/feriepenger",
    "/countdown",
    "/om",
  ];

  const lastModified = new Date();

  return routes.map((route) => ({
    url: `${siteUrl}${route}`,
    lastModified,
    changeFrequency: route === "" ? "weekly" : "monthly",
    priority: route === "" || route === "/arbeidsdager" ? 1 : 0.7,
  }));
}
