"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowRight, ArrowLeft, Braces, CheckCircle2, CircleAlert, Code2, Sparkles, Terminal } from "lucide-react";
import { useAuth } from "@/components/auth/AuthProvider";
import { BrandMark } from "@/components/layout/BrandMark";
import { Button } from "@/components/ui/Button";
import { useLanguage } from "@/components/theme/LanguageProvider";

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
  const { t } = useLanguage();
  const router = useRouter();
  const { signInWithGoogle, signInWithEmail, signUpWithEmail, configured } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [error, setError] = useState<string | null>(null);
  const [notice, setNotice] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  const goDashboard = () => router.push("/dashboard");

  // Lets someone who landed here from a gated page (e.g. Courses) back out
  // to the rest of the app, which stays freely browsable while signed out.
  const handleBack = () => {
    if (window.history.length > 1) router.back();
    else router.push("/dashboard");
  };

  const handleGoogle = async () => {
    setError(null);
    setBusy(true);
    const result = await signInWithGoogle("/dashboard");
    if (result.error) {
      setError(result.error);
      setBusy(false);
    }
  };

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setNotice(null);
    setBusy(true);
    const result = mode === "signin"
      ? await signInWithEmail(email.trim(), password)
      : await signUpWithEmail(email.trim(), password);
    setBusy(false);
    if (result.error) return setError(result.error);
    if (result.needsEmailConfirmation) {
      setNotice(t("login_email_confirm"));
      return;
    }
    goDashboard();
  };

  return (
    <div className="min-h-screen bg-background lg:grid lg:grid-cols-2">
      <div className="hero-surface login-surface relative hidden flex-col justify-between overflow-hidden p-10 lg:flex">
        <div className="hero-glow login-orb -right-16 -top-16 h-72 w-72 bg-accent/25" />
        <div className="hero-glow login-orb-slow -bottom-24 left-10 h-64 w-64 bg-violet/20" />
        <div className="login-scanline" />

        <div className="relative">
          <BrandMark label inverse className="text-accent-2" />
        </div>

        <div className="relative max-w-xl motion-enter">
          <div className="mb-5 flex items-center justify-between">
            <p className="inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-white/[0.07] px-3 py-1.5 font-mono text-[10px] font-bold uppercase tracking-[0.14em] text-accent-2 backdrop-blur">
              <Braces className="h-3.5 w-3.5" />
              ~/your-next-chapter.ts
            </p>
            <span className="font-mono text-[10px] tracking-[0.16em] text-white/40">v1.0.0</span>
          </div>

          <div className="code-window motion-terminal login-code-window overflow-hidden rounded-[22px] border border-white/10 font-mono shadow-2xl">
            <div className="flex items-center justify-between border-b border-white/10 bg-white/[0.045] px-4 py-3 text-[11px] text-white/45">
              <span className="flex items-center gap-1.5"><span className="h-2 w-2 rounded-full bg-[#ff6b6b]" /><span className="h-2 w-2 rounded-full bg-[#f7b955]" /><span className="h-2 w-2 rounded-full bg-accent-2" /></span>
              <span className="flex items-center gap-1.5"><Code2 className="h-3.5 w-3.5 text-accent-2/80" /> session.ts</span>
              <span className="text-accent-2">LIVE</span>
            </div>
            <pre className="code-print scrollbar-thin overflow-x-auto px-5 py-6 text-[13px] leading-7 text-white/80"><code>
              <span className="code-comment">// You&apos;re one commit away.</span>{"\n"}
              <span className="code-keyword">import</span>{" { future } "}<span className="code-keyword">from</span>{" "}<span className="code-string">&quot;@you/build&quot;</span>;{"\n\n"}
              <span className="code-keyword">const</span>{" builder = "}<span className="code-keyword">await</span>{" future.start({\n"}
              {"  curiosity: "}<span className="code-boolean">true</span>,{"\n"}
              {"  projects: "}<span className="code-number">∞</span>,{"\n"}
              {"  status: "}<span className="code-string">&quot;shipping&quot;</span>,{"\n"}
              {"});\n\n"}<span className="code-function">builder</span>.<span className="code-function">make</span>(<span className="code-string">&quot;something remarkable&quot;</span>);
            </code></pre>
            <div className="border-t border-white/10 bg-black/20 px-5 py-3 font-mono text-xs leading-6 text-white/60">
              <span className="text-accent-2">$</span> npm run become-a-developer{"\n"}
              <span className="text-success">✓</span> Compiled possibility in 0.02s<span className="terminal-cursor" />
            </div>
          </div>

          <div className="mt-5 flex items-center gap-4">
            <div className="developer-stack" aria-hidden="true">
              <span className="developer-orbit developer-orbit-one"><Sparkles className="h-3 w-3" /></span>
              <span className="developer-avatar developer-avatar-one">A</span>
              <span className="developer-avatar developer-avatar-two">J</span>
              <span className="developer-avatar developer-avatar-three">M</span>
            </div>
            <div className="border-l border-white/15 pl-4">
              <p className="text-[15px] font-medium italic leading-relaxed text-white/85">&ldquo;Everyone should learn how to program a computer, because it teaches you how to think.&rdquo;</p>
              <p className="mt-1.5 font-mono text-[10px] font-bold uppercase tracking-[0.14em] text-accent-2/80">Steve Jobs</p>
            </div>
          </div>
        </div>

        <p className="relative font-mono text-[11px] tracking-wide text-white/40">RIVOCODE // DEVELOPER LEARNING ENVIRONMENT</p>
      </div>

      <div className="flex min-h-screen items-center justify-center px-6 py-12">
        <div className="w-full max-w-sm login-form-enter">
          <button
            type="button"
            onClick={handleBack}
            className="mb-6 inline-flex items-center gap-1.5 text-sm font-semibold text-muted transition-colors hover:text-accent"
          >
            <ArrowLeft className="h-4 w-4" />
            {t("login_back")}
          </button>

          <div className="mb-6 lg:hidden">
            <BrandMark label />
          </div>

          <div className="code-window motion-terminal mb-7 overflow-hidden rounded-2xl border border-white/10 font-mono shadow-lg lg:hidden">
            <div className="flex items-center justify-between border-b border-white/10 bg-white/[0.045] px-3.5 py-2.5 text-[10px] text-white/45">
              <span className="flex items-center gap-1.5"><span className="h-1.5 w-1.5 rounded-full bg-[#ff6b6b]" /><span className="h-1.5 w-1.5 rounded-full bg-[#f7b955]" /><span className="h-1.5 w-1.5 rounded-full bg-accent-2" /></span>
              <span className="text-accent-2">SESSION.LIVE</span>
            </div>
            <div className="px-4 py-4 text-xs leading-6 text-white/70">
              <p><span className="code-comment">// Build your next chapter.</span></p>
              <p><span className="code-keyword">const</span> next = <span className="code-keyword">await</span> <span className="code-function">start</span>();</p>
              <p className="mt-1 text-success">✓ Environment ready<span className="terminal-cursor" /></p>
            </div>
          </div>

          <div className="mb-7 rounded-2xl border border-border bg-surface-raised px-4 py-3 font-mono shadow-sm">
            <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.14em] text-accent"><Terminal className="h-3.5 w-3.5" /> auth.output</div>
            <p className="mt-2 text-sm leading-6 text-foreground"><span className="text-accent">{">"}</span> {mode === "signin" ? t("login_identity_check") : t("login_identity_create")}</p>
          </div>
          <h2 className="text-2xl font-bold tracking-tight text-foreground">
            {mode === "signin" ? t("login_ready") : t("login_build_future")}
          </h2>
          <p className="mt-1.5 text-sm text-muted">
            {mode === "signin" ? t("login_next_project") : t("login_workspace_idea")}
          </p>

          <button
            type="button"
            onClick={() => void handleGoogle()}
            disabled={busy || !configured}
            className="mt-6 flex h-11 w-full items-center justify-center gap-2.5 rounded-xl border border-border bg-surface text-sm font-semibold text-foreground shadow-sm transition-colors hover:bg-surface-raised disabled:cursor-not-allowed disabled:opacity-50"
          >
            <GoogleGlyph />
            {t("login_continue_google")}
          </button>

          <div className="my-5 flex items-center gap-3 text-xs font-medium uppercase tracking-wide text-muted-2">
            <span className="h-px flex-1 bg-border" />
            {mode === "signin" ? t("login_or_signin_email") : t("login_or_signup_email")}
            <span className="h-px flex-1 bg-border" />
          </div>

          <form onSubmit={(event) => void handleEmailSubmit(event)} className="space-y-3">
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
                minLength={4}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="h-11 w-full rounded-xl border border-border bg-surface px-3.5 text-sm text-foreground placeholder:text-muted-2 focus:border-accent focus:outline-none"
              />
            </div>
            <Button type="submit" size="lg" className="mt-1 w-full justify-center" disabled={busy || !configured}>
              {busy ? t("login_connecting") : mode === "signin" ? t("login_enter_workspace") : t("login_create_workspace")}
              <ArrowRight className="h-4 w-4" />
            </Button>
          </form>

          {!configured && <p className="mt-4 text-sm leading-relaxed text-warning">Supabase is not configured. Add the two public values from <code className="font-mono">.env.example</code>, then restart the app.</p>}
          {error && <p role="alert" className="mt-4 flex items-start gap-2 rounded-xl border border-danger/25 bg-danger-soft p-3 text-sm text-danger"><CircleAlert className="mt-0.5 h-4 w-4 shrink-0" />{error}</p>}
          {notice && <p className="mt-4 rounded-xl border border-success/25 bg-success-soft p-3 text-sm text-success">{notice}</p>}

          <p className="mt-4 text-center text-sm text-muted">
            {mode === "signin" ? t("new_to_rivocode") : t("already_have_account")}{" "}
            <button
              type="button"
              onClick={() => setMode(mode === "signin" ? "signup" : "signin")}
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
