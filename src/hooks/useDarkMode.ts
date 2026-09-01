"use client";

import { useState, useEffect, useCallback } from "react";

const STORAGE_KEY = "theme";
const DARK_CLASS = "dark";

/** Returns the preferred theme, checking localStorage then OS preference. */
function getInitialDark(): boolean {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored !== null) return stored === "dark";
  } catch {
    // localStorage not available (SSR guard)
  }
  return window.matchMedia("(prefers-color-scheme: dark)").matches;
}

export function useDarkMode() {
  // Initialise from storage so the value is correct from the very first render
  const [isDark, setIsDark] = useState<boolean>(() => {
    if (typeof window === "undefined") return false;
    return getInitialDark();
  });

  // Keep <html> class and localStorage in sync whenever isDark changes
  useEffect(() => {
    document.documentElement.classList.toggle(DARK_CLASS, isDark);
    try {
      localStorage.setItem(STORAGE_KEY, isDark ? "dark" : "light");
    } catch {
      // ignore
    }
  }, [isDark]);

  const toggle = useCallback(() => setIsDark((d) => !d), []);

  return { isDark, toggle };
}
