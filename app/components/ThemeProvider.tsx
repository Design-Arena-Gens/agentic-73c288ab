"use client";

import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState
} from "react";

export type Theme = "light" | "dark";

interface ThemeContextValue {
  theme: Theme;
  toggleTheme: () => void;
  setTheme: (theme: Theme) => void;
}

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

const prefersDark = () =>
  typeof window !== "undefined" && window.matchMedia("(prefers-color-scheme: dark)").matches;

const THEME_KEY = "tarot-marseille-theme";

export default function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<Theme>("light");

  const applyTheme = useCallback((value: Theme) => {
    setThemeState(value);
    if (typeof document !== "undefined") {
      document.documentElement.setAttribute("data-theme", value);
    }
    if (typeof window !== "undefined") {
      window.localStorage.setItem(THEME_KEY, value);
    }
  }, []);

  const toggleTheme = useCallback(() => {
    applyTheme(theme === "light" ? "dark" : "light");
  }, [applyTheme, theme]);

  useEffect(() => {
    const stored = window.localStorage.getItem(THEME_KEY) as Theme | null;
    if (stored === "light" || stored === "dark") {
      applyTheme(stored);
      return;
    }
    const dark = prefersDark() ? "dark" : "light";
    applyTheme(dark);
  }, [applyTheme]);

  const value = useMemo(
    () => ({
      theme,
      toggleTheme,
      setTheme: applyTheme
    }),
    [applyTheme, theme, toggleTheme]
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export const useTheme = () => {
  const ctx = useContext(ThemeContext);
  if (!ctx) {
    throw new Error("useTheme must be used within ThemeProvider");
  }
  return ctx;
};
