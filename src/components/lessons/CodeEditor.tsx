"use client";

import { useMemo, useState } from "react";
import dynamic from "next/dynamic";
import { Play, RotateCcw, CheckCircle2, FileCode, PartyPopper, XCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { checkExercise } from "@/lib/exercise-check";

// Monaco is the exact editor that powers VS Code. It's loaded client-only
// (no SSR) since it depends on browser APIs.
const MonacoEditor = dynamic(() => import("@monaco-editor/react"), {
  ssr: false,
  loading: () => (
    <div className="flex h-56 items-center justify-center bg-ink text-xs text-white/40">Loading editor…</div>
  ),
});

export interface EditorFile {
  name: string;
  content: string;
}

interface CodeEditorProps {
  files: EditorFile[];
  height?: string;
  onRun?: () => void;
  onSubmit?: (passed: boolean) => void;
  /** Language key used to pick the right checker/preview (e.g. "html", "css", "javascript"). */
  language?: string;
  /** The exercise instructions — used to check the submitted code for real. */
  exercisePrompt?: string;
  storageKey?: string;
}

const EXTENSION_TO_MONACO_LANG: Record<string, string> = {
  js: "javascript",
  jsx: "javascript",
  ts: "typescript",
  tsx: "typescript",
  html: "html",
  css: "css",
  py: "python",
  cpp: "cpp",
  cc: "cpp",
  sh: "shell",
  json: "json",
  java: "java",
  sql: "sql",
  cs: "csharp",
};

function monacoLanguageFor(fileName: string) {
  const ext = fileName.split(".").pop()?.toLowerCase() ?? "";
  return EXTENSION_TO_MONACO_LANG[ext] ?? "javascript";
}

type SubmitResult = "idle" | "passed" | "failed";

export function CodeEditor({
  files,
  height = "h-56",
  onRun,
  onSubmit,
  language = "javascript",
  exercisePrompt = "",
  storageKey,
}: CodeEditorProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [contents, setContents] = useState(() => files.map((f) => f.content));
  const [consoleLines, setConsoleLines] = useState<string[]>(["Output will appear here..."]);
  const [running, setRunning] = useState(false);
  const [result, setResult] = useState<SubmitResult>("idle");
  const [feedback, setFeedback] = useState<string[]>([]);
  const [previewSrc, setPreviewSrc] = useState<string | null>(null);

  const canPreview = language === "html" || language === "css";
  const canExecuteJs = language === "javascript";

  const buildPreviewDoc = useMemo(
    () => (code: string) => {
      if (language === "css") {
        return `<!DOCTYPE html><html><head><style>${code}</style></head><body>
          <div class="card"><h1>Preview heading</h1><p class="row">Some preview text to style.</p></div>
        </body></html>`;
      }
      return code;
    },
    [language]
  );

  const handleRun = () => {
    onRun?.();

    if (canPreview) {
      setPreviewSrc(buildPreviewDoc(contents[activeIndex]));
      setConsoleLines(["✓ Preview updated below."]);
      return;
    }

    if (!canExecuteJs) {
      setConsoleLines([
        `> In-browser execution isn't available for ${language} yet.`,
        "Use Submit to check your code's structure instead.",
      ]);
      return;
    }

    setRunning(true);
    const output = [`> Running ${files[activeIndex].name}...`];
    setConsoleLines(output);

    const runner = `self.onmessage = ({ data }) => {
      const printable = (value) => { try { return typeof value === "string" ? value : JSON.stringify(value); } catch { return String(value); } };
      const console = { log: (...args) => self.postMessage({ type: "log", value: args.map(printable).join(" ") }), error: (...args) => self.postMessage({ type: "log", value: args.map(printable).join(" ") }), warn: (...args) => self.postMessage({ type: "log", value: args.map(printable).join(" ") }) };
      try {
        const window = undefined, document = undefined, fetch = undefined, XMLHttpRequest = undefined, WebSocket = undefined, importScripts = undefined;
        new Function("console", "window", "document", "fetch", "XMLHttpRequest", "WebSocket", "importScripts", "\\\"use strict\\\";\\n" + data.source)(console, window, document, fetch, XMLHttpRequest, WebSocket, importScripts);
        self.postMessage({ type: "done" });
      } catch (error) { self.postMessage({ type: "error", value: error instanceof Error ? error.message : String(error) }); }
    };`;
    const blobUrl = URL.createObjectURL(new Blob([runner], { type: "text/javascript" }));
    const worker = new Worker(blobUrl);
    let finished = false;
    const finish = (message: string) => {
      if (finished) return;
      finished = true;
      worker.terminate();
      URL.revokeObjectURL(blobUrl);
      window.clearTimeout(timeout);
      setConsoleLines((previous) => [...previous, message]);
      setRunning(false);
    };
    const timeout = window.setTimeout(() => finish("✕ Stopped after 2 seconds to protect the workspace."), 2000);
    worker.onmessage = (event: MessageEvent<{ type: string; value?: string }>) => {
      if (event.data.type === "log") {
        setConsoleLines((previous) => [...previous, event.data.value ?? ""]);
      } else if (event.data.type === "done") {
        finish("✓ Completed without errors");
      } else {
        finish(`✕ ${event.data.value ?? "Unable to run this code."}`);
      }
    };
    worker.postMessage({ source: contents[activeIndex] });
  };

  const handleReset = () => {
    setContents(files.map((f) => f.content));
    setConsoleLines(["Output will appear here..."]);
    setResult("idle");
    setFeedback([]);
    setPreviewSrc(null);
  };

  const handleSubmit = () => {
    const check = checkExercise(language, contents[activeIndex], exercisePrompt);
    onSubmit?.(check.passed);
    setResult(check.passed ? "passed" : "failed");
    setFeedback(check.feedback);

    if (check.passed) {
      setConsoleLines((prev) => [...prev, "🎉 Nice work — this passes the exercise check!"]);
      if (canPreview) setPreviewSrc(buildPreviewDoc(contents[activeIndex]));
    } else {
      setConsoleLines((prev) => [...prev, "✕ Not quite yet — see the notes below the editor."]);
    }

    if (storageKey && check.passed) {
      window.localStorage.setItem(
        storageKey,
        JSON.stringify({ content: contents, submittedAt: new Date().toISOString() })
      );
    }
  };

  return (
    <div className="overflow-hidden rounded-2xl border border-border bg-surface shadow-elevated">
      <div className="flex items-center gap-1 border-b border-border bg-surface-raised px-2 pt-2">
        {files.map((file, idx) => (
          <button
            key={file.name}
            onClick={() => setActiveIndex(idx)}
            className={cn(
                "flex items-center gap-1.5 rounded-t-lg border border-b-0 px-3 py-1.5 text-xs font-medium transition-colors",
              idx === activeIndex
                ? "border-border bg-surface text-foreground"
                : "border-transparent text-muted-2 hover:text-muted"
            )}
          >
            <FileCode className="h-3 w-3" />
            {file.name}
          </button>
        ))}
      </div>

      <div className={cn(height)}>
        <MonacoEditor
          height="100%"
          language={monacoLanguageFor(files[activeIndex].name)}
          value={contents[activeIndex]}
          theme="vs-dark"
          onChange={(value) =>
            setContents((prev) => prev.map((c, i) => (i === activeIndex ? value ?? "" : c)))
          }
          options={{
            fontSize: 13,
            fontFamily: "var(--font-mono, ui-monospace, monospace)",
            minimap: { enabled: false },
            scrollBeyondLastLine: false,
            padding: { top: 16, bottom: 16 },
            automaticLayout: true,
            tabSize: 2,
            wordWrap: "on",
            renderLineHighlight: "gutter",
            smoothScrolling: true,
            cursorBlinking: "smooth",
          }}
        />
      </div>

      {previewSrc !== null && (
        <div className="border-t border-border">
          <p className="border-b border-border bg-surface-raised px-4 py-1.5 text-[11px] font-bold uppercase tracking-[0.12em] text-muted-2">
            Preview
          </p>
          <iframe title="Live preview" sandbox="allow-same-origin" srcDoc={previewSrc} className="h-48 w-full bg-white" />
        </div>
      )}

      <div className="border-t border-border bg-surface-raised px-4 py-3">
        <p className="mb-1.5 text-[11px] font-bold uppercase tracking-[0.12em] text-muted-2">Console</p>
        <div className="scrollbar-thin max-h-24 space-y-0.5 overflow-y-auto font-mono text-[12px] text-muted">
          {consoleLines.map((line, i) => (
            <p key={i}>{line}</p>
          ))}
        </div>
      </div>

      {result === "passed" && (
        <div className="flex items-center gap-2.5 border-t border-success/30 bg-success-soft px-4 py-3">
          <PartyPopper className="h-4 w-4 shrink-0 text-success" />
          <p className="text-[13px] font-semibold text-success">Great job — your solution passes! 🎉</p>
        </div>
      )}
      {result === "failed" && feedback.length > 0 && (
        <div className="border-t border-danger/30 bg-danger-soft px-4 py-3">
          <div className="mb-1 flex items-center gap-2">
            <XCircle className="h-4 w-4 shrink-0 text-danger" />
            <p className="text-[13px] font-semibold text-danger">Almost there — fix these and try again:</p>
          </div>
          <ul className="ml-6 list-disc space-y-0.5 text-[13px] text-danger/90">
            {feedback.map((line) => (
              <li key={line}>{line}</li>
            ))}
          </ul>
        </div>
      )}

      <div className="flex items-center gap-2 border-t border-border px-4 py-3">
        <button
          type="button"
          onClick={handleRun}
          disabled={running}
          className="inline-flex h-8 items-center gap-1.5 rounded-lg bg-accent px-3 text-xs font-semibold text-white transition-colors hover:bg-accent-hover disabled:opacity-60"
        >
          <Play className="h-3.5 w-3.5" />
          {running ? "Running…" : "Run"}
        </button>
        <button
          type="button"
          onClick={handleReset}
          className="inline-flex h-8 items-center gap-1.5 rounded-lg border border-border px-3 text-xs font-semibold text-muted transition-colors hover:border-accent-soft-strong hover:text-foreground"
        >
          <RotateCcw className="h-3.5 w-3.5" />
          Reset
        </button>
        <button
          type="button"
          onClick={handleSubmit}
          disabled={result === "passed"}
          className="ml-auto inline-flex h-8 items-center gap-1.5 rounded-lg bg-success-soft px-3 text-xs font-semibold text-success transition-colors hover:opacity-80 disabled:opacity-70"
        >
          <CheckCircle2 className="h-3.5 w-3.5" />
          {result === "passed" ? "Passed" : "Submit"}
        </button>
      </div>
    </div>
  );
}
