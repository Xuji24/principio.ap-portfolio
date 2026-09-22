import Image from "next/image";
import Link from "next/link";
import { site, getStats } from "@/lib/content/site";
import { getFeatured } from "@/lib/content/projects";
import { getCredentials } from "@/lib/content/credentials";

export default function OverviewPage() {
  const stats = getStats();
  const featured = getFeatured();
  const latest = getCredentials()[0];

  return (
    <>
      <p className="font-mono text-[8px] uppercase tracking-[.12em] text-muted">Overview</p>
      <h1 className="font-display font-extrabold text-3xl md:text-5xl text-ink tracking-[-.022em] leading-[1.05] mt-2">
        {site.role}<span className="text-amber">.</span>
      </h1>
      <p className="text-[11px] md:text-xs text-muted mt-2 max-w-md leading-relaxed">{site.tagline}</p>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mt-6">
        {stats.map((s) => (
          <div key={s.label} className="bg-surface border border-line rounded-lg p-3 elev-sm rim">
            <p className="font-display font-extrabold text-xl text-ink leading-none tracking-[-.02em]">{s.value}</p>
            <p className="font-mono text-[6.5px] uppercase tracking-[.09em] text-muted mt-1.5">{s.label}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[1.35fr_1fr] gap-2 mt-2">
        {featured && (
          <Link href={`/work/${featured.slug}`} className="bg-surface border border-line rounded-lg overflow-hidden elev-sm rim block hover:elev-md transition-shadow">
            <div className="relative h-32 bg-paper">
              <Image src={featured.image} alt="" fill className="object-cover" sizes="(max-width:1024px) 100vw, 55vw" priority />
            </div>
            <div className="p-3">
              <span className="font-mono text-[6.5px] uppercase tracking-[.08em] px-1.5 py-0.5 rounded bg-amber/15 border border-amber/40 text-ink">
                Professional · {featured.org}
              </span>
              <p className="font-display font-bold text-sm text-ink mt-1.5">{featured.title}</p>
              <p className="text-[9.5px] text-muted mt-1 leading-relaxed">{featured.summary}</p>
            </div>
          </Link>
        )}
        <Link href="/credentials" className="bg-surface border border-line rounded-lg p-3 elev-sm rim block hover:elev-md transition-shadow">
          <p className="font-mono text-[6.5px] uppercase tracking-[.09em] text-muted">Latest credential</p>
          <p className="font-display font-bold text-sm text-ink mt-1.5">{latest.title}</p>
          <p className="text-[9.5px] text-muted mt-1">{latest.issuer} · {latest.year}</p>
        </Link>
      </div>
    </>
  );
}
