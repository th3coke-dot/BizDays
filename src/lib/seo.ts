import type { Metadata } from "next";

export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.bizdayz.com";
export const SITE_NAME = "BizDays";
export const SITE_LOCALE = "en_US";

const DEFAULT_DESCRIPTION =
  "Calculate workdays, track public holidays and estimate employment costs — for Norway, Sweden, Denmark, Finland, the UK, Germany, Poland and Iceland. Simple tools for employees and employers.";

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
    inLanguage: "en",
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
    inLanguage: "en",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
  };
}
