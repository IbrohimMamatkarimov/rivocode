import { NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs";

const WINDOW_MS = 10 * 60 * 1000;
const MAX_REQUESTS = 12;
const hits = new Map<string, { count: number; resetAt: number }>();




function allowed(request: NextRequest) {
  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  const now = Date.now();
  const record = hits.get(ip);
  if (!record || record.resetAt <= now) { hits.set(ip, { count: 1, resetAt: now + WINDOW_MS }); return true; }
  if (record.count >= MAX_REQUESTS) return false;
  record.count += 1;
  return true;
}

export async function POST(request: NextRequest) {
  if (!process.env.GEMINI_API_KEY) return NextResponse.json({ error: "Learning help is not configured yet." }, { status: 503 });
  if (!allowed(request)) return NextResponse.json({ error: "Please wait a few minutes before asking again." }, { status: 429 });
  const body = await request.json().catch(() => null) as { question?: unknown; lesson?: unknown } | null;
  const question = typeof body?.question === "string" ? body.question.trim() : "";
  const lesson = typeof body?.lesson === "string" ? body.lesson.trim() : "";
  if (!question || question.length > 2_000 || lesson.length > 4_000) return NextResponse.json({ error: "Keep your question under 2,000 characters." }, { status: 400 });

  const prompt = [
    "You are RivoCode's patient programming tutor.",
    "Use the lesson context below. Explain the next small step clearly, then invite the learner to try it. Do not claim code was run. Do not provide a complete solution when a smaller hint will unblock them.",
    "Keep the answer under 350 words and use short Markdown sections when helpful.",
    `Lesson context:\n${lesson}`,
    `Learner question:\n${question}`,
  ].join("\n\n");
  try {
    const preferred = "gemini-flash-lite-latest";
    let response: Response | undefined;
    for (const model of [...new Set([preferred, "gemini-flash-lite-latest"])]) {
      response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${encodeURIComponent(model)}:generateContent`, {
      method: "POST", headers: { "Content-Type": "application/json", "x-goog-api-key": process.env.GEMINI_API_KEY },
      body: JSON.stringify({ contents: [{ role: "user", parts: [{ text: prompt }] }], generationConfig: { maxOutputTokens: 700, temperature: 0.35 } }),
      signal: AbortSignal.timeout(18_000),
      });
      if (response.ok || ![404, 503].includes(response.status)) break;
    }
    if (!response || !response.ok) {
      if (response?.status === 429) return NextResponse.json({ error: "AI xizmatining limiti vaqtincha to‘ldi. Birozdan keyin urinib ko‘ring." }, { status: 429 });
      return NextResponse.json({ error: "Could not get a reply. Please try again." }, { status: 503 });
    }
    const data = await response.json() as { candidates?: Array<{ content?: { parts?: Array<{ text?: string }> } }> };
    const answer = data.candidates?.[0]?.content?.parts?.map((part) => part.text || "").join("").trim();
    if (!answer) return NextResponse.json({ error: "Could not get a reply. Please try again." }, { status: 503 });
    return NextResponse.json({ answer });
  } catch { return NextResponse.json({ error: "Could not get a reply. Please try again." }, { status: 503 }); }
}

