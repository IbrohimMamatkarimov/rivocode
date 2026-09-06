import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { Badge, difficultyTone } from "@/components/ui/Badge";
import type { Challenge } from "@/lib/types";
import { useLanguage, translateDifficulty } from "@/components/theme/LanguageProvider";

export function ChallengeCard({ challenge }: { challenge: Challenge }) {
  const { t } = useLanguage();
  return (
    <Card hover className="studio-panel challenge-card-motion flex flex-col p-5">
      <div className="flex items-center justify-between">
        <span className="font-mono text-xs text-muted-2">#{challenge.number}</span>
        <Badge tone={difficultyTone(challenge.difficulty)}>{translateDifficulty(t, challenge.difficulty)}</Badge>
      </div>

      <h3 className="mt-3 text-sm font-semibold text-foreground">{challenge.title}</h3>
      <Badge tone="neutral" className="mt-2 w-fit">
        {challenge.track}
      </Badge>
      <p className="mt-3 line-clamp-2 text-[13px] leading-relaxed text-muted">{challenge.description}</p>

      <Link href={`/practice/${challenge.id}`} className="mt-5 flex items-center gap-1 text-sm font-semibold text-accent transition-colors hover:text-accent-hover">
        {t("btn_start_challenge")}
        <ArrowRight className="h-3.5 w-3.5" />
      </Link>
    </Card>
  );
}
