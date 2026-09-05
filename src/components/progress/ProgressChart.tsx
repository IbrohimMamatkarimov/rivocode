import type { WeekActivity } from "@/lib/types";

export function ProgressChart({ data }: { data: WeekActivity[] }) {
  const max = Math.max(...data.map((d) => d.minutes), 1);

  return (
    <div className="flex h-40 items-end gap-3">
      {data.map((d) => (
        <div key={d.day} className="flex flex-1 flex-col items-center gap-2">
          <div className="flex h-32 w-full items-end rounded-md bg-surface-raised">
            <div
              className="w-full rounded-md bg-accent transition-[height] duration-500 ease-out"
              style={{ height: `${(d.minutes / max) * 100}%` }}
              title={`${d.minutes} min`}
            />
          </div>
          <span className="text-[11px] font-medium text-muted-2">{d.day}</span>
        </div>
      ))}
    </div>
  );
}
