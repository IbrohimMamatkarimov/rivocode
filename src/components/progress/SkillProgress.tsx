import { ProgressBar } from "@/components/ui/ProgressBar";
import type { SkillLevel } from "@/lib/types";

export function SkillProgress({ skills }: { skills: SkillLevel[] }) {
  return (
    <div className="space-y-4">
      {skills.map((skill) => (
        <div key={skill.name}>
          <div className="mb-1.5 flex items-center justify-between text-sm">
            <span className="font-medium text-foreground">{skill.name}</span>
            <span className="text-muted">{skill.progress}%</span>
          </div>
          <ProgressBar value={skill.progress} />
        </div>
      ))}
    </div>
  );
}
