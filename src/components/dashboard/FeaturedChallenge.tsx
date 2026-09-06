import Link from "next/link";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { Badge, difficultyTone } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { challenges } from "@/lib/mock-data";
import { useLanguage, translateDifficulty } from "@/components/theme/LanguageProvider";

const starters: Record<string, string> = {
  "fizz-buzz": `function fizzBuzz(n) {
  for (let i = 1; i <= n; i++) {
    // Your solution here
  }
}`,
  "reverse-a-string": `function reverseString(str) {
  // Your solution here
}`,
  "binary-search": `def binary_search(items, target):
    # Your solution here
    pass`,
};

export function FeaturedChallenge() {
  const { t } = useLanguage();
  const challenge = challenges.find((c) => c.id === "fizz-buzz") ?? challenges[0];
  const starter = starters[challenge.id] ?? `// ${challenge.title}\n// Your solution here`;

  return (
    <section className="overflow-hidden rounded-2xl border border-border shadow-elevated">
      <div className="flex items-center justify-between border-b border-white/10 bg-ink px-5 py-3.5">
        <div className="flex items-center gap-2">
          <span className="h-2.5 w-2.5 rounded-full bg-[#f44336]/70" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#e7a917]/70" />
          <span className="h-2.5 w-2.5 rounded-full bg-accent-2/70" />
          <span className="ml-2 font-mono text-xs text-white/45">question-of-the-day.js</span>
        </div>
        <Badge tone={difficultyTone(challenge.difficulty)} className="border-white/15 bg-white/10 text-white">
          {translateDifficulty(t, challenge.difficulty)}
        </Badge>
      </div>

      <div className="bg-ink px-5 py-6 sm:px-7 sm:py-7">
        <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-accent-2">
          {t("featured_challenge_eyebrow")} · #{challenge.number}
        </p>
        <h3 className="mt-2 text-xl font-bold tracking-tight text-white">{challenge.title}</h3>
        <p className="mt-2 max-w-xl text-sm leading-relaxed text-white/60">{challenge.description}</p>

        <pre className="scrollbar-thin mt-5 overflow-x-auto rounded-lg border border-white/10 bg-white/[0.04] p-4 font-mono text-[13px] leading-relaxed text-white/80">
          <code>{starter}</code>
        </pre>

        <div className="mt-6 flex flex-wrap items-center gap-4">
          <Link href={`/practice/${challenge.id}`}>
            <Button>
              {t("btn_solve_it")}
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
          <span className="flex items-center gap-1.5 text-xs text-white/45">
            <CheckCircle2 className="h-3.5 w-3.5" />
            {t("featured_challenge_note")}
          </span>
        </div>
      </div>
    </section>
  );
}
