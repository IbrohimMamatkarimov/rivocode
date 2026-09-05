import type { SVGProps } from "react";

/**
 * Original course glyphs used across the studio. They deliberately borrow no
 * trademarked artwork; each mark is a compact visual shorthand for a topic.
 */

type LogoProps = SVGProps<SVGSVGElement> & { className?: string };

function Base({
  bg,
  bg2,
  rx = 7,
  children,
  ...props
}: LogoProps & { bg: string; bg2?: string; rx?: string | number; children: React.ReactNode }) {
  const fill = bg2 ? `url(#g-${bg.replace("#", "")}${bg2.replace("#", "")})` : bg;
  return (
    <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" {...props}>
      {bg2 && (
        <defs>
        <linearGradient id={`g-${bg.replace("#", "")}${bg2.replace("#", "")}`} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor={bg} />
            <stop offset="100%" stopColor={bg2} />
          </linearGradient>
        </defs>
      )}
      <rect width="24" height="24" rx={rx} fill={fill} />
      <path d="M3 5.5h18M3 18.5h18" stroke="#fff" strokeOpacity=".12" />
      {children}
    </svg>
  );
}

export function HtmlCssLogo(props: LogoProps) {
  return (
    <Base bg="#D95D4E" bg2="#F08A72" {...props}>
      <text
        x="12"
        y="16.5"
        textAnchor="middle"
        fontFamily="ui-monospace, Menlo, monospace"
        fontWeight="700"
        fontSize="9.5"
        fill="#fff"
      >
        {"</>"}
      </text>
    </Base>
  );
}

export function JavaScriptLogo(props: LogoProps) {
  return (
    <Base bg="#F1BF5A" {...props}>
      <text
        x="12"
        y="16.5"
        textAnchor="middle"
        fontFamily="ui-sans-serif, system-ui, sans-serif"
        fontWeight="800"
        fontSize="9.5"
        fill="#1a1a1a"
      >
        JS
      </text>
    </Base>
  );
}

export function ReactLogo(props: LogoProps) {
  return (
    <Base bg="#27213F" {...props}>
      <g stroke="#B6A8FF" fill="none" strokeWidth="1.1">
        <ellipse cx="12" cy="12" rx="7" ry="2.8" />
        <ellipse cx="12" cy="12" rx="7" ry="2.8" transform="rotate(60 12 12)" />
        <ellipse cx="12" cy="12" rx="7" ry="2.8" transform="rotate(120 12 12)" />
      </g>
      <circle cx="12" cy="12" r="1.6" fill="#B6A8FF" />
    </Base>
  );
}

export function PythonLogo(props: LogoProps) {
  return (
    <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" {...props}>
      <title>Python</title>
      <path
        fill="#3776AB"
        d="M12 2.2c-4 0-3.75 1.75-3.75 1.75v1.8h3.82v.55H6.72S4.1 6 4.1 10.15c0 4.15 2.3 4 2.3 4h1.38v-1.95s-.08-2.3 2.28-2.3h3.92s2.2.04 2.2-2.12V4.34S16.54 2.2 12 2.2Zm-2.1 1.25a.75.75 0 1 1 0 1.5.75.75 0 0 1 0-1.5Z"
      />
      <path
        fill="#FFD343"
        d="M12 21.8c4 0 3.75-1.75 3.75-1.75v-1.8h-3.82v-.55h5.35s2.62.35 2.62-3.8c0-4.15-2.3-4-2.3-4h-1.38v1.95s.08 2.3-2.28 2.3h-3.92s-2.2-.04-2.2 2.12v3.39S7.46 21.8 12 21.8Zm2.1-1.25a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5Z"
      />
    </svg>
  );
}

export function TypeScriptLogo(props: LogoProps) {
  return (
    <Base bg="#5D54D6" {...props}>
      <text
        x="12"
        y="16.5"
        textAnchor="middle"
        fontFamily="ui-sans-serif, system-ui, sans-serif"
        fontWeight="800"
        fontSize="9.5"
        fill="#fff"
      >
        TS
      </text>
    </Base>
  );
}

