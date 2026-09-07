"use client";

import { useEffect, useMemo, useState } from "react";

interface Token {
  text: string;
  className?: string;
}

const TOKEN_REGEX =
  /(\/\/[^\n]*|#[^\n]*)|("(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*'|`(?:\\.|[^`\\])*`)|(\b\d+(?:\.\d+)?\b)|(\b(?:function|const|let|var|if|elif|else|for|while|return|class|extends|new|import|from|export|default|async|await|try|catch|except|this|static|public|private|interface|type|void|def|pass|lambda|in|not|and|or|with|as|int|double|char|bool|using|namespace|include|struct)\b)|(\b(?:true|false|null|undefined|None|True|False|nullptr)\b)|([A-Za-z_]\w*)(?=\()/g;

function tokenize(code: string): Token[] {
  const tokens: Token[] = [];
  let lastIndex = 0;
  let match: RegExpExecArray | null;
  TOKEN_REGEX.lastIndex = 0;
  while ((match = TOKEN_REGEX.exec(code)) !== null) {
    if (match.index > lastIndex) {
      tokens.push({ text: code.slice(lastIndex, match.index) });
    }
    const [full, comment, str, num, kw, bool, func] = match;
    let className: string | undefined;
    if (comment) className = "code-comment";
    else if (str) className = "code-string";
    else if (num) className = "code-number";
    else if (kw) className = "code-keyword";
    else if (bool) className = "code-boolean";
    else if (func) className = "code-function";
    tokens.push({ text: full, className });
    lastIndex = match.index + full.length;
  }
  if (lastIndex < code.length) tokens.push({ text: code.slice(lastIndex) });
  return tokens;
}

function typingSpeed(length: number) {
  if (length > 260) return 5;
  if (length > 120) return 9;
  return 15;
}

export function TypedCode({ code, className }: { code: string; className?: string }) {
  const tokens = useMemo(() => tokenize(code), [code]);
  const totalLength = code.length;
  const [visible, setVisible] = useState(0);

  useEffect(() => {
    setVisible(0);
  }, [code]);

  useEffect(() => {
    if (visible >= totalLength) return;
    const timer = window.setTimeout(() => setVisible((v) => v + 1), typingSpeed(totalLength));
    return () => window.clearTimeout(timer);
  }, [visible, totalLength]);

  let remaining = visible;
  const rendered = tokens.map((token, i) => {
    if (remaining <= 0) return null;
    const slice = token.text.slice(0, remaining);
    remaining -= token.text.length;
    return (
      <span key={i} className={token.className}>
        {slice}
      </span>
    );
  });

  return (
    <code className={className}>
      {rendered}
      {visible < totalLength && <span className="terminal-cursor" />}
    </code>
  );
}
