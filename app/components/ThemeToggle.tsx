"use client";

import { motion } from "framer-motion";
import { useTheme } from "./ThemeProvider";

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      aria-label="Basculer le thème"
      onClick={toggleTheme}
      className="theme-toggle"
    >
      <motion.span
        initial={false}
        animate={{
          rotate: theme === "dark" ? 360 : 0,
          scale: theme === "dark" ? 0.9 : 1
        }}
        transition={{ type: "spring", stiffness: 120, damping: 15 }}
        className="theme-toggle__icon"
      >
        {theme === "dark" ? "☾" : "☀"}
      </motion.span>
    </button>
  );
}
