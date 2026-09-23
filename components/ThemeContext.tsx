"use client";

import { createContext, useContext, useState } from "react";

type Theme = "light" | "dark";

interface ThemeOrigin {
  x: number;
  y: number;
}

interface ThemeContextType {
  theme: Theme;
  setTheme: (theme: Theme, origin?: ThemeOrigin) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

const TRANSITION_DURATION = 1500;

let activeThemeTransition: ViewTransition | null = null;

export default function ThemeContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [theme, setThemeState] = useState<Theme>("light");

  const setTheme = (newTheme: Theme, origin?: ThemeOrigin) => {
    const applyTheme = () => {
      setThemeState(newTheme);
      localStorage.setItem("portfolio-theme", newTheme);
      document.documentElement.classList.remove("light", "dark");
      document.documentElement.classList.add(newTheme);
    };

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (!document.startViewTransition || reducedMotion) {
      applyTheme();
      return;
    }

    const x = origin?.x ?? window.innerWidth / 2;
    const y = origin?.y ?? window.innerHeight / 2;
    const endRadius = Math.hypot(
      Math.max(x, window.innerWidth - x),
      Math.max(y, window.innerHeight - y),
    );

    // Skip any in-flight wipe so rapid toggles don't fight each other.
    activeThemeTransition?.skipTransition();
    // Some elements (project cards, the work detail hero) carry their own
    // view-transition-name for shared-element navigation transitions. Without
    // this class, they'd be pulled out of the root snapshot into their own
    // group and instantly crossfade instead of waiting for the circle to
    // reach them — this flag (see globals.css) folds them back into root for
    // the duration of a theme toggle.
    document.documentElement.classList.add("theme-transitioning");
    const transition = document.startViewTransition(applyTheme);
    activeThemeTransition = transition;
    // A skipped/aborted transition rejects `ready` and `finished`; swallow both
    // so rapid toggling doesn't spam the console with unhandled rejections.
    transition.ready
      .then(() => {
        document.documentElement.animate(
          {
            clipPath: [`circle(0px at ${x}px ${y}px)`, `circle(${endRadius}px at ${x}px ${y}px)`],
          },
          {
            duration: TRANSITION_DURATION,
            easing: "ease-in-out",
            pseudoElement: "::view-transition-new(root)",
          },
        );
      })
      .catch(() => {});
    transition.finished.catch(() => {}).finally(() => {
      if (activeThemeTransition === transition) activeThemeTransition = null;
      document.documentElement.classList.remove("theme-transitioning");
    });
  };

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme(): ThemeContextType {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeContextProvider");
  }
  return context;
}
