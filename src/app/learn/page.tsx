"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { AppShell } from "@/components/layout/AppShell";
import { LearningPath } from "@/components/dashboard/LearningPath";
import { CourseCard } from "@/components/courses/CourseCard";
import { PageHero } from "@/components/ui/PageHero";
import { learningPath, courses } from "@/lib/mock-data";
import { useLanguage } from "@/components/theme/LanguageProvider";

export default function LearnPage() {
  const { t } = useLanguage();
  const pathCourseIds = new Set(learningPath.map((item) => item.courseId));
  const recommended = courses.filter((course) => !pathCourseIds.has(course.id)).slice(0, 3);

  return (
    <AppShell>
      <PageHero
        eyebrow={t("learn_eyebrow")}
        title={t("learn_title")}
        description={t("learn_description")}
        stats={[
          { label: t("stat_paths"), value: String(learningPath.length) },
          { label: t("nav_courses"), value: String(courses.length) },
        ]}
      />

      <div className="mb-10">
        <LearningPath items={learningPath} />
      </div>

      <section>
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-base font-semibold text-foreground">{t("recommended_for_you")}</h2>
          <Link href="/courses" className="flex items-center gap-1 text-sm font-medium text-accent hover:text-accent-hover">
            {t("explore_all")}
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {recommended.map((course) => (
            <CourseCard key={course.id} course={course} />
          ))}
        </div>
      </section>
    </AppShell>
  );
}
