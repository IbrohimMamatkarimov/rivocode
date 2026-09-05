import { type ReactNode } from "react";
import { type LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface PageHeroProps {
  eyebrow?: string;
  title: string;
  description?: string;
  icon?: LucideIcon;
  stats?: { label: string; value: string }[];
  children?: ReactNode;
  className?: string;
}

export function PageHero({ eyebrow, title, description, icon: Icon, stats, children, className }: PageHeroProps) {
  return (
    <div className={cn("hero-surface studio-panel mb-8 rounded-3xl border border-white/10 px-6 py-7 shadow-lg sm:px-8 sm:py-9", className)}>
      <div className="relative flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
        <div className="max-w-2xl">
          {eyebrow && (
            <p className="mb-3 text-[11px] font-bold uppercase tracking-[0.16em] text-accent-2">{eyebrow}</p>
          )}
          <div className="flex items-center gap-3">
            {Icon && (
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-white/15 bg-white/10 text-accent-2 backdrop-blur">
                <Icon className="h-5 w-5" />
              </div>
            )}
            <h1 className="text-[30px] font-bold tracking-[-0.04em] text-white sm:text-[38px]">{title}</h1>
          </div>
          {description && <p className="mt-3 max-w-xl text-[15px] leading-relaxed text-white/68">{description}</p>}
          {children && <div className="mt-5">{children}</div>}
        </div>

        {stats && stats.length > 0 && (
          <div className="flex shrink-0 gap-2.5">
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="min-w-24 rounded-2xl border border-white/10 bg-white/[0.08] px-4 py-3 text-center backdrop-blur"
              >
                <p className="text-xl font-bold text-white">{stat.value}</p>
                <p className="mt-0.5 text-[10px] font-bold uppercase tracking-[0.12em] text-white/52">{stat.label}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
