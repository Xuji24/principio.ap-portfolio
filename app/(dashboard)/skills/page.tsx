import { Code2, Server, Database, FlaskConical, type LucideIcon } from "lucide-react";
import { RouteHeader } from "@/components/ui/RouteHeader";
import { getCapabilities, getStack } from "@/lib/content/skills";
import { TECH_ICONS } from "@/lib/content/techIcons";

export const metadata = { title: "Skills — Angelo Principio" };

const CAPABILITY_ICONS: Record<string, LucideIcon> = {
  frontend: Code2,
  backend: Server,
  data: Database,
  testing: FlaskConical,
};

export default function SkillsPage() {
  return (
    <>
      <RouteHeader crumb="Skills" title="Skills" subtitle="What I build, and what I build it with." />

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
        {getStack().map((g) => (
          <div key={g.label} className="bg-surface border border-line rounded-xl p-5 elev-sm rim">
            <p className="font-mono text-xs uppercase tracking-[.1em] text-muted mb-4">{g.label}</p>
            <div className="flex flex-wrap gap-2.5">
              {g.items.map((t) => {
                const TechIcon = TECH_ICONS[t];
                return (
                  <span key={t} className="inline-flex items-center gap-2 text-sm font-medium text-ink bg-paper border border-line rounded-md px-3 py-2">
                    {TechIcon && <TechIcon className="w-4 h-4 shrink-0" />}
                    {t}
                  </span>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
