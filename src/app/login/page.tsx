"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Sparkles, ArrowRight, ArrowLeft, AlertCircle, MailCheck } from "lucide-react";
import { useAuth } from "@/components/auth/AuthProvider";
import { BrandMark } from "@/components/layout/BrandMark";
import { Button } from "@/components/ui/Button";
import { useLanguage } from "@/components/theme/LanguageProvider";
import { CodeTypewriter } from "@/components/login/CodeTypewriter";
import { AuthLoadingLabel } from "@/components/login/AuthLoadingLabel";

function GoogleGlyph() {
  return (
    <svg viewBox="0 0 24 24" className="h-4.5 w-4.5 shrink-0" aria-hidden>
      <path fill="#4285F4" d="M23.49 12.27c0-.79-.07-1.54-.2-2.27H12v4.3h6.47a5.53 5.53 0 0 1-2.4 3.63v3h3.88c2.27-2.09 3.54-5.17 3.54-8.66Z" />
      <path fill="#34A853" d="M12 24c3.24 0 5.95-1.08 7.94-2.92l-3.88-3a7.45 7.45 0 0 1-11.1-3.92H.83v3.09A12 12 0 0 0 12 24Z" />
      <path fill="#FBBC05" d="M4.96 14.16a7.2 7.2 0 0 1 0-4.32V6.75H.83a12 12 0 0 0 0 10.5l4.13-3.09Z" />
      <path fill="#EA4335" d="M12 4.77c1.76 0 3.34.6 4.59 1.79l3.44-3.44C17.94 1.19 15.24 0 12 0A12 12 0 0 0 .83 6.75l4.13 3.09A7.16 7.16 0 0 1 12 4.77Z" />
    </svg>
  );
}

