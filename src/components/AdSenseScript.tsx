import Script from "next/script";

const CLIENT = process.env.NEXT_PUBLIC_ADSENSE_CLIENT;

/**
 * Laster AdSense-script globalt når klient-ID er satt.
 * Godkjenn nettstedet i AdSense før produksjon.
 */
export function AdSenseScript() {
  if (!CLIENT) return null;

  return (
    <Script
      id="adsense-init"
      async
      src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${CLIENT}`}
      crossOrigin="anonymous"
      strategy="lazyOnload"
    />
  );
}
