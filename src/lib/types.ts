export type Difficulty = "Beginner" | "Intermediate" | "Advanced";

export type LessonStatus = "completed" | "current" | "available";

export interface Lesson {
  id: string;
  index: number;
  title: string;
  status: LessonStatus;
  durationMinutes: number;
  videoId?: string;
  // Where this lesson's clip starts inside videoId, in seconds. Lets many
  // themes share one long course video, each deep-linking into its own part
  // instead of every theme replaying the video from 0:00.
  startSeconds?: number;
  partIndex: number;
}

export interface LessonExample {
  // Optional label for this example card, e.g. "Example", "More examples",
  // "Try it another way". Defaults to "Example" in the UI when omitted.
  heading?: string;
  code: string;
  language: string;
  // Short callout shown under this specific example's code, W3Schools-style
  // ("Note: arrays are zero-indexed.").
  note?: string;
}

export interface LessonContentBlock {
  heading: string;
  // Main description. Separate paragraphs with a blank line (\n\n) — the
  // lesson page renders each as its own paragraph, same as a W3Schools
  // topic page's opening explanation.
  explanation: string;
  // Optional short "Syntax" reference line/block shown in its own box
  // above the first example, e.g. "array.push(item1, item2, ...)".
  syntax?: string;
  codeExample: string;
  language: string;
  // Additional worked examples shown after the primary one, each in its own
  // card — this is what makes a lesson feel like a full topic page instead
  // of a single snippet.
  examples?: LessonExample[];
  // A general callout tip for the lesson as a whole (shown before the
  // exercise), separate from any per-example note.
  note?: string;
  exercisePrompt: string;
}

export interface CourseSection {
  id: string;
  index: number;
  title: string;
  lessons: Lesson[];
}

export interface Course {
  id: string;
  slug: string;
  title: string;
  description: string;
  category: string;
  difficulty: string;
  icon: string;
  progress: number;
  totalLessons: number;
  completedLessons: number;
  sections: CourseSection[];
  rating?: number;
  students?: number;
  videoId?: string;
}

export interface LearningPathItem {
  id: string;
  courseId: string;
  title: string;
  levelLabel: string;
  progress: number;
  totalLessons: number;
  icon: string;
  started: boolean;
}

export interface Project {
  id: string;
  title: string;
  difficulty: Difficulty;
  technologies: string[];
  progress: number;
  description: string;
}

export interface Challenge {
  id: string;
  number: string;
  title: string;
  difficulty: "Easy" | "Medium" | "Hard";
  track: "JavaScript" | "Python" | "React" | "HTML/CSS";
  description: string;
}

export interface Achievement {
  id: string;
  label: string;
  icon: string;
  earned: boolean;
}

export interface SkillLevel {
  name: string;
  progress: number;
}

export interface WeekActivity {
  day: string;
  minutes: number;
}
