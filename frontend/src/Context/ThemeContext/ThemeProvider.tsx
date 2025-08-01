import { useEffect, useState } from "react";
import  type { ThemeProps, Theme } from "./types.ts";
import ThemeContext from "./ThemeContext.ts";


export const ThemeProvider = ({ children }: ThemeProps) => {
  const [theme, setTheme] = useState<Theme>("system");

  useEffect(() => {
    const root = window.document.documentElement

    root.classList.remove("light" , "dark")
    console.log(theme)
    if (theme === "system") {
      const sysTheme = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"
      root.classList.add(sysTheme)
      return
    }
    root.classList.add(theme)
  },[theme])
  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
