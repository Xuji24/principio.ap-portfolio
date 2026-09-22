"use client";
import { useEffect, useRef, useState } from "react";
import { nearestIndex } from "@/lib/motion/nearest";
import { getExperience } from "@/lib/content/experience";
import { cn } from "@/lib/utils";

export function ExperienceList() {
  const entries = getExperience();
  const [active, setActive] = useState(0);
  const refs = useRef<(HTMLLIElement | null)[]>([]);
  const manualUntil = useRef(0);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const onScroll = () => {
      if (Date.now() < manualUntil.current) return;
      const focus = window.innerHeight * 0.42;
      const centers = refs.current.map((el) => (el ? el.getBoundingClientRect().top + el.offsetHeight / 2 : Infinity));
      setActive(nearestIndex(centers, focus));
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <ol className="relative pl-24">
      <div className="absolute left-[78px] top-2 bottom-2 w-0.5 bg-line rounded" aria-hidden="true" />
      {entries.map((e, i) => {
        const open = i === active;
        return (
          <li key={e.id} ref={(el) => { refs.current[i] = el; }} className={cn("exp relative mb-3", open && "is-open")}>
            <span className={cn(
              "absolute -left-[18px] top-4 w-2.5 h-2.5 rounded-full border-2 border-surface transition-[background,transform] duration-300",
              open ? "bg-amber scale-125" : "bg-line",
            )} aria-hidden="true" />
            <span className={cn("absolute -left-24 top-3 w-16 text-right font-mono text-[8px] leading-relaxed transition-colors", open ? "text-ink" : "text-muted")}>
              {e.start}<br />{e.end}
            </span>

            <button
              type="button"
              aria-expanded={open}
              onClick={() => { manualUntil.current = Date.now() + 1400; setActive(i); }}
              className={cn(
                "w-full text-left bg-surface border rounded-xl overflow-hidden origin-left rim",
                "transition-[transform,box-shadow,opacity,border-color] duration-[420ms] [transition-timing-function:var(--ease-out)]",
                open ? "scale-100 opacity-100 elev-lg border-amber/40" : "scale-[.975] opacity-55 elev-sm border-line hover:opacity-85",
              )}
            >
              <div className="p-3.5">
                <span className="font-mono text-[6.5px] uppercase tracking-[.08em] px-1.5 py-0.5 rounded bg-amber/15 border border-amber/40 text-ink">
                  {e.meta}
                </span>
                <p className="font-display font-bold text-[13.5px] text-ink leading-tight mt-1.5">{e.title}</p>
                <p className="text-[10.5px] font-semibold text-muted mt-0.5">{e.org}</p>
              </div>

              <div className="exp-body-wrap">
                <div className="exp-body">
                  <div className="exp-body-inner px-3.5 pb-3.5">
                    <div className="h-px bg-line mb-2.5" />
                    <ul className="space-y-1">
                      {e.outcomes.map((o) => (
                        <li key={o} className="relative pl-3 text-[10.5px] text-muted leading-relaxed">
                          <span className="absolute left-0.5 top-[7px] w-1 h-1 rounded-full bg-amber" />
                          {o}
                        </li>
                      ))}
                    </ul>
                    <div className="flex flex-wrap gap-1 mt-2.5">
                      {e.tech.map((t) => (
                        <span key={t} className="font-mono text-[7px] px-1.5 py-0.5 rounded bg-paper border border-line text-muted">{t}</span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </button>
          </li>
        );
      })}
    </ol>
  );
}
