"use client";

import { Languages } from "lucide-react";
import { useLanguage } from "./LanguageProvider";

export function LanguageToggle({ className }: { className?: string }) {
  const { lang, toggleLang } = useLanguage();

  return (
    <button
      type="button"
      onClick={toggleLang}
      aria-label="Switch language"
      className={
        "inline-flex h-9 items-center gap-1.5 rounded-lg border border-border bg-surface px-2.5 text-xs font-semibold text-muted transition-colors hover:text-foreground hover:border-border-strong focus-visible:outline-2 focus-visible:outline-accent " +
        (className ?? "")
      }
    >
      <Languages className="h-3.5 w-3.5" />
      {lang === "en" ? "EN" : "UZ"}
    </button>
  );
}
