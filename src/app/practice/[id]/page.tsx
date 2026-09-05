import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Code2, Lightbulb, Target } from "lucide-react";
import { AppShell } from "@/components/layout/AppShell";
import { Badge, difficultyTone } from "@/components/ui/Badge";
import { CodeEditor } from "@/components/lessons/CodeEditor";
import { challenges } from "@/lib/mock-data";

function starter(track: string, title: string) {
  if (track === "JavaScript") return `// ${title}\nfunction solve(input) {\n  // Write your solution here\n}\n\nconsole.log(solve("example"));`;
  if (track === "Python") return `# ${title}\ndef solve(input):\n    # Write your solution here\n    pass\n\nprint(solve("example"))`;
  if (track === "React") return `export function Solution() {\n  // Build your solution here\n  return <div />;\n}`;
  return `<!-- ${title} -->\n<main class="challenge">\n  <!-- Build your solution here -->\n</main>`;
}

function starterFileName(track: string) {
  if (track === "JavaScript") return "solution.js";
  if (track === "Python") return "solution.py";
  if (track === "React") return "solution.jsx";
  return "solution.html";
}

export function generateStaticParams() {
  return challenges.map((challenge) => ({ id: challenge.id }));
}

export default async function ChallengePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const challenge = challenges.find((item) => item.id === id);
  if (!challenge) notFound();
  const language =
    challenge.track === "JavaScript"
      ? "javascript"
      : challenge.track === "Python"
        ? "python"
        : challenge.track === "React"
          ? "jsx"
          : "html";
  const runnable = challenge.track === "JavaScript";

  return (
    <AppShell>
      <Link href="/practice" className="mb-5 inline-flex items-center gap-1.5 text-sm font-semibold text-muted transition-colors hover:text-accent"><ArrowLeft className="h-4 w-4" /> All challenges</Link>
      <div className="grid gap-7 xl:grid-cols-[minmax(0,1fr)_21rem]">
        <main>
          <section className="hero-surface mb-6 overflow-hidden rounded-3xl border border-white/10 p-7 shadow-lg sm:p-8">
            <div className="relative"><div className="flex items-center gap-3"><span className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/15 bg-white/10 text-accent-2"><Code2 className="h-5 w-5" /></span><Badge tone={difficultyTone(challenge.difficulty)}>{challenge.difficulty}</Badge></div><p className="mt-6 text-[11px] font-bold uppercase tracking-[0.15em] text-accent-2">{challenge.track} challenge · #{challenge.number}</p><h1 className="mt-2 text-[32px] font-bold tracking-[-0.05em] text-white sm:text-[42px]">{challenge.title}</h1><p className="mt-3 max-w-2xl text-[15px] leading-relaxed text-white/68">{challenge.description}</p></div>
          </section>
          <CodeEditor
            files={[{ name: starterFileName(challenge.track), content: starter(challenge.track, challenge.title) }]}
            language={language}
            exercisePrompt={challenge.description}
            storageKey={`rivocode-challenge-${challenge.id}`}
            height="h-72"
          />
        </main>
        <aside className="space-y-4">
          <div className="rounded-2xl border border-border bg-surface p-5 shadow-elevated"><div className="flex items-center gap-2"><Target className="h-4 w-4 text-accent" /><p className="text-sm font-bold text-foreground">What success looks like</p></div><ul className="mt-4 space-y-3 text-sm leading-relaxed text-muted"><li>• Start with the simplest valid solution.</li><li>• Name variables for intent, not brevity.</li><li>• Test an ordinary case before edge cases.</li></ul></div>
          <div className="rounded-2xl border border-border bg-surface-raised p-5"><div className="flex items-center gap-2"><Lightbulb className="h-4 w-4 text-coral" /><p className="text-sm font-bold text-foreground">Runner note</p></div><p className="mt-3 text-sm leading-relaxed text-muted">{runnable ? "This JavaScript workspace runs in an isolated browser worker. Use console.log to inspect your output." : "Use this workspace to draft your solution. Browser execution is available for JavaScript challenges."}</p></div>
        </aside>
      </div>
    </AppShell>
  );
}
