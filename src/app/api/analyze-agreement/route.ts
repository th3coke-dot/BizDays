import { NextResponse } from "next/server";
import { analyzeAgreementText, isAiAnalysisEnabled } from "@/lib/document-analysis";

// Node runtime is required for pdf-parse (uses Node buffer APIs).
export const runtime = "nodejs";

const MAX_FILE_BYTES = 5 * 1024 * 1024; // 5 MB
const ALLOWED_TYPES = new Set([
  "text/plain",
  "application/pdf",
]);

/**
 * SECURITY: this handler processes the uploaded file fully in memory for
 * the duration of a single request and never writes it to disk, a
 * database, or an application log. Only the structured extraction result
 * (numbers + short field labels) is returned to the client. See
 * SECURITY.md for the full data-handling policy, including what happens
 * if AI analysis is enabled (ANTHROPIC_API_KEY configured).
 */
export async function POST(request: Request) {
  let formData: FormData;
  try {
    formData = await request.formData();
  } catch {
    return NextResponse.json({ error: "Expected multipart/form-data." }, { status: 400 });
  }

  const file = formData.get("file");
  if (!(file instanceof File)) {
    return NextResponse.json({ error: "No file was uploaded." }, { status: 400 });
  }

  if (file.size === 0) {
    return NextResponse.json({ error: "The uploaded file is empty." }, { status: 400 });
  }
  if (file.size > MAX_FILE_BYTES) {
    return NextResponse.json(
      { error: "File is too large. Maximum size is 5 MB." },
      { status: 413 },
    );
  }
  if (file.type && !ALLOWED_TYPES.has(file.type)) {
    return NextResponse.json(
      { error: "Unsupported file type. Please upload a .txt or .pdf file." },
      { status: 415 },
    );
  }

  const buffer = Buffer.from(await file.arrayBuffer());
  let text = "";

  try {
    if (file.type === "application/pdf" || file.name?.toLowerCase().endsWith(".pdf")) {
      const { PDFParse } = await import("pdf-parse");
      const parser = new PDFParse({ data: new Uint8Array(buffer) });
      const parsed = await parser.getText();
      text = parsed.text ?? "";
    } else {
      text = buffer.toString("utf-8");
    }
  } catch {
    return NextResponse.json(
      {
        error:
          "Could not read this file. Try a plain-text (.txt) export, or a text-based PDF (not a scanned image).",
      },
      { status: 422 },
    );
  }

  const trimmed = text.trim();
  if (!trimmed) {
    return NextResponse.json(
      {
        error:
          "No readable text was found. Scanned/image-only PDFs aren't supported yet — try a text export instead.",
      },
      { status: 422 },
    );
  }

  const result = await analyzeAgreementText(trimmed);

  return NextResponse.json({
    ...result,
    aiEnabled: isAiAnalysisEnabled(),
    // Short excerpt only, so the user can sanity-check what was read —
    // never the full document, and never stored server-side after this
    // response is sent.
    excerpt: trimmed.slice(0, 400),
  });
}
