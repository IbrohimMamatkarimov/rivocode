import { notFound } from "next/navigation";
import { AppShell } from "@/components/layout/AppShell";
import { LessonContent } from "@/components/lessons/LessonContent";
import { CodeEditor } from "@/components/lessons/CodeEditor";
import { LessonSidebar } from "@/components/lessons/LessonSidebar";
import { CompleteLessonButton } from "@/components/lessons/CompleteLessonButton";
import { getAllLessons, getLessonById, getCourseBySlug } from "@/lib/mock-data";
import { getLessonContent } from "@/lib/lesson-content";
import { LearningHelp } from "@/components/lessons/LearningHelp";

const STARTER_FILE_NAMES: Record<string, string> = {
  javascript: "script.js",
  jsx: "App.jsx",
  typescript: "script.ts",
  html: "index.html",
  css: "style.css",
  python: "main.py",
  cpp: "main.cpp",
  bash: "commands.sh",
  json: "data.json",
  java: "Main.java",
  sql: "query.sql",
  csharp: "Program.cs",
};

const COMMENT_PREFIX: Record<string, string> = {
  html: "<!-- ",
  css: "/* ",
  bash: "# ",
  python: "# ",
  sql: "-- ",
};

function buildStarterCode(language: string, exercisePrompt: string) {
  const prefix = COMMENT_PREFIX[language] ?? "// ";
  const suffix = language === "html" ? " -->" : language === "css" ? " */" : "";
  return `${prefix}${exercisePrompt}${suffix}\n\n`;
}

export function generateStaticParams() {
  return getAllLessons().map((lesson) => ({ id: lesson.id }));
}

export default async function LessonPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const lesson = getLessonById(id);
  if (!lesson) notFound();

  const course = getCourseBySlug(lesson.courseId);

  const allInCourse = course?.sections.flatMap((s) => s.lessons) ?? [];
  const orderedIds = allInCourse.map((l) => l.id);
  const currentIndex = orderedIds.indexOf(lesson.id);
  const prevLesson = currentIndex > 0 ? allInCourse[currentIndex - 1] : undefined;
  const nextLesson = currentIndex >= 0 && currentIndex < allInCourse.length - 1 ? allInCourse[currentIndex + 1] : undefined;

  // Each lesson gets its own themed content block (heading, explanation,
  // runnable example, exercise) instead of the same block reused everywhere.
  const content = getLessonContent(lesson.courseId, lesson.sectionTitle, lesson.partIndex, lesson.title);
  const fileName = STARTER_FILE_NAMES[content.language] ?? "script.js";
  const starterCode = buildStarterCode(content.language, content.exercisePrompt);

  return (
    <AppShell>
      <div className="mb-8 border-b border-border pb-6">
        <p className="text-[11px] font-bold uppercase tracking-[0.15em] text-accent">
          {lesson.courseTitle} · {lesson.sectionTitle} · Lesson {lesson.index} of {lesson.totalInCourse}
        </p>
        <h1 className="mt-2 text-[30px] font-bold tracking-[-0.04em] text-foreground">{content.heading}</h1>
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-[17rem_minmax(0,1fr)]">
        <aside className="lg:order-1">
          <LessonSidebar
            lessons={allInCourse.map((l) => ({ id: l.id, title: l.title }))}
            activeLessonId={lesson.id}
            prevHref={prevLesson ? `/lessons/${prevLesson.id}` : undefined}
            nextHref={nextLesson ? `/lessons/${nextLesson.id}` : undefined}
          />
        </aside>

        <div className="space-y-8 lg:order-2">
          <LessonContent
            heading={content.heading}
            explanation={content.explanation}
            syntax={content.syntax}
            codeExample={content.codeExample}
            examples={content.examples}
            note={content.note}
            exercisePrompt={content.exercisePrompt}
            language={content.language}
            videoId={lesson.videoId}
            startSeconds={lesson.startSeconds}
          />

          <LearningHelp lesson={`Course: ${lesson.courseTitle}. Lesson: ${content.heading}.\n\nExplanation: ${content.explanation}\n\nExercise: ${content.exercisePrompt}`} />

          <CompleteLessonButton lessonId={lesson.id} />

          <div id="try-it-editor" className="scroll-mt-20">
            <CodeEditor
              key={lesson.id}
              files={[{ name: fileName, content: starterCode }]}
              language={content.language}
              exercisePrompt={content.exercisePrompt}
            />
          </div>
        </div>
      </div>
    </AppShell>
  );
}

