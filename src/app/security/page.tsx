import type { Metadata } from "next";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Security & data handling",
  description:
    "How BizDays handles uploaded local agreements and other sensitive employer data.",
  path: "/security",
});

const sections = [
  {
    title: "What gets uploaded, and where it goes",
    body: [
      "When you drag a local agreement into the employer tools, the file is sent once, over HTTPS, directly to a short-lived serverless function. It is held in memory only for the duration of that single request.",
      "The file is never written to disk, never saved to a database, and never included in application logs. Once the response is sent back to your browser, the server holds nothing.",
    ],
  },
  {
    title: "AI-assisted extraction is opt-in and disclosed",
    body: [
      "You must tick a consent checkbox before any file leaves your browser.",
      "If an AI provider key is configured for the deployment, the extracted document text (not the raw file) is sent to that provider for a single extraction call, scoped to a strict prompt that only returns figures literally present in the text.",
      "If no AI provider is configured, extraction falls back to a local, fully offline pattern-matcher — the document content never leaves the BizDays server in that mode.",
      "We do not use uploaded content to train models, ours or a third party's.",
    ],
  },
  {
    title: "Upload safeguards",
    body: [
      "File size is capped (5 MB) and only plain-text and text-based PDF files are accepted.",
      "Every extracted figure is shown back to you with a confidence label before it is applied to any calculation — nothing is auto-applied silently.",
      "You can discard a result at any time; nothing is retained after you close the tab.",
    ],
  },
  {
    title: "Collective agreement (CBA) seed data",
    body: [
      "The CBA dropdown ships with a small, clearly-labelled illustrative starter set, not a licensed real-time feed of union agreements.",
      "Every entry that hasn't been checked against its primary source is marked unverified in the UI, with a note on what to confirm before relying on it for payroll.",
    ],
  },
  {
    title: "For teams handling sensitive company data",
    body: [
      "Prefer zero third-party AI involvement? Simply don't set an AI provider key for your deployment — the heuristic extractor still works, entirely on infrastructure you control, with no outbound calls for document content.",
      "Running an internal/enterprise deployment? Bring your own AI provider key and data-processing agreement so uploaded content is governed by your organisation's own contract with that provider, not a shared one.",
      "Self-hosting is supported — the project is a standard Next.js app with no required external services beyond the optional AI key.",
    ],
  },
  {
    title: "Roadmap",
    body: [
      "Planned: per-file malware/AV scanning before parsing, per-IP rate limiting on the analysis endpoint, and an audit trail of which figures were applied to a calculation (without ever storing the source document).",
      "If BizDays later offers persistent storage (e.g. saving a company's applied agreement for next time), that data will be encrypted at rest, scoped per authenticated workspace, and deletable on request — this page will be updated before that ships.",
    ],
  },
];

export default function SecurityPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6 sm:py-12">
      <header className="mb-8">
        <h1 className="font-[family-name:var(--font-display)] text-3xl font-semibold tracking-tight text-[var(--primary)] sm:text-4xl">
          Security & data handling
        </h1>
        <p className="mt-3 max-w-2xl text-[var(--muted)]">
          A plain-language explanation of what happens to your data when you
          use the employer tools — especially the collective agreement
          upload feature.
        </p>
      </header>

      <div className="space-y-8">
        {sections.map((section) => (
          <section key={section.title}>
            <h2 className="font-[family-name:var(--font-display)] text-xl font-semibold text-[var(--primary)]">
              {section.title}
            </h2>
            <div className="mt-2 space-y-2 text-sm leading-relaxed text-[var(--muted)]">
              {section.body.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </section>
        ))}
      </div>

      <p className="mt-10 text-sm text-[var(--muted)]">
        Questions about this policy? Email{" "}
        <a href="mailto:hei@bizdayz.com" className="font-semibold text-[var(--accent)] hover:underline">
          hei@bizdayz.com
        </a>
        .
      </p>
    </div>
  );
}
