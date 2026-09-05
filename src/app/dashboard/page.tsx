import { CheckCircle2, Clock, Flame, FolderKanban } from "lucide-react";
import { AppShell } from "@/components/layout/AppShell";
import { StatCard } from "@/components/dashboard/StatCard";
import { ContinueLearning } from "@/components/dashboard/ContinueLearning";
import { LearningPath } from "@/components/dashboard/LearningPath";
import { LanguagePicker } from "@/components/dashboard/LanguagePicker";
import { DashboardHero } from "@/components/dashboard/DashboardHero";
import { FeaturedChallenge } from "@/components/dashboard/FeaturedChallenge";
import { dashboardStats, continueLearning, learningPath } from "@/lib/mock-data";

export default function DashboardPage() {
  return (
    <AppShell>
      <div className="dashboard-hero-enter"><DashboardHero /></div>

      <section className="dashboard-section dashboard-delay-1 mb-7 rounded-3xl border border-border bg-surface p-5 shadow-elevated sm:p-6">
        <LanguagePicker />
      </section>

      <div className="dashboard-section dashboard-delay-2 motion-stagger mb-6 grid grid-cols-2 gap-4 lg:grid-cols-4">
        <StatCard icon={Flame} value={String(dashboardStats.streakDays)} label="Day streak" tone="warning" trend="+2 this week" />
        <StatCard icon={Clock} value={String(dashboardStats.hoursLearned)} label="Hours learned" tone="accent" />
        <StatCard icon={CheckCircle2} value={String(dashboardStats.problemsSolved)} label="Problems solved" tone="blue" trend="+9 this week" />
        <StatCard icon={FolderKanban} value={String(dashboardStats.projectsCompleted)} label="Projects" tone="violet" />
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

      <div className="dashboard-section dashboard-delay-5"><LearningPath items={learningPath} /></div>
    </AppShell>
  );
}
