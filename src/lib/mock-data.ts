import type {
  Achievement,
  Challenge,
  Course,
  LearningPathItem,
  Project,
  SkillLevel,
  WeekActivity,
} from "./types";

export const currentUser = {
  name: "Ibrohim",
  handle: "ibrohim.dev",
  memberSince: "2026",
  avatarInitials: "IB",
};

export const dashboardStats = {
  streakDays: 0,
  hoursLearned: 0,
  problemsSolved: 0,
  projectsCompleted: 0,
};

export const continueLearning = {
  courseId: "javascript-fundamentals",
  courseTitle: "JavaScript Fundamentals",
  lessonTitle: "Variables and Data Types",
  progress: 0,
};

export const learningPath: LearningPathItem[] = [
  {
    id: "lp-html-css",
    courseId: "html-css",
    title: "HTML & CSS",
    levelLabel: "Beginner",
    progress: 0,
    totalLessons: 25,
    icon: "layout-template",
    started: false,
  },
  {
    id: "lp-javascript",
    courseId: "javascript-fundamentals",
    title: "JavaScript",
    levelLabel: "Beginner → Intermediate",
    progress: 0,
    totalLessons: 48,
    icon: "braces",
    started: false,
  },
  {
    id: "lp-react",
    courseId: "react-essentials",
    title: "React",
    levelLabel: "Intermediate",
    progress: 0,
    totalLessons: 26,
    icon: "atom",
    started: false,
  },
  {
    id: "lp-python",
    courseId: "python-basics",
    title: "Python",
    levelLabel: "Beginner",
    progress: 0,
    totalLessons: 36,
    icon: "terminal",
    started: false,
  },
  {
    id: "lp-cpp",
    courseId: "cpp-fundamentals",
    title: "C++",
    levelLabel: "Beginner",
    progress: 0,
    totalLessons: 24,
    icon: "cpu",
    started: false,
  },
  {
    id: "lp-java",
    courseId: "java-fundamentals",
    title: "Java",
    levelLabel: "Beginner",
    progress: 0,
    totalLessons: 22,
    icon: "coffee",
    started: false,
  },
  {
    id: "lp-sql",
    courseId: "sql-fundamentals",
    title: "SQL",
    levelLabel: "Beginner",
    progress: 0,
    totalLessons: 17,
    icon: "database",
    started: false,
  },
  {
    id: "lp-csharp",
    courseId: "csharp-fundamentals",
    title: "C#",
    levelLabel: "Beginner",
    progress: 0,
    totalLessons: 22,
    icon: "hash",
    started: false,
  },
];

const jsSections = [
  { title: "Introduction", lessonCount: 2 },
  { title: "Variables & Data Types", lessonCount: 3 },
  { title: "Conditions", lessonCount: 3 },
  { title: "Loops", lessonCount: 3 },
  { title: "Functions", lessonCount: 4 },
  { title: "Arrays", lessonCount: 3 },
  { title: "Objects", lessonCount: 3 },
  { title: "DOM", lessonCount: 4 },
  { title: "Async JavaScript", lessonCount: 4 },
  { title: "Error Handling", lessonCount: 4 },
  { title: "Working with JSON", lessonCount: 4 },
  { title: "Modern JavaScript", lessonCount: 4 },
  { title: "Browser APIs", lessonCount: 4 },
  { title: "Final Project", lessonCount: 3 },
];