export function NodeLogo(props: LogoProps) {
  return (
    <Base bg="#28233D" bg2="#504278" {...props}>
      <path
        d="M12 3.2 20 7.6v8.8L12 20.8 4 16.4V7.6Z"
        fill="none"
        stroke="#C0B1FF"
        strokeWidth="1.4"
        strokeLinejoin="round"
      />
      <text
        x="12"
        y="15.2"
        textAnchor="middle"
        fontFamily="ui-sans-serif, system-ui, sans-serif"
        fontWeight="800"
        fontSize="6.5"
        fill="#C0B1FF"
      >
        JS
      </text>
    </Base>
  );
}

export function GitLogo(props: LogoProps) {
  return (
    <Base bg="#E06A59" {...props}>
      <g stroke="#fff" strokeWidth="1.4" fill="#fff">
        <circle cx="8.5" cy="7.5" r="1.4" />
        <circle cx="8.5" cy="16.5" r="1.4" fill="none" stroke="#fff" />
        <circle cx="15.5" cy="12" r="1.4" fill="none" stroke="#fff" />
        <path d="M8.5 9v6" fill="none" />
        <path d="M8.5 13c0-1.8 1.5-3 3.2-3H14" fill="none" />
      </g>
    </Base>
  );
}

export function DataScienceLogo(props: LogoProps) {
  return (
    <Base bg="#7C5DD8" bg2="#433593" {...props}>
      <g fill="#fff">
        <rect x="6.5" y="13" width="2.6" height="5" rx="0.6" />
        <rect x="10.7" y="9.5" width="2.6" height="8.5" rx="0.6" />
        <rect x="14.9" y="6" width="2.6" height="12" rx="0.6" />
      </g>
    </Base>
  );
}

export function CppLogo(props: LogoProps) {
  return (
    <Base bg="#356CC5" {...props}>
      <text
        x="12"
        y="16"
        textAnchor="middle"
        fontFamily="ui-sans-serif, system-ui, sans-serif"
        fontWeight="800"
        fontSize="8.5"
        fill="#fff"
      >
        C++
      </text>
    </Base>
  );
}

export function JavaLogo(props: LogoProps) {
  return (
    <Base bg="#B0472E" bg2="#E68A3D" {...props}>
      <path
        d="M9 15.5c1.5 1.4 5.5 1.4 6.5.2M8.3 18c2.3 1.1 6 .9 7.7-.5"
        fill="none"
        stroke="#fff"
        strokeWidth="1"
        strokeLinecap="round"
      />
      <path
        d="M12.3 6.2c1.6 1.4-2 2.8-.3 4.6 2.3 2.4-.6 3.7-.6 3.7"
        fill="none"
        stroke="#fff"
        strokeWidth="1.1"
        strokeLinecap="round"
      />
    </Base>
  );
}

export function SqlLogo(props: LogoProps) {
  return (
    <Base bg="#2F6FBD" bg2="#1D4C8C" {...props}>
      <g fill="none" stroke="#fff" strokeWidth="1.2">
        <ellipse cx="12" cy="7.2" rx="5.2" ry="2" />
        <path d="M6.8 7.2v9.6c0 1.1 2.3 2 5.2 2s5.2-.9 5.2-2V7.2" />
        <path d="M6.8 12c0 1.1 2.3 2 5.2 2s5.2-.9 5.2-2" />
      </g>
    </Base>
  );
}

export function CSharpLogo(props: LogoProps) {
  return (
    <Base bg="#6B3FA0" bg2="#8A5CC4" {...props}>
      <text
        x="12"
        y="16"
        textAnchor="middle"
        fontFamily="ui-sans-serif, system-ui, sans-serif"
        fontWeight="800"
        fontSize="9"
        fill="#fff"
      >
        C#
      </text>
    </Base>
  );
}

const registry: Record<string, (props: LogoProps) => React.JSX.Element> = {
  "html-css": HtmlCssLogo,
  "javascript-fundamentals": JavaScriptLogo,
  "react-essentials": ReactLogo,
  "python-basics": PythonLogo,
  "typescript-in-depth": TypeScriptLogo,
  "nodejs-fundamentals": NodeLogo,
  "git-github": GitLogo,
  "data-science-intro": DataScienceLogo,
  "cpp-fundamentals": CppLogo,
  "java-fundamentals": JavaLogo,
  "sql-fundamentals": SqlLogo,
  "csharp-fundamentals": CSharpLogo,
};

export function LanguageLogo({ courseId, className }: { courseId: string; className?: string }) {
  const Logo = registry[courseId] ?? JavaScriptLogo;
  return <Logo className={className} />;
}
