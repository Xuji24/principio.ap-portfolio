"use client";

import { FiSun, FiMoon } from "react-icons/fi";
import { useTheme } from "@/components/ThemeContext";

export default function ThemeSwitch() {
  const { theme, setTheme } = useTheme();

  const handleToggle = () => {
    const newTheme = theme === "dark" ? "light" : "dark";
    setTheme(newTheme);
  };

  return (
    <button
      onClick={handleToggle}
      className="p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-800 transition-colors"
      aria-label="Toggle theme"
    >
      {theme === "dark" ? (
        <FiSun className="text-yellow-500 w-5 h-5" />
      ) : (
        <FiMoon className="text-gray-700 w-5 h-5" />
      )}
    </button>
  );
}
