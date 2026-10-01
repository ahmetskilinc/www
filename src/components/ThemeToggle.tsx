"use client";

import { useTheme } from "@/components/ThemeProvider";
import { Moon, Sun } from "lucide-react";
import { useEffect, useRef, useState } from "react";

const THEME_TRANSITION_MS = 400;

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const transitionTimeout = useRef<number>(undefined);

  const toggleTheme = () => {
    // Enable colour transitions only for the duration of the switch.
    const root = document.documentElement;
    root.classList.add("theme-transition");
    window.clearTimeout(transitionTimeout.current);
    transitionTimeout.current = window.setTimeout(() => root.classList.remove("theme-transition"), THEME_TRANSITION_MS);

    setTheme(resolvedTheme === "dark" ? "light" : "dark");
  };

  useEffect(() => {
    setMounted(true);
    return () => window.clearTimeout(transitionTimeout.current);
  }, []);

  if (!mounted) {
    return <div className="w-8 h-8"></div>;
  }

  return (
    <button
      onClick={toggleTheme}
      className="w-8 h-8 flex items-center justify-center rounded-md bg-transparent hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors cursor-pointer"
      aria-label="Toggle theme"
    >
      {resolvedTheme === "dark" ? <Sun className="w-4 h-4 text-zinc-100" /> : <Moon className="w-4 h-4 text-zinc-900" />}
    </button>
  );
}
