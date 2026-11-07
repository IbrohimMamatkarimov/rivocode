"use client";

import { useState } from "react";
import { MessageCircle, X } from "lucide-react";

export function LearningHelp({ lesson }: { lesson: string }) {
  const [open, setOpen] = useState(false);
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  async function ask() {
    if (!question.trim() || loading) return;
    setLoading(true); setError("");
    try {
      const response = await fetch("/api/student-help", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ question, lesson }) });
      const data = await response.json().catch(() => ({}));
      if (!response.ok) throw new Error(data.error || "Learning help is unavailable.");
      setAnswer(data.answer || "");
    } catch (cause) { setError(cause instanceof Error ? cause.message : "Learning help is unavailable."); }
    finally { setLoading(false); }
  }
  return <section className="rounded-2xl border border-accent-soft-strong bg-accent-soft/45 p-5">
    <div className="flex items-start justify-between gap-4"><div><div className="flex items-center gap-2 text-sm font-semibold text-foreground"><MessageCircle className="h-4 w-4 text-accent" /> Need a nudge?</div><p className="mt-1 text-sm leading-relaxed text-muted">Ask about this lesson or your next move. The guide explains the path without taking the work away from you.</p></div><button type="button" onClick={() => setOpen((value) => !value)} className="rounded-lg bg-foreground px-3 py-2 text-xs font-semibold text-background">{open ? "Hide" : "Ask"}</button></div>
    {open && <div className="mt-4 border-t border-accent-soft-strong pt-4"><textarea value={question} onChange={(event) => setQuestion(event.target.value)} maxLength={2000} className="min-h-28 w-full rounded-xl border border-border bg-surface p-3 text-sm text-foreground outline-none focus:border-accent" placeholder="What is confusing right now?" />{error && <p role="alert" className="mt-2 text-sm text-red-600">{error}</p>}{answer && <div className="mt-3 whitespace-pre-wrap rounded-xl bg-surface p-3 text-sm leading-6 text-foreground">{answer}</div>}<div className="mt-3 flex justify-end"><button type="button" onClick={ask} disabled={!question.trim() || loading} className="rounded-lg bg-accent px-4 py-2 text-sm font-semibold text-white disabled:opacity-50">{loading ? "Thinking…" : "Get help"}</button></div></div>}
  </section>;
}