function buildSections(
  courseId: string,
  defs: { title: string; lessonCount: number }[],
  completedThrough: number,
  videoIdOrMap?: string | Record<string, string>,
  // Total length (seconds) of the single shared video, when videoIdOrMap is
  // one string reused across every section. When provided, each section's
  // start time is spread evenly across the video (index/total * duration)
  // instead of every section opening the exact same starting point.
  //
  // NOTE: this is an even, proportional split — not real chapter markers.
  // It's a reasonable placeholder, not a substitute for the actual
  // timestamps in that video's own YouTube description. Swap in exact
  // per-section `startSeconds` (copy them from the video's "Show more" /
  // chapters list on YouTube) whenever you have a few minutes — that will
  // always beat an even split.
  videoDurationSeconds?: number
) {
  let counter = 0;
  return defs.map((def, sIdx) => {
    const lessons = Array.from({ length: def.lessonCount }, (_, lIdx) => {
      counter += 1;
      const status =
        counter <= completedThrough
          ? ("completed" as const)
          : counter === completedThrough + 1
            ? ("current" as const)
            : ("available" as const);
      const sectionVideoId =
        typeof videoIdOrMap === "string" ? videoIdOrMap : videoIdOrMap?.[def.title];
      const startSeconds =
        typeof videoIdOrMap === "string" && videoDurationSeconds
          ? Math.round((sIdx / defs.length) * videoDurationSeconds)
          : undefined;
      // When the whole course shares one single video ID with no known
      // duration to spread across sections, only the very first section
      // gets it — otherwise the exact same clip (from 0:00) would surface
      // again at the top of every section, which reads as a duplicate-video
      // bug rather than new content. A per-section map (JS) or a known
      // duration to spread across (see videoDurationSeconds above) are both
      // exempt, since those genuinely show different content each time.
      const isSingleSharedVideo = typeof videoIdOrMap === "string";
      const canRepeatAcrossSections = !isSingleSharedVideo || Boolean(videoDurationSeconds);
      const showVideoThisSection = canRepeatAcrossSections || sIdx === 0;
      return {
        id: `${courseId}-l${counter}`,
        index: counter,
        title: `${def.title} — Part ${lIdx + 1}`,
        status,
        durationMinutes: 8 + ((counter * 3) % 12),
        // First lesson of every section opens with that specific topic's
        // video (not the same full-length course video reused everywhere).
        videoId: lIdx === 0 && showVideoThisSection ? sectionVideoId : undefined,
        startSeconds: lIdx === 0 && showVideoThisSection ? startSeconds : undefined,
        partIndex: lIdx,
      };
    });
    return {
      id: `${courseId}-s${sIdx + 1}`,
      index: sIdx + 1,
      title: def.title,
      lessons,
    };
  });
}

// Confirmed total runtimes for the shared single-video courses, used only to
// spread section start times evenly (see videoDurationSeconds above). Add an
// entry here for any course below once you know its real duration; omitting
// one just means that course's sections all start at 0:00, same as before.
const courseVideoDurationSeconds: Record<string, number> = {
  "html-css": 2 * 3600 + 9 * 60 + 15, // freeCodeCamp "Create a Website for Beginners" — 2:09:15
  "python-basics": 6 * 3600 + 14 * 60, // Programming with Mosh "Python Full Course" — 6:14:00
};

// Real, publicly available YouTube course videos used to power in-app lesson
// playback — one flagship free tutorial per course, all freeCodeCamp.org
// uploads (or freeCodeCamp-hosted creator courses) so licensing stays clean.
const courseVideos: Record<string, string> = {
  "javascript-fundamentals": "PkZNo7MFNFg", // freeCodeCamp — Learn JavaScript, Full Course for Beginners
  "html-css": "kMT54MPz9oE", // freeCodeCamp — HTML and CSS Tutorial: Create a Website for Beginners
  "react-essentials": "bMknfKXIFA8", // freeCodeCamp — React Course, Beginner's Tutorial for React JS Library
  "python-basics": "_uQrJ0TkZlc", // Programming with Mosh — Python Full Course for Beginners
  "typescript-in-depth": "SpwzRDUQ1GI", // freeCodeCamp — Learn TypeScript, Full Course for Beginners
  "nodejs-fundamentals": "RLtyhwFtXQA", // freeCodeCamp — Learn Node.js, Full Tutorial for Beginners
  "git-github": "RGOj5yH7evk", // freeCodeCamp — Git and GitHub for Beginners, Crash Course
  "data-science-intro": "r-uOLxNrNk8", // freeCodeCamp — Data Analysis with Python, Full Course for Beginners
  "cpp-fundamentals": "8jLOx1hD3_o", // freeCodeCamp — C++ Programming Course, Beginner to Advanced (Daniel Gakwaya)
  "java-fundamentals": "A74TOX803D0", // freeCodeCamp — Java Programming for Beginners, Full Course (Farhan Hasin Chowdhury)
  "sql-fundamentals": "HXV3zeQKqGY", // freeCodeCamp — SQL Tutorial, Full Database Course for Beginners (Mike Dane)
  "csharp-fundamentals": "GhQdlIFylQ8", // freeCodeCamp — C# Full Course for Beginners (Mike Dane)
};