export default function LoginPage() {
  const router = useRouter();
  const { t } = useLanguage();
  const { signInWithGoogle, signInWithEmail, signUpWithEmail } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [error, setError] = useState<string | null>(null);
  const [info, setInfo] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);

  // Lets someone who landed here from a gated page (e.g. Courses) back out
  // to the rest of the app, which stays freely browsable while signed out.
  const handleBack = () => {
    if (window.history.length > 1) router.back();
    else router.push("/dashboard");
  };

  const handleGoogle = async () => {
    setError(null);
    setGoogleLoading(true);
    await signInWithGoogle("/dashboard");
    // On success the browser navigates away to Google immediately, so this
    // only re-runs if signInWithOAuth itself failed to even start the redirect.
    setGoogleLoading(false);
  };

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setInfo(null);
    setSubmitting(true);

    if (mode === "signin") {
      const message = await signInWithEmail(email.trim(), password);
      setSubmitting(false);
      if (message) {
        setError(message);
        return;
      }
      router.push("/dashboard");
      return;
    }

    const { error: signUpError, needsConfirmation } = await signUpWithEmail(email.trim(), password);
    setSubmitting(false);
    if (signUpError) {
      setError(signUpError);
      return;
    }
    if (needsConfirmation) {
      setInfo(t("login_email_confirm"));
      setMode("signin");
      return;
    }
    router.push("/dashboard");
  };

  return (
    <div className="min-h-screen bg-background lg:grid lg:grid-cols-2">
      <div className="hero-surface login-surface relative hidden flex-col justify-between overflow-hidden p-10 lg:flex">
        <div className="login-scanline" />
        <div className="hero-glow login-orb -right-16 -top-16 h-72 w-72 bg-accent/25" />
        <div className="hero-glow login-orb-slow -bottom-24 left-10 h-64 w-64 bg-violet/20" />

        <div className="relative">
          <BrandMark label inverse className="text-accent-2" />
        </div>

        <div className="relative max-w-xl">
          <p className="mb-3 inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-white/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-accent-2 backdrop-blur">
            <Sparkles className="h-3 w-3" />
            {t("login_hero_badge")}
          </p>
          <h1 className="text-[34px] font-bold leading-[1.1] tracking-tight text-white">{t("login_hero_title")}</h1>
          <p className="mt-4 text-[15px] leading-relaxed text-white/65">{t("login_hero_subtitle")}</p>

          <div className="relative mt-8">
            <CodeTypewriter />
          </div>
        </div>

        <p className="relative text-xs text-white/40">© {new Date().getFullYear()} RivoCode</p>
      </div>

      <div className="flex min-h-screen items-center justify-center px-6 py-12">
        <div className="w-full max-w-sm">
          <button
            type="button"
            onClick={handleBack}
            className="mb-6 inline-flex items-center gap-1.5 text-sm font-semibold text-muted transition-colors hover:text-accent"
          >
            <ArrowLeft className="h-4 w-4" />
            {t("login_back")}
          </button>

          <div className="mb-8 lg:hidden">
            <BrandMark label />
          </div>

          <h2 className="text-2xl font-bold tracking-tight text-foreground">
            {mode === "signin" ? t("login_welcome_back") : t("login_create_account")}
          </h2>
          <p className="mt-1.5 text-sm text-muted">
            {mode === "signin" ? t("login_signin_subtitle") : t("login_signup_subtitle")}
          </p>

          {info && (
            <div className="mt-4 flex items-start gap-2 rounded-xl border border-accent-soft-strong bg-accent-soft px-3.5 py-3 text-[13px] leading-relaxed text-accent">
              <MailCheck className="mt-0.5 h-4 w-4 shrink-0" />
              {info}
            </div>
          )}
          {error && (
            <div className="mt-4 flex items-start gap-2 rounded-xl border border-danger/25 bg-danger-soft px-3.5 py-3 text-[13px] leading-relaxed text-danger">
              <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
              {error}
            </div>
          )}

          <button
            type="button"
            onClick={handleGoogle}
            disabled={googleLoading}
            className="mt-6 flex h-11 w-full items-center justify-center gap-2.5 rounded-xl border border-border bg-surface text-sm font-semibold text-foreground shadow-sm transition-colors hover:bg-surface-raised disabled:opacity-60"
          >
            <GoogleGlyph />
            {googleLoading ? <AuthLoadingLabel label="Connecting" /> : t("login_continue_google")}
          </button>

          <div className="my-5 flex items-center gap-3 text-xs font-medium uppercase tracking-wide text-muted-2">
            <span className="h-px flex-1 bg-border" />
            {mode === "signin" ? t("login_or_signin_email") : t("login_or_signup_email")}
            <span className="h-px flex-1 bg-border" />
          </div>

          <form onSubmit={handleEmailSubmit} className="space-y-3">
            <div>
              <label className="mb-1.5 block text-xs font-semibold text-muted" htmlFor="email">
                {t("label_email")}
              </label>
              <input
                id="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="h-11 w-full rounded-xl border border-border bg-surface px-3.5 text-sm text-foreground placeholder:text-muted-2 focus:border-accent focus:outline-none"
              />
            </div>
            <div>
              <label className="mb-1.5 block text-xs font-semibold text-muted" htmlFor="password">
                {t("label_password")}
              </label>
              <input
                id="password"
                type="password"
                required
                minLength={6}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="h-11 w-full rounded-xl border border-border bg-surface px-3.5 text-sm text-foreground placeholder:text-muted-2 focus:border-accent focus:outline-none"
              />
            </div>
            <Button type="submit" size="lg" disabled={submitting} className="mt-1 w-full justify-center">
              {submitting ? (
                <AuthLoadingLabel label={mode === "signin" ? "Signing in" : "Creating account"} />
              ) : mode === "signin" ? (
                t("btn_sign_in")
              ) : (
                t("btn_create_account_submit")
              )}
              <ArrowRight className="h-4 w-4" />
            </Button>
          </form>

          <p className="mt-4 text-center text-sm text-muted">
            {mode === "signin" ? t("new_to_rivocode") : t("already_have_account")}{" "}
            <button
              type="button"
              onClick={() => {
                setMode(mode === "signin" ? "signup" : "signin");
                setError(null);
                setInfo(null);
              }}
              className="font-semibold text-accent hover:text-accent-hover"
            >
              {mode === "signin" ? t("link_create_account") : t("link_sign_in")}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
