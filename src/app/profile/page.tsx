"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { Flame, Zap, Trophy, BookOpen, LogOut, LogIn, Globe, Mail, UserRound, type LucideIcon } from "lucide-react";
import { AppShell } from "@/components/layout/AppShell";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";
import { currentUser, profileStats, achievements } from "@/lib/mock-data";
import { ProfileCodeCard } from "@/components/profile/ProfileCodeCard";
import { useAuth } from "@/components/auth/AuthProvider";

const achievementIcons: Record<string, LucideIcon> = {
  flame: Flame,
  zap: Zap,
  trophy: Trophy,
  "book-open": BookOpen,
};

function firstNameFromEmail(email: string) {
  const local = email.split("@")[0] ?? email;
  const cleaned = local.replace(/[._-]+/g, " ").trim();
  if (!cleaned) return null;
  const first = cleaned.split(" ")[0];
  return first.charAt(0).toUpperCase() + first.slice(1);
}

export default function ProfilePage() {
  const router = useRouter();
  const { status, account, logout } = useAuth();
  const signedIn = status === "account";

  // Only ever show the mock "Ibrohim" identity once someone has actually
  // signed in — a logged-out visitor should see a generic guest state, not
  // someone else's name and stats.
  const displayName = signedIn
    ? account?.name ?? (account?.email ? firstNameFromEmail(account.email) : null) ?? currentUser.name
    : null;
  const displayHandle = signedIn ? account?.email?.split("@")[0] ?? currentUser.handle : null;
  const initials = signedIn
    ? (displayName ?? currentUser.name)
        .split(" ")
        .map((part) => part[0])
        .slice(0, 2)
        .join("")
        .toUpperCase()
    : null;

  const handleLogout = () => {
    void logout();
    router.push("/login");
  };

  return (
    <AppShell>
      <section className="hero-surface mb-7 overflow-hidden rounded-3xl border border-white/10 p-7 shadow-lg sm:p-8">
        <div className="relative flex flex-col items-center gap-5 text-center sm:flex-row sm:text-left">
          <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-2xl bg-white/10 text-2xl font-bold text-white ring-1 ring-white/15">
            {signedIn ? initials : <UserRound className="h-9 w-9 text-white/60" />}
          </div>
          <div>
            <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-accent-2">Developer profile</p>
            <h1 className="mt-1 text-[34px] font-bold tracking-[-0.05em] text-white">
              {signedIn ? displayName : "You're browsing as a guest"}
            </h1>
            <p className="mt-1 text-sm text-white/65">
              {signedIn
                ? `@${displayHandle} · Learning since ${currentUser.memberSince}`
                : "Sign in to save progress and see your profile."}
            </p>
          </div>
        </div>
      </section>

      <Card className="mb-6 p-5 sm:p-6">
        {signedIn ? (
          <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-accent-soft text-accent">
                {account?.provider === "google" ? <Globe className="h-5 w-5" /> : <Mail className="h-5 w-5" />}
              </div>
              <div>
                <p className="text-sm font-semibold text-foreground">
                  Signed in with {account?.provider === "google" ? "Google" : "RivoCode"}
                </p>
                <p className="mt-0.5 text-[13px] text-muted">{account?.email}</p>
              </div>
            </div>
            <Button variant="outline" onClick={handleLogout} className="shrink-0">
              <LogOut className="h-4 w-4" />
              Log out
            </Button>
          </div>
        ) : (
          <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-accent-soft text-accent">
                <UserRound className="h-5 w-5" />
              </div>
              <div>
                <p className="text-sm font-semibold text-foreground">Not signed in</p>
                <p className="mt-0.5 text-[13px] text-muted">Create a free account to track your progress.</p>
              </div>
            </div>
            <Link href={`/login?next=${encodeURIComponent("/profile")}`} className="shrink-0">
              <Button>
                <LogIn className="h-4 w-4" />
                Sign in
              </Button>
            </Link>
          </div>
        )}
      </Card>

      {signedIn && (
        <div className="mb-6">
          <ProfileCodeCard />
        </div>
      )}

      <div className="mb-6 grid grid-cols-2 gap-4 lg:grid-cols-4">
        <Card className="studio-panel p-5 text-center">
          <p className="text-2xl font-semibold tracking-tight text-foreground">{profileStats.courses}</p>
          <p className="mt-0.5 text-[13px] text-muted">Courses</p>
        </Card>
        <Card className="studio-panel p-5 text-center">
          <p className="text-2xl font-semibold tracking-tight text-foreground">{profileStats.projects}</p>
          <p className="mt-0.5 text-[13px] text-muted">Projects</p>
        </Card>
        <Card className="studio-panel p-5 text-center">
          <p className="text-2xl font-semibold tracking-tight text-foreground">{profileStats.problems}</p>
          <p className="mt-0.5 text-[13px] text-muted">Problems</p>
        </Card>
        <Card className="studio-panel p-5 text-center">
          <p className="text-2xl font-semibold tracking-tight text-foreground">{profileStats.hours}</p>
          <p className="mt-0.5 text-[13px] text-muted">Hours</p>
        </Card>
      </div>

      <Card className="p-5">
        <p className="mb-4 text-sm font-semibold text-foreground">Achievements</p>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {achievements.map((achievement) => {
            const Icon = achievementIcons[achievement.icon] ?? Trophy;
            return (
              <div
                key={achievement.id}
                className={cn(
                  "flex flex-col items-center gap-2 rounded-lg border p-4 text-center",
                  achievement.earned
                    ? "border-border bg-surface-raised"
                    : "border-dashed border-border opacity-50"
                )}
              >
                <div
                  className={cn(
                    "flex h-9 w-9 items-center justify-center rounded-md",
                    achievement.earned ? "bg-accent-soft text-accent" : "bg-surface text-muted-2"
                  )}
                >
                  <Icon className="h-4 w-4" />
                </div>
                <span className="text-xs font-medium text-foreground">{achievement.label}</span>
              </div>
            );
          })}
        </div>
      </Card>
    </AppShell>
  );
}
