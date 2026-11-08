"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  BookOpen,
  Library,
  Zap,
  FolderKanban,
  TrendingUp,
  Settings,
  CircleUser,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { BrandMark } from "./BrandMark";
import { useLanguage } from "@/components/theme/LanguageProvider";

const primaryNav = [
  { href: "/dashboard", labelKey: "nav_dashboard", icon: LayoutDashboard },
  { href: "/learn", labelKey: "nav_learn", icon: BookOpen },
  { href: "/courses", labelKey: "nav_courses", icon: Library },
  { href: "/practice", labelKey: "nav_practice", icon: Zap },
  { href: "/projects", labelKey: "nav_projects", icon: FolderKanban },
  { href: "/progress", labelKey: "nav_progress", icon: TrendingUp },
] as const;

const secondaryNav = [
  { href: "/settings", labelKey: "nav_settings", icon: Settings },
  { href: "/profile", labelKey: "nav_profile", icon: CircleUser },
] as const;

function isActive(pathname: string, href: string) {
  if (href === "/dashboard") return pathname === "/dashboard";
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function Sidebar() {
  const pathname = usePathname();
  const { t } = useLanguage();

  return (
    <aside className="rivo-sidebar sticky top-0 hidden h-screen w-[14.5rem] shrink-0 flex-col border-r border-white/10 bg-ink px-4 py-5 text-white lg:flex">
      <div className="px-2"><BrandMark label inverse className="text-accent-2" /></div>

      <nav className="mt-9 flex flex-1 flex-col gap-1">
        <p className="px-3 pb-2 text-[10px] font-bold uppercase tracking-[0.16em] text-white/40">{t("nav_section_studio")}</p>
        {primaryNav.map((item) => {
          const active = isActive(pathname, item.href);
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              aria-current={active ? "page" : undefined}
              className={cn(
                "group flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors",
                active
                  ? "relative bg-gradient-to-r from-accent/20 to-white/[0.08] text-white shadow-sm ring-1 ring-accent-2/20 before:absolute before:left-0 before:top-1/2 before:h-5 before:w-[3px] before:-translate-y-1/2 before:rounded-full before:bg-accent-2"
                  : "text-white/55 hover:translate-x-0.5 hover:bg-white/[0.06] hover:text-white"
              )}
            >
              <Icon className={cn("h-4 w-4", active ? "text-accent-2" : "text-white/45 group-hover:text-white/80")} strokeWidth={2} />
              {t(item.labelKey)}
            </Link>
          );
        })}
      </nav>

      <div className="flex flex-col gap-1 border-t border-white/10 pt-4">
        {secondaryNav.map((item) => {
          const active = isActive(pathname, item.href);
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              aria-current={active ? "page" : undefined}
              className={cn(
                "group flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors",
                active
                  ? "relative bg-gradient-to-r from-accent/20 to-white/[0.08] text-white shadow-sm ring-1 ring-accent-2/20 before:absolute before:left-0 before:top-1/2 before:h-5 before:w-[3px] before:-translate-y-1/2 before:rounded-full before:bg-accent-2"
                  : "text-white/55 hover:translate-x-0.5 hover:bg-white/[0.06] hover:text-white"
              )}
            >
              <Icon className={cn("h-4 w-4", active ? "text-accent-2" : "text-white/45 group-hover:text-white/80")} strokeWidth={2} />
              {t(item.labelKey)}
            </Link>
          );
        })}
      </div>
    </aside>
  );
}

export { primaryNav, secondaryNav };
