import Link from "next/link";
import { ArrowRight, Star, Users, PlayCircle } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { LanguageLogo } from "@/lib/language-logos";
import { cn } from "@/lib/utils";
import type { Course } from "@/lib/types";
import { useLanguage, translateDifficulty } from "@/components/theme/LanguageProvider";

const categoryGradient: Record<string, string> = {
  "Web Development": "from-accent-3 via-accent to-accent-2",
  Programming: "from-blue to-violet",
  "Data Science": "from-violet to-accent-2",
  AI: "from-coral to-violet",
  Mobile: "from-warning to-coral",
};

function formatStudents(n?: number) {
  if (!n) return null;
  if (n >= 1000) return `${(n / 1000).toFixed(n % 1000 === 0 ? 0 : 1)}k`;
  return String(n);
}

export function CourseCard({ course }: { course: Course }) {
  const { t } = useLanguage();
  const started = course.progress > 0;
  const gradient = categoryGradient[course.category] ?? "from-accent-3 to-accent";

  return (
    <Card hover className="course-card-motion flex flex-col overflow-hidden p-0">
      <div className={cn("course-card-banner relative flex h-32 items-center gap-3 overflow-hidden bg-gradient-to-br px-5 py-4", gradient)}>
        <div className="pattern-dots absolute inset-0 text-white opacity-[0.16]" />
        <div className="course-orbit course-orbit-large absolute -right-10 -top-14 h-40 w-40 rounded-full border border-white/20" />
        <div className="course-orbit course-orbit-small absolute -right-3 -top-7 h-24 w-24 rounded-full border border-white/15" />
        {course.videoId && (
          <img
            src={`https://img.youtube.com/vi/${course.videoId}/hqdefault.jpg`}
            alt=""
            aria-hidden
          className="course-media-zoom absolute inset-0 h-full w-full object-cover opacity-20 mix-blend-luminosity"
          />
        )}
        <LanguageLogo
          courseId={course.id}
          className="course-logo-float relative h-11 w-11 shrink-0 rounded-xl shadow-md ring-2 ring-white/40"
        />
        <div className="relative ml-auto flex flex-col items-end gap-1.5">
          <span className="rounded-full border border-white/30 bg-white/15 px-2.5 py-0.5 text-xs font-semibold text-white backdrop-blur">
            {translateDifficulty(t, course.difficulty)}
          </span>
          {course.videoId && (
            <span className="flex items-center gap-1 rounded-full bg-black/30 px-2 py-0.5 text-[11px] font-medium text-white backdrop-blur">
              <PlayCircle className="h-3 w-3" />
              {t("video_lessons_badge")}
            </span>
          )}
        </div>
      </div>

      <div className="flex flex-1 flex-col p-5">
        <h3 className="text-[15px] font-semibold text-foreground">{course.title}</h3>
        <p className="mt-1.5 line-clamp-2 text-[13px] leading-relaxed text-muted">{course.description}</p>

        <div className="mt-3 flex items-center gap-3 text-xs text-muted-2">
          {course.rating && (
            <span className="flex items-center gap-1 font-medium text-warning">
              <Star className="h-3.5 w-3.5" fill="currentColor" />
              {course.rating.toFixed(1)}
            </span>
          )}
          {course.students && (
            <span className="flex items-center gap-1">
              <Users className="h-3.5 w-3.5" />
              {formatStudents(course.students)}
            </span>
          )}
          <span>{course.totalLessons} lessons</span>
        </div>

        {started && (
          <>
            <div className="mt-3 flex items-center justify-between text-xs text-muted">
              <span>{t("label_your_progress")}</span>
              <span className="font-semibold text-foreground">{course.progress}%</span>
            </div>
            <ProgressBar value={course.progress} className="mt-2" size="sm" gradient />
          </>
        )}

        <Link
          href={`/courses/${course.slug}`}
          className="mt-5 inline-flex items-center justify-center gap-1.5 rounded-xl bg-accent px-4 py-2.5 text-[13px] font-semibold text-white shadow-sm shadow-accent/20 transition-all hover:bg-accent-hover"
        >
          {started ? t("btn_continue_learning") : t("btn_start_learning")}
          <ArrowRight className="h-3.5 w-3.5" />
        </Link>
      </div>
    </Card>
  );
}
