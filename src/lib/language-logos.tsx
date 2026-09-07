import type { SVGProps } from "react";

/** Brand marks shared by the dashboard, course cards, and course picker. */

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
      {children}
    </svg>
  );
}

export function HtmlCssLogo(props: LogoProps) {
  return (
    <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path fill="#E44D26" d="M3 2h18l-1.64 18.43L12 22l-7.36-2.07L3 2Z" />
      <path fill="#F16529" d="M12 3.5v16.94l5.86-1.65L19.2 3.5H12Z" />
      <text
        x="12"
        y="16.7"
        textAnchor="middle"
        fontFamily="ui-monospace, Menlo, monospace"
        fontWeight="700"
        fontSize="10"
        fill="#fff"
      >
        5
      </text>
    </svg>
  );
}

export function JavaScriptLogo(props: LogoProps) {
  return (
    <Base bg="#F7DF1E" rx="0" {...props}>
      <text
        x="12"
        y="16.5"
        textAnchor="middle"
        fontFamily="ui-sans-serif, system-ui, sans-serif"
        fontWeight="800"
        fontSize="9.5"
        fill="#000"
      >
        JS
      </text>
    </Base>
  );
}

export function ReactLogo(props: LogoProps) {
  return (
    <Base bg="#20232A" {...props}>
      <g stroke="#61DAFB" fill="none" strokeWidth="1.1">
        <ellipse cx="12" cy="12" rx="7" ry="2.8" />
        <ellipse cx="12" cy="12" rx="7" ry="2.8" transform="rotate(60 12 12)" />
        <ellipse cx="12" cy="12" rx="7" ry="2.8" transform="rotate(120 12 12)" />
      </g>
      <circle cx="12" cy="12" r="1.6" fill="#61DAFB" />
    </Base>
  );
}

export function PythonLogo(props: LogoProps) {
  return (
    <Base bg="#FFFFFF" {...props}>
      {/* Official Python two-snake mark. */}
      <path
        fill="#3776AB"
        d="M12 2c-4.57 0-4.28 1.98-4.28 1.98l.01 2.05h4.36v.62H6.02S3 6.3 3 11.36c0 5.05 2.64 4.87 2.64 4.87h1.57v-2.2s-.08-2.64 2.61-2.64h4.49s2.52.04 2.52-2.43V4.39S17.2 2 12 2ZM9.6 3.4a.79.79 0 1 1 0 1.58.79.79 0 0 1 0-1.58Z"
      />
      <path
        fill="#FFD43B"
        d="M12 22c4.57 0 4.28-1.98 4.28-1.98l-.01-2.05h-4.36v-.62h6.07S21 17.7 21 12.64c0-5.05-2.64-4.87-2.64-4.87h-1.57v2.2s.08 2.64-2.61 2.64H9.69s-2.52-.04-2.52 2.43v4.57S6.8 22 12 22Zm2.4-1.4a.79.79 0 1 1 0-1.58.79.79 0 0 1 0 1.58Z"
      />
    </Base>
  );
}

export function TypeScriptLogo(props: LogoProps) {
  return (
    <Base bg="#3178C6" rx="0" {...props}>
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
    <Base bg="#5FA04E" {...props}>
      <path
        d="M12 3.2 20 7.6v8.8L12 20.8 4 16.4V7.6Z"
        fill="none"
        stroke="#fff"
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
        fill="#fff"
      >
        JS
      </text>
    </Base>
  );
}

export function GitLogo(props: LogoProps) {
  return (
    <Base bg="#F05032" {...props}>
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
    <Base bg="#150458" {...props}>
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
    <Base bg="#00599C" {...props}>
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
    <Base bg="#ED8B00" {...props}>
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
    <Base bg="#336791" {...props}>
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
    <Base bg="#512BD4" {...props}>
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
