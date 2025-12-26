
"use client"

import * as React from "react"
import { Moon, Sun, Computer } from "lucide-react"
import { useTheme } from "next-themes"
import { motion, AnimatePresence } from 'framer-motion';

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

  const getTooltip = () => {
    if (currentTheme === 'light') return 'Switch to dark mode';
    if (currentTheme === 'dark') return 'Switch to system mode';
    return 'Switch to light mode';
  }
  
  if (currentTheme === undefined) {
    return <div className="h-10 w-10" />;
  }
  
  const variants = {
    initial: { opacity: 0, rotate: -90, scale: 0.8 },
    animate: { opacity: 1, rotate: 0, scale: 1 },
    exit: { opacity: 0, rotate: 90, scale: 0.8 },
  };

  return (
    <Button variant="ghost" size="icon" onClick={toggleTheme} aria-label={getTooltip()}>
        <AnimatePresence mode="wait" initial={false}>
            <motion.div
                key={currentTheme}
                variants={variants}
                initial="initial"
                animate="animate"
                exit="exit"
                transition={{ duration: 0.2 }}
            >
                {currentTheme === "light" && <Sun className="h-[1.2rem] w-[1.2rem]" />}
                {currentTheme === "dark" && <Moon className="h-[1.2rem] w-[1.2rem]" />}
                {currentTheme === "system" && <Computer className="h-[1.2rem] w-[1.2rem]" />}
            </motion.div>
        </AnimatePresence>
        <span className="sr-only">{getTooltip()}</span>
    </Button>
  )
}
