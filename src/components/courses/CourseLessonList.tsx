"use client";

import Link from "next/link";
import { CheckCircle2, Circle, Clock, PlayCircle } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { useLearningProgress } from "@/components/progress/LearningProgressProvider";
import type { Course } from "@/lib/types";

export function CourseLessonList({ course }: { course: Course }) {
  const { isLessonComplete } = useLearningProgress();

  return (
    <>
      <h2 className="mb-4 text-lg font-bold tracking-tight text-foreground">Course content</h2>
      <div className="space-y-3">
        {course.sections.map((section) => (
          <Card key={section.id} className="overflow-hidden">
            <div className="flex items-center gap-3 border-b border-border bg-surface-raised/60 px-5 py-3.5">
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-accent-soft text-[11px] font-bold text-accent">
                {String(section.index).padStart(2, "0")}
              </span>
              <h3 className="text-sm font-semibold text-foreground">{section.title}</h3>
              <span className="ml-auto text-xs text-muted-2">{section.lessons.length} lessons</span>
            </div>
            <ul className="divide-y divide-border">
              {section.lessons.map((lesson) => {
                const completed = isLessonComplete(lesson.id);
                return (
                  <li key={lesson.id}>
                    <Link href={`/lessons/${lesson.id}`} className="flex items-center gap-3 px-5 py-3 transition-colors hover:bg-surface-raised">
                      {completed ? <CheckCircle2 className="h-4 w-4 shrink-0 text-success" /> : <Circle className="h-4 w-4 shrink-0 text-accent" />}
                      <span className="flex-1 text-sm text-foreground">{lesson.title}</span>
                      {lesson.videoId && <PlayCircle className="h-3.5 w-3.5 shrink-0 text-accent" />}
                      <span className="flex items-center gap-1 text-xs text-muted-2"><Clock className="h-3 w-3" />{lesson.durationMinutes}m</span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </Card>
        ))}
      </div>
    </>
  );
}
