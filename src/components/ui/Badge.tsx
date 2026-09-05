import { type HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

type Tone = "neutral" | "accent" | "success" | "warning" | "danger" | "violet" | "blue";

const toneClasses: Record<Tone, string> = {
  neutral: "bg-surface-raised text-muted border-border",
  accent: "bg-accent-soft text-accent border-accent-soft-strong",
  success: "bg-success-soft text-success border-success/20",
  warning: "bg-warning-soft text-warning border-warning/20",
  danger: "bg-danger-soft text-danger border-danger/20",
  violet: "bg-violet-soft text-violet border-violet/20",
  blue: "bg-blue-soft text-blue border-blue/20",
};

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  tone?: Tone;
}

export function Badge({ className, tone = "neutral", ...props }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-full border px-2.5 py-0.5 text-xs font-medium",
        toneClasses[tone],
        className
      )}
      {...props}
    />
  );
}

export function difficultyTone(difficulty: string): Tone {
  switch (difficulty) {
    case "Beginner":
    case "Easy":
      return "success";
    case "Intermediate":
    case "Medium":
      return "warning";
    case "Advanced":
    case "Hard":
      return "danger";
    default:
      return "neutral";
  }
}
