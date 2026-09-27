import { Timer, Search, Mail, Hourglass, Trash2, type LucideIcon } from "lucide-react";
import { getPipeline } from "@/lib/content/automation";
import { AnimatedDot } from "./AnimatedDot";

const NODE_ICONS: Record<string, LucideIcon> = {
  trigger: Timer,
  check: Search,
  flag: Mail,
  grace: Hourglass,
  purge: Trash2,
};

function Connector({ index }: { index: number }) {
  return (
    <div className="shrink-0 flex xl:flex-1 xl:min-w-6 xl:h-10 items-center justify-center">
      <div className="relative w-px h-8 xl:h-px xl:w-full border-l xl:border-l-0 xl:border-t border-amber/40">
        <AnimatedDot delay={index * 0.5} />
      </div>
    </div>
  );
}

export function AutomationPipeline() {
  const nodes = getPipeline();
  return (
    <div className="bg-surface border border-line rounded-xl p-5 sm:p-6 elev-sm rim">
      <p className="font-mono text-[10px] uppercase tracking-[.12em] text-amber">Live automation</p>
      <p className="font-display font-bold text-lg text-ink mt-1">One trigger. The rest runs itself.</p>
      <p className="text-sm text-muted mt-1.5 max-w-lg">
        A representative pattern for the scheduled cleanup and lifecycle jobs I build — illustrative, not tied to one specific client&apos;s system.
      </p>

      <div className="flex flex-col xl:flex-row xl:items-start gap-6 xl:gap-0 mt-6">
        {nodes.map((node, i) => {
          const Icon = NODE_ICONS[node.id];
          return (
            <div key={node.id} className="flex flex-col items-center xl:contents">
              {i > 0 && <Connector index={i - 1} />}
              <div className="xl:flex-none flex flex-col items-center text-center gap-2">
                {Icon && (
                  <span className="w-10 h-10 rounded-xl bg-amber/15 border border-amber/30 text-amber grid place-items-center shrink-0">
                    <Icon className="w-4.5 h-4.5" strokeWidth={2} />
                  </span>
                )}
                <div className="max-w-32.5">
                  <p className="font-display font-bold text-xs text-ink leading-tight">{node.title}</p>
                  <p className="text-[11px] text-muted mt-0.5">{node.subtitle}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
