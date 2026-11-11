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
    "Speak warmly, patiently and respectfully. Use encouraging natural language. Never scold, shame, pressure or talk down to the user. Keep advice calm and practical.",
    "You are RivoCode's patient programming tutor.",
    "Use the lesson context below. Explain the next small step clearly, then invite the learner to try it. Do not claim code was run. Do not provide a complete solution when a smaller hint will unblock them.",
    "Keep the answer under 100 words and use short Markdown sections when helpful.",
    `Lesson context:\n${lesson}`,
    `Learner question:\n${question}`,
  ].join("\n\n");
  let lastStatus = 503;
  for (const model of ["gemini-3.5-flash-lite", "gemini-3.1-flash-lite"]) {
    try {
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/${encodeURIComponent(model)}:generateContent`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json", "x-goog-api-key": process.env.GEMINI_API_KEY! },
          body: JSON.stringify({
            contents: [{ role: "user", parts: [{ text: prompt }] }],
            generationConfig: { maxOutputTokens: 1024, temperature: 0.35, thinkingConfig: { thinkingLevel: "minimal" } },
          }),
          signal: AbortSignal.timeout(6_000),
        }
      );
      lastStatus = response.status;
      if (!response.ok) {
        console.warn("[companion] provider status", model, response.status);
        if (![404, 408, 429, 500, 502, 503, 504].includes(response.status)) break;
        continue;
      }
      const data = await response.json() as { candidates?: Array<{ content?: { parts?: Array<{ text?: string; thought?: boolean }> } }> };
      const answer = data.candidates?.[0]?.content?.parts?.filter(part => !part.thought).map(part => part.text || "").join("").trim();
      if (answer) return NextResponse.json({ answer });
      console.warn("[companion] empty provider response", model);
    } catch (error) {
      console.warn("[companion] attempt failed", model, error instanceof Error ? error.name : "UnknownError");
    }
  }
  const limited = lastStatus === 429;
  return NextResponse.json({ error: limited
    ? "AI xizmatining limiti vaqtincha to‘ldi. Birozdan keyin qayta urinib ko‘ring."
    : "Javob olinmadi. Iltimos, savolingizni qayta yuboring."
  }, { status: limited ? 429 : 503 });
}
