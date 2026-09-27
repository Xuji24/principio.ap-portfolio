import { Globe, Plug, Database, Workflow, Bot, Check, type LucideIcon } from "lucide-react";
import { RouteHeader } from "@/components/ui/RouteHeader";
import { getServices } from "@/lib/content/services";
import { TECH_ICONS } from "@/lib/content/techIcons";
import { MethodSection } from "./MethodSection";
import { AutomationPipeline } from "./AutomationPipeline";

export const SERVICE_ICONS: Record<string, LucideIcon> = {
  "full-stack": Globe,
  "api-integration": Plug,
  database: Database,
  automation: Workflow,
  "ai-integration": Bot,
};

export function ServicesGrid({ subtitle }: { subtitle: string }) {
  const services = getServices();

  return (
    <>
      <RouteHeader crumb="Services" title="Services" subtitle={subtitle} />

      <MethodSection />

      <p className="font-display font-bold text-base text-ink mt-8">
        What I can do for you. <span className="font-normal text-muted text-sm">Pick one or stack a few.</span>
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
        {services.map((s, i) => {
          const Icon = SERVICE_ICONS[s.id];
          return (
            <div key={s.id} className="bg-surface border border-line rounded-xl p-5 elev-sm rim flex flex-col">
              <div className="flex items-center justify-between">
                <span className="w-10 h-10 rounded-xl bg-amber/15 border border-amber/30 text-amber grid place-items-center">
                  {Icon && <Icon className="w-[18px] h-[18px]" strokeWidth={2} />}
                </span>
                <span className="font-mono text-[10px] text-muted">
                  {String(i + 1).padStart(2, "0")} / {String(services.length).padStart(2, "0")}
                </span>
              </div>

              <p className="font-display font-bold text-base text-ink mt-3">{s.title}</p>
              <p className="text-sm text-muted mt-1.5 leading-relaxed">{s.description}</p>

              <span className="inline-flex self-start font-mono text-[9px] uppercase tracking-[.08em] px-2 py-1 rounded bg-amber/15 border border-amber/40 text-ink mt-3">
                {s.pill}
              </span>

              <ul className="flex flex-col gap-2 mt-4">
                {s.checklist.map((item) => (
                  <li key={item} className="flex items-start gap-2 text-xs text-muted leading-relaxed">
                    <Check className="w-3.5 h-3.5 text-amber shrink-0 mt-0.5" strokeWidth={2.5} />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>

              <div className="flex flex-wrap gap-1.5 mt-4 pt-4 border-t border-line">
                {s.tech.map((t) => {
                  const TechIcon = TECH_ICONS[t];
                  return (
                    <span
                      key={t}
                      className="inline-flex items-center gap-1 text-[10px] font-medium text-ink bg-paper border border-line rounded-md px-1.5 py-1 whitespace-nowrap"
                    >
                      {TechIcon && <TechIcon className="w-3 h-3 shrink-0" />}
                      {t}
                    </span>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-4">
        <AutomationPipeline />
      </div>
    </>
  );
}
