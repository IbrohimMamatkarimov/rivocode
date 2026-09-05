"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { LanguageLogo } from "@/lib/language-logos";
import { courses } from "@/lib/mock-data";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/components/theme/LanguageProvider";

const examples: Record<string, { filename: string; code: string }> = {
  "html-css": {
    filename: "index.html",
    code: `<!DOCTYPE html>
<html>
<head>
  <title>My First Page</title>
</head>
<body>

  <h1>This is a heading</h1>
  <p>This is a paragraph.</p>

</body>
</html>`,
  },
  "javascript-fundamentals": {
    filename: "script.js",
    code: `function greet(name) {
  return \`Hello, \${name}!\`;
}

console.log(greet("RivoCode"));
// Hello, RivoCode!`,
  },
  "python-basics": {
    filename: "main.py",
    code: `def greet(name):
    return f"Hello, {name}!"

print(greet("RivoCode"))
# Hello, RivoCode!`,
  },
  "react-essentials": {
    filename: "App.jsx",
    code: `function Welcome({ name }) {
  return <h1>Hello, {name}!</h1>;
}

export default function App() {
  return <Welcome name="RivoCode" />;
}`,
  },
  "typescript-in-depth": {
    filename: "greet.ts",
    code: `interface Person {
  name: string;
}

function greet(person: Person): string {
  return \`Hello, \${person.name}!\`;
}`,
  },
  "nodejs-fundamentals": {
    filename: "server.js",
    code: `const http = require("http");

http.createServer((req, res) => {
  res.end("Hello from Node.js!");
}).listen(3000);`,
  },
  "git-github": {
    filename: "terminal",
    code: `git init
git add .
git commit -m "First commit"
git push origin main`,
  },
  "data-science-intro": {
    filename: "analyze.py",
    code: `import pandas as pd

df = pd.read_csv("data.csv")
print(df.describe())`,
  },
  "cpp-fundamentals": {
    filename: "main.cpp",
    code: `#include <iostream>
using namespace std;

int main() {
    cout << "Hello, RivoCode!";
    return 0;
}`,
  },
  "java-fundamentals": {
    filename: "Main.java",
    code: `public class Main {
    public static void main(String[] args) {
        System.out.println("Hello, RivoCode!");
    }
}`,
  },
  "sql-fundamentals": {
    filename: "query.sql",
    code: `SELECT title, difficulty
FROM courses
WHERE category = 'Programming'
ORDER BY rating DESC;`,
  },
  "csharp-fundamentals": {
    filename: "Program.cs",
    code: `using System;

class Program {
    static void Main() {
        Console.WriteLine("Hello, RivoCode!");
    }
}`,
  },
};

export function LanguagePicker() {
  const { t } = useLanguage();
  const [activeId, setActiveId] = useState(courses[0].id);
  const active = courses.find((c) => c.id === activeId) ?? courses[0];
  const example = examples[active.id];

  return (
    <div>
      <div className="mb-4 flex items-center justify-between gap-4">
        <div>
          <p className="text-[11px] font-bold uppercase tracking-[0.15em] text-accent">{t("jump_in_eyebrow")}</p>
          <h2 className="mt-1 text-lg font-bold tracking-tight text-foreground">{t("jump_in_title")}</h2>
        </div>
        <ArrowRight className="hidden h-5 w-5 text-accent sm:block" />
      </div>

      <div className="scrollbar-thin flex items-center gap-2 overflow-x-auto pb-1">
        {courses.map((course) => {
          const isActive = course.id === activeId;
          return (
            <button
              key={course.id}
              type="button"
              onClick={() => setActiveId(course.id)}
              className={cn(
                "flex shrink-0 items-center gap-2 rounded-xl border px-3.5 py-2 text-sm font-semibold transition-all",
                isActive
                  ? "border-ink bg-ink text-white shadow-md"
                  : "border-border bg-surface-raised text-foreground hover:border-accent-soft-strong hover:bg-accent-soft"
              )}
            >
              <LanguageLogo courseId={course.id} className="h-5 w-5 shrink-0" />
              {course.title.replace(/ (Fundamentals|Essentials|Basics|in Depth|& GitHub)$/i, "")}
            </button>
          );
        })}
      </div>

      <div className="mt-5 overflow-hidden rounded-2xl border border-border bg-ink shadow-sm">
        <div className="flex items-center gap-2 border-b border-white/10 bg-white/[0.06] px-4 py-3">
          <span className="h-2.5 w-2.5 rounded-full bg-[#f44336]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#e7a917]" />
          <span className="h-2.5 w-2.5 rounded-full bg-accent-2" />
          <span className="ml-2 text-xs font-medium text-white/60">{example.filename}</span>
        </div>
        <pre className="scrollbar-thin overflow-x-auto bg-transparent p-5 font-mono text-[13px] leading-relaxed text-white/90">
          <code>{example.code}</code>
        </pre>
        <Link
          href={`/courses/${active.slug}`}
          className="flex w-full items-center justify-center gap-1.5 border-t border-white/10 bg-accent px-4 py-3 text-sm font-semibold text-white transition-colors hover:bg-accent-hover"
        >
          {t("btn_try_it")}
        </Link>
      </div>

      <div className="mt-4 flex flex-wrap gap-2.5">
        <Link
          href={`/courses/${active.slug}`}
          className="rounded-xl border border-border bg-surface px-4 py-2 text-sm font-semibold text-foreground transition-colors hover:border-accent-soft-strong hover:bg-accent-soft"
        >
          {t("nav_learn")} {active.title.split(" ")[0]}
        </Link>
        <Link
          href="/courses"
          className="rounded-xl border border-border bg-surface px-4 py-2 text-sm font-semibold text-foreground transition-colors hover:border-accent-soft-strong hover:bg-accent-soft"
        >
          {t("btn_browse_courses")}
        </Link>
      </div>
    </div>
  );
}
