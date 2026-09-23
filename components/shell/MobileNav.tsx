"use client";
import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { NAV_ITEMS } from "./Sidebar";
import { cn } from "@/lib/utils";

export function MobileNav() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  return (
    <div className="lg:hidden">
      <button type="button" onClick={() => setOpen(!open)} aria-expanded={open} aria-label="Toggle navigation"
        className="fixed top-3 left-4 z-40 w-8 h-8 grid place-items-center rounded-lg bg-surface border border-line elev-sm text-ink">
        <span className="sr-only">Menu</span>
        <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
          {open ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
        </svg>
      </button>

      {open && (
        <nav aria-label="Main" className="fixed inset-0 z-30 bg-paper/97 backdrop-blur-xl grid place-items-center">
          <ul className="flex flex-col gap-4 text-center">
            {NAV_ITEMS.map((item) => {
              const active = item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);
              const ItemIcon = item.icon;
              return (
                <li key={item.href}>
                  <Link href={item.href} onClick={() => setOpen(false)} aria-current={active ? "page" : undefined}
                    className={cn("flex items-center gap-2.5 font-display font-bold text-xl", active ? "text-ink" : "text-muted")}>
                    <ItemIcon className="w-5 h-5" strokeWidth={2} />
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      )}
    </div>
  );
}
