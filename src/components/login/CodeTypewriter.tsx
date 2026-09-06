"use client";

import { useEffect, useState } from "react";
import { Zap } from "lucide-react";

interface Token {
  text: string;
  className?: string;
}

interface CodeLine {
  tokens: Token[];
}

const LINES: CodeLine[] = [
  { tokens: [{ text: "function ", className: "code-keyword" }, { text: "learnToCode", className: "code-function" }, { text: "() {" }] },
  { tokens: [{ text: "  const ", className: "code-keyword" }, { text: "you", className: "code-function" }, { text: " = " }, { text: '"ready"', className: "code-string" }, { text: ";" }] },
  { tokens: [{ text: "  const ", className: "code-keyword" }, { text: "skills", className: "code-function" }, { text: " = []" }, { text: ";" }] },
  { tokens: [{ text: "" }] },
  { tokens: [{ text: "  while ", className: "code-keyword" }, { text: "(" }, { text: "you", className: "code-function" }, { text: " === " }, { text: '"ready"', className: "code-string" }, { text: ") {" }] },
  { tokens: [{ text: "    skills", className: "code-function" }, { text: "." }, { text: "push", className: "code-boolean" }, { text: "(" }, { text: "nextLesson", className: "code-function" }, { text: "()" }, { text: ");" }] },
  { tokens: [{ text: "    streak", className: "code-function" }, { text: "++" }, { text: "; " }, { text: "// keep going", className: "code-comment" }] },
  { tokens: [{ text: "  }" }] },
  { tokens: [{ text: "" }] },
  { tokens: [{ text: "  return ", className: "code-keyword" }, { text: '"Welcome to RivoCode"', className: "code-string" }, { text: ";" }] },
  { tokens: [{ text: "}" }] },
];

const TYPE_SPEED_MS = 18;
const LINE_PAUSE_MS = 120;
const RESTART_PAUSE_MS = 2200;

function CodeTypewriterLines() {
  const [lineIndex, setLineIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);

  const fullLineText = (line: CodeLine) => line.tokens.map((t) => t.text).join("");

  useEffect(() => {
    if (lineIndex >= LINES.length) {
      const resetTimer = window.setTimeout(() => {
        setLineIndex(0);
        setCharIndex(0);
      }, RESTART_PAUSE_MS);
      return () => window.clearTimeout(resetTimer);
    }

    const currentLine = fullLineText(LINES[lineIndex]);

    if (charIndex < currentLine.length) {
      const typeTimer = window.setTimeout(() => setCharIndex((c) => c + 1), TYPE_SPEED_MS);
      return () => window.clearTimeout(typeTimer);
    }

    const nextLineTimer = window.setTimeout(() => {
      setLineIndex((l) => l + 1);
      setCharIndex(0);
    }, LINE_PAUSE_MS);
    return () => window.clearTimeout(nextLineTimer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lineIndex, charIndex]);

  const renderTypedLine = (line: CodeLine, charsToShow: number) => {
    let remaining = charsToShow;
    return line.tokens.map((token, i) => {
      if (remaining <= 0) return null;
      const slice = token.text.slice(0, remaining);
      remaining -= token.text.length;
      return (
        <span key={i} className={token.className}>
          {slice}
        </span>
      );
    });
  };

  return (
    <>
      {LINES.slice(0, lineIndex).map((line, i) => (
        <div key={i}>{renderTypedLine(line, Infinity)}</div>
      ))}
      {lineIndex < LINES.length && (
        <div>
          {renderTypedLine(LINES[lineIndex], charIndex)}
          <span className="terminal-cursor" />
        </div>
      )}
    </>
  );
}

export function CodeTypewriter() {
  return (
    <div>
      <div className="login-code-window code-window motion-terminal overflow-hidden rounded-2xl border border-white/10 shadow-2xl">
        <div className="flex items-center gap-2 border-b border-white/10 bg-white/[0.04] px-4 py-3">
          <span className="h-2.5 w-2.5 rounded-full bg-[#f44336]/70" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#e7a917]/70" />
          <span className="h-2.5 w-2.5 rounded-full bg-accent-2/70" />
          <span className="ml-2 font-mono text-xs text-white/40">learn-to-code.js</span>
        </div>
        <pre className="code-print min-h-[220px] overflow-hidden px-5 py-5 font-mono text-[13px] leading-relaxed text-white/85">
          <code>
            <CodeTypewriterLines />
          </code>
        </pre>
      </div>

      <div className="mt-5 flex items-center gap-3">
        <div className="developer-stack">
          <span className="developer-avatar developer-avatar-one">IB</span>
          <span className="developer-avatar developer-avatar-two">AK</span>
          <span className="developer-avatar developer-avatar-three">+8</span>
          <span className="developer-orbit">
            <Zap className="h-2.5 w-2.5" fill="currentColor" />
          </span>
        </div>
        <p className="text-xs text-white/50">Learners building real projects, every day.</p>
      </div>
    </div>
  );
}
