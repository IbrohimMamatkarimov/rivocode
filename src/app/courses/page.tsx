"use client";

import { useMemo, useState } from "react";
import { Search, Library } from "lucide-react";
import { AppShell } from "@/components/layout/AppShell";
import { PageHero } from "@/components/ui/PageHero";
import { CourseCard } from "@/components/courses/CourseCard";
import { EmptyState } from "@/components/ui/EmptyState";
import { cn } from "@/lib/utils";
import { categories, courses } from "@/lib/mock-data";
import { useLanguage, translateCategory } from "@/components/theme/LanguageProvider";

export default function CoursesPage() {
  const { t } = useLanguage();
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");

  const filtered = useMemo(() => {
    return courses.filter((course) => {
      const matchesCategory = category === "All" || course.category === category;
      const matchesQuery =
        query.trim().length === 0 ||
        course.title.toLowerCase().includes(query.trim().toLowerCase());
      return matchesCategory && matchesQuery;
    });
  }, [query, category]);

  return (
    <AppShell>
      <PageHero
          eyebrow={t("courses_eyebrow")}
        icon={Library}
        title={t("title_courses")}
        description={t("courses_description")}
        stats={[
          { label: t("nav_courses"), value: String(courses.length) },
          { label: t("stat_free_lessons"), value: `${courses.reduce((sum, c) => sum + c.totalLessons, 0)}+` },
        ]}
      >
        <div className="flex items-center gap-2 rounded-xl border border-white/15 bg-white/10 px-4 py-3 backdrop-blur sm:max-w-md">
          <Search className="h-4 w-4 text-white/60" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={t("courses_search_placeholder")}
            aria-label="Search courses"
            className="w-full bg-transparent text-sm text-white placeholder:text-white/50 focus:outline-none"
          />
        </div>
      </PageHero>

      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-wrap gap-2">
        {categories.map((c) => (
          <button
            key={c}
            onClick={() => setCategory(c)}
            aria-pressed={category === c}
            className={cn(
              "rounded-xl border px-3.5 py-2 text-[13px] font-semibold transition-colors",
              category === c
                ? "border-accent bg-accent text-white shadow-sm shadow-accent/25"
                : "border-border bg-surface text-muted hover:border-accent-soft-strong hover:text-foreground"
            )}
          >
            {translateCategory(t, c)}
          </button>
        ))}
        </div>
        <p className="text-xs font-semibold text-muted-2">{filtered.length} / {courses.length}</p>
      </div>

      {filtered.length > 0 ? (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((course) => (
            <CourseCard key={course.id} course={course} />
          ))}
        </div>
      ) : (
        <EmptyState
          icon={Search}
          title={t("empty_courses_title")}
          description={t("empty_courses_desc")}
          actionLabel={t("btn_clear_filters")}
          onAction={() => {
            setQuery("");
            setCategory("All");
          }}
        />
      )}
    </AppShell>
  );
}
