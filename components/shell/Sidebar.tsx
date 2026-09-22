"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { NameLockup } from "@/components/cat/NameLockup";
import { cn } from "@/lib/utils";

export const NAV_ITEMS = [
  { href: "/", label: "Overview" },
  { href: "/work", label: "Work" },
  { href: "/experience", label: "Experience" },
  { href: "/skills", label: "Skills" },
  { href: "/credentials", label: "Credentials" },
  { href: "/contact", label: "Contact" },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden lg:flex w-[200px] shrink-0 bg-surface border-r border-line flex-col p-4 min-h-dvh">
      <NameLockup />
      <nav aria-label="Main">
        <ul className="flex flex-col gap-px">
          {NAV_ITEMS.map((item) => {
            const active = item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  aria-current={active ? "page" : undefined}
                  className={cn(
                    "flex items-center gap-2 px-2.5 py-2 rounded-lg font-display font-semibold text-xs transition-colors",
                    active ? "bg-amber/10 text-ink" : "text-muted hover:text-ink hover:bg-paper",
                  )}
                >
                  <span className={cn("w-1 h-1 rounded-full", active ? "bg-amber" : "bg-transparent")} />
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
