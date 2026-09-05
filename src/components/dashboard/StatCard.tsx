import { type LucideIcon, TrendingUp } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { cn } from "@/lib/utils";

interface StatCardProps {
  icon: LucideIcon;
  value: string;
  label: string;
  tone?: "accent" | "warning" | "success" | "neutral" | "violet" | "blue";
  trend?: string;
}

const toneClasses = {
  accent: "bg-accent-soft text-accent",
  warning: "bg-warning-soft text-warning",
  success: "bg-success-soft text-success",
  neutral: "bg-surface-raised text-muted",
  violet: "bg-violet-soft text-violet",
  blue: "bg-blue-soft text-blue",
};

export function StatCard({ icon: Icon, value, label, tone = "accent", trend }: StatCardProps) {
  return (
    <Card className="studio-panel dashboard-stat relative overflow-hidden p-5 sm:p-6">
      <div className="flex items-start justify-between">
        <div className={cn("flex h-10 w-10 items-center justify-center rounded-xl", toneClasses[tone])}>
          <Icon className="h-5 w-5" strokeWidth={2} />
        </div>
        {trend && (
          <span className="flex items-center gap-0.5 rounded-full bg-success-soft px-2 py-0.5 text-[11px] font-semibold text-success">
            <TrendingUp className="h-3 w-3" />
            {trend}
          </span>
        )}
      </div>
      <p className="mt-5 text-[30px] font-bold leading-none tracking-[-0.04em] text-foreground">{value}</p>
      <p className="mt-1.5 text-[13px] text-muted">{label}</p>
    </Card>
  );
}
