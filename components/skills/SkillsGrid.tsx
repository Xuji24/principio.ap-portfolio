"use client";
import { useMemo, useState } from "react";
import Link from "next/link";
import { Code2, Server, Database, FlaskConical, type LucideIcon } from "lucide-react";
import { IconArrowUpRight } from "@/components/ui/Icon";
import { getCapabilities, getSkillGroups } from "@/lib/content/skills";
import { TECH_ICONS } from "@/lib/content/techIcons";
import { cn } from "@/lib/utils";

const CAPABILITY_ICONS: Record<string, LucideIcon> = {
  frontend: Code2,
  backend: Server,
  data: Database,
  testing: FlaskConical,
};

export function SkillsGrid() {
  const [open, setOpen] = useState<string | null>(null);
  // Static per page load — computing this once avoids rebuilding the whole
  // skill index (looping every project, sorting every category) on each click.
  const groups = useMemo(() => getSkillGroups(), []);

  return (
    <>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {getCapabilities().map((c) => {
          const Icon = CAPABILITY_ICONS[c.id];
          return (
            <div key={c.id} className="bg-surface border border-line rounded-xl p-5 elev-sm rim">
              {Icon && (
                <span className="w-10 h-10 rounded-xl bg-amber/15 border border-amber/30 text-amber grid place-items-center mb-4">
                  <Icon className="w-[18px] h-[18px]" strokeWidth={2} />
                </span>
              )}
              <p className="font-display font-bold text-base text-ink">{c.title}</p>
              <p className="text-sm text-muted mt-2 leading-relaxed">{c.description}</p>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
        {groups.map((g) => (
          <div key={g.label} className="bg-surface border border-line rounded-xl p-5 elev-sm rim">
            <div className="flex items-baseline justify-between mb-4">
              <p className="font-mono text-xs uppercase tracking-[.1em] text-muted">{g.label}</p>
              <span className="font-mono text-[10px] text-muted/70">{g.items.length}</span>
            </div>

            <div className="flex flex-wrap gap-2.5">
              {g.items.map((item) => {
                const TechIcon = TECH_ICONS[item.name];
                const isOpen = open === item.name;
                return (
                  <button
                    key={item.name}
                    type="button"
                    aria-expanded={isOpen}
                    onClick={() => setOpen(isOpen ? null : item.name)}
                    className={cn(
                      "inline-flex items-center gap-2 text-sm font-medium text-ink bg-paper border rounded-md px-3 py-2 transition-colors",
                      isOpen ? "border-amber/60 bg-amber/10" : "border-line hover:border-amber/40",
                    )}
                  >
                    {TechIcon && <TechIcon className="w-4 h-4 shrink-0" />}
                    {item.name}
                  </button>
                );
              })}
            </div>

            {g.items.map((item) => {
              if (open !== item.name) return null;
              return (
                <div key={item.name} className="mt-3.5 pt-3.5 border-t border-line flex flex-wrap items-center gap-x-3 gap-y-1.5">
                  <span className="font-mono text-[10px] uppercase tracking-[.08em] text-muted">Used in</span>
                  {item.evidence.map((e) => (
                    <Link
                      key={e.slug}
                      href={`/work/${e.slug}`}
                      className="text-xs font-semibold text-ink hover:text-amber inline-flex items-center gap-1 transition-colors"
                    >
                      {e.title} <IconArrowUpRight className="w-3 h-3" />
                    </Link>
                  ))}
                  {item.portfolio && (
                    <span className="text-xs text-muted">
                      {item.evidence.length > 0 ? "· also built this site" : "Built this site"}
                    </span>
                  )}
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </>
  );
}
