"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { CheckCircle2, LogOut, LogIn } from "lucide-react";
import { AppShell } from "@/components/layout/AppShell";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { ThemeToggle } from "@/components/theme/ThemeToggle";
import { useTheme } from "@/components/theme/ThemeProvider";
import { useAuth } from "@/components/auth/AuthProvider";
import { createClient } from "@/lib/supabase/client";
import { cn } from "@/lib/utils";
import { accountDisplayName, accountHandle } from "@/components/auth/AuthProvider";

function Toggle({ checked, onChange, label }: { checked: boolean; onChange: () => void; label: string }) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      aria-label={label}
      onClick={onChange}
      className={cn(
        "relative h-6 w-10 shrink-0 rounded-full transition-colors",
        checked ? "bg-accent" : "bg-surface-raised border border-border"
      )}
    >
      <span
        className={cn(
          "absolute top-0.5 h-5 w-5 rounded-full bg-white shadow-sm transition-transform",
          checked ? "left-[18px]" : "left-0.5"
        )}
      />
    </button>
  );
}

function SettingsRow({ title, description, control }: { title: string; description: string; control: React.ReactNode }) {
  return (
    <div className="flex items-center justify-between gap-4 py-3.5">
      <div>
        <p className="text-sm font-medium text-foreground">{title}</p>
        <p className="mt-0.5 text-[13px] text-muted">{description}</p>
      </div>
      {control}
    </div>
  );
}

