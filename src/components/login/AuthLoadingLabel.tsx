"use client";

import { useEffect, useState } from "react";

const DOT_COUNT = 3;
const TICK_MS = 350;

export function AuthLoadingLabel({ label }: { label: string }) {
  const [dots, setDots] = useState(0);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setDots((d) => (d + 1) % (DOT_COUNT + 1));
    }, TICK_MS);
    return () => window.clearInterval(timer);
  }, []);

  return (
    <span className="inline-flex items-center gap-1 font-mono">
      <span>{label}</span>
      <span className="inline-block w-3 text-left">{".".repeat(dots)}</span>
      <span className="terminal-cursor" />
    </span>
  );
}
