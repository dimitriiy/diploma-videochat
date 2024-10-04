import React from "react";

type Mode = "light" | "dark";

export function useTheme() {
  const [theme, setTheme] = React.useState<Mode>("light");

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";

    setTheme(newTheme);
  };

  return [theme, toggleTheme] as const;
}
