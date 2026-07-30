# BizDays – lanseringschecklist

## Fase 1–4 (kode)

- [x] Next.js App Router + TypeScript + Tailwind
- [x] Pakker: date-fns, date-fns-tz, clsx, tailwind-merge, lucide-react
- [x] Mappe-struktur, layout, UI, alle MVP-sider
- [x] Helligdager 2025–2027 + kalkulatorer
- [x] `npm run build` OK

## Fase 5 – SEO & teknisk (kode)

- [x] Title + meta description på alle sider
- [x] Open Graph + Twitter cards + OG-bilde
- [x] `sitemap.xml` + `robots.txt`
- [x] JSON-LD (WebSite + WebApplication)
- [x] Statisk generering av sider (SSG)
- [x] Viewport, skip-link, reduced-motion, sikkerhetsheaders
- [x] Font `display: swap` (CWV / LCP)

## Fase 6 – Monetisering (kode klar, konto manuelt)

- [x] GA4-komponent (`NEXT_PUBLIC_GA_MEASUREMENT_ID`)
- [x] AdSense-script + diskrete `AdSlot` (env-styrt)
- [x] Search Console verification via env
- [x] `.env.example` med alle nøkler
- [ ] Opprett AdSense-konto og godkjenn nettsted
- [ ] Opprett GA4-property + lim inn measurement ID
- [ ] Verifiser Search Console

## Manuelt – domene & deploy

- [ ] Domenesoppsett (A/CNAME) for bizdayz.com / .no
- [ ] Vercel: primary domain + 301 fra .no
- [ ] GitHub-repo + push + Vercel deploy
- [ ] Sett env-variabler i Vercel (se `.env.example`)
- [ ] Test mobil + desktop i produksjon
- [ ] Send inn sitemap: `https://www.bizdayz.com/sitemap.xml`

## Fase 7 – etter lansering

- [ ] Overvåk trafikk i GA4 / Search Console
- [ ] Samle feedback via hei@bizdayz.com
- [ ] Neste funksjoner: flere land, engelsk, ICS-eksport
