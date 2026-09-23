"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { Home, FolderKanban, Briefcase, Layers, Award, MessageCircle, type LucideIcon } from "lucide-react";
import { NameLockup } from "@/components/cat/NameLockup";
import { IconLinkedIn, IconGitHub, IconMail, IconSun, IconMoon } from "@/components/ui/Icon";
import { useTheme } from "@/components/ThemeContext";
import { site } from "@/lib/content/site";
import { liftPress } from "@/lib/motion/liftPress";
import { cn } from "@/lib/utils";

export const NAV_ITEMS: { href: string; label: string; icon: LucideIcon }[] = [
  { href: "/", label: "Overview", icon: Home },
  { href: "/work", label: "Work", icon: FolderKanban },
  { href: "/experience", label: "Experience", icon: Briefcase },
  { href: "/skills", label: "Skills", icon: Layers },
  { href: "/credentials", label: "Credentials", icon: Award },
  { href: "/contact", label: "Contact", icon: MessageCircle },
];

const SOCIAL_LINKS = [
  { href: site.links.linkedin, label: "LinkedIn", Icon: IconLinkedIn },
  { href: site.links.github, label: "GitHub", Icon: IconGitHub },
  { href: `mailto:${site.email}`, label: "Email", Icon: IconMail },
];

export function Sidebar({ viewCount }: { viewCount?: number }) {
  const pathname = usePathname();
  const { theme, setTheme } = useTheme();
  const dark = theme === "dark";

  return (
    <aside className="hidden lg:flex w-72 shrink-0 bg-surface border-r border-line flex-col p-6 min-h-dvh">
      <NameLockup />

      {typeof viewCount === "number" && (
        <p className="font-mono text-xs text-muted mt-4 px-1">
          <span className="text-ink font-semibold">{viewCount.toLocaleString()}</span> visits
        </p>
      )}

      <div className="flex items-center gap-2.5 mt-5 px-1">
        {SOCIAL_LINKS.map(({ href, label, Icon }) => (
          <motion.a
            key={label}
            href={href}
            target="_blank"
            rel="noreferrer"
            aria-label={label}
            {...liftPress}
            className="w-9 h-9 grid place-items-center rounded-full bg-paper border border-line transition-colors text-muted hover:text-amber hover:border-amber/40"
          >
            <Icon className="w-4 h-4" />
          </motion.a>
        ))}
        <motion.button
          type="button"
          onClick={(e) => {
            const rect = e.currentTarget.getBoundingClientRect();
            setTheme(dark ? "light" : "dark", {
              x: rect.left + rect.width / 2,
              y: rect.top + rect.height / 2,
            });
          }}
          aria-label={dark ? "Switch to light mode" : "Switch to dark mode"}
          {...liftPress}
          className="w-9 h-9 grid place-items-center rounded-full bg-paper border border-line transition-colors text-muted hover:text-amber hover:border-amber/40"
        >
          {dark ? <IconSun className="w-4 h-4" /> : <IconMoon className="w-4 h-4" />}
        </motion.button>
      </div>

      <div className="h-px bg-line -mx-6 mt-6 mb-4" />

      <nav aria-label="Main" className="flex-1">
        <ul className="flex flex-col gap-1.5">
          {NAV_ITEMS.map((item) => {
            const active = item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);
            const ItemIcon = item.icon;
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  aria-current={active ? "page" : undefined}
                  className={cn(
                    "flex items-center gap-3 px-3.5 py-3 rounded-xl font-display font-semibold text-[15px] transition-colors group",
                    active ? "bg-amber/15 text-ink" : "text-muted hover:text-ink hover:bg-paper",
                  )}
                >
                  <motion.span
                    {...liftPress}
                    className={cn(
                      "grid place-items-center shrink-0 transition-colors",
                      active ? "text-amber" : "text-muted group-hover:text-ink",
                    )}
                  >
                    <ItemIcon className="w-[18px] h-[18px]" strokeWidth={2} />
                  </motion.span>
                  {item.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </aside>
  );
}
