# BizDays

Enkle norske verktøy for **arbeidsdager**, **helligdager** og **feriepenger**.

## Kom i gang

```bash
npm install
npm run dev
```

Åpne [http://localhost:3000](http://localhost:3000).

## Sider

| Rute | Beskrivelse |
|------|-------------|
| `/` | Forside |
| `/arbeidsdager` | Beregn arbeidsdager mellom to datoer |
| `/helligdager` | Oversikt over røde dager |
| `/helligdager/2026` | Helligdager 2026 |
| `/helligdager/2027` | Helligdager 2027 |
| `/feriepenger` | Beregn feriepenger |
| `/countdown` | Countdown til merkedager |
| `/om` | Om BizDays |

## Stack

- Next.js (App Router) + TypeScript
- Tailwind CSS
- date-fns
- Vercel-klar (`sitemap.xml`, `robots.txt`, metadata)

## Domene (manuelt)

1. Pek `bizdays.com` og `bizdays.no` til Vercel
2. Sett `bizdays.com` som primary
3. 301-redirect fra `bizdays.no` → `https://bizdays.com`
4. Kopier `.env.example` → sett verdier i Vercel

## Analytics & annonser

| Env | Formål |
|-----|--------|
| `NEXT_PUBLIC_SITE_URL` | Canonical + sitemap |
| `NEXT_PUBLIC_GA_MEASUREMENT_ID` | Google Analytics 4 |
| `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION` | Search Console |
| `NEXT_PUBLIC_ADSENSE_CLIENT` | AdSense publisher ID |
| `NEXT_PUBLIC_ADSENSE_SLOT_DEFAULT` | Standard annonseslot |
| `NEXT_PUBLIC_ADSENSE_ENABLED` | `true` for å vise annonser |

Annonser er av som standard. Skru på først etter AdSense-godkjenning.
