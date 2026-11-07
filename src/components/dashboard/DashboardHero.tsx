"use client";

import Link from "next/link";
import type { PointerEvent as ReactPointerEvent } from "react";
import { ArrowRight, BookOpen, Sparkles } from "lucide-react";
import { useLanguage, type TranslationKey } from "@/components/theme/LanguageProvider";
import { useAuth } from "@/components/auth/AuthProvider";

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
  const firstName =
    status === "account" ? account?.name?.split(" ")[0] ?? account?.email?.split("@")[0] : undefined;

  function trackPointer(event: ReactPointerEvent<HTMLElement>) {
    if (event.pointerType !== "mouse") return;
    const bounds = event.currentTarget.getBoundingClientRect();
    const x = (event.clientX - bounds.left) / bounds.width;
    const y = (event.clientY - bounds.top) / bounds.height;
    event.currentTarget.style.setProperty("--pointer-x", `${x * 100}%`);
    event.currentTarget.style.setProperty("--pointer-y", `${y * 100}%`);
    event.currentTarget.style.setProperty("--tilt-x", `${(0.5 - y) * 3}deg`);
    event.currentTarget.style.setProperty("--tilt-y", `${(x - 0.5) * 5}deg`);
  }

  return (
    <section className="hero-surface dashboard-hero mb-7 overflow-hidden rounded-[2rem] border border-border shadow-sm" onPointerMove={trackPointer}>
      <div className="dashboard-hero__copy relative z-10">
        <p className="mb-4 inline-flex items-center gap-2 rounded-full border border-accent-soft-strong bg-accent-soft px-3.5 py-1.5 text-[11px] font-bold uppercase tracking-[0.15em] text-accent">
          <Sparkles className="h-3.5 w-3.5" />
          {t("hero_eyebrow")}
        </p>

        <h1 className="max-w-2xl text-[36px] font-bold leading-[1.04] tracking-[-0.045em] text-foreground sm:text-[48px] xl:text-[56px]">
          <span className="block">{t(greetingKey)}{firstName ? `, ${firstName}` : ""}.</span>
          <span className="gradient-text mt-1 block">{t("hero_question")}</span>
        </h1>

        <p className="mt-5 max-w-xl text-sm leading-6 text-muted sm:text-[15px] sm:leading-7">
          {t("hero_subtitle")}
        </p>

        <div className="mt-7 flex flex-wrap items-center gap-3">
          <Link
            href="/learn"
            className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-accent-2 px-5 text-sm font-bold text-ink shadow-[0_12px_30px_rgba(98,229,215,.2)] transition-all hover:-translate-y-0.5 hover:bg-white hover:shadow-[0_16px_34px_rgba(98,229,215,.24)]"
          >
            <BookOpen className="h-4 w-4" />
            {t("btn_continue_learning")}
            <ArrowRight className="h-4 w-4" />
          </Link>
          <Link
            href="/courses"
            className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl border border-border bg-surface-raised px-5 text-sm font-semibold text-foreground transition-all hover:-translate-y-0.5 hover:border-border-strong hover:bg-white"
          >
            {t("btn_browse_courses")}
          </Link>
        </div>


      </div>

      <div className="dashboard-hero__visual relative z-10 hidden lg:flex">
        <div className="dashboard-code-card w-full max-w-[390px] overflow-hidden rounded-2xl border border-border bg-white shadow-md">
          <div className="flex items-center justify-between border-b border-border px-4 py-3">
            <div className="flex items-center gap-1.5">
              <span className="h-2.5 w-2.5 rounded-full bg-[#ff6b67]" />
              <span className="h-2.5 w-2.5 rounded-full bg-[#ffc75e]" />
              <span className="h-2.5 w-2.5 rounded-full bg-[#51d99a]" />
            </div>
            <span className="font-mono text-[10px] font-semibold tracking-[0.08em] text-muted">next-project.jsx</span>
            <span className="text-[10px] font-semibold text-accent">ready</span>
          </div>
          <div className="space-y-3 px-5 py-5 font-mono text-xs sm:text-[13px]">
            <p><span className="text-violet-700">const</span> <span className="text-sky-700">idea</span> = <span className="text-emerald-700">"something useful"</span>;</p>
            <p><span className="text-violet-300">function</span> <span className="text-amber-700">build</span>() {"{"}</p>
            <p className="pl-5 text-muted">learnOneThing();</p>
            <p className="pl-5 text-white/60">makeItReal();</p>
            <p>{"}"}</p>
            <div className="mt-5 flex items-center justify-between rounded-xl border border-accent-soft-strong bg-accent-soft px-3.5 py-3">
              <span className="text-muted">Start with one lesson</span>
              <ArrowRight className="h-4 w-4 text-accent" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
