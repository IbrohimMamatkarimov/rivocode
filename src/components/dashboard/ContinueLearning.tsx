import Link from "next/link";
import { ArrowRight, Play, Sparkles } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { Button } from "@/components/ui/Button";
import { LanguageLogo } from "@/lib/language-logos";
import { getCourseBySlug } from "@/lib/mock-data";
import { useLanguage } from "@/components/theme/LanguageProvider";
import { useLearningProgress } from "@/components/progress/LearningProgressProvider";

export function ContinueLearning({
  courseId,
  lessonTitle,
  progress: fallbackProgress,
}: {
  courseId: string;
  lessonTitle: string;
  progress: number;
}) {
  const { t } = useLanguage();
  const { getCourseProgress, isLessonComplete } = useLearningProgress();
  const course = getCourseBySlug(courseId);
  const progress = course ? getCourseProgress(course).progress : fallbackProgress;
  const nextLesson = course?.sections
    .flatMap((s) => s.lessons)
    .find((lesson) => !isLessonComplete(lesson.id));

  return (
    <Card className="studio-panel overflow-hidden">
      <div className="grid grid-cols-1 md:grid-cols-[minmax(0,320px)_1fr]">
        <div className="relative aspect-video overflow-hidden bg-ink md:aspect-auto">
          {course?.videoId ? (
            <img
              src={`https://img.youtube.com/vi/${course.videoId}/hqdefault.jpg`}
              alt={course.title}
              className="lesson-video-drift absolute inset-0 h-full w-full object-cover opacity-80"
            />
          ) : (
            <div className="absolute inset-0 bg-gradient-to-br from-ink to-ink-2" />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="pulse-ring play-button-float flex h-14 w-14 items-center justify-center rounded-full bg-white/95 text-accent shadow-lg">
              <Play className="ml-0.5 h-6 w-6" fill="currentColor" />
            </div>
          </div>
          <span className="absolute left-3 top-3 inline-flex items-center gap-1 rounded-full bg-black/60 px-2.5 py-1 text-[11px] font-semibold text-white backdrop-blur">
            <Sparkles className="h-3 w-3 text-accent-2" />
            {t("continue_watching")}
          </span>
        </div>

        <div className="flex flex-col justify-center gap-4 p-6 sm:p-7">
          <div className="flex items-start gap-3">
            <LanguageLogo courseId={courseId} className="h-10 w-10 shrink-0 shadow-sm" />
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-muted-2">{t("continue_learning_label")}</p>
              <h2 className="mt-0.5 text-lg font-semibold text-foreground">{course?.title ?? t("your_course")}</h2>
              <p className="mt-0.5 text-sm text-muted">{lessonTitle}</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-full max-w-52">
              <ProgressBar value={progress} gradient />
            </div>
            <span className="shrink-0 text-xs font-semibold text-muted">{progress}%</span>
          </div>

          <Link href={nextLesson ? `/lessons/${nextLesson.id}` : `/courses/${courseId}`} className="w-fit">
            <Button>
              {t("btn_continue_learning")}
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>
    </Card>
  );
}