export default function SettingsPage() {
  const { theme } = useTheme();
  const router = useRouter();
  const { logout, account, status, configured } = useAuth();
  const signedIn = status === "account";
  const [notifications, setNotifications] = useState({
    reminders: true,
    weeklySummary: true,
    productUpdates: false,
  });
  const [preferences, setPreferences] = useState({
    dailyGoalReminders: true,
    autoRunCode: false,
  });
  const [saveState, setSaveState] = useState<"idle" | "saved" | "error">("idle");
  const [saving, setSaving] = useState(false);
  const [editingName, setEditingName] = useState(false);
  const [nameDraft, setNameDraft] = useState("");
  const [nameState, setNameState] = useState<"idle" | "saving" | "error">("idle");

  useEffect(() => {
    if (!signedIn || !configured) return;
    const loadSettings = async () => {
      const supabase = createClient();
      const { data: userData } = await supabase.auth.getUser();
      if (!userData.user) return;
      const { data } = await supabase
        .from("user_settings")
        .select("daily_reminders, weekly_summary, product_updates, daily_goal_reminders, auto_run_code")
        .eq("user_id", userData.user.id)
        .maybeSingle();
      if (!data) return;
      setNotifications({ reminders: data.daily_reminders, weeklySummary: data.weekly_summary, productUpdates: data.product_updates });
      setPreferences({ dailyGoalReminders: data.daily_goal_reminders, autoRunCode: data.auto_run_code });
    };
    void loadSettings();
  }, [configured, signedIn]);

  const saveSettings = async () => {
    if (!signedIn || !configured) {
      setSaveState("error");
      return;
    }
    setSaving(true);
    const supabase = createClient();
    const { data: userData } = await supabase.auth.getUser();
    const user = userData.user;
    if (!user) {
      setSaving(false);
      setSaveState("error");
      return;
    }
    const { error } = await supabase.from("user_settings").upsert({
      user_id: user.id,
      daily_reminders: notifications.reminders,
      weekly_summary: notifications.weeklySummary,
      product_updates: notifications.productUpdates,
      daily_goal_reminders: preferences.dailyGoalReminders,
      auto_run_code: preferences.autoRunCode,
    });
    setSaving(false);
    if (error) {
      setSaveState("error");
      return;
    }
    setSaveState("saved");
    window.setTimeout(() => setSaveState("idle"), 2500);
  };

  const startNameEdit = () => {
    setNameDraft(accountDisplayName(account));
    setNameState("idle");
    setEditingName(true);
  };

  const saveName = async () => {
    const displayName = nameDraft.trim();
    if (!displayName || !configured) {
      setNameState("error");
      return;
    }
    setNameState("saving");
    const supabase = createClient();
    const { data: userData } = await supabase.auth.getUser();
    const user = userData.user;
    if (!user) {
      setNameState("error");
      return;
    }
    const { error } = await supabase.auth.updateUser({ data: { full_name: displayName, name: displayName } });
    if (error) {
      setNameState("error");
      return;
    }
    // Keep the public profile row in sync when the standard migration is installed.
    // Auth metadata remains the source of truth if this optional update is unavailable.
    await supabase.from("profiles").update({ display_name: displayName }).eq("id", user.id);
    setEditingName(false);
    setNameState("idle");
  };

  return (
    <AppShell>
      <div className="mb-8">
        <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-accent">Preferences</p>
        <h1 className="mt-1 text-[30px] font-bold tracking-[-0.04em] text-foreground">Shape your workspace.</h1>
        <p className="mt-2 text-sm text-muted">Manage your account and learning preferences.</p>
      </div>

      <div className="space-y-6">
        <Card className="p-5 sm:p-6">
          <p className="text-sm font-semibold text-foreground">Account</p>
          {signedIn ? (
            <div className="mt-2 divide-y divide-border">
              <SettingsRow
                title="Name"
                description={editingName ? "" : accountDisplayName(account)}
                control={
                  editingName ? (
                    <div className="flex items-center gap-2">
                      <input
                        value={nameDraft}
                        onChange={(event) => setNameDraft(event.target.value)}
                        aria-label="Display name"
                        className="h-8 w-32 rounded-lg border border-border bg-surface px-2 text-xs text-foreground focus:border-accent focus:outline-none"
                      />
                      <Button variant="outline" size="sm" onClick={() => void saveName()} disabled={nameState === "saving"}>
                        {nameState === "saving" ? "Saving…" : "Save"}
                      </Button>
                    </div>
                  ) : (
                    <Button variant="outline" size="sm" onClick={startNameEdit}>
                      Edit
                    </Button>
                  )
                }
              />
              {nameState === "error" && <p className="px-0 pb-2 text-xs font-medium text-danger">Enter a valid name and try again.</p>}
              <SettingsRow
                title="Username"
                description={`@${accountHandle(account)}`}
                control={<span className="text-xs text-muted-2">From your email</span>}
              />
              <SettingsRow
                title="Password"
                description={account?.provider === "google" ? "Managed by Google" : "Use email recovery to reset your password"}
                control={<span className="text-xs text-muted-2">Account security</span>}
              />
              <SettingsRow
                title="Log out"
                description={`Signed in as ${account?.email}`}
                control={
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      void logout();
                      router.push("/login");
                    }}
                  >
                    <LogOut className="h-3.5 w-3.5" />
                    Log out
                  </Button>
                }
              />
            </div>
          ) : (
            <div className="mt-2">
              <SettingsRow
                title="Not signed in"
                description="Sign in to edit your name, username, and password."
                control={
                  <Link href={`/login?next=${encodeURIComponent("/settings")}`}>
                    <Button size="sm">
                      <LogIn className="h-3.5 w-3.5" />
                      Sign in
                    </Button>
                  </Link>
                }
              />
            </div>
          )}
        </Card>

        <Card className="p-5 sm:p-6">
          <p className="text-sm font-semibold text-foreground">Appearance</p>
          <div className="mt-2 divide-y divide-border">
            <SettingsRow
              title="Theme"
              description={theme === "light" ? "Light mode is active" : "Dark mode is active"}
              control={<ThemeToggle />}
            />
          </div>
        </Card>

        <Card className="p-5 sm:p-6">
          <p className="text-sm font-semibold text-foreground">Notifications</p>
          <div className="mt-2 divide-y divide-border">
            <SettingsRow
              title="Daily reminders"
              description="Get a nudge if you haven't practiced today"
              control={
                <Toggle
                  checked={notifications.reminders}
                  onChange={() =>
                    setNotifications((prev) => ({ ...prev, reminders: !prev.reminders }))
                  }
                  label="Daily reminders"
                />
              }
            />
            <SettingsRow
              title="Weekly summary"
              description="A recap of your progress every Sunday"
              control={
                <Toggle
                  checked={notifications.weeklySummary}
                  onChange={() =>
                    setNotifications((prev) => ({ ...prev, weeklySummary: !prev.weeklySummary }))
                  }
                  label="Weekly summary"
                />
              }
            />
            <SettingsRow
              title="Product updates"
              description="News about new courses and features"
              control={
                <Toggle
                  checked={notifications.productUpdates}
                  onChange={() =>
                    setNotifications((prev) => ({ ...prev, productUpdates: !prev.productUpdates }))
                  }
                  label="Product updates"
                />
              }
            />
          </div>
        </Card>

        <Card className="p-5 sm:p-6">
          <p className="text-sm font-semibold text-foreground">Learning preferences</p>
          <div className="mt-2 divide-y divide-border">
            <SettingsRow
              title="Daily goal reminders"
              description="Show a banner when you're close to your daily goal"
              control={
                <Toggle
                  checked={preferences.dailyGoalReminders}
                  onChange={() =>
                    setPreferences((prev) => ({ ...prev, dailyGoalReminders: !prev.dailyGoalReminders }))
                  }
                  label="Daily goal reminders"
                />
              }
            />
            <SettingsRow
              title="Auto-run code"
              description="Automatically run code a moment after you stop typing"
              control={
                <Toggle
                  checked={preferences.autoRunCode}
                  onChange={() =>
                    setPreferences((prev) => ({ ...prev, autoRunCode: !prev.autoRunCode }))
                  }
                  label="Auto-run code"
                />
              }
            />
          </div>
        </Card>

        <div className="flex items-center justify-end gap-3">
          {saveState === "saved" && <span className="flex items-center gap-1.5 text-sm font-semibold text-success"><CheckCircle2 className="h-4 w-4" /> Preferences saved to your account</span>}
          {saveState === "error" && <span className="text-sm font-semibold text-danger">Sign in and finish Supabase setup before saving.</span>}
          <Button onClick={() => void saveSettings()} disabled={saving}>{saving ? "Saving…" : saveState === "saved" ? "Saved" : "Save Changes"}</Button>
        </div>
      </div>
    </AppShell>
  );
}
