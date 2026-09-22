import { RouteHeader } from "@/components/ui/RouteHeader";
import { getCapabilities, getStack } from "@/lib/content/skills";

export const metadata = { title: "Skills — Angelo Principio" };

export default function SkillsPage() {
  return (
    <>
      <RouteHeader crumb="Skills" title="Skills" subtitle="What I build, and what I build it with." />

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5">
        {getCapabilities().map((c) => (
          <div key={c.id} className="bg-surface border border-line rounded-xl p-3 elev-sm rim">
            <p className="font-display font-bold text-[11px] text-ink">{c.title}</p>
            <p className="text-[9px] text-muted mt-1 leading-relaxed">{c.description}</p>
          </div>
        ))}
      </div>

      <div className="mt-3 bg-surface border border-line rounded-xl px-3.5 elev-sm rim">
        {getStack().map((g, i) => (
          <div key={g.label} className={`grid grid-cols-[96px_1fr] gap-3 items-center py-2.5 ${i > 0 ? "border-t border-line" : ""}`}>
            <p className="font-mono text-[7.5px] uppercase tracking-[.1em] text-muted">{g.label}</p>
            <div className="flex flex-wrap gap-1.5">
              {g.items.map((t) => (
                <span key={t} className="text-[9px] font-medium text-ink bg-paper border border-line rounded-md px-2 py-1">{t}</span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
