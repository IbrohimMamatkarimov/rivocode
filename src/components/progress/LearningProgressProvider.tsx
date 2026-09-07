"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { useAuth } from "@/components/auth/AuthProvider";
import { courses } from "@/lib/mock-data";
import { createClient } from "@/lib/supabase/client";
import type { Achievement, Course, SkillLevel, WeekActivity } from "@/lib/types";

type CompletedLessons = Record<string, string>;

export interface LearningStats {
  streakDays: number;
  hoursLearned: number;
  problemsSolved: number;
  projectsCompleted: number;
  completedLessons: number;
}

interface LearningProgressContextValue {
  hydrated: boolean;
  isLessonComplete: (lessonId: string) => boolean;
  completeLesson: (lessonId: string) => Promise<void>;
  getCourseProgress: (course: Course) => { completedLessons: number; progress: number };
  stats: LearningStats;
  weeklyActivity: WeekActivity[];
  skillLevels: SkillLevel[];
  achievements: Achievement[];
}

const STORAGE_KEY = "rivocode-learning-progress-v1";
const LearningProgressContext = createContext<LearningProgressContextValue | undefined>(undefined);

function readStoredProgress(): CompletedLessons {
  try {
    const value = window.localStorage.getItem(STORAGE_KEY);
    const parsed = value ? JSON.parse(value) : {};
    return parsed && typeof parsed === "object" ? parsed as CompletedLessons : {};
  } catch {
    return {};
  }
}

function persistProgress(progress: CompletedLessons) {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
  } catch {
    // A browser with storage disabled can still use progress for this session.
  }
}

function localDay(date: Date) {
  return [date.getFullYear(), String(date.getMonth() + 1).padStart(2, "0"), String(date.getDate()).padStart(2, "0")].join("-");
}

function getStreak(progress: CompletedLessons) {
  const days = new Set(Object.values(progress).map((value) => localDay(new Date(value))));
  let streak = 0;
  const cursor = new Date();
  while (days.has(localDay(cursor))) {
    streak += 1;
    cursor.setDate(cursor.getDate() - 1);
  }
  return streak;
}

function getLessonLookup() {
  return new Map(
    courses.flatMap((course) => course.sections.flatMap((section) => section.lessons.map((lesson) => [lesson.id, { course, lesson }] as const)))
  );
}

const lessonLookup = getLessonLookup();

function getWeekActivity(progress: CompletedLessons): WeekActivity[] {
  const today = new Date();
  const monday = new Date(today);
  monday.setDate(today.getDate() - ((today.getDay() + 6) % 7));
  monday.setHours(0, 0, 0, 0);

  return Array.from({ length: 7 }, (_, index) => {
    const day = new Date(monday);
    day.setDate(monday.getDate() + index);
    const dayKey = localDay(day);
    const minutes = Object.entries(progress).reduce((sum, [lessonId, completedAt]) => {
      const entry = lessonLookup.get(lessonId);
      return localDay(new Date(completedAt)) === dayKey ? sum + (entry?.lesson.durationMinutes ?? 0) : sum;
    }, 0);
    return { day: day.toLocaleDateString(undefined, { weekday: "short" }), minutes };
  });
}

export function LearningProgressProvider({ children }: { children: React.ReactNode }) {
  const { account, configured, status } = useAuth();
  const [completedAt, setCompletedAt] = useState<CompletedLessons>(() =>
    typeof window === "undefined" ? {} : readStoredProgress()
  );
  const [hydrated] = useState(() => typeof window !== "undefined");

  useEffect(() => {
    if (!configured || status !== "account" || !account) return;
    let active = true;
    const supabase = createClient();

    void supabase
      .from("lesson_progress")
      .select("lesson_id, completed_at, last_opened_at")
      .eq("user_id", account.id)
      .eq("completed", true)
      .then(({ data }) => {
        if (!active || !data) return;
        const cloudProgress = Object.fromEntries(
          data.map((item) => [item.lesson_id, item.completed_at ?? item.last_opened_at])
        );
        setCompletedAt(cloudProgress);
        persistProgress(cloudProgress);
      });

    return () => {
      active = false;
    };
  }, [account, configured, status]);

  const completeLesson = useCallback(async (lessonId: string) => {
    const completedOn = new Date().toISOString();
    setCompletedAt((current) => {
      if (current[lessonId]) return current;
      const next = { ...current, [lessonId]: completedOn };
      persistProgress(next);
      return next;
    });

    if (!configured || status !== "account" || !account) return;
    const supabase = createClient();
    await supabase.from("lesson_progress").upsert(
      {
        user_id: account.id,
        lesson_id: lessonId,
        completed: true,
        completed_at: completedOn,
        last_opened_at: completedOn,
      },
      { onConflict: "user_id,lesson_id" }
    );
  }, [account, configured, status]);

  const value = useMemo<LearningProgressContextValue>(() => {
    const completedLessonIds = new Set(Object.keys(completedAt));
    const totalMinutes = Object.keys(completedAt).reduce(
      (sum, lessonId) => sum + (lessonLookup.get(lessonId)?.lesson.durationMinutes ?? 0),
      0
    );
    const completedLessons = completedLessonIds.size;
    const stats = {
      streakDays: getStreak(completedAt),
      hoursLearned: Math.round(totalMinutes / 60),
      problemsSolved: 0,
      projectsCompleted: 0,
      completedLessons,
    };
    const getCourseProgress = (course: Course) => {
      const courseLessons = course.sections.flatMap((section) => section.lessons);
      const count = courseLessons.filter((lesson) => completedLessonIds.has(lesson.id)).length;
      return { completedLessons: count, progress: Math.round((count / Math.max(courseLessons.length, 1)) * 100) };
    };
    const skillLevels = courses
      .filter((course) => !["data-science-intro", "nodejs-fundamentals", "git-github"].includes(course.id))
      .map((course) => ({ name: course.title.replace(/ (Fundamentals|Essentials|Basics|in Depth)$/i, ""), progress: getCourseProgress(course).progress }));
    const achievements: Achievement[] = [
      { id: "first-lesson", label: "First Lesson", icon: "book-open", earned: completedLessons >= 1 },
      { id: "ten-lessons", label: "10 Lessons Completed", icon: "book-open", earned: completedLessons >= 10 },
      { id: "streak-7", label: "7 Day Streak", icon: "flame", earned: stats.streakDays >= 7 },
      { id: "week-streak", label: "30 Day Streak", icon: "flame", earned: stats.streakDays >= 30 },
    ];

    return {
      hydrated,
      isLessonComplete: (lessonId) => completedLessonIds.has(lessonId),
      completeLesson,
      getCourseProgress,
      stats,
      weeklyActivity: getWeekActivity(completedAt),
      skillLevels,
      achievements,
    };
  }, [completedAt, completeLesson, hydrated]);

  return <LearningProgressContext.Provider value={value}>{children}</LearningProgressContext.Provider>;
}

export function useLearningProgress() {
  const context = useContext(LearningProgressContext);
  if (!context) throw new Error("useLearningProgress must be used inside LearningProgressProvider");
  return context;
}
