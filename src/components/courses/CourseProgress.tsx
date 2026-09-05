import { CheckCircle2 } from "lucide-react";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { RadialProgress } from "@/components/ui/RadialProgress";

export function CourseProgress({
  completedLessons,
  totalLessons,
  progress,
}: {
  completedLessons: number;
  totalLessons: number;
  progress: number;
}) {
  return (
    <div className="flex items-center gap-5">
      <RadialProgress
        value={progress}
        size={56}
        strokeWidth={5}
        label={<span className="text-sm font-bold">{progress}%</span>}
      />
      <div className="flex-1">
        <div className="mb-2 flex items-center gap-1.5 text-sm font-medium text-foreground">
          <CheckCircle2 className="h-4 w-4 text-success" />
          {completedLessons} / {totalLessons} lessons completed
        </div>
        <ProgressBar value={progress} gradient />
      </div>
    </div>
  );
}
