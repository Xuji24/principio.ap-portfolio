"use client";
import { useState } from "react";
import Image from "next/image";
import { RouteHeader } from "@/components/ui/RouteHeader";
import { Segmented } from "@/components/ui/Segmented";
import { IconClose } from "@/components/ui/Icon";
import { getCredentials, getIssuers } from "@/lib/content/credentials";

export function CredentialGrid({ subtitle }: { subtitle: string }) {
  const [issuer, setIssuer] = useState("all");
  const [open, setOpen] = useState<string | null>(null);

  const options = [{ value: "all", label: "All" }, ...getIssuers().map((i) => ({ value: i, label: i }))];
  const items = getCredentials().filter((c) => issuer === "all" || c.issuer === issuer);
  const active = getCredentials().find((c) => c.id === open);

  return (
    <>
      <RouteHeader
        crumb="Credentials"
        title="Credentials"
        subtitle={subtitle}
        right={<Segmented options={options} value={issuer} onChange={setIssuer} />}
      />

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2.5">
        {items.map((c) => (
          <button key={c.id} type="button" onClick={() => setOpen(c.id)}
            className="bg-surface border border-line rounded-xl overflow-hidden elev-sm rim text-left transition-[transform,box-shadow] duration-200 hover:-translate-y-1 hover:elev-md">
            <div className="relative h-24 bg-paper">
              <Image src={c.image} alt="" fill className="object-cover" sizes="(max-width:1024px) 50vw, 25vw" />
            </div>
            <div className="p-2.5">
              <p className="font-mono text-[6.5px] uppercase tracking-[.07em] text-muted">{c.issuer} · {c.year}</p>
              <p className="font-display font-bold text-[10.5px] text-ink mt-1 leading-tight">{c.title}</p>
            </div>
          </button>
        ))}
      </div>

      {active && (
        <div role="dialog" aria-modal="true" aria-label={active.title}
          onClick={() => setOpen(null)}
          className="fixed inset-0 z-50 bg-ink/50 backdrop-blur-sm grid place-items-center p-6">
          <div className="relative w-full max-w-2xl aspect-[4/3] bg-surface rounded-xl overflow-hidden border border-line elev-lg"
               onClick={(e) => e.stopPropagation()}>
            <Image src={active.image} alt={active.title} fill className="object-contain" sizes="100vw" />
            <button type="button" onClick={() => setOpen(null)} aria-label="Close"
              className="absolute top-2 right-2 w-7 h-7 grid place-items-center rounded-lg bg-surface border border-line elev-sm text-ink">
              <IconClose className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}
    </>
  );
}
