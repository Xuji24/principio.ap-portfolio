export function ViewCounter({ count }: { count: number }) {
  return (
    <div className="fixed bottom-4 left-4 z-30 inline-flex items-center gap-1.5 h-7 px-3 rounded-full bg-surface border border-line elev-lg rim font-mono text-[10px] text-ink">
      <span className="w-1.5 h-1.5 rounded-full bg-amber shadow-[0_0_0_3px_color-mix(in_oklab,var(--amber)_18%,transparent)]" />
      {count.toLocaleString()} views
    </div>
  );
}
