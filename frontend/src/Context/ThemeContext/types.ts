import type { ReactNode } from "react";
type Theme = "light" | "dark" | "system";

interface ThemeContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
}

type ThemeProps = {
  children: ReactNode;
};

export type { Theme, ThemeContextType, ThemeProps };
