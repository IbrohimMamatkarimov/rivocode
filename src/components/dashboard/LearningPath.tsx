import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { RadialProgress } from "@/components/ui/RadialProgress";
import { Badge } from "@/components/ui/Badge";
import { LanguageLogo } from "@/lib/language-logos";
import { getCourseBySlug } from "@/lib/mock-data";
import type { LearningPathItem } from "@/lib/types";

export function LearningPath({ items }: { items: LearningPathItem[] }) {
  return (
    <section>
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-lg font-bold tracking-tight text-foreground">Your Learning Path</h2>
        <Link
          href="/learn"
          className="flex items-center gap-1 text-sm font-semibold text-accent transition-colors hover:text-accent-hover"
        >
          View all
          <ArrowRight className="h-3.5 w-3.5" />
        </Link>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {items.map((item) => {
          const course = getCourseBySlug(item.courseId);
          const href = course ? `/courses/${course.slug}` : "/courses";

          return (
            <Card key={item.id} hover className="motion-card flex flex-col p-5">
              <div className="flex items-start justify-between">
                <LanguageLogo courseId={item.courseId} className="h-10 w-10 shadow-sm" />
                {item.started && (
                  <RadialProgress
                    value={item.progress}
                    size={38}
                    strokeWidth={4}
                    label={<span className="text-[10px] font-bold">{item.progress}%</span>}
                  />
                )}
              </div>
              <h3 className="mt-4 text-sm font-semibold text-foreground">{item.title}</h3>
              <Badge className="mt-2 w-fit" tone="neutral">
                {item.levelLabel}
              </Badge>

              <div className="mt-4">
                {item.started ? (
                  <>
                    <div className="flex items-center justify-between text-xs text-muted">
                      <span>{item.progress}% complete</span>
                      <span>{item.totalLessons} lessons</span>
                    </div>
                    <ProgressBar value={item.progress} className="mt-2" size="sm" gradient />
                  </>
                ) : (
                  <p className="text-xs text-muted-2">Not started · {item.totalLessons} lessons</p>
                )}
              </div>

              <Link
                href={href}
                className="mt-4 flex items-center gap-1 text-sm font-semibold text-accent transition-colors hover:text-accent-hover"
              >
                {item.started ? "Continue" : "Start course"}
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </Card>
          );
        })}
      </div>
    </section>
  );
}
