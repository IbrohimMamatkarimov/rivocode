import {
  LayoutTemplate,
  Braces,
  Atom,
  Terminal,
  FileCode2,
  Server,
  GitBranch,
  BarChart3,
  Flame,
  Zap,
  Trophy,
  BookOpen,
  Cpu,
  Coffee,
  Database,
  Hash,
  type LucideIcon,
} from "lucide-react";

export const iconMap: Record<string, LucideIcon> = {
  "layout-template": LayoutTemplate,
  braces: Braces,
  atom: Atom,
  terminal: Terminal,
  "file-code-2": FileCode2,
  server: Server,
  "git-branch": GitBranch,
  "bar-chart-3": BarChart3,
  flame: Flame,
  zap: Zap,
  trophy: Trophy,
  "book-open": BookOpen,
  cpu: Cpu,
  coffee: Coffee,
  database: Database,
  hash: Hash,
};

export function getIcon(name: string): LucideIcon {
  return iconMap[name] ?? Braces;
}
