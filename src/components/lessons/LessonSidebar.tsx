import Link from "next/link";
import { ChevronLeft, ChevronRight, CheckCircle2, Circle } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { Button } from "@/components/ui/Button";

interface LessonNavLesson {
  id: string;
  title: string;
  status: "completed" | "current" | "available";
}

interface LessonSidebarProps {
  progress: number;
  lessons: LessonNavLesson[];
  activeLessonId: string;
  prevHref?: string;
  nextHref?: string;
}

export function LessonSidebar({ progress, lessons, activeLessonId, prevHref, nextHref }: LessonSidebarProps) {
  return (
    <div className="space-y-4 lg:sticky lg:top-24">
      <Card className="overflow-hidden p-0">
        <div className="border-b border-border bg-surface-raised px-5 py-4"><p className="text-[11px] font-bold uppercase tracking-[0.14em] text-muted-2">Lesson progress</p></div>
        <div className="p-5">
        <div className="mt-3 flex items-center gap-3">
          <ProgressBar value={progress} />
          <span className="shrink-0 text-xs font-medium text-muted">{progress}%</span>
        </div>

        <ul className="scrollbar-thin mt-5 max-h-64 space-y-1 overflow-y-auto">
          {lessons.map((lesson) => (
            <li key={lesson.id}>
              <Link
                href={`/lessons/${lesson.id}`}
                className={`flex items-center gap-2 rounded-md px-2 py-1.5 text-[13px] transition-colors ${
                  lesson.id === activeLessonId
                    ? "bg-accent-soft font-semibold text-accent"
                    : "text-muted hover:bg-surface-raised hover:text-foreground"
                }`}
              >
                {lesson.status === "completed" && <CheckCircle2 className="h-3.5 w-3.5 shrink-0 text-success" />}
                {lesson.status !== "completed" && <Circle className="h-3.5 w-3.5 shrink-0 text-accent" />}
                <span className="truncate">{lesson.title}</span>
              </Link>
            </li>
          ))}
        </ul>
        </div>
      </Card>

      <div className="flex gap-2">
        <Link href={prevHref ?? "#"} className="flex-1">
          <Button variant="secondary" size="sm" className="w-full" disabled={!prevHref}>
            <ChevronLeft className="h-3.5 w-3.5" />
            Previous
          </Button>
        </Link>
        <Link href={nextHref ?? "#"} className="flex-1">
          <Button variant="secondary" size="sm" className="w-full" disabled={!nextHref}>
            Next
            <ChevronRight className="h-3.5 w-3.5" />
          </Button>
        </Link>
      </div>
    </div>
  );
}
