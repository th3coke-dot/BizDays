"use client";

import { useRef, useState } from "react";
import { FileText, Loader2, ShieldCheck, UploadCloud, X } from "lucide-react";
import { cn } from "@/lib/utils";
import type { AgreementExtraction } from "@/lib/document-analysis";

type Props = {
  onApply: (extraction: AgreementExtraction) => void;
  aiEnabledHint?: boolean;
};

type AnalyzeResponse = AgreementExtraction & {
  aiEnabled: boolean;
  excerpt: string;
  error?: string;
};

export function LocalAgreementUpload({ onApply }: Props) {
  const [consent, setConsent] = useState(false);
  const [dragging, setDragging] = useState(false);
  const [status, setStatus] = useState<"idle" | "loading" | "done" | "error">("idle");
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<AnalyzeResponse | null>(null);
  const [applied, setApplied] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  async function handleFile(file: File) {
    setStatus("loading");
    setError(null);
    setResult(null);
    setApplied(false);
    try {
      const formData = new FormData();
      formData.append("file", file);
      const response = await fetch("/api/analyze-agreement", {
        method: "POST",
        body: formData,
      });
      const data = (await response.json()) as AnalyzeResponse;
      if (!response.ok) {
        setError(data.error ?? "Something went wrong reading this file.");
        setStatus("error");
        return;
      }
      setResult(data);
      setStatus("done");
    } catch {
      setError("Upload failed. Check your connection and try again.");
      setStatus("error");
    }
  }

  function onDrop(e: React.DragEvent<HTMLDivElement>) {
    e.preventDefault();
    setDragging(false);
    if (!consent) return;
    const file = e.dataTransfer.files?.[0];
    if (file) void handleFile(file);
  }

  return (
    <div className="grid gap-3">
      <label className="flex items-start gap-2 rounded-lg border border-[var(--border)] bg-white/70 p-3 text-sm text-[var(--muted)]">
        <input
          type="checkbox"
          checked={consent}
          onChange={(e) => setConsent(e.target.checked)}
          className="mt-0.5 h-4 w-4 shrink-0 accent-[var(--accent)]"
        />
        <span>
          I understand this document will be processed to extract payroll
          figures and will not be stored on BizDays&apos; servers.{" "}
          <a href="/security" className="font-medium text-[var(--accent)] hover:underline">
            Read the data-handling policy
          </a>
          .
        </span>
      </label>

      <div
        onDragOver={(e) => {
          e.preventDefault();
          if (consent) setDragging(true);
        }}
        onDragLeave={() => setDragging(false)}
        onDrop={onDrop}
        onClick={() => consent && inputRef.current?.click()}
        className={cn(
          "flex flex-col items-center justify-center gap-2 rounded-2xl border-2 border-dashed p-8 text-center transition",
          !consent && "cursor-not-allowed opacity-50",
          consent && "cursor-pointer",
          dragging ? "border-[var(--accent)] bg-[var(--accent)]/5" : "border-[var(--border)] bg-white/50",
        )}
      >
        <input
          ref={inputRef}
          type="file"
          accept=".txt,.pdf,text/plain,application/pdf"
          className="hidden"
          disabled={!consent}
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) void handleFile(file);
          }}
        />
        {status === "loading" ? (
          <Loader2 className="h-8 w-8 animate-spin text-[var(--accent)]" />
        ) : (
          <UploadCloud className="h-8 w-8 text-[var(--accent)]" aria-hidden />
        )}
        <p className="font-medium text-[var(--primary)]">
          {status === "loading"
            ? "Reading document…"
            : "Drag & drop a local agreement, or click to choose a file"}
        </p>
        <p className="text-xs text-[var(--muted)]">
          .txt or text-based .pdf, up to 5 MB. {!consent && "Tick the box above to enable uploads."}
        </p>
      </div>

      {error && (
        <p className="rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
          {error}
        </p>
      )}

      {result && (
        <div className="rounded-xl border border-[var(--border)] bg-white/70 p-4 text-sm">
          <div className="flex items-center gap-2 font-medium text-[var(--primary)]">
            <FileText className="h-4 w-4 text-[var(--accent)]" aria-hidden />
            Extracted from your document
            <span
              className={cn(
                "ml-auto inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-semibold",
                result.method === "ai"
                  ? "bg-teal-100 text-teal-800"
                  : "bg-slate-100 text-slate-700",
              )}
            >
              <ShieldCheck className="h-3 w-3" aria-hidden />
              {result.method === "ai" ? "AI-assisted" : "Pattern match"}
            </span>
          </div>

          {result.fields.length > 0 ? (
            <ul className="mt-3 grid gap-1.5">
              {result.fields.map((field) => (
                <li key={field.label} className="flex items-center justify-between gap-4">
                  <span className="text-[var(--muted)]">{field.label}</span>
                  <span className="font-semibold text-[var(--primary)]">
                    {field.value}{" "}
                    <span className="text-xs font-normal text-[var(--muted)]">
                      ({field.confidence})
                    </span>
                  </span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="mt-3 text-[var(--muted)]">No figures were confidently detected.</p>
          )}

          {result.warnings.length > 0 && (
            <ul className="mt-3 list-disc space-y-1 pl-5 text-xs text-[var(--muted)]">
              {result.warnings.map((warning) => (
                <li key={warning}>{warning}</li>
              ))}
            </ul>
          )}

          <div className="mt-4 flex flex-wrap items-center gap-3">
            <button
              type="button"
              disabled={applied}
              onClick={() => {
                onApply(result);
                setApplied(true);
              }}
              className="inline-flex h-9 items-center rounded-lg bg-[var(--accent)] px-4 text-sm font-semibold text-white transition hover:bg-[var(--accent-hover)] disabled:opacity-50"
            >
              {applied ? "Applied to calculation" : "Apply to calculation"}
            </button>
            <button
              type="button"
              onClick={() => {
                setResult(null);
                setApplied(false);
                setStatus("idle");
                if (inputRef.current) inputRef.current.value = "";
              }}
              className="inline-flex h-9 items-center gap-1 rounded-lg px-3 text-sm font-medium text-[var(--muted)] hover:text-[var(--primary)]"
            >
              <X className="h-4 w-4" /> Discard
            </button>
          </div>
          <p className="mt-3 text-xs text-[var(--muted)]">
            Excerpt read from the file (for your own review only — nothing
            beyond this response is retained):{" "}
            <span className="italic">&ldquo;{result.excerpt.slice(0, 140)}…&rdquo;</span>
          </p>
        </div>
      )}
    </div>
  );
}
