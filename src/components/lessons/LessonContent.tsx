import { Lightbulb, Info } from "lucide-react";
import { VideoPlayer } from "./VideoPlayer";
import type { LessonExample } from "@/lib/types";

interface LessonContentProps {
  heading: string;
  explanation: string;
  syntax?: string;
  codeExample: string;
  examples?: LessonExample[];
  note?: string;
  exercisePrompt: string;
  language: string;
  videoId?: string;
  startSeconds?: number;
}

function ExampleCard({
  label,
  code,
  note,
  isPrimary,
}: {
  label: string;
  code: string;
  language: string;
  note?: string;
  isPrimary: boolean;
}) {
  return (
    <div className="overflow-hidden rounded-2xl border border-border bg-ink shadow-elevated">
      <div className="flex items-center justify-between border-b border-white/10 bg-white/[0.06] px-4 py-3 text-xs font-semibold uppercase tracking-[0.12em] text-white/60">
        {label}
        {isPrimary && (
          <span className="rounded-full border border-accent-2/20 bg-accent-2/10 px-2 py-0.5 text-[10px] font-semibold normal-case tracking-normal text-accent-2">
            Runnable
          </span>
        )}
      </div>
      <pre className="scrollbar-thin overflow-x-auto bg-transparent p-5 font-mono text-[13px] leading-relaxed text-white/90">
        <code>{code}</code>
      </pre>
      {note && (
        <div className="border-t border-white/10 bg-white/[0.03] px-4 py-3 text-[13px] leading-relaxed text-white/60">
          <span className="font-semibold text-accent-2">Note: </span>
          {note}
        </div>
      )}
      {isPrimary && (
        <a
          href="#try-it-editor"
          className="flex w-full items-center gap-1.5 border-t border-white/10 bg-gradient-to-r from-accent to-accent-3 px-4 py-3 text-[13px] font-semibold text-white transition-opacity hover:opacity-95"
        >
          Try it Yourself »
        </a>
      )}
    </div>
  );
}

export function LessonContent({
  heading,
  explanation,
  syntax,
  codeExample,
  examples,
  note,
  exercisePrompt,
  language,
  videoId,
  startSeconds,
}: LessonContentProps) {
  const paragraphs = explanation.split("\n\n").filter(Boolean);

  return (
    <div className="space-y-7">
      {videoId && <VideoPlayer videoId={videoId} title={heading} startSeconds={startSeconds} />}

      <div className="max-w-3xl">
        <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-accent">Concept</p>
        <h2 className="mt-1 text-2xl font-bold tracking-[-0.04em] text-foreground">{heading}</h2>
        {paragraphs.map((paragraph, i) => (
          <p key={i} className="mt-2 text-[15px] leading-relaxed text-muted">
            {paragraph}
          </p>
        ))}
      </div>

      {syntax && (
        <div className="max-w-3xl overflow-hidden rounded-xl border border-border bg-surface-raised">
          <div className="border-b border-border px-4 py-2 text-[11px] font-bold uppercase tracking-[0.14em] text-muted-2">
            Syntax
          </div>
          <pre className="scrollbar-thin overflow-x-auto p-4 font-mono text-[13px] leading-relaxed text-foreground">
            <code>{syntax}</code>
          </pre>
        </div>
      )}

      <ExampleCard label="Example" code={codeExample} language={language} isPrimary />

      {examples?.map((ex, i) => (
        <ExampleCard
          key={i}
          label={ex.heading ?? "More examples"}
          code={ex.code}
          language={ex.language}
          note={ex.note}
          isPrimary={false}
        />
      ))}

      {note && (
        <div className="flex items-start gap-3 rounded-2xl border border-border bg-surface-raised p-5">
          <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-surface text-muted">
            <Info className="h-3.5 w-3.5" />
          </div>
          <div>
            <h3 className="text-sm font-semibold text-foreground">Good to know</h3>
            <p className="mt-1 text-sm leading-relaxed text-muted">{note}</p>
          </div>
        </div>
      )}

      <div className="flex items-start gap-3 rounded-2xl border border-accent-soft-strong bg-accent-soft/65 p-5">
        <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-accent text-white">
          <Lightbulb className="h-3.5 w-3.5" />
        </div>
        <div>
          <h3 className="text-sm font-semibold text-foreground">Your turn</h3>
          <p className="mt-1 text-sm leading-relaxed text-muted">{exercisePrompt}</p>
        </div>
      </div>
    </div>
  );
}
