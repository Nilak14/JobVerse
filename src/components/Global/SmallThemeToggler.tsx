"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Computer, Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";

export function ThemeToggler() {
  const { setTheme, theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="flex items-center gap-1 rounded-full bg-black/10 p-1 dark:bg-white/10">
      <Button
        variant="ghost"
        size="icon"
        className={`h-8 w-8 rounded-full ${theme === "system" ? "bg-black/10 text-foreground dark:bg-white/10" : ""}`}
        onClick={() => setTheme("system")}
      >
        <Computer className="h-4 w-4" />
        <span className="sr-only">System theme</span>
      </Button>
      <Button
        variant="ghost"
        size="icon"
        className={`h-8 w-8 rounded-full ${theme === "light" ? "bg-black/10 text-foreground dark:bg-white/10" : ""}`}
        onClick={() => setTheme("light")}
      >
        <Sun className="h-4 w-4" />
        <span className="sr-only">Light theme</span>
      </Button>
      <Button
        variant="ghost"
        size="icon"
        className={`h-8 w-8 rounded-full ${theme === "dark" ? "bg-black/10 text-foreground dark:bg-white/10" : ""}`}
        onClick={() => setTheme("dark")}
      >
        <Moon className="h-4 w-4" />
        <span className="sr-only">Dark theme</span>
      </Button>
    </div>
  );
}
