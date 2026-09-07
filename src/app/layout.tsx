import type { Metadata } from "next";
import { ThemeProvider } from "@/components/theme/ThemeProvider";
import { LanguageProvider } from "@/components/theme/LanguageProvider";
import { AuthProvider } from "@/components/auth/AuthProvider";
import { LearningProgressProvider } from "@/components/progress/LearningProgressProvider";
import "./globals.css";

export const metadata: Metadata = {
  title: "RivoCode",
  description:
    "RivoCode is a focused platform for learning programming through short lessons, hands-on practice, and real projects.",
  icons: {
    icon: "/rivocode-mark.svg",
    shortcut: "/rivocode-mark.svg",
    apple: "/rivocode-mark.svg",
  },
};

const themeInitScript = `
(function () {
  try {
    var stored = localStorage.getItem("rivocode-theme-v2");
    var theme = stored || "light";
    if (theme === "dark") document.documentElement.classList.add("dark");
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
        <ThemeProvider>
          <LanguageProvider>
            <AuthProvider><LearningProgressProvider>{children}</LearningProgressProvider></AuthProvider>
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
