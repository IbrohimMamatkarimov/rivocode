"use client";

import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { FolderKanban, Search, X } from "lucide-react";
import { AppShell } from "@/components/layout/AppShell";
import { ProjectCard } from "@/components/projects/ProjectCard";
import { EmptyState } from "@/components/ui/EmptyState";
import { PageHero } from "@/components/ui/PageHero";
import { projects } from "@/lib/mock-data";

export default function ProjectsPage() {
  const searchParams = useSearchParams();
  const [query, setQuery] = useState(searchParams.get("query") ?? "");

  useEffect(() => {
    setQuery(searchParams.get("query") ?? "");
  }, [searchParams]);

  const filtered = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    if (!normalized) return projects;
    return projects.filter((project) => `${project.title} ${project.description} ${project.technologies.join(" ")}`.toLowerCase().includes(normalized));
  }, [query]);

  return (
    <AppShell>
      <PageHero
        eyebrow="The project bench"
        icon={FolderKanban}
        title="Turn lessons into proof."
        description="Well-scoped briefs that help you practice decisions, not just syntax. Choose one and build it in your own style."
        stats={[{ label: "Briefs", value: String(projects.length) }, { label: "Skill levels", value: "3" }]}
      >
        <div className="flex items-center gap-2 rounded-xl border border-white/15 bg-white/10 px-4 py-3 backdrop-blur sm:max-w-md">
          <Search className="h-4 w-4 text-white/60" />
          <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search project briefs..." aria-label="Search project briefs" className="w-full bg-transparent text-sm text-white outline-none placeholder:text-white/50" />
          {query && <button type="button" onClick={() => setQuery("")} className="text-white/60 hover:text-white" aria-label="Clear project search"><X className="h-4 w-4" /></button>}
        </div>
      </PageHero>

      {filtered.length ? (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {filtered.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
        </div>
      ) : <EmptyState icon={FolderKanban} title="No project briefs found" description="Try a different technology, level, or title." actionLabel="Clear search" onAction={() => setQuery("")} />}
    </AppShell>
  );
}
