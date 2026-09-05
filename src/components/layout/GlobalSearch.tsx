"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import { ArrowRight, BookOpen, Command, FolderKanban, Search, X, Zap } from "lucide-react";
import { challenges, courses, projects } from "@/lib/mock-data";

type SearchResult = {
  title: string;
  description: string;
  href: string;
  kind: "Course" | "Challenge" | "Project" | "Page";
};

const pages: SearchResult[] = [
  { title: "Dashboard", description: "Your learning workspace", href: "/dashboard", kind: "Page" },
  { title: "Learning path", description: "Courses selected for you", href: "/learn", kind: "Page" },
  { title: "Course catalogue", description: "Browse all available courses", href: "/courses", kind: "Page" },
  { title: "Practice", description: "Coding challenges by track", href: "/practice", kind: "Page" },
  { title: "Projects", description: "Project briefs and starter ideas", href: "/projects", kind: "Page" },
  { title: "Progress", description: "Activity, skills, and achievements", href: "/progress", kind: "Page" },
];

const iconByKind = {
  Course: BookOpen,
  Challenge: Zap,
  Project: FolderKanban,
  Page: Command,
};

export function GlobalSearch() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const results = useMemo<SearchResult[]>(() => {
    const trimmed = query.trim().toLowerCase();
    if (!trimmed) return pages.slice(0, 5);

    const matches = (value: string) => value.toLowerCase().includes(trimmed);
    return [
      ...courses
        .filter((course) => matches(`${course.title} ${course.category} ${course.description}`))
        .map((course) => ({
          title: course.title,
          description: `${course.category} · ${course.totalLessons} lessons`,
          href: `/courses/${course.slug}`,
          kind: "Course" as const,
        })),
      ...challenges
        .filter((challenge) => matches(`${challenge.title} ${challenge.track} ${challenge.description}`))
        .map((challenge) => ({
          title: challenge.title,
          description: `${challenge.track} · ${challenge.difficulty} challenge`,
          href: `/practice?query=${encodeURIComponent(challenge.title)}`,
          kind: "Challenge" as const,
        })),
      ...projects
        .filter((project) => matches(`${project.title} ${project.technologies.join(" ")} ${project.description}`))
        .map((project) => ({
          title: project.title,
          description: `${project.difficulty} · ${project.technologies.join(", ")}`,
          href: `/projects?query=${encodeURIComponent(project.title)}`,
          kind: "Project" as const,
        })),
      ...pages.filter((page) => matches(`${page.title} ${page.description}`)),
    ].slice(0, 8);
  }, [query]);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        setOpen(true);
      }
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  useEffect(() => {
    if (open) window.requestAnimationFrame(() => inputRef.current?.focus());
  }, [open]);

  const close = () => {
    setOpen(false);
    setQuery("");
  };

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="hidden items-center gap-2 rounded-xl border border-border bg-surface-raised px-3 py-2 text-left text-muted-2 shadow-sm transition-colors hover:border-accent-soft-strong hover:text-foreground lg:flex"
        aria-label="Search RivoCode"
      >
        <Search className="h-4 w-4" />
        <span className="w-36 text-xs">Search courses, projects…</span>
        <kbd className="ml-2 rounded-md border border-border bg-surface px-1.5 py-0.5 text-[10px] text-muted-2">⌘K</kbd>
      </button>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="inline-flex h-9 w-9 items-center justify-center rounded-lg text-muted transition-colors hover:bg-surface-raised hover:text-foreground lg:hidden"
        aria-label="Search RivoCode"
      >
        <Search className="h-4 w-4" />
      </button>

      {open && (
        <div className="fixed inset-0 z-[70] flex items-start justify-center bg-ink/55 px-4 pt-[12vh] backdrop-blur-sm" role="dialog" aria-modal="true" aria-label="Search RivoCode">
          <button type="button" className="absolute inset-0 cursor-default" aria-label="Close search" onClick={close} />
          <div className="relative w-full max-w-2xl overflow-hidden rounded-2xl border border-white/15 bg-surface shadow-lg">
            <div className="flex items-center gap-3 border-b border-border px-4 py-3.5">
              <Search className="h-5 w-5 shrink-0 text-accent" />
              <input
                ref={inputRef}
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search your learning workspace…"
                className="min-w-0 flex-1 bg-transparent text-[15px] text-foreground outline-none placeholder:text-muted-2"
              />
              <button type="button" onClick={close} className="rounded-lg p-1.5 text-muted-2 transition-colors hover:bg-surface-raised hover:text-foreground" aria-label="Close search">
                <X className="h-4 w-4" />
              </button>
            </div>
            <div className="max-h-[55vh] overflow-y-auto p-2">
              <p className="px-3 pb-2 pt-1 text-[11px] font-bold uppercase tracking-[0.14em] text-muted-2">
                {query.trim() ? `${results.length} result${results.length === 1 ? "" : "s"}` : "Quick navigation"}
              </p>
              {results.length ? (
                results.map((result) => {
                  const Icon = iconByKind[result.kind];
                  return (
                    <Link key={`${result.kind}-${result.href}`} href={result.href} onClick={close} className="group flex items-center gap-3 rounded-xl px-3 py-3 transition-colors hover:bg-accent-soft">
                      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-surface-raised text-accent group-hover:bg-surface">
                        <Icon className="h-4 w-4" />
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="block truncate text-sm font-semibold text-foreground">{result.title}</span>
                        <span className="block truncate text-xs text-muted">{result.description}</span>
                      </span>
                      <span className="hidden text-[11px] font-semibold uppercase tracking-wide text-muted-2 sm:inline">{result.kind}</span>
                      <ArrowRight className="h-4 w-4 text-muted-2 transition-transform group-hover:translate-x-0.5 group-hover:text-accent" />
                    </Link>
                  );
                })
              ) : (
                <div className="px-3 py-10 text-center text-sm text-muted">No results match “{query}”. Try a course, skill, project, or challenge.</div>
              )}
            </div>
            <div className="flex items-center justify-between border-t border-border bg-surface-raised px-4 py-2.5 text-[11px] text-muted-2">
              <span>Search courses, challenges, projects, and pages</span>
              <span>Esc to close</span>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
