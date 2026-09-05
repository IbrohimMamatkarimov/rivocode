import Link from "next/link";
import { notFound } from "next/navigation";
import { CheckCircle2, Circle, Clock, Star, Users, PlayCircle } from "lucide-react";
import { AppShell } from "@/components/layout/AppShell";
import { Card } from "@/components/ui/Card";
import { Badge, difficultyTone } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { CourseProgress } from "@/components/courses/CourseProgress";
import { getIcon } from "@/lib/icon-map";
import { getCourseBySlug, courses } from "@/lib/mock-data";

export function generateStaticParams() {
  return courses.map((course) => ({ id: course.slug }));
}

export default async function CoursePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const course = getCourseBySlug(id);
  if (!course) notFound();

  const Icon = getIcon(course.icon);
  const firstLesson = course.sections.flatMap((s) => s.lessons)[0];

  return (
    <AppShell>
      <div className="hero-surface relative mb-8 overflow-hidden rounded-2xl">
        <div className="hero-glow -right-20 -top-20 h-64 w-64 bg-accent/30" />
        <div className="relative grid grid-cols-1 gap-6 p-6 sm:p-8 lg:grid-cols-[1fr_360px] lg:items-center">
          <div>
            <div className="mb-3 flex flex-wrap items-center gap-2">
              <Badge tone={difficultyTone(course.difficulty)}>{course.difficulty}</Badge>
              <Badge tone="neutral" className="border-white/20 bg-white/10 text-white/80">
                {course.category}
              </Badge>
            </div>
            <div className="flex items-start gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-white/15 bg-white/10 text-accent-2 backdrop-blur">
                {/* eslint-disable-next-line react-hooks/static-components -- getIcon looks up a stable component reference from a fixed module-level map, not a new component per render */}
                <Icon className="h-5.5 w-5.5" />
              </div>
              <div>
                <h1 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">{course.title}</h1>
                <p className="mt-2 max-w-xl text-[15px] leading-relaxed text-white/70">{course.description}</p>
              </div>
            </div>

            <div className="mt-5 flex flex-wrap items-center gap-4 text-sm text-white/70">
              {course.rating && (
                <span className="flex items-center gap-1 font-semibold text-warning">
                  <Star className="h-4 w-4" fill="currentColor" />
                  {course.rating.toFixed(1)}
                </span>
              )}
              {course.students && (
                <span className="flex items-center gap-1.5">
                  <Users className="h-4 w-4" />
                  {course.students.toLocaleString()} students
                </span>
              )}
              <span className="flex items-center gap-1.5">
                <Clock className="h-4 w-4" />
                {course.totalLessons} lessons
              </span>
            </div>

            {firstLesson && (
              <Link href={`/lessons/${firstLesson.id}`} className="mt-6 inline-block">
                <Button size="lg">
                  {course.progress > 0 ? "Continue Learning" : "Start Learning"}
                </Button>
              </Link>
            )}
          </div>

          {course.videoId && (
            <Link
              href={`/lessons/${firstLesson?.id ?? ""}`}
              className="group relative block aspect-video overflow-hidden rounded-xl border border-white/10 shadow-lg"
            >
              <img
                src={`https://img.youtube.com/vi/${course.videoId}/hqdefault.jpg`}
                alt={`${course.title} preview`}
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-white/95 text-accent shadow-lg transition-transform group-hover:scale-110">
                  <PlayCircle className="h-8 w-8" />
                </div>
              </div>
              <span className="absolute left-3 top-3 inline-flex items-center gap-1 rounded-full bg-black/60 px-2.5 py-1 text-[11px] font-semibold text-white backdrop-blur">
                Watch intro video
              </span>
            </Link>
          )}
        </div>
      </div>

      <Card className="mb-8 p-5">
        <CourseProgress
          completedLessons={course.completedLessons}
          totalLessons={course.totalLessons}
          progress={course.progress}
        />
      </Card>

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
                const content = (
                  <div className="flex items-center gap-3 px-5 py-3 transition-colors hover:bg-surface-raised">
                    {lesson.status === "completed" && (
                      <CheckCircle2 className="h-4 w-4 shrink-0 text-success" />
                    )}
                    {lesson.status !== "completed" && <Circle className="h-4 w-4 shrink-0 text-accent" />}
                    <span className="flex-1 text-sm text-foreground">{lesson.title}</span>
                    {lesson.videoId && <PlayCircle className="h-3.5 w-3.5 shrink-0 text-accent" />}
                    <span className="flex items-center gap-1 text-xs text-muted-2">
                      <Clock className="h-3 w-3" />
                      {lesson.durationMinutes}m
                    </span>
                  </div>
                );

                return (
                  <li key={lesson.id}>
                    <Link href={`/lessons/${lesson.id}`}>{content}</Link>
                  </li>
                );
              })}
            </ul>
          </Card>
        ))}
      </div>
    </AppShell>
  );
}
