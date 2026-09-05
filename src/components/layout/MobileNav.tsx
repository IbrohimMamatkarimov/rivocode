"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";
import { primaryNav, secondaryNav } from "./Sidebar";
import { BrandMark } from "./BrandMark";
import { useLanguage } from "@/components/theme/LanguageProvider";

interface MobileNavProps {
  open: boolean;
  onClose: () => void;
}

function isActive(pathname: string, href: string) {
  if (href === "/dashboard") return pathname === "/dashboard";
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function MobileNav({ open, onClose }: MobileNavProps) {
  const pathname = usePathname();
  const { t } = useLanguage();

  useEffect(() => {
    onClose();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <div
      className={cn(
        "fixed inset-0 z-50 lg:hidden",
        open ? "pointer-events-auto" : "pointer-events-none"
      )}
      aria-hidden={!open}
    >
      <div
        className={cn(
          "absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity duration-200",
          open ? "opacity-100" : "opacity-0"
        )}
        onClick={onClose}
      />
      <div
        className={cn(
          "absolute left-0 top-0 flex h-full w-72 max-w-[80vw] flex-col bg-surface border-r border-border transition-transform duration-200 ease-out",
          open ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="flex h-16 items-center justify-between px-5">
          <div className="flex items-center gap-2.5">
            <BrandMark label />
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close menu"
            className="flex h-8 w-8 items-center justify-center rounded-lg text-muted hover:bg-surface-raised"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <nav className="flex flex-1 flex-col gap-0.5 px-3 pt-2">
          {primaryNav.map((item) => {
            const active = isActive(pathname, item.href);
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-2.5 rounded-lg border-l-[3px] px-3 py-2.5 text-sm font-medium transition-colors",
                  active
                    ? "border-accent bg-accent-soft text-accent"
                    : "border-transparent text-muted hover:bg-surface-raised hover:text-foreground"
                )}
              >
                <Icon className="h-4 w-4" strokeWidth={2} />
                {t(item.labelKey)}
              </Link>
            );
          })}
        </nav>

        <div className="flex flex-col gap-0.5 border-t border-border px-3 py-3">
          {secondaryNav.map((item) => {
            const active = isActive(pathname, item.href);
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-2.5 rounded-lg border-l-[3px] px-3 py-2.5 text-sm font-medium transition-colors",
                  active
                    ? "border-accent bg-accent-soft text-accent"
                    : "border-transparent text-muted hover:bg-surface-raised hover:text-foreground"
                )}
              >
                <Icon className="h-4 w-4" strokeWidth={2} />
                {t(item.labelKey)}
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