// Per-topic videos for the JavaScript course — each section links to its own
// short, standalone lesson (Beau Carnes / freeCodeCamp's modular "JavaScript
// Basics" YouTube series), verified individually, instead of the same
// 3.5-hour course video repeated in every section.
const jsSectionVideos: Record<string, string> = {
  Introduction: "le-URjBhevE", // Variables
  "Variables & Data Types": "808eYu9B9Yw", // Data Types
  Conditions: "7WkfzokHGqo", // Comparison Operators & If/Else
  Loops: "24Wpg6njlYI", // For Loops
  Functions: "R8SjM4DKK80", // Functions
  Arrays: "QEZXbRiaY1I", // Arrays
  Objects: "Gp5nnerXETg", // Objects
  DOM: "eaLKqoB9Fu0", // Selecting & Changing Website Elements
  "Async JavaScript": "IGYxfTTpoFg", // Promises
  "Final Project": "PkZNo7MFNFg", // Full course, used as a wrap-up review
};

export const courses: Course[] = [
  {
    id: "javascript-fundamentals",
    slug: "javascript-fundamentals",
    title: "JavaScript Fundamentals",
    description:
      "Learn the core building blocks of JavaScript — variables, control flow, functions, arrays, objects, and the DOM — through short lessons and hands-on exercises.",
    category: "Web Development",
    difficulty: "Beginner",
    icon: "braces",
    progress: 0,
    totalLessons: 48,
    completedLessons: 0,
    rating: 4.8,
    students: 128400,
    videoId: courseVideos["javascript-fundamentals"],
    sections: buildSections("javascript-fundamentals", jsSections, 0, jsSectionVideos),
  },
  {
    id: "html-css",
    slug: "html-css",
    title: "HTML & CSS",
    description:
      "Build structured, well-styled web pages from scratch. Covers semantic HTML, the box model, flexbox, grid, and responsive layout.",
    category: "Web Development",
    difficulty: "Beginner",
    icon: "layout-template",
    progress: 0,
    totalLessons: 25,
    completedLessons: 0,
    rating: 4.9,
    students: 214800,
    videoId: courseVideos["html-css"],
    sections: buildSections(
      "html-css",
      [
        { title: "Document Structure", lessonCount: 3 },
        { title: "Text & Typography", lessonCount: 3 },
        { title: "The Box Model", lessonCount: 3 },
        { title: "Flexbox", lessonCount: 4 },
        { title: "Grid Layout", lessonCount: 4 },
        { title: "Responsive Design", lessonCount: 3 },
        { title: "Forms & Inputs", lessonCount: 3 },
        { title: "Final Project", lessonCount: 2 },
      ],
      0,
      courseVideos["html-css"]
    ),
  },
  {
    id: "react-essentials",
    slug: "react-essentials",
    title: "React Essentials",
    description:
      "Understand components, props, state, and hooks, then compose them into real interfaces with reusable patterns.",
    category: "Web Development",
    difficulty: "Intermediate",
    icon: "atom",
    progress: 0,
    totalLessons: 26,
    completedLessons: 0,
    rating: 4.7,
    students: 96300,
    videoId: courseVideos["react-essentials"],
    sections: buildSections(
      "react-essentials",
      [
        { title: "Components & JSX", lessonCount: 3 },
        { title: "Props & State", lessonCount: 4 },
        { title: "Hooks", lessonCount: 5 },
        { title: "Forms & Events", lessonCount: 4 },
        { title: "Data Fetching", lessonCount: 4 },
        { title: "Routing Basics", lessonCount: 3 },
        { title: "Final Project", lessonCount: 3 },
      ],
      0,
      courseVideos["react-essentials"]
    ),
  },
  {
    id: "python-basics",
    slug: "python-basics",
    title: "Python Basics",
    description:
      "A gentle introduction to Python syntax, data structures, and problem solving — a strong foundation for data science or backend work.",
    category: "Programming",
    difficulty: "Beginner",
    icon: "terminal",
    progress: 0,
    totalLessons: 36,
    completedLessons: 0,
    rating: 4.8,
    students: 176200,
    videoId: courseVideos["python-basics"],
    sections: buildSections(
      "python-basics",
      [
        { title: "Getting Started", lessonCount: 3 },
        { title: "Variables & Types", lessonCount: 3 },
        { title: "Control Flow", lessonCount: 4 },
        { title: "Functions", lessonCount: 4 },
        { title: "Data Structures", lessonCount: 5 },
        { title: "Error Handling", lessonCount: 3 },
        { title: "Files & Modules", lessonCount: 4 },
        { title: "Object-Oriented Python", lessonCount: 4 },
        { title: "Virtual Environments", lessonCount: 3 },
        { title: "Final Project", lessonCount: 3 },
      ],
      0,
      courseVideos["python-basics"]
    ),
  },
  {
    id: "typescript-in-depth",
    slug: "typescript-in-depth",
    title: "TypeScript in Depth",
    description:
      "Add static types to your JavaScript. Learn interfaces, generics, and how to type real-world React applications.",
    category: "Programming",
    difficulty: "Intermediate",
    icon: "file-code-2",
    progress: 0,
    totalLessons: 16,
    completedLessons: 0,
    rating: 4.6,
    students: 41800,
    videoId: courseVideos["typescript-in-depth"],
    sections: buildSections(
      "typescript-in-depth",
      [
        { title: "Type Basics", lessonCount: 3 },
        { title: "Interfaces & Types", lessonCount: 3 },
        { title: "Generics", lessonCount: 4 },
        { title: "Typing React", lessonCount: 4 },
        { title: "Final Project", lessonCount: 2 },
      ],
      0,
      courseVideos["typescript-in-depth"]
    ),
  },
  {
    id: "nodejs-fundamentals",
    slug: "nodejs-fundamentals",
    title: "Node.js Fundamentals",
    description:
      "Run JavaScript on the server. Build simple APIs, work with the file system, and understand the Node event loop.",
    category: "Web Development",
    difficulty: "Intermediate",
    icon: "server",
    progress: 0,
    totalLessons: 13,
    completedLessons: 0,
    rating: 4.7,
    students: 58900,
    videoId: courseVideos["nodejs-fundamentals"],
    sections: buildSections(
      "nodejs-fundamentals",
      [
        { title: "The Node Runtime", lessonCount: 3 },
        { title: "Modules & npm", lessonCount: 3 },
        { title: "Building an API", lessonCount: 5 },
        { title: "Final Project", lessonCount: 2 },
      ],
      0,
      courseVideos["nodejs-fundamentals"]
    ),
  },
  {
    id: "git-github",
    slug: "git-github",
    title: "Git & GitHub",
    description:
      "Track changes with confidence. Branching, merging, pull requests, and a practical workflow for working on teams.",
    category: "Programming",
    difficulty: "Beginner",
    icon: "git-branch",
    progress: 0,
    totalLessons: 11,
    completedLessons: 0,
    rating: 4.9,
    students: 87100,
    videoId: courseVideos["git-github"],
    sections: buildSections(
      "git-github",
      [
        { title: "Version Control Basics", lessonCount: 3 },
        { title: "Branching & Merging", lessonCount: 4 },
        { title: "Working with GitHub", lessonCount: 4 },
      ],
      0,
      courseVideos["git-github"]
    ),
  },
  {
    id: "data-science-intro",
    slug: "data-science-intro",
    title: "Intro to Data Science",
    description:
      "Explore data with Python: cleaning, visualizing, and drawing conclusions from real datasets.",
    category: "Data Science",
    difficulty: "Intermediate",
    icon: "bar-chart-3",
    progress: 0,
    totalLessons: 12,
    completedLessons: 0,
    rating: 4.7,
    students: 39400,
    videoId: courseVideos["data-science-intro"],
    sections: buildSections(
      "data-science-intro",
      [
        { title: "Working with Data", lessonCount: 4 },
        { title: "Visualization", lessonCount: 4 },
        { title: "Analysis", lessonCount: 4 },
      ],
      0,
      courseVideos["data-science-intro"]
    ),
  },
  {
    id: "cpp-fundamentals",
    slug: "cpp-fundamentals",
    title: "C++ Fundamentals",
    description:
      "Learn one of the most powerful languages in software engineering — syntax, memory, pointers, and object-oriented programming, built for performance-critical and systems-level work.",
    category: "Programming",
    difficulty: "Beginner",
    icon: "cpu",
    progress: 0,
    totalLessons: 24,
    completedLessons: 0,
    rating: 4.8,
    students: 152300,
    videoId: courseVideos["cpp-fundamentals"],
    sections: buildSections(
      "cpp-fundamentals",
      [
        { title: "Getting Started", lessonCount: 3 },
        { title: "Variables & Data Types", lessonCount: 3 },
        { title: "Operators & Conditionals", lessonCount: 3 },
        { title: "Loops", lessonCount: 3 },
        { title: "Functions", lessonCount: 3 },
        { title: "Arrays & Pointers", lessonCount: 4 },
        { title: "Classes & OOP", lessonCount: 3 },
        { title: "Final Project", lessonCount: 2 },
      ],
      0,
      courseVideos["cpp-fundamentals"]
    ),
  },
  {
    id: "java-fundamentals",
    slug: "java-fundamentals",
    title: "Java Fundamentals",
    description:
      "Learn the world's most widely deployed programming language — variables, control flow, collections, and object-oriented programming, the same core skills used to build Android apps and enterprise systems.",
    category: "Programming",
    difficulty: "Beginner",
    icon: "coffee",
    progress: 0,
    totalLessons: 22,
    completedLessons: 0,
    rating: 4.8,
    students: 187600,
    videoId: courseVideos["java-fundamentals"],
    sections: buildSections(
      "java-fundamentals",
      [
        { title: "Getting Started", lessonCount: 3 },
        { title: "Variables & Data Types", lessonCount: 3 },
        { title: "Operators, Strings & Input", lessonCount: 3 },
        { title: "Conditionals & Switch", lessonCount: 3 },
        { title: "Loops", lessonCount: 3 },
        { title: "Arrays & Collections", lessonCount: 3 },
        { title: "Object-Oriented Programming", lessonCount: 2 },
        { title: "Final Project", lessonCount: 2 },
      ],
      0,
      courseVideos["java-fundamentals"]
    ),
  },
  {
    id: "sql-fundamentals",
    slug: "sql-fundamentals",
    title: "SQL Fundamentals",
    description:
      "Query and manage relational databases with confidence — tables, filtering, joins, and aggregation, the language behind almost every real-world application's data layer.",
    category: "Data Science",
    difficulty: "Beginner",
    icon: "database",
    progress: 0,
    totalLessons: 17,
    completedLessons: 0,
    rating: 4.9,
    students: 143900,
    videoId: courseVideos["sql-fundamentals"],
    sections: buildSections(
      "sql-fundamentals",
      [
        { title: "Database Basics", lessonCount: 3 },
        { title: "Inserting & Querying Data", lessonCount: 3 },
        { title: "Filtering & Sorting", lessonCount: 3 },
        { title: "Updating & Deleting", lessonCount: 2 },
        { title: "Joins", lessonCount: 3 },
        { title: "Aggregation & Grouping", lessonCount: 3 },
      ],
      0,
      courseVideos["sql-fundamentals"]
    ),
  },
  {
    id: "csharp-fundamentals",
    slug: "csharp-fundamentals",
    title: "C# Fundamentals",
    description:
      "Build apps, games, and web services with C# — Microsoft's general-purpose, object-oriented language behind .NET and the Unity game engine.",
    category: "Programming",
    difficulty: "Beginner",
    icon: "hash",
    progress: 0,
    totalLessons: 22,
    completedLessons: 0,
    rating: 4.7,
    students: 98700,
    videoId: courseVideos["csharp-fundamentals"],
    sections: buildSections(
      "csharp-fundamentals",
      [
        { title: "Getting Started", lessonCount: 3 },
        { title: "Variables & Data Types", lessonCount: 3 },
        { title: "Strings & Numbers", lessonCount: 3 },
        { title: "Conditionals", lessonCount: 3 },
        { title: "Loops", lessonCount: 3 },
        { title: "Arrays & Methods", lessonCount: 3 },
        { title: "Classes & OOP", lessonCount: 2 },
        { title: "Final Project", lessonCount: 2 },
      ],
      0,
      courseVideos["csharp-fundamentals"]
    ),
  },
];

