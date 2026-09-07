"use client";

import { Quote } from "lucide-react";
import { useLanguage, type TranslationKey } from "@/components/theme/LanguageProvider";
import { useAuth } from "@/components/auth/AuthProvider";
import { DashboardHeroOrbit } from "./DashboardHeroOrbit";

function useGreetingKey(): TranslationKey {
  const hour = new Date().getHours();
  if (hour < 12) return "hero_greeting_morning";
  if (hour < 18) return "hero_greeting_afternoon";
  return "hero_greeting_evening";
}

export function DashboardHero() {
  const { t } = useLanguage();
  const { status, account } = useAuth();
  const greetingKey = useGreetingKey();

  // Only ever greet by name once we actually know who's signed in — never a
  // stand-in name for a visitor who hasn't signed in yet.
  const firstName =
    status === "account" ? account?.name?.split(" ")[0] ?? account?.email?.split("@")[0] : undefined;

  return (
    <section className="hero-surface mb-7 overflow-hidden rounded-3xl border border-white/10 px-6 py-9 shadow-lg sm:px-9 sm:py-11">
      <DashboardHeroOrbit />
      <p className="mb-3 text-[11px] font-bold uppercase tracking-[0.17em] text-accent-2">{t("hero_eyebrow")}</p>
      <h1 className="max-w-2xl text-[34px] font-bold leading-[1.05] tracking-[-0.04em] text-white sm:text-[44px]">
        {t(greetingKey)}
        {firstName ? `, ${firstName}` : ""}.
      </h1>

      <div className="mt-6 flex max-w-xl items-start gap-3 border-l-2 border-accent-2/60 pl-4">
        <Quote className="mt-0.5 h-5 w-5 shrink-0 text-accent-2/70" />
        <div>
          <p className="text-lg italic leading-snug text-white/85">&ldquo;{t("hero_quote")}&rdquo;</p>
          <p className="mt-2 text-sm font-semibold text-white/50">— {t("hero_quote_author")}</p>
        </div>
      </div>
    </section>
  );
}
