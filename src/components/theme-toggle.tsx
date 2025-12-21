"use client"

import * as React from "react"
import { Moon, Sun, Computer } from "lucide-react"
import { useTheme } from "next-themes"

import { Button } from "@/components/ui/button"

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  const [currentTheme, setCurrentTheme] = React.useState<string | undefined>(undefined);

  React.useEffect(() => {
    setCurrentTheme(theme);
  }, [theme]);


  const toggleTheme = () => {
    if (theme === "light") {
      setTheme("dark")
    } else if (theme === "dark") {
      setTheme("system")
    } else {
      setTheme("light")
    }
  }

  const getIcon = () => {
    if (currentTheme === "light") {
      return <Sun className="h-[1.2rem] w-[1.2rem] transition-all" />;
    }
    if (currentTheme === "dark") {
      return <Moon className="h-[1.2rem] w-[1.2rem] transition-all" />;
    }
    return <Computer className="h-[1.2rem] w-[1.2rem] transition-all" />;
  };

  const getTooltip = () => {
    if (currentTheme === 'light') return 'Switch to dark mode';
    if (currentTheme === 'dark') return 'Switch to system mode';
    return 'Switch to light mode';
  }

  if (currentTheme === undefined) {
    return <div className="h-10 w-10" />;
  }

  return (
    <Button variant="ghost" size="icon" onClick={toggleTheme} aria-label={getTooltip()}>
        {getIcon()}
        <span className="sr-only">{getTooltip()}</span>
    </Button>
  )
}
