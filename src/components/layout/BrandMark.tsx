import { cn } from "@/lib/utils";

interface BrandMarkProps {
  className?: string;
  label?: boolean;
  inverse?: boolean;
}

export function BrandMark({ className, label = false, inverse = false }: BrandMarkProps) {
  return (
    <span className={cn("inline-flex items-center gap-2.5", className)}>
      <svg
        aria-hidden="true"
        viewBox="0 0 40 40"
        className="h-9 w-9 shrink-0 overflow-visible"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect x="2" y="2" width="36" height="36" rx="11" fill="currentColor" />
        <path d="M12.4 13.2 8.8 20l3.6 6.8" stroke={inverse ? "#171329" : "white"} strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M27.6 13.2 31.2 20l-3.6 6.8" stroke={inverse ? "#171329" : "white"} strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
        <path d="m22.5 11.4-5 17.2" stroke="#F6B2A5" strokeWidth="2.7" strokeLinecap="round" />
      </svg>
      {label && (
        <span className={cn("text-[15px] font-bold tracking-[-0.04em]", inverse ? "text-white" : "text-foreground")}>
          Rivo<span className="text-accent">Code</span>
        </span>
      )}
    </span>
  );
}
