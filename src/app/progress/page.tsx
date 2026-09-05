"use client";

import { Flame, Zap, Trophy, BookOpen, type LucideIcon } from "lucide-react";
import { AppShell } from "@/components/layout/AppShell";
import { Card } from "@/components/ui/Card";
import { ProgressChart } from "@/components/progress/ProgressChart";
import { SkillProgress } from "@/components/progress/SkillProgress";
import { PageHero } from "@/components/ui/PageHero";
import { cn } from "@/lib/utils";
import { dashboardStats, weeklyActivity, skillLevels, achievements } from "@/lib/mock-data";
import { useLanguage } from "@/components/theme/LanguageProvider";

const achievementIcons: Record<string, LucideIcon> = {
  flame: Flame,
  zap: Zap,
  trophy: Trophy,
  "book-open": BookOpen,
};

export default function ProgressPage() {
  const { t } = useLanguage();
  return (
    <AppShell>
      <PageHero eyebrow={t("progress_eyebrow")} icon={Trophy} title={t("progress_title")} description={t("progress_description")} stats={[{ label: t("stat_streak"), value: `${dashboardStats.streakDays}d` }, { label: t("stat_hours"), value: String(dashboardStats.hoursLearned) }]} />

      <div className="mb-6 grid grid-cols-1 gap-4 lg:grid-cols-3">
        <Card className="studio-panel p-5 sm:p-6">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-warning-soft text-warning">
            <Flame className="h-4 w-4" />
          </div>
          <p className="mt-4 text-2xl font-semibold tracking-tight text-foreground">
            {dashboardStats.streakDays} {t("stat_streak").toLowerCase()}
          </p>
          <p className="mt-0.5 text-[13px] text-muted">{t("current_streak_label")}</p>
        </Card>

        <Card className="p-5 sm:p-6 lg:col-span-2">
          <p className="mb-4 text-sm font-semibold text-foreground">{t("weekly_activity_label")}</p>
          <ProgressChart data={weeklyActivity} />
        </Card>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <Card className="p-5 sm:p-6">
          <p className="mb-4 text-sm font-semibold text-foreground">{t("skills_label")}</p>
          <SkillProgress skills={skillLevels} />
        </Card>

        <Card className="p-5 sm:p-6">
          <p className="mb-4 text-sm font-semibold text-foreground">{t("achievements_label")}</p>
          <div className="grid grid-cols-2 gap-3">
            {achievements.map((achievement) => {
              const Icon = achievementIcons[achievement.icon] ?? Trophy;
              return (
                <div
                  key={achievement.id}
                  className={cn(
                    "flex items-center gap-2.5 rounded-lg border p-3",
                    achievement.earned
                      ? "border-border bg-surface-raised"
                      : "border-dashed border-border opacity-50"
                  )}
                >
                  <div
                    className={cn(
                      "flex h-8 w-8 shrink-0 items-center justify-center rounded-md",
                      achievement.earned ? "bg-accent-soft text-accent" : "bg-surface text-muted-2"
                    )}
                  >
                    <Icon className="h-4 w-4" />
                  </div>
                  <span className="text-[13px] font-medium text-foreground">{achievement.label}</span>
                </div>
              );
            })}
          </div>
        </Card>
      </div>
    </AppShell>
  );
}