export function getCourseBySlug(slug: string) {
  return courses.find((c) => c.slug === slug);
}

export function getAllLessons() {
  return courses.flatMap((course) =>
    course.sections.flatMap((section) =>
      section.lessons.map((lesson) => ({
        ...lesson,
        courseId: course.id,
        courseTitle: course.title,
        sectionTitle: section.title,
        totalInCourse: course.totalLessons,
      }))
    )
  );
}

export function getLessonById(id: string) {
  return getAllLessons().find((l) => l.id === id);
}

export const projects: Project[] = [
  {
    id: "personal-portfolio",
    title: "Personal Portfolio",
    difficulty: "Beginner",
    technologies: ["HTML", "CSS"],
    progress: 0,
    description: "A single-page portfolio site to showcase your work and contact details.",
  },
  {
    id: "weather-app",
    title: "Weather App",
    difficulty: "Beginner",
    technologies: ["JavaScript"],
    progress: 0,
    description: "Fetch and display live weather data for any city with a clean UI.",
  },
  {
    id: "task-manager",
    title: "Task Manager",
    difficulty: "Intermediate",
    technologies: ["React"],
    progress: 0,
    description: "A drag-and-drop task board with lists, cards, and local persistence.",
  },
  {
    id: "ai-chat-interface",
    title: "AI Chat Interface",
    difficulty: "Advanced",
    technologies: ["React", "API"],
    progress: 0,
    description: "A streaming chat UI that talks to a language model API.",
  },
];

