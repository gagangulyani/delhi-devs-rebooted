'use client'

import { Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTheme } from "next-themes";

interface ThemeToggleProps {
  variant?: "default" | "ghost";
  className?: string;
}

export function ThemeToggle({ variant = "default", className = "" }: ThemeToggleProps) {
  const { setTheme, theme } = useTheme();

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  const buttonVariant = variant === "ghost" ? "ghost" : "outline";
  const buttonClasses = variant === "ghost"
    ? "h-9 w-9 bg-transparent hover:bg-white/10 dark:hover:bg-white/5 border-transparent"
    : "h-9 w-9";

  return (
    <Button
      variant={buttonVariant}
      size="icon"
      onClick={toggleTheme}
      className={`${buttonClasses} ${className}`}
    >
      <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
      <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}