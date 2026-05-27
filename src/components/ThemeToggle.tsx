"use client";

import { useTheme } from "@/components/ThemeProvider";
import { useEffect, useState } from "react";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div className="w-7 h-7" aria-hidden />;
  }

  return (
    <button
      onClick={toggleTheme}
      className="group w-7 h-7 flex items-center justify-center rounded-full border border-divider hover:border-paper transition-colors cursor-pointer"
      aria-label="Toggle theme"
    >
      <span className="w-2.5 h-2.5 rounded-full bg-paper transition-colors" />
    </button>
  );
}
