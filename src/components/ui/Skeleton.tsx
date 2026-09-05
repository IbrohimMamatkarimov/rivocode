import { cn } from "@/lib/utils";

export function Skeleton({ className }: { className?: string }) {
  return <div className={cn("skeleton rounded-md", className)} />;
}

export function CardSkeleton() {
  return (
    <div className="rounded-xl border border-border bg-surface p-5">
      <Skeleton className="h-9 w-9 rounded-lg" />
      <Skeleton className="mt-4 h-4 w-24" />
      <Skeleton className="mt-2 h-3 w-16" />
      <Skeleton className="mt-4 h-1.5 w-full" />
    </div>
  );
}

export function StatCardSkeleton() {
  return (
    <div className="rounded-xl border border-border bg-surface p-5">
      <Skeleton className="h-3 w-20" />
      <Skeleton className="mt-3 h-7 w-14" />
    </div>
  );
}