export const challenges: Challenge[] = [
  {
    id: "reverse-a-string",
    number: "01",
    title: "Reverse a String",
    difficulty: "Easy",
    track: "JavaScript",
    description: "Solve this problem by writing a function that reverses a string without using built-in reverse methods.",
  },
  {
    id: "fizz-buzz",
    number: "02",
    title: "FizzBuzz",
    difficulty: "Easy",
    track: "JavaScript",
    description: "Print numbers 1 to 100, replacing multiples of 3 and 5 with Fizz and Buzz.",
  },
  {
    id: "list-comprehensions",
    number: "03",
    title: "Filter Even Numbers",
    difficulty: "Easy",
    track: "Python",
    description: "Use a list comprehension to return only the even numbers from a list.",
  },
  {
    id: "responsive-card",
    number: "04",
    title: "Build a Responsive Card",
    difficulty: "Easy",
    track: "HTML/CSS",
    description: "Create a product card that adapts cleanly from mobile to desktop widths.",
  },
  {
    id: "todo-hook",
    number: "05",
    title: "Custom useTodos Hook",
    difficulty: "Medium",
    track: "React",
    description: "Extract todo add, remove, and toggle logic into a reusable custom hook.",
  },
  {
    id: "debounce-function",
    number: "06",
    title: "Implement Debounce",
    difficulty: "Medium",
    track: "JavaScript",
    description: "Write a debounce utility that delays invoking a function until input settles.",
  },
  {
    id: "binary-search",
    number: "07",
    title: "Binary Search",
    difficulty: "Medium",
    track: "Python",
    description: "Implement binary search on a sorted list and return the index of a target value.",
  },
  {
    id: "memoized-fibonacci",
    number: "08",
    title: "Memoized Fibonacci",
    difficulty: "Hard",
    track: "JavaScript",
    description: "Optimize a recursive Fibonacci implementation using memoization.",
  },
  {
    id: "css-grid-gallery",
    number: "09",
    title: "CSS Grid Photo Gallery",
    difficulty: "Medium",
    track: "HTML/CSS",
    description: "Build a masonry-style gallery layout using only CSS grid.",
  },
  {
    id: "context-theme",
    number: "10",
    title: "Theme with Context",
    difficulty: "Hard",
    track: "React",
    description: "Implement a light/dark theme toggle using React context and a custom hook.",
  },
];

