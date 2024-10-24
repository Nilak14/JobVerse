"use client";

import { useTheme } from "next-themes";
import { Toaster as Toast } from "sonner";

const Toaster = () => {
  const { theme } = useTheme();
  if (typeof theme === "string") {
    return (
      <Toast
        richColors
        theme={theme as "light" | "dark" | "system" | undefined}
      />
    );
  }
};
export default Toaster;
