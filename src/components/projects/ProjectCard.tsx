import Link from "next/link";
import { ArrowRight, FolderKanban } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { Badge, difficultyTone } from "@/components/ui/Badge";
import { ProgressBar } from "@/components/ui/ProgressBar";
import type { Project } from "@/lib/types";

export function ProjectCard({ project }: { project: Project }) {
  return (
    <Card hover className="flex flex-col overflow-hidden">
      <div className="relative flex h-32 items-center justify-center overflow-hidden border-b border-border bg-gradient-to-br from-ink to-ink-2">
        <div className="pattern-dots absolute inset-0 text-white opacity-[0.16]" />
        <div className="absolute -right-8 -top-10 h-32 w-32 rounded-full border border-accent-2/30" />
        <FolderKanban className="relative h-7 w-7 text-accent-2" />
      </div>

      <div className="flex flex-1 flex-col p-5">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-semibold text-foreground">{project.title}</h3>
          <Badge tone={difficultyTone(project.difficulty)}>{project.difficulty}</Badge>
        </div>

        <p className="mt-1.5 text-[13px] leading-relaxed text-muted">{project.description}</p>

        <div className="mt-3 flex flex-wrap gap-1.5">
          {project.technologies.map((tech) => (
            <Badge key={tech} tone="neutral">
              {tech}
            </Badge>
          ))}
        </div>

        <div className="mt-4">
          <div className="flex items-center justify-between text-xs text-muted">
            <span>Progress</span>
            <span>{project.progress}%</span>
          </div>
          <ProgressBar value={project.progress} className="mt-2" size="sm" />
        </div>

        <Link href={`/projects/${project.id}`} className="mt-5 flex items-center gap-1 text-sm font-semibold text-accent transition-colors hover:text-accent-hover">
          Open Project
          <ArrowRight className="h-3.5 w-3.5" />
        </Link>
      </div>
    </Card>
  );
}
