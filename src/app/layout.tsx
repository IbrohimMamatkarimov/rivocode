import { StudioMotion } from "@/components/StudioMotion";
import type { Metadata } from "next";
import { ThemeProvider } from "@/components/theme/ThemeProvider";
import { LanguageProvider } from "@/components/theme/LanguageProvider";
import { AuthProvider } from "@/components/auth/AuthProvider";
import { LearningProgressProvider } from "@/components/progress/LearningProgressProvider";
import "./globals.css";

export const metadata: Metadata = {
  title: "RivoCode",
  description:
    "Lessons, practice, and projects for learning to code.",
  icons: {
    icon: "/rivocode-mark.svg",
    shortcut: "/rivocode-mark.svg",
    apple: "/rivocode-mark.svg",
  },
};

const themeInitScript = `
(function () {
  try {
    var key = "rivocode-theme-v2";
    var migration = "rivocode-light-default-v1";
    var stored = localStorage.getItem(key);
    if (!localStorage.getItem(migration)) {
      if (stored === "dark") {
        stored = "light";
        localStorage.setItem(key, "light");
      }
      localStorage.setItem(migration, "1");
    }
    if ((stored || "light") === "dark") document.documentElement.classList.add("dark");
  } catch (e) {}
})();
`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body className="antialiased">
        <StudioMotion />
        <ThemeProvider>
          <LanguageProvider>
            <AuthProvider><LearningProgressProvider>{children}</LearningProgressProvider></AuthProvider>
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
