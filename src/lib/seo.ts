import type { Metadata } from "next";

export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://bizdays.com";
export const SITE_NAME = "BizDays";
export const SITE_LOCALE = "nb_NO";

const DEFAULT_DESCRIPTION =
  "Beregn norske arbeidsdager, se helligdager og regn ut feriepenger. Enkle verktøy for bedrifter og ansatte.";

type PageSeoInput = {
  title: string;
  description: string;
  path: string;
  /** Absolute title without "| BizDays" template (e.g. homepage). */
  absoluteTitle?: string;
};

export function createPageMetadata({
  title,
  description,
  path,
  absoluteTitle,
}: PageSeoInput): Metadata {
  const url = `${SITE_URL}${path === "/" ? "" : path}`;
  const ogTitle = absoluteTitle ?? `${title} | ${SITE_NAME}`;

  return {
    title: absoluteTitle
      ? { absolute: absoluteTitle }
      : title,
    description,
    alternates: {
      canonical: path,
    },
    openGraph: {
      type: "website",
      locale: SITE_LOCALE,
      url,
      siteName: SITE_NAME,
      title: ogTitle,
      description,
      images: [
        {
          url: "/opengraph-image",
          width: 1200,
          height: 630,
          alt: SITE_NAME,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: ogTitle,
      description,
      images: ["/opengraph-image"],
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

export const defaultDescription = DEFAULT_DESCRIPTION;

export function websiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE_NAME,
    url: SITE_URL,
    description: DEFAULT_DESCRIPTION,
    inLanguage: "nb-NO",
  };
}

export function webApplicationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: SITE_NAME,
    url: SITE_URL,
    applicationCategory: "BusinessApplication",
    operatingSystem: "Web",
    description: DEFAULT_DESCRIPTION,
    inLanguage: "nb-NO",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "NOK",
    },
  };
}
