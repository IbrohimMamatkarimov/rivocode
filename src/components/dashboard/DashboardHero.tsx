"use client";

import { Activity, Quote, ShieldCheck, Terminal } from "lucide-react";
import { useLanguage, type TranslationKey } from "@/components/theme/LanguageProvider";
import { useAuth } from "@/components/auth/AuthProvider";
import { currentUser } from "@/lib/mock-data";

function useGreetingKey(): TranslationKey {
  const hour = new Date().getHours();
  if (hour < 12) return "hero_greeting_morning";
  if (hour < 18) return "hero_greeting_afternoon";
  return "hero_greeting_evening";
}

function firstNameFromEmail(email: string) {
  const local = email.split("@")[0] ?? email;
  const cleaned = local.replace(/[._-]+/g, " ").trim();
  if (!cleaned) return null;
  const first = cleaned.split(" ")[0];
  return first.charAt(0).toUpperCase() + first.slice(1);
}

export function DashboardHero() {
  const { t } = useLanguage();
  const { status, account } = useAuth();
  const greetingKey = useGreetingKey();

  // Never show the mock "Ibrohim" profile name before someone has actually
  // signed in — only greet by name once we have a real signed-in account.
  const displayName =
    status === "account"
      ? account?.name ?? (account?.email ? firstNameFromEmail(account.email) : null) ?? currentUser.name
      : null;

  return (
    <section className="hero-surface mb-7 overflow-hidden rounded-3xl border border-white/10 px-6 py-9 shadow-lg sm:px-9 sm:py-11">
      <p className="mb-3 text-[11px] font-bold uppercase tracking-[0.17em] text-accent-2">{t("hero_eyebrow")}</p>
      <h1 className="max-w-2xl text-[34px] font-bold leading-[1.05] tracking-[-0.04em] text-white sm:text-[44px]">
        {displayName ? `${t(greetingKey)}, ${displayName}.` : `${t(greetingKey)}.`}
      </h1>

      <div className="mt-6 flex max-w-xl items-start gap-3 border-l-2 border-accent-2/60 pl-4">
        <Quote className="mt-0.5 h-5 w-5 shrink-0 text-accent-2/70" />
        <div>
          <p className="text-lg italic leading-snug text-white/85">&ldquo;{t("hero_quote")}&rdquo;</p>
          <p className="mt-2 text-sm font-semibold text-white/50">— {t("hero_quote_author")}</p>
        </div>
      </div>

      <div className="relative mt-8 grid max-w-4xl gap-3 lg:grid-cols-[1.45fr_.9fr]">
        <div className="terminal-surface dashboard-console overflow-hidden rounded-2xl border border-white/10 font-mono text-xs">
          <div className="flex items-center justify-between border-b border-white/10 bg-white/[0.04] px-4 py-2.5 text-white/50">
            <span className="flex items-center gap-2"><Terminal className="h-3.5 w-3.5 text-accent-2" /> learning-console</span>
            <span className="live-status text-[10px] tracking-[0.16em] text-accent-2">ONLINE</span>
          </div>
          <div className="space-y-1.5 px-4 py-4 leading-relaxed text-white/65">
            <p className="terminal-line">session.initialize({`{ track: \"developer\" }`})</p>
            <p className="terminal-line">next_module: javascript-fundamentals</p>
            <p className="terminal-line text-white/90">status: ready to build</p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div className="rounded-2xl border border-white/10 bg-white/[0.055] p-4 backdrop-blur-sm">
            <Activity className="h-4 w-4 text-accent-2" />
            <p className="mt-5 text-[10px] font-bold uppercase tracking-[0.14em] text-white/45">Weekly output</p>
            <p className="mt-1 text-xl font-semibold tracking-tight text-white">0 hrs</p>
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/[0.055] p-4 backdrop-blur-sm">
            <ShieldCheck className="h-4 w-4 text-accent-2" />
            <p className="mt-5 text-[10px] font-bold uppercase tracking-[0.14em] text-white/45">System</p>
            <p className="mt-1 text-xl font-semibold tracking-tight text-white">Ready</p>
          </div>
        </div>
      </div>
    </section>
  );
}
