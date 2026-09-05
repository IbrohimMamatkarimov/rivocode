import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, Check, FolderKanban, Lightbulb } from "lucide-react";
import { AppShell } from "@/components/layout/AppShell";
import { Badge, difficultyTone } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { projects } from "@/lib/mock-data";

const milestones = ["Define a compact scope", "Build the core interaction", "Refine responsive states", "Document what you learned"];

export function generateStaticParams() {
  return projects.map((project) => ({ id: project.id }));
}

export default async function ProjectPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const project = projects.find((item) => item.id === id);
  if (!project) notFound();

  return (
    <AppShell>
      <Link href="/projects" className="mb-5 inline-flex items-center gap-1.5 text-sm font-semibold text-muted transition-colors hover:text-accent"><ArrowLeft className="h-4 w-4" /> All project briefs</Link>
      <section className="hero-surface mb-7 overflow-hidden rounded-3xl border border-white/10 p-7 shadow-lg sm:p-9">
        <div className="relative max-w-3xl">
          <div className="mb-5 flex items-center gap-3"><span className="flex h-12 w-12 items-center justify-center rounded-xl border border-white/15 bg-white/10 text-accent-2"><FolderKanban className="h-5 w-5" /></span><Badge tone={difficultyTone(project.difficulty)}>{project.difficulty}</Badge></div>
          <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-accent-2">Project brief</p>
          <h1 className="mt-2 text-[34px] font-bold tracking-[-0.05em] text-white sm:text-[46px]">{project.title}</h1>
          <p className="mt-4 max-w-2xl text-[15px] leading-relaxed text-white/68">{project.description}</p>
          <div className="mt-6 flex flex-wrap gap-2">{project.technologies.map((technology) => <span key={technology} className="rounded-full border border-white/15 bg-white/10 px-3 py-1.5 text-xs font-semibold text-white/80">{technology}</span>)}</div>
        </div>
      </section>
      <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_20rem]">
        <Card className="p-6 sm:p-7">
          <div className="flex items-center gap-2"><Lightbulb className="h-4 w-4 text-coral" /><h2 className="text-lg font-bold tracking-tight text-foreground">The assignment</h2></div>
          <p className="mt-4 text-[15px] leading-relaxed text-muted">Use this brief as the boundary, then make the outcome your own. A strong project has a small, finished core before it grows into extra features.</p>
          <div className="mt-7 space-y-3">{milestones.map((milestone, index) => <div key={milestone} className="flex items-center gap-3 rounded-xl border border-border bg-surface-raised px-4 py-3"><span className="flex h-6 w-6 items-center justify-center rounded-full bg-accent-soft text-[11px] font-bold text-accent">{index + 1}</span><span className="text-sm font-medium text-foreground">{milestone}</span></div>)}</div>
        </Card>
        <Card className="h-fit p-6">
          <p className="text-[11px] font-bold uppercase tracking-[0.15em] text-muted-2">Ready to begin?</p>
          <p className="mt-2 text-lg font-bold tracking-tight text-foreground">Start with one focused task.</p>
          <p className="mt-2 text-sm leading-relaxed text-muted">Open a practice challenge first, then translate what you learn into this project.</p>
          <Link href="/practice" className="mt-5 block"><Button className="w-full">Open practice <ArrowRight className="h-4 w-4" /></Button></Link>
          <p className="mt-4 flex items-center gap-2 text-xs text-muted-2"><Check className="h-3.5 w-3.5 text-success" /> Your project plan is saved in this brief.</p>
        </Card>
      </div>
    </AppShell>
  );
}
