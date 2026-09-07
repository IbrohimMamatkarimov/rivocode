"use client";

import { CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { useLearningProgress } from "@/components/progress/LearningProgressProvider";

export function CompleteLessonButton({ lessonId }: { lessonId: string }) {
  const { completeLesson, isLessonComplete } = useLearningProgress();
  const completed = isLessonComplete(lessonId);

  return (
    <div className="flex items-center justify-between gap-4 rounded-2xl border border-border bg-surface p-5">
      <div>
        <h2 className="text-sm font-semibold text-foreground">Ready for the next lesson?</h2>
        <p className="mt-1 text-sm text-muted">Mark this lesson complete when you have finished the exercise.</p>
      </div>
      <Button disabled={completed} onClick={() => void completeLesson(lessonId)}>
        <CheckCircle2 className="h-4 w-4" />
        {completed ? "Completed" : "Mark complete"}
      </Button>
    </div>
  );
}
