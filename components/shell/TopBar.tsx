"use client";
import { useTheme } from "@/components/ThemeContext";
import { IconSun, IconMoon, IconDoc } from "@/components/ui/Icon";
import { site } from "@/lib/content/site";

export function TopBar() {
  const { theme, setTheme } = useTheme();
  const dark = theme === "dark";

  return (
    <div className="absolute top-3 right-4 flex items-center gap-2 z-20">
      <button
        type="button"
        onClick={() => setTheme(dark ? "light" : "dark")}
        aria-label={dark ? "Switch to light mode" : "Switch to dark mode"}
        className="w-7 h-7 grid place-items-center rounded-lg bg-surface border border-line elev-sm text-ink"
      >
        {dark ? <IconSun className="w-3.5 h-3.5" /> : <IconMoon className="w-3.5 h-3.5" />}
      </button>
      <a
        href={site.links.resume}
        download
        className="flex items-center gap-1.5 h-7 px-3 rounded-lg bg-ink text-paper text-[10.5px] font-medium elev-sm"
      >
        <IconDoc className="w-3 h-3" /> Résumé
      </a>
    </div>
  );
}
