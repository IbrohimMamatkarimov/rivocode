"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { Menu, Flame, LogIn } from "lucide-react";
import { ThemeToggle } from "@/components/theme/ThemeToggle";
import { LanguageToggle } from "@/components/theme/LanguageToggle";
import { useLanguage, type TranslationKey } from "@/components/theme/LanguageProvider";
import { accountInitials, useAuth } from "@/components/auth/AuthProvider";
import { useLearningProgress } from "@/components/progress/LearningProgressProvider";
import { BrandMark } from "./BrandMark";
import { GlobalSearch } from "./GlobalSearch";

const titleKeyMap: Record<string, TranslationKey> = {
  "/dashboard": "title_dashboard",
  "/learn": "title_learn",
  "/courses": "title_courses",
  "/practice": "title_practice",
  "/projects": "title_projects",
  "/progress": "title_progress",
  "/profile": "title_profile",
  "/settings": "title_settings",
};

function resolveTitleKey(pathname: string): TranslationKey {
  if (titleKeyMap[pathname]) return titleKeyMap[pathname];
  if (pathname.startsWith("/courses/")) return "title_course";
  if (pathname.startsWith("/lessons/")) return "title_lesson";
  return "title_default";
}

export function Header({ onOpenMenu }: { onOpenMenu: () => void }) {
  const pathname = usePathname();
  const { t } = useLanguage();
  const { status, account } = useAuth();
  const { stats } = useLearningProgress();

  const initials = accountInitials(account);

  return (
    <header className="rivo-header sticky top-0 z-30 flex h-[4rem] shrink-0 items-center justify-between border-b border-border/80 bg-background/80 px-4 backdrop-blur-xl md:px-8">
      <div className="flex items-center gap-2 sm:gap-4">
        <button
          type="button"
          onClick={onOpenMenu}
          aria-label="Open menu"
          className="flex h-9 w-9 items-center justify-center rounded-xl text-muted transition-colors hover:bg-surface-raised hover:text-foreground lg:hidden"
        >
          <Menu className="h-5 w-5" />
        </button>

        <Link href="/dashboard" className="lg:hidden"><BrandMark label /></Link>

        <div className="hidden lg:block">
          <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-muted-2">{t("workspace_label")}</p>
          <p className="text-sm font-semibold text-foreground">{t(resolveTitleKey(pathname))}</p>
        </div>
      </div>

      <div className="flex items-center gap-2 sm:gap-3">
        <div className="hidden items-center gap-1.5 rounded-full border border-warning/25 bg-warning-soft px-3 py-1.5 text-xs font-semibold text-warning sm:flex">
          <Flame className="h-3.5 w-3.5" fill="currentColor" />
          {stats.streakDays} {t("stat_streak").toLowerCase()}
        </div>

        <GlobalSearch />

        <LanguageToggle />
        <ThemeToggle />

        {status === "account" ? (
          account?.picture ? (
            <Link
              href="/profile"
              className="h-9 w-9 overflow-hidden rounded-xl ring-2 ring-accent-soft transition-transform hover:-translate-y-0.5"
            >
              {/* eslint-disable-next-line @next/next/no-img-element -- external Google profile photo, not a local/optimizable asset */}
              <img src={account.picture} alt={account.name ?? account.email} className="h-full w-full object-cover" />
            </Link>
          ) : (
            <Link
              href="/profile"
              className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-accent to-violet text-xs font-bold text-white shadow-sm ring-2 ring-accent-soft transition-transform hover:-translate-y-0.5"
            >
              {initials}
            </Link>
          )
        ) : status === "unauthenticated" ? (
          <Link
            href="/login"
            aria-label={t("btn_sign_in")}
            className="flex h-9 items-center gap-1.5 rounded-xl bg-foreground px-3.5 text-xs font-semibold text-background transition-opacity hover:opacity-90"
          >
            <LogIn className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">{t("btn_sign_in")}</span>
          </Link>
        ) : (
          <div className="h-9 w-9 animate-pulse rounded-xl bg-surface-raised" />
        )}
      </div>
    </header>
  );
}
