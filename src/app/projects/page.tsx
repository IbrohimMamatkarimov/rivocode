"use client";

import { Suspense, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { FolderKanban, Search, X } from "lucide-react";
import { AppShell } from "@/components/layout/AppShell";
import { ProjectCard } from "@/components/projects/ProjectCard";
import { EmptyState } from "@/components/ui/EmptyState";
import { PageHero } from "@/components/ui/PageHero";
import { projects } from "@/lib/mock-data";
import { useLanguage } from "@/components/theme/LanguageProvider";

function ProjectsWorkspace() {
  const { t } = useLanguage();
  const searchParams = useSearchParams();
  const [query, setQuery] = useState(searchParams.get("query") ?? "");

  const filtered = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    if (!normalized) return projects;
    return projects.filter((project) => `${project.title} ${project.description} ${project.technologies.join(" ")}`.toLowerCase().includes(normalized));
  }, [query]);

  return (
    <AppShell>
      <PageHero
        eyebrow={t("projects_eyebrow")}
        icon={FolderKanban}
        title={t("projects_title")}
        description={t("projects_description")}
        stats={[{ label: t("stat_briefs_label"), value: String(projects.length) }, { label: t("stat_skill_levels_label"), value: "3" }]}
      >
        <div className="flex items-center gap-2 rounded-xl border border-white/15 bg-white/10 px-4 py-3 backdrop-blur sm:max-w-md">
          <Search className="h-4 w-4 text-white/60" />
          <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder={t("projects_search_placeholder")} aria-label={t("projects_search_placeholder")} className="w-full bg-transparent text-sm text-white outline-none placeholder:text-white/50" />
          {query && <button type="button" onClick={() => setQuery("")} className="text-white/60 hover:text-white" aria-label={t("btn_clear_search")}><X className="h-4 w-4" /></button>}
        </div>
      </PageHero>

      {filtered.length ? (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {filtered.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
        </div>
      ) : <EmptyState icon={FolderKanban} title={t("empty_projects_title")} description={t("empty_projects_desc")} actionLabel={t("btn_clear_search")} onAction={() => setQuery("")} />}
    </AppShell>
  );
}

export default function ProjectsPage() {
  return (
    <Suspense fallback={<div className="h-72 animate-pulse rounded-3xl border border-border bg-surface" />}>
      <ProjectsWorkspace />
    </Suspense>
  );
}
