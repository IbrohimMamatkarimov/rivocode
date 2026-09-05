"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { primaryNav } from "./Sidebar";
import { cn } from "@/lib/utils";
import { useLanguage, type TranslationKey } from "@/components/theme/LanguageProvider";

function isActive(pathname: string, href: string) {
  if (href === "/dashboard") return pathname === "/dashboard";
  return pathname === href || pathname.startsWith(`${href}/`);
}

const navKeyByHref: Record<string, TranslationKey> = {
  "/dashboard": "nav_dashboard",
  "/learn": "nav_learn",
  "/courses": "nav_courses",
  "/practice": "nav_practice",
  "/projects": "nav_projects",
  "/progress": "nav_progress",
};

export function TopNav() {
  const pathname = usePathname();
  const { t } = useLanguage();

  return (
    <nav className="hidden bg-[#1a1a1a] md:block">
      <div className="mx-auto flex w-full max-w-6xl items-center gap-1 overflow-x-auto px-4 md:px-8">
        {primaryNav.map((item) => {
          const active = isActive(pathname, item.href);
          const Icon = item.icon;
          const key = navKeyByHref[item.href];
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex shrink-0 items-center gap-2 border-b-2 px-4 py-3 text-[13px] font-semibold uppercase tracking-wide transition-colors",
                active
                  ? "border-accent text-white"
                  : "border-transparent text-white/60 hover:border-white/30 hover:text-white"
              )}
            >
              <Icon className="h-4 w-4" strokeWidth={2} />
              {t(key)}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
