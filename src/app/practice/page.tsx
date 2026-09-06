"use client";

import { Suspense, useMemo, useState } from "react";
import { Search, X, Zap } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { AppShell } from "@/components/layout/AppShell";
import { ChallengeCard } from "@/components/practice/ChallengeCard";
import { EmptyState } from "@/components/ui/EmptyState";
import { PageHero } from "@/components/ui/PageHero";
import { cn } from "@/lib/utils";
import { challenges } from "@/lib/mock-data";
import { useLanguage, translateDifficulty } from "@/components/theme/LanguageProvider";

const tracks = ["All", "JavaScript", "Python", "React", "HTML/CSS"] as const;
const difficulties = ["All", "Easy", "Medium", "Hard"] as const;

function PracticeWorkspace() {
  const { t } = useLanguage();
  const searchParams = useSearchParams();
  const [track, setTrack] = useState<(typeof tracks)[number]>("All");
  const [difficulty, setDifficulty] = useState<(typeof difficulties)[number]>("All");
  const [query, setQuery] = useState(searchParams.get("query") ?? "");

  const filtered = useMemo(() => {
    return challenges.filter((c) => {
      const matchesTrack = track === "All" || c.track === track;
      const matchesDifficulty = difficulty === "All" || c.difficulty === difficulty;
      const matchesQuery = !query.trim() || `${c.title} ${c.track} ${c.description}`.toLowerCase().includes(query.trim().toLowerCase());
      return matchesTrack && matchesDifficulty && matchesQuery;
    });
  }, [track, difficulty, query]);

  return (
    <AppShell>
      <PageHero
        eyebrow={t("practice_eyebrow")}
        icon={Zap}
        title={t("practice_title")}
        description={t("practice_description")}
        stats={[{ label: t("stat_challenges_label"), value: String(challenges.length) }, { label: t("stat_tracks_label"), value: String(tracks.length - 1) }]}
      >
        <div className="flex items-center gap-2 rounded-xl border border-white/15 bg-white/10 px-4 py-3 backdrop-blur sm:max-w-md">
          <Search className="h-4 w-4 text-white/60" />
          <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder={t("practice_search_placeholder")} aria-label="Search challenges" className="w-full bg-transparent text-sm text-white outline-none placeholder:text-white/50" />
          {query && <button type="button" onClick={() => setQuery("")} className="text-white/60 hover:text-white" aria-label="Clear challenge search"><X className="h-4 w-4" /></button>}
        </div>
      </PageHero>

      <div className="mb-3 flex flex-wrap gap-2">
        {tracks.map((trackOption) => (
          <button
            key={trackOption}
            onClick={() => setTrack(trackOption)}
            aria-pressed={track === trackOption}
            className={cn(
              "rounded-xl border px-3.5 py-2 text-[13px] font-semibold transition-colors",
              track === trackOption
                ? "border-accent bg-accent text-white shadow-sm"
                : "border-border bg-surface text-muted hover:border-accent-soft-strong hover:text-foreground"
            )}
          >
            {trackOption === "All" ? t("cat_all") : trackOption}
          </button>
        ))}
      </div>

      <div className="mb-7 flex flex-wrap items-center gap-2">
        {difficulties.map((d) => (
          <button
            key={d}
            onClick={() => setDifficulty(d)}
            aria-pressed={difficulty === d}
            className={cn(
              "rounded-lg border px-3 py-1.5 text-xs font-semibold transition-colors",
              difficulty === d
                ? "border-accent-soft-strong bg-accent-soft text-accent"
                : "border-border bg-surface text-muted-2 hover:text-muted"
            )}
          >
            {d === "All" ? t("cat_all") : translateDifficulty(t, d)}
          </button>
        ))}
        <span className="ml-auto text-xs font-semibold text-muted-2">{filtered.length} {t("available_suffix")}</span>
      </div>

      {filtered.length > 0 ? (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((challenge) => (
            <ChallengeCard key={challenge.id} challenge={challenge} />
          ))}
        </div>
      ) : (
        <EmptyState
          icon={Zap}
          title={t("empty_practice_title")}
          description={t("empty_practice_desc")}
          actionLabel={t("btn_reset_filters")}
          onAction={() => {
            setTrack("All");
            setDifficulty("All");
            setQuery("");
          }}
        />
      )}
    </AppShell>
  );
}

export default function PracticePage() {
  return (
    <Suspense fallback={<div className="h-72 animate-pulse rounded-3xl border border-border bg-surface" />}>
      <PracticeWorkspace />
    </Suspense>
  );
}
