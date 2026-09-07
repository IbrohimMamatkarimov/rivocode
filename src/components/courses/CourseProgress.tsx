"use client";

import { CheckCircle2 } from "lucide-react";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { RadialProgress } from "@/components/ui/RadialProgress";
import { useLanguage } from "@/components/theme/LanguageProvider";
import { useLearningProgress } from "@/components/progress/LearningProgressProvider";
import type { Course } from "@/lib/types";

export function CourseProgress({ course }: { course: Course }) {
  const { t } = useLanguage();
  const { getCourseProgress } = useLearningProgress();
  const { completedLessons, progress } = getCourseProgress(course);
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
          {completedLessons} / {course.totalLessons} {t("lessons_suffix")} {t("lessons_complete")}
        </div>
        <ProgressBar value={progress} gradient />
      </div>
    </div>
  );
}
