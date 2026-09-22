"use client";
import { cn } from "@/lib/utils";

type Option = { value: string; label: string };
type Props = { options: Option[]; value: string; onChange: (v: string) => void };

export function Segmented({ options, value, onChange }: Props) {
  return (
    <div className="inline-flex bg-surface border border-line rounded-lg p-[3px] elev-sm">
      {options.map((o) => {
        const on = o.value === value;
        return (
          <button
            key={o.value}
            type="button"
            aria-pressed={on}
            onClick={() => onChange(o.value)}
            className={cn(
              "font-display font-semibold text-[10.5px] px-3 py-1.5 rounded-md transition-colors",
              on ? "bg-ink text-paper" : "text-muted hover:text-ink",
            )}
          >
            {o.label}
          </button>
        );
      })}
    </div>
  );
}