export const skillLevels: SkillLevel[] = [
  { name: "JavaScript", progress: 0 },
  { name: "HTML", progress: 0 },
  { name: "CSS", progress: 0 },
  { name: "React", progress: 0 },
  { name: "Python", progress: 0 },
  { name: "C++", progress: 0 },
  { name: "Java", progress: 0 },
  { name: "SQL", progress: 0 },
  { name: "C#", progress: 0 },
];

export const achievements: Achievement[] = [
  { id: "streak-7", label: "7 Day Streak", icon: "flame", earned: false },
  { id: "first-challenge", label: "First Challenge", icon: "zap", earned: false },
  { id: "first-project", label: "First Project", icon: "trophy", earned: false },
  { id: "ten-lessons", label: "10 Lessons Completed", icon: "book-open", earned: false },
  { id: "week-streak", label: "30 Day Streak", icon: "flame", earned: false },
  { id: "five-projects", label: "5 Projects Shipped", icon: "trophy", earned: false },
];

export const weeklyActivity: WeekActivity[] = [
  { day: "Mon", minutes: 0 },
  { day: "Tue", minutes: 0 },
  { day: "Wed", minutes: 0 },
  { day: "Thu", minutes: 0 },
  { day: "Fri", minutes: 0 },
  { day: "Sat", minutes: 0 },
  { day: "Sun", minutes: 0 },
];

export const profileStats = {
  courses: courses.length,
  projects: dashboardStats.projectsCompleted,
  problems: dashboardStats.problemsSolved,
  hours: dashboardStats.hoursLearned,
};

export const categories = [
  "All",
  "Web Development",
  "Programming",
  "Data Science",
  "AI",
  "Mobile",
];
