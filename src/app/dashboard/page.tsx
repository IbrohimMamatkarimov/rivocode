"use client";

import { CheckCircle2, Clock, Flame, FolderKanban } from "lucide-react";
import { AppShell } from "@/components/layout/AppShell";
import { StatCard } from "@/components/dashboard/StatCard";
import { ContinueLearning } from "@/components/dashboard/ContinueLearning";
import { LearningPath } from "@/components/dashboard/LearningPath";
import { LanguagePicker } from "@/components/dashboard/LanguagePicker";
import { DashboardHero } from "@/components/dashboard/DashboardHero";
import { FeaturedChallenge } from "@/components/dashboard/FeaturedChallenge";
import { continueLearning, getCourseBySlug, learningPath } from "@/lib/mock-data";
import { useLanguage } from "@/components/theme/LanguageProvider";
import { useLearningProgress } from "@/components/progress/LearningProgressProvider";

export default function DashboardPage() {
  const { t } = useLanguage();
  const { getCourseProgress, stats } = useLearningProgress();
  const progressItems = learningPath.map((item) => {
    const course = getCourseBySlug(item.courseId);
    const courseProgress = course ? getCourseProgress(course) : { completedLessons: 0, progress: 0 };
    return { ...item, started: courseProgress.completedLessons > 0, progress: courseProgress.progress };
  });
  return (
    <AppShell>
      <div className="dashboard-hero-enter"><DashboardHero /></div>

      <section className="dashboard-section dashboard-delay-1 mb-7 rounded-3xl border border-border bg-surface p-5 shadow-elevated sm:p-6">
        <LanguagePicker />
      </section>

      <div className="dashboard-section dashboard-delay-2 motion-stagger mb-6 grid grid-cols-2 gap-4 lg:grid-cols-4">
        <StatCard icon={Flame} value={String(stats.streakDays)} label={t("stat_streak")} tone="warning" />
        <StatCard icon={Clock} value={String(stats.hoursLearned)} label={t("stat_hours")} tone="accent" />
        <StatCard icon={CheckCircle2} value={String(stats.completedLessons)} label={t("stat_lessons")} tone="blue" />
        <StatCard icon={FolderKanban} value={String(stats.projectsCompleted)} label={t("stat_projects")} tone="violet" />
      </div>

      <div className="dashboard-section dashboard-delay-3 mb-8">
        <ContinueLearning
          courseId={continueLearning.courseId}
          lessonTitle={continueLearning.lessonTitle}
          progress={continueLearning.progress}
        />
      </div>

      <div className="dashboard-section dashboard-delay-4 mb-8">
        <FeaturedChallenge />
      </div>

      <div className="dashboard-section dashboard-delay-5"><LearningPath items={progressItems} /></div>
    </AppShell>
  );
}
