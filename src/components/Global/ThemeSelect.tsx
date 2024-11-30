"use client";

import * as React from "react";
import { Check, Monitor, Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import UseCurrentSession from "@/hooks/use-session";

const ThemeSelect = () => {
  const { setTheme, theme } = useTheme();
  UseCurrentSession();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon">
          {theme === "system" ? (
            <Monitor className="text-primary" />
          ) : (
            <>
              <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0 text-yellow-500" />
              <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100   text-blue-500" />
            </>
          )}

          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem
          className="cursor-pointer"
          onClick={() => setTheme("light")}
        >
          <p className=" group w-full flex justify-between">
            <span className="flex">
              <Sun
                className={cn(
                  " group-hover:text-yellow-500 group-hover:rotate-180 transition-transform duration-500 ease-in-out mr-3",
                  theme === "light" && "text-yellow-500"
                )}
                size={20}
              />
              <span>Light</span>
            </span>
            {theme === "light" && <Check size={20} />}
          </p>
        </DropdownMenuItem>
        <DropdownMenuItem
          className="cursor-pointer"
          onClick={() => setTheme("dark")}
        >
          <p className=" group w-full flex justify-between">
            <span className="flex">
              <Moon
                className={cn(
                  "group-hover:text-blue-500 group-hover:rotate-180 transition-transform duration-500 ease-in-out mr-3",
                  theme === "dark" && "text-blue-500"
                )}
                size={20}
              />
              <span>Dark</span>
            </span>

            {theme === "dark" && <Check size={20} />}
          </p>
        </DropdownMenuItem>
        <DropdownMenuItem
          className="cursor-pointer"
          onClick={() => setTheme("system")}
        >
          <p className=" group w-full flex justify-between">
            <span className="flex">
              <Monitor
                className={cn(
                  "group-hover:text-primary group-hover:rotate-180 transition-transform duration-500 ease-in-out mr-3",
                  theme === "system" && "text-primary"
                )}
                size={20}
              />
              <span>System</span>
            </span>
            {theme === "system" && <Check size={20} />}
          </p>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
export default ThemeSelect;
