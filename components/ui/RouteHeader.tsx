export function RouteHeader({
  crumb, title, subtitle, right,
}: { crumb: React.ReactNode; title: string; subtitle?: string; right?: React.ReactNode }) {
  return (
    <header className="flex flex-wrap items-end justify-between gap-4 mb-8">
      <div>
        <p className="font-mono text-xs uppercase tracking-[.12em] text-muted">{crumb}</p>
        <h1 className="font-display font-extrabold text-4xl md:text-5xl text-ink tracking-[-.022em] leading-tight mt-2">
          {title}
        </h1>
        {subtitle && <p className="text-sm md:text-base text-muted mt-2 max-w-md leading-relaxed">{subtitle}</p>}
      </div>
      {right}
    </header>
  );
}
