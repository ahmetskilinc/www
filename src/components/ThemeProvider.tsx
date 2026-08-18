"use client";

import { ThemeProvider as NextThemesProvider } from "next-themes";

export { useTheme } from "next-themes";

type ThemeProviderProps = {
  children: React.ReactNode;
  defaultTheme?: string;
  storageKey?: string;
};

export function ThemeProvider({ children, defaultTheme = "system", storageKey = "theme" }: ThemeProviderProps) {
  return (
    <NextThemesProvider attribute="class" defaultTheme={defaultTheme} storageKey={storageKey} enableSystem disableTransitionOnChange>
      {children}
    </NextThemesProvider>
  );
}
