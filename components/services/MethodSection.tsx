import { Search, Hammer, Zap, type LucideIcon } from "lucide-react";
import { getMethodSteps, METHOD } from "@/lib/content/method";
import { AnimatedDot } from "./AnimatedDot";

const STEP_ICONS: Record<string, LucideIcon> = { audit: Search, build: Hammer, automate: Zap };

function Connector({ index }: { index: number }) {
  return (
    <div className="shrink-0 flex sm:w-24 sm:h-full items-center justify-center">
      <div className="relative w-px h-8 sm:h-px sm:w-full border-l sm:border-l-0 sm:border-t border-amber/40">
        <AnimatedDot delay={index * 0.5} />
      </div>
    </div>
  );
}

export function MethodSection() {
  const steps = getMethodSteps();
  return (
    <div className="bg-surface border border-line rounded-xl p-5 sm:p-6 elev-sm rim">
      <p className="font-mono text-[10px] uppercase tracking-[.12em] text-amber">The method</p>
      <p className="font-display font-extrabold text-xl sm:text-2xl text-ink mt-1">{METHOD.name}</p>
      <p className="text-sm text-muted mt-1.5">{METHOD.tagline}</p>

      {/* Grid (not flex) so the three step cards get equal width (1fr each) and
          equal height (grid's default stretch) regardless of how much text each
          one has — the connector columns are fixed-width, sized to content. */}
      <div className="flex flex-col sm:grid sm:grid-cols-[1fr_auto_1fr_auto_1fr] sm:items-stretch sm:justify-center gap-6 sm:gap-0 mt-6">
        {steps.map((step, i) => {
          const Icon = STEP_ICONS[step.id];
          return (
            <div key={step.id} className="flex flex-col items-center sm:contents">
              {i > 0 && <Connector index={i - 1} />}
              <div className="flex flex-col items-start text-left gap-2 bg-paper p-6 rounded-2xl border border-line/60 shadow-lg shadow-ink/5">
                {Icon && (
                  <span className="w-10 h-10 rounded-xl bg-amber/15 border border-amber/30 text-amber grid place-items-center shrink-0">
                    <Icon className="w-4.5 h-4.5" strokeWidth={2} />
                  </span>
                )}
                <p className="font-display font-bold text-sm text-ink">{step.title}</p>
                <p className="text-xs text-muted leading-relaxed max-w-55">{step.description}</p>
                <div className="flex flex-wrap justify-start gap-1.5 mt-1">
                  {step.tags.map((t) => (
                    <span key={t} className="text-[10px] font-medium text-ink bg-paper border border-line rounded-md px-1.5 py-0.5 whitespace-nowrap">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
