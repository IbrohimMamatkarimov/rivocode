import { LanguageLogo } from "@/lib/language-logos";
import type { CSSProperties } from "react";

const BADGES = [
  { courseId: "nodejs-fundamentals", left: "20%", top: "14%", motion: "code-swarm-drift-a" },
  { courseId: "javascript-fundamentals", left: "57%", top: "12%", motion: "code-swarm-drift-b" },
  { courseId: "html-css", left: "14%", top: "44%", motion: "code-swarm-drift-c" },
  { courseId: "git-github", left: "42%", top: "43%", motion: "code-swarm-drift-d" },
  { courseId: "python-basics", left: "82%", top: "46%", motion: "code-swarm-drift-e" },
  { courseId: "typescript-in-depth", left: "24%", top: "76%", motion: "code-swarm-drift-b" },
  { courseId: "react-essentials", left: "54%", top: "81%", motion: "code-swarm-drift-a" },
  { courseId: "cpp-fundamentals", left: "69%", top: "63%", motion: "code-swarm-drift-d" },
  { courseId: "java-fundamentals", left: "82%", top: "82%", motion: "code-swarm-drift-c" },
];

export function DashboardHeroOrbit() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-y-0 right-0 hidden w-[50%] max-w-[460px] lg:block">
      <div className="hero-glow login-orb absolute right-16 top-1/2 h-72 w-72 -translate-y-1/2 bg-accent/[0.14]" />
      <div className="hero-glow login-orb-slow absolute right-52 top-10 h-44 w-44 bg-violet/[0.14]" />

      <div className="dashboard-logo-swarm">
        {BADGES.map((badge) => (
          <div
            key={badge.courseId}
            className="dashboard-logo-swarm-position"
            style={{ "--swarm-left": badge.left, "--swarm-top": badge.top } as CSSProperties}
          >
            <div className={`${badge.motion} dashboard-logo-swarm-badge flex h-10 w-10 items-center justify-center rounded-xl bg-white/[0.08] p-1.5 shadow-[0_12px_28px_rgba(0,0,0,0.32)] ring-1 ring-white/15 backdrop-blur-md`}>
              <LanguageLogo courseId={badge.courseId} className="h-full w-full rounded-lg" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
