"use client";

import { createContext, useContext, useEffect, useState } from "react";

type Theme = "light" | "dark";

interface ThemeContextValue {
  theme: Theme;
  toggleTheme: () => void;
  setTheme: (theme: Theme) => void;
}

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

export const THEME_STORAGE_KEY = "rivocode-theme-v2";

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<Theme>("light");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const migrated = window.localStorage.getItem("rivocode-light-default-v1") === "1";
    let stored = window.localStorage.getItem(THEME_STORAGE_KEY) as Theme | null;
    if (!migrated) {
      if (stored === "dark") {
        stored = "light";
        window.localStorage.setItem(THEME_STORAGE_KEY, "light");
      }
      window.localStorage.setItem("rivocode-light-default-v1", "1");
    }
    // Default to light while preserving a later manual theme choice.
    const initial = stored ?? "light";
    // eslint-disable-next-line react-hooks/set-state-in-effect -- reads browser-only APIs (localStorage/matchMedia) that are unavailable during SSR, so the real theme can only be known after mount
    setThemeState(initial);
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    const root = document.documentElement;
    root.classList.toggle("dark", theme === "dark");
    window.localStorage.setItem(THEME_STORAGE_KEY, theme);
  }, [theme, mounted]);

  const setTheme = (next: Theme) => setThemeState(next);
  const toggleTheme = () => setThemeState((prev) => (prev === "light" ? "dark" : "light"));

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used within a ThemeProvider");
  return ctx;
}
