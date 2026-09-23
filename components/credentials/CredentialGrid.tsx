"use client";
import { useEffect, useState } from "react";
import { RouteHeader } from "@/components/ui/RouteHeader";
import { IconClose } from "@/components/ui/Icon";
import { SkeletonImage } from "@/components/ui/SkeletonImage";
import { getCredentials, getIssuers } from "@/lib/content/credentials";
import { cn } from "@/lib/utils";

export function CredentialGrid({ subtitle }: { subtitle: string }) {
  const [open, setOpen] = useState<string | null>(null);

  const credentials = getCredentials();
  const groups = getIssuers()
    .map((issuer) => ({ issuer, items: credentials.filter((c) => c.issuer === issuer) }))
    .sort((a, b) => b.items.length - a.items.length);
  const active = credentials.find((c) => c.id === open);

  useEffect(() => {
    if (!active) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(null);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [active]);

  const [lead, ...rest] = groups;

  function renderGroup(g: (typeof groups)[number], lead: boolean) {
    return (
      <div key={g.issuer} className="bg-surface border border-line rounded-xl p-5 elev-sm rim">
        <div className="flex items-baseline justify-between mb-4">
          <p className="font-display font-bold text-lg text-ink">{g.issuer}</p>
          <span className="font-mono text-xs uppercase tracking-[.08em] text-muted">
            {g.items.length} {g.items.length === 1 ? "credential" : "credentials"}
          </span>
        </div>

        <div className={cn("grid gap-3", lead ? "grid-cols-2 sm:grid-cols-3" : "grid-cols-1")}>
          {g.items.map((c) => (
            <button
              key={c.id}
              type="button"
              onClick={() => setOpen(c.id)}
              className={cn(
                "btn-lift transition-shadow bg-paper border border-line rounded-lg overflow-hidden text-left group",
                lead ? "flex flex-col" : "flex items-center gap-3 p-2.5",
              )}
            >
              <div className={cn("relative bg-surface shrink-0", lead ? "h-24 w-full" : "h-14 w-14 rounded-md overflow-hidden")}>
                <SkeletonImage src={c.image} alt="" className="object-cover" sizes={lead ? "(max-width:768px) 50vw, 180px" : "56px"} />
              </div>
              <div className={lead ? "p-3" : "min-w-0"}>
                <p className={cn("font-display font-bold text-ink leading-tight", lead ? "text-sm" : "text-sm")}>
                  {c.title}
                </p>
                <p className="font-mono text-xs text-muted mt-1.5">{c.year}</p>
              </div>
            </button>
          ))}
        </div>
      </div>
    );
  }

  return (
    <>
      <RouteHeader crumb="Credentials" title="Credentials" subtitle={subtitle} />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-start">
        {lead && <div className="md:col-span-2">{renderGroup(lead, true)}</div>}
        {rest.length > 0 && (
          <div className="flex flex-col gap-4">
            {rest.map((g) => renderGroup(g, false))}
          </div>
        )}
      </div>

      {active && (
        <div role="dialog" aria-modal="true" aria-label={active.title}
          onClick={() => setOpen(null)}
          className="fixed inset-0 z-50 bg-ink/50 backdrop-blur-sm grid place-items-center p-6">
          <div className="relative w-full max-w-xl max-h-[90vh] bg-surface rounded-xl overflow-hidden border border-line elev-lg flex flex-col"
               onClick={(e) => e.stopPropagation()}>
            <button type="button" onClick={() => setOpen(null)} aria-label="Close"
              className="absolute top-2 right-2 z-10 w-8 h-8 grid place-items-center rounded-lg bg-surface border border-line elev-sm text-ink">
              <IconClose className="w-4 h-4" />
            </button>

            <div className="shot bg-paper w-full shrink-0" style={{ aspectRatio: "3 / 2" }}>
              <SkeletonImage src={active.image} alt={active.title} className="object-contain" sizes="(max-width:640px) 100vw, 576px" />
            </div>

            <div className="p-5 overflow-y-auto">
              <p className="font-mono text-xs uppercase tracking-[.08em] text-muted">{active.issuer} · {active.year}</p>
              <p className="font-display font-bold text-lg text-ink mt-1">{active.title}</p>
              <p className="text-sm text-muted mt-2.5 leading-relaxed">{active.description}</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
