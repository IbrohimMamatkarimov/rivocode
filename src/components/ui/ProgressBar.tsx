import { cn } from "@/lib/utils";

interface ProgressBarProps {
  value: number;
  className?: string;
  trackClassName?: string;
  size?: "sm" | "md";
  gradient?: boolean;
}

export function ProgressBar({ value, className, trackClassName, size = "md", gradient = false }: ProgressBarProps) {
  const clamped = Math.min(100, Math.max(0, value));
  return (
    <div
      role="progressbar"
      aria-valuenow={clamped}
      aria-valuemin={0}
      aria-valuemax={100}
      className={cn(
        "w-full overflow-hidden rounded-full bg-surface-raised",
        size === "sm" ? "h-1.5" : "h-2",
        trackClassName
      )}
    >
      <div
        className={cn(
          "progress-flow h-full rounded-full transition-[width] duration-700 ease-out",
          gradient ? "bg-gradient-to-r from-accent-3 via-accent to-accent-2" : "bg-accent",
          className
        )}
        style={{ width: `${clamped}%` }}
      />
    </div>
  );
}
