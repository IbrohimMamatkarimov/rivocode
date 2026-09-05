"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";
import type { User } from "@supabase/supabase-js";
import { createClient } from "@/lib/supabase/client";

export type AuthMethod = "google" | "rivocode";
export type AuthStatus = "loading" | "account" | "unauthenticated";

export interface AccountInfo {
  email: string;
  provider: AuthMethod;
  name?: string;
  picture?: string;
}

export interface AuthResult {
  error?: string;
  needsEmailConfirmation?: boolean;
}

interface AuthContextValue {
  status: AuthStatus;
  account: AccountInfo | null;
  configured: boolean;
  signInWithGoogle: (next?: string) => Promise<AuthResult>;
  signInWithEmail: (email: string, password: string) => Promise<AuthResult>;
  signUpWithEmail: (email: string, password: string) => Promise<AuthResult>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

function accountFromUser(user: User): AccountInfo {
  const metadata = user.user_metadata ?? {};
  const provider = user.app_metadata.provider === "google" ? "google" : "rivocode";

  return {
    email: user.email ?? "",
    provider,
    name: typeof metadata.full_name === "string" ? metadata.full_name : typeof metadata.name === "string" ? metadata.name : undefined,
    picture: typeof metadata.avatar_url === "string" ? metadata.avatar_url : typeof metadata.picture === "string" ? metadata.picture : undefined,
  };
}

function callbackUrl(next: string) {
  return `${window.location.origin}/auth/callback?next=${encodeURIComponent(next)}`;
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [status, setStatus] = useState<AuthStatus>("loading");
  const [account, setAccount] = useState<AccountInfo | null>(null);
  const configured = Boolean(
    process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY
  );
  const supabase = useMemo(() => (configured ? createClient() : null), [configured]);

  useEffect(() => {
    if (!supabase) {
      setStatus("unauthenticated");
      return;
    }

    const loadUser = async () => {
      const { data } = await supabase.auth.getUser();
      setAccount(data.user ? accountFromUser(data.user) : null);
      setStatus(data.user ? "account" : "unauthenticated");
    };

    void loadUser();
    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setAccount(session?.user ? accountFromUser(session.user) : null);
      setStatus(session?.user ? "account" : "unauthenticated");
    });

    return () => listener.subscription.unsubscribe();
  }, [supabase]);

  const signInWithGoogle = async (next = "/dashboard"): Promise<AuthResult> => {
    if (!supabase) return { error: "Supabase is not configured yet. Follow SUPABASE_SETUP.md first." };
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: { redirectTo: callbackUrl(next) },
    });
    return error ? { error: error.message } : {};
  };

  const signInWithEmail = async (email: string, password: string): Promise<AuthResult> => {
    if (!supabase) return { error: "Supabase is not configured yet. Follow SUPABASE_SETUP.md first." };
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    return error ? { error: error.message } : {};
  };

  const signUpWithEmail = async (email: string, password: string): Promise<AuthResult> => {
    if (!supabase) return { error: "Supabase is not configured yet. Follow SUPABASE_SETUP.md first." };
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: { emailRedirectTo: callbackUrl("/dashboard") },
    });
    return error
      ? { error: error.message }
      : { needsEmailConfirmation: !data.session };
  };

  const logout = async () => {
    if (supabase) await supabase.auth.signOut();
    setAccount(null);
    setStatus("unauthenticated");
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
