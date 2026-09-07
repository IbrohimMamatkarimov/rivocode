const GLYPHS = [
  { text: "</>", top: "8%", left: "10%", size: "text-3xl", delay: "0s", duration: "6s" },
  { text: "{ }", top: "18%", left: "82%", size: "text-2xl", delay: "-1.4s", duration: "7.5s" },
  { text: "=>", top: "78%", left: "12%", size: "text-2xl", delay: "-3s", duration: "5.5s" },
  { text: "if()", top: "62%", left: "86%", size: "text-xl", delay: "-2.1s", duration: "6.8s" },
  { text: "[ ]", top: "38%", left: "4%", size: "text-xl", delay: "-4s", duration: "8s" },
  { text: "01", top: "88%", left: "78%", size: "text-lg", delay: "-2.6s", duration: "6.2s" },
  { text: "npm i", top: "6%", left: "68%", size: "text-lg", delay: "-1s", duration: "7s" },
  { text: "const", top: "50%", left: "92%", size: "text-lg", delay: "-3.6s", duration: "6.5s" },
];

export function LoginFormBackdrop() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      {GLYPHS.map((glyph, i) => (
        <span
          key={i}
          className={`float-slow absolute select-none font-mono font-bold text-muted-2/[0.08] dark:text-accent-2/[0.09] ${glyph.size}`}
          style={{
            top: glyph.top,
            left: glyph.left,
            animationDelay: glyph.delay,
            animationDuration: glyph.duration,
          }}
        >
          {glyph.text}
        </span>
      ))}
    </div>
  );
}
