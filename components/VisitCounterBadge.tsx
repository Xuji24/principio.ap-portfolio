"use client";

import { useState } from "react";

const PulseDot = () => (
  <span className="relative flex h-2.5 w-2.5 shrink-0">
    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75" />
    <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-primary" />
  </span>
);

export default function VisitCounterBadge({ viewCount }: { viewCount: number }) {
  const [collapsed, setCollapsed] = useState(false);

  if (collapsed) {
    return (
      <button
        onClick={() => setCollapsed(false)}
        aria-label="Show visit count"
        className="fixed top-20 right-4 z-40 flex h-9 w-9 items-center justify-center rounded-full
                   border border-slate-700/50 bg-slate-900/95 shadow-lg backdrop-blur-sm hover:bg-slate-900/90 hover:cursor-pointer"
      >
        <PulseDot />
      </button>
    );
  }

  return (
    <button
      onClick={() => setCollapsed(true)}
      aria-label="Collapse visit count"
      className="fixed top-20 right-4 z-40 flex items-center gap-2 rounded-full border border-slate-700/50
                 bg-slate-900/95 py-1.5 px-3 shadow-lg backdrop-blur-sm hover:bg-slate-900/90 hover:cursor-pointer"
    >
      <PulseDot />
      <span className="text-sm font-semibold text-white">{viewCount.toLocaleString()}</span>
      <span className="text-sm text-slate-400">visits</span>
    </button>
  );
}
