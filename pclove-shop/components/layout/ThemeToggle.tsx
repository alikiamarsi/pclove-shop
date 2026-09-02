"use client";

import { useTheme } from "next-themes";
import { Laptop, Moon, Sun } from "lucide-react";

function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <div
      className="flex items-center rounded-lg border border-gray-300 bg-white p-1 dark:border-gray-700 dark:bg-gray-900"
    >
      <button
        type="button"
        onClick={() => setTheme("light")}
        aria-label="Light theme"
        className={`rounded-md p-2 transition ${
          theme === "light"
            ? "bg-gray-100 text-gray-900 dark:bg-gray-700 dark:text-white"
            : "text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
        }`}
      >
        <Sun className="h-4 w-4" />
      </button>

      <button
        type="button"
        onClick={() => setTheme("dark")}
        aria-label="Dark theme"
        className={`rounded-md p-2 transition ${
          theme === "dark"
            ? "bg-gray-700 text-white"
            : "text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
        }`}
      >
        <Moon className="h-4 w-4" />
      </button>

      <button
        type="button"
        onClick={() => setTheme("system")}
        aria-label="System theme"
        className={`rounded-md p-2 transition ${
          theme === "system"
            ? "bg-gray-100 text-gray-900 dark:bg-gray-700 dark:text-white"
            : "text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
        }`}
      >
        <Laptop className="h-4 w-4" />
      </button>
    </div>
  );
}

export default ThemeToggle;