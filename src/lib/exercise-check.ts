// A lightweight, honest exercise checker. It can't run every language in
// the browser, so instead of pretending everything passes, it checks the
// student's code against concrete signals pulled from the exercise prompt
// itself: quoted phrases the output/markup must contain, and common
// language keywords/tags the prompt implies are required.

export interface ExerciseCheckResult {
  passed: boolean;
  feedback: string[];
}

// Tag/keyword hints: if the prompt mentions the left-hand phrase, the code
// should contain something matching the right-hand pattern.
const HTML_HINTS: [RegExp, RegExp, string][] = [
  [/\btitle\b/i, /<title[\s>]/i, "Add a <title> tag."],
  [/\bheading\b|\bh1\b/i, /<h[1-6][\s>]/i, "Add a heading tag (like <h1>)."],
  [/\bparagraph\b/i, /<p[\s>]/i, "Add a <p> paragraph tag."],
  [/\blink\b/i, /<a\s+[^>]*href=/i, "Add an <a href=\"...\"> link."],
  [/\bimage\b/i, /<img\s+[^>]*src=/i, "Add an <img src=\"...\"> tag."],
  [/\bstrong\b/i, /<strong[\s>]/i, "Use a <strong> tag."],
  [/\bem\b|\bemphasi[sz]/i, /<em[\s>]/i, "Use an <em> tag."],
  [/\bnav\b/i, /<nav[\s>]/i, "Add a <nav> tag."],
  [/\bheader\b/i, /<header[\s>]/i, "Add a <header> tag."],
  [/\bfooter\b/i, /<footer[\s>]/i, "Add a <footer> tag."],
  [/\bmain\b/i, /<main[\s>]/i, "Add a <main> tag."],
  [/\bform\b/i, /<form[\s>]/i, "Add a <form> tag."],
];

const CSS_HINTS: [RegExp, RegExp, string][] = [
  [/\bpadding\b/i, /padding\s*:/i, "Set a padding value."],
  [/\bmargin\b/i, /margin\s*:/i, "Set a margin value."],
  [/\bborder\b/i, /border\s*:/i, "Set a border value."],
  [/\bflex\b/i, /display\s*:\s*flex/i, "Set display: flex."],
  [/\bgrid\b/i, /display\s*:\s*grid/i, "Set display: grid."],
  [/\bcolor\b/i, /(?<!background-)color\s*:/i, "Set a color value."],
  [/\bfont-size\b|\bfont size\b/i, /font-size\s*:/i, "Set a font-size value."],
  [/\bborder-radius\b|\brounded\b/i, /border-radius\s*:/i, "Set a border-radius value."],
  [/\bbackground\b/i, /background(-color)?\s*:/i, "Set a background value."],
  [/\bmedia query\b/i, /@media/i, "Add an @media rule."],
];

const GENERIC_HINTS: [RegExp, RegExp, string][] = [
  [/\bfunction\b/i, /function\s+\w+|=>|def\s+\w+/i, "Define a function."],
  [/\bloop\b|\bfor loop\b/i, /\bfor\s*[\s(]/i, "Use a for loop."],
  [/\bwhile loop\b/i, /\bwhile\s*[\s(]/i, "Use a while loop."],
  [/\bif\b.*\belse\b|if\/else|if-else/i, /\bif\s*[\s(]/i, "Use an if statement."],
  [/console\.log|\bprint\b/i, /console\.log|print\s*\(/i, "Print or log some output."],
  [/\bclass\b/i, /\bclass\s+\w+/i, "Define a class."],
];

function extractQuotedPhrases(prompt: string): string[] {
  const matches = prompt.match(/"([^"]+)"/g) ?? [];
  return matches
    .map((m) => m.slice(1, -1))
    .filter((phrase) => phrase.length > 1 && phrase.length < 40 && !phrase.includes("${"));
}

export function checkExercise(language: string, code: string, exercisePrompt: string): ExerciseCheckResult {
  const feedback: string[] = [];
  const trimmed = code.trim();

  if (!trimmed || trimmed.split("\n").every((line) => /^\s*(\/\/|#|<!--)/.test(line) || line.trim() === "")) {
    return { passed: false, feedback: ["Write some code below the instructions before submitting."] };
  }

  // 1. Any phrase the prompt quotes verbatim should show up in the code —
  // this is usually the exact output/text the exercise is asking for.
  for (const phrase of extractQuotedPhrases(exercisePrompt)) {
    if (!code.toLowerCase().includes(phrase.toLowerCase())) {
      feedback.push(`Your code should include "${phrase}".`);
    }
  }

  // 2. Language-relevant structural hints implied by the prompt's wording.
  const hintSets =
    language === "html" ? [HTML_HINTS, GENERIC_HINTS] : language === "css" ? [CSS_HINTS] : [GENERIC_HINTS];

  for (const hints of hintSets) {
    for (const [promptPattern, codePattern, message] of hints) {
      if (promptPattern.test(exercisePrompt) && !codePattern.test(code)) {
        feedback.push(message);
      }
    }
  }

  // De-duplicate feedback while preserving order.
  const uniqueFeedback = Array.from(new Set(feedback));

  return { passed: uniqueFeedback.length === 0, feedback: uniqueFeedback };
}
