export function RouteHeader({
  crumb, title, subtitle, right,
}: { crumb: string; title: string; subtitle?: string; right?: React.ReactNode }) {
  return (
    <header className="flex items-end justify-between gap-4 mb-5">
      <div>
        <p className="font-mono text-[8px] uppercase tracking-[.12em] text-muted">{crumb}</p>
        <h1 className="font-display font-extrabold text-2xl md:text-3xl text-ink tracking-[-.022em] leading-tight mt-1.5">
          {title}
        </h1>
        {subtitle && <p className="text-[10.5px] text-muted mt-1 max-w-sm leading-relaxed">{subtitle}</p>}
      </div>
      {right}
    </header>
  );
}
