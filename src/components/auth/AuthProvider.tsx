"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";
import type { SupabaseClient, User } from "@supabase/supabase-js";
import { createClient } from "@/lib/supabase/client";

export type AuthMethod = "google" | "rivocode";
export type AuthStatus = "loading" | "account" | "unauthenticated";

export interface AccountInfo {
  email: string;
  provider: AuthMethod;
  name?: string;
  picture?: string;
}

interface AuthContextValue {
  status: AuthStatus;
  account: AccountInfo | null;
  configured: boolean;
  signInWithGoogle: (next?: string) => Promise<void>;
  signInWithEmail: (email: string, password: string) => Promise<string | null>;
  signUpWithEmail: (email: string, password: string) => Promise<{ error: string | null; needsConfirmation: boolean }>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

function toAccountInfo(user: User): AccountInfo {
  const meta = (user.user_metadata ?? {}) as Record<string, unknown>;
  const provider: AuthMethod = user.app_metadata?.provider === "google" ? "google" : "rivocode";
  const name = (meta.full_name as string | undefined) ?? (meta.name as string | undefined);
  const picture = (meta.avatar_url as string | undefined) ?? (meta.picture as string | undefined);
  return {
    email: user.email ?? "",
    provider,
    name,
    picture,
  };
}

const NOT_CONFIGURED_MESSAGE = "Sign-in isn't set up yet — add your Supabase keys to .env.local.";

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const configured = Boolean(
    process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY
  );

  // Supabase's browser client relies on window/localStorage under the hood,
  // so it's only ever created client-side, and only when real keys exist —
  // otherwise createClient() throws and would take down every page that
  // renders AppShell.
  const supabase = useMemo<SupabaseClient | null>(() => (configured ? createClient() : null), [configured]);
  const [status, setStatus] = useState<AuthStatus>(configured ? "loading" : "unauthenticated");
  const [account, setAccount] = useState<AccountInfo | null>(null);

  useEffect(() => {
    if (!supabase) return;
    let active = true;

    supabase.auth.getUser().then(({ data }) => {
      if (!active) return;
      if (data.user) {
        setAccount(toAccountInfo(data.user));
        setStatus("account");
      } else {
        setStatus("unauthenticated");
      }
    });

    // Keeps state in sync for events that happen without a full page
    // navigation: token refresh, sign-out in another tab, and — critically —
    // the moment the browser client picks up the session cookie that
    // /auth/callback just set after a Google/email redirect back into the app.
    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!active) return;
      if (session?.user) {
        setAccount(toAccountInfo(session.user));
        setStatus("account");
      } else {
        setAccount(null);
        setStatus("unauthenticated");
      }
    });

    return () => {
      active = false;
      listener.subscription.unsubscribe();
    };
  }, [supabase]);

  const signInWithGoogle = async (next = "/dashboard") => {
    if (!supabase) return;
    const origin = window.location.origin;
    await supabase.auth.signInWithOAuth({
      provider: "google",
      options: { redirectTo: `${origin}/auth/callback?next=${encodeURIComponent(next)}` },
    });
  };

  const signInWithEmail = async (email: string, password: string) => {
    if (!supabase) return NOT_CONFIGURED_MESSAGE;
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    return error?.message ?? null;
  };

  const signUpWithEmail = async (email: string, password: string) => {
    if (!supabase) return { error: NOT_CONFIGURED_MESSAGE, needsConfirmation: false };
    const origin = window.location.origin;
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: { emailRedirectTo: `${origin}/auth/callback` },
    });
    return { error: error?.message ?? null, needsConfirmation: !error && !data.session };
  };

  const logout = async () => {
    if (!supabase) return;
    await supabase.auth.signOut();
  };

  return (
    <AuthContext.Provider
      value={{ status, account, configured, signInWithGoogle, signInWithEmail, signUpWithEmail, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within an AuthProvider");
  return ctx;
}
