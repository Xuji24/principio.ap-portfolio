"use client";
import { Cat } from "@/components/cat/Cat";
import { site } from "@/lib/content/site";

export function BookingPlaceholder() {
  return (
    <div className="bg-surface border border-line rounded-xl p-4 elev-sm rim">
      <div className="flex items-start justify-between gap-2.5 mb-3 min-h-[44px]">
        <div>
          <p className="font-display font-bold text-[13px] text-ink">Book a call</p>
          <p className="text-[9.5px] text-muted mt-0.5">However long it takes.</p>
        </div>
        <Cat size={46} label="Angelo's cat" />
      </div>
      <div className="font-mono text-[7px] text-muted bg-paper border border-line rounded-md px-2 py-1.5 mb-2.5">
        {site.timezone} (GMT+8)
      </div>
      <div className="grid place-items-center h-[236px] text-center px-4">
        <p className="text-[10.5px] text-muted leading-relaxed">
          Scheduling is being built.<br />Use the form for now — I&apos;ll reply with times.
        </p>
      </div>
    </div>
  );
}
