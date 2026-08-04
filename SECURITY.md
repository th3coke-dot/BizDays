# BizDays — Security & Data Handling Plan

This document covers the security posture for the employer-side features
introduced alongside the employee/employer split: the CBA (collective
bargaining agreement) selector and the local-agreement document upload +
AI-assisted extraction. It is aimed at maintainers and reviewers; the
user-facing summary lives at `/security` (`src/app/security/page.tsx`).

## Threat model / what we're protecting against

Companies may drag in local agreements that contain sensitive
information: pay bands, named individuals, internal policies, sometimes
legal/HR commentary. The primary risks we're designing against:

1. **Unintended retention** — a document or its extracted contents
   persisting somewhere it shouldn't (disk, DB, logs, backups, browser
   storage) after the user is done.
2. **Unintended disclosure to third parties** — silently sending a
   document to an external AI API without the user's knowledge/consent,
   or that provider retaining/training on the content.
3. **Over-trust in extracted numbers** — a wrong figure silently flowing
   into a payroll-adjacent calculation without the user reviewing it.
4. **Abuse of the upload endpoint** — large files, unsupported types, or
   high-volume requests degrading the service or costing money via the
   AI provider.

## Data flow

```
Browser (drag file)
   │  (only after explicit consent checkbox)
   ▼
POST /api/analyze-agreement  (Next.js Route Handler, Node runtime)
   │  - validates size (<=5MB) and mime type (.txt / .pdf only)
   │  - extracts text in memory (pdf-parse for PDFs)
   │
   ├── if OPENAI_API_KEY or ANTHROPIC_API_KEY is set (OpenAI tried first):
   │       → sends extracted TEXT (not the raw file) to that provider's
   │         API for a single, narrowly-scoped extraction call
   │       → response parsed as strict JSON; no other calls, no storage
   │
   └── else:
           → fully local regex/heuristic extraction, no outbound call
   │
   ▼
JSON response { fields, warnings, pensionPercent, extraComponents, excerpt }
   │
   ▼
Browser renders results; user must click "Apply to calculation" before
any figure affects the TCOE output. Nothing is persisted client-side
beyond the current page session (component state only — no
localStorage/sessionStorage writes of document content).
```

No step in this flow writes the file or its extracted text to disk, a
database, or the application logs. The route handler (`src/app/api/
analyze-agreement/route.ts`) is intentionally written to hold the file in
a local variable for the lifetime of the request only.

## Consent & transparency

- The upload widget (`src/components/LocalAgreementUpload.tsx`) disables
  the drop zone until the user ticks a consent checkbox linking to the
  `/security` page.
- The API response tells the client which method was used
  (`ai` vs `heuristic`) so the UI can label results accordingly
  ("AI-assisted" vs "Pattern match").
- Every extracted field is shown with a confidence label before the user
  can apply it — nothing is auto-applied.

## Configuration knobs for operators

| Env var | Effect |
| --- | --- |
| `OPENAI_API_KEY` | If set, enables AI-assisted extraction via OpenAI (tried first). |
| `ANTHROPIC_API_KEY` | If set (and `OPENAI_API_KEY` isn't, or the OpenAI call fails), enables AI-assisted extraction via Anthropic. |

If neither is set, the endpoint still works using the local heuristic
extractor and never calls any third party.

**Never commit these keys or paste them into chat/tickets** — set them
only as deployment secrets (e.g. Vercel project env vars, or Cursor Cloud
Agent secrets for this repo). Rotate immediately if a key is ever exposed
outside of a secrets manager.

Operators who want zero third-party involvement for document content
should simply not set either key in their deployment. Enterprise
operators who want AI assistance under their own contract/DPA with a
provider should set their own key — content then flows under that
organization's agreement, not a shared one.

## Upload safeguards implemented

- Max file size: 5 MB (`MAX_FILE_BYTES` in the route handler).
- Allowed types: `text/plain`, `application/pdf` only.
- Errors are generic and never echo file contents back in error messages.
- Response includes only a short excerpt (400 chars) for the user's own
  sanity-check, not the full text.

## Known gaps / roadmap (tracked, not yet implemented)

- No malware/AV scanning of uploaded files yet — recommended before
  accepting uploads from fully untrusted/anonymous users at scale.
- No per-IP or per-session rate limiting on `/api/analyze-agreement` yet
  — recommended via the hosting platform (e.g. Vercel Firewall / a
  lightweight token-bucket middleware) before this ships broadly.
- No persistent "save this agreement for next time" feature exists yet.
  If/when it's built, it must be opt-in, encrypted at rest, scoped per
  authenticated workspace, and deletable on request — and this document
  must be updated first.
- No formal DPA/SOC2/ISO27001 program yet; this is appropriate for the
  current stage (no accounts, no persistent customer data) but should be
  revisited before offering persistent storage or handling data at
  meaningful scale.

## CBA seed data provenance

`src/data/cba-seed.ts` ships a small illustrative set of collective
agreements per country. Each entry has a `verified: boolean` flag and a
`sourceNote`. Entries are `verified: false` by default and must not be
treated as authoritative — see the comment block at the top of that file
for the maintenance process for adding a real, verified agreement.
