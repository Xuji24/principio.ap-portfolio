import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getProject, getProjects } from "@/lib/content/projects";
import { IconArrowUpRight } from "@/components/ui/Icon";

export function generateStaticParams() {
  return getProjects().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const p = getProject(slug);
  return { title: p ? `${p.title} — Angelo Principio` : "Not found" };
}

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  return (
    <article style={{ viewTransitionName: `project-${project.slug}` }}>
      <Link href="/work" className="font-mono text-[8px] uppercase tracking-[.12em] text-muted hover:text-ink">
        ‹ Work
      </Link>

      <div className="relative h-44 md:h-60 rounded-xl overflow-hidden border border-line elev-md rim mt-3 bg-paper">
        <Image src={project.image} alt="" fill className="object-cover object-top" sizes="100vw" priority />
      </div>

      {project.kind === "professional" && (
        <span className="inline-block font-mono text-[6.5px] uppercase tracking-[.08em] px-1.5 py-0.5 rounded bg-amber/15 border border-amber/40 text-ink mt-4">
          Professional · {project.org}
        </span>
      )}
      <h1 className="font-display font-extrabold text-2xl md:text-3xl text-ink tracking-[-.022em] mt-2">{project.title}</h1>
      <p className="text-xs text-muted mt-2 max-w-xl leading-relaxed">{project.summary}</p>

      <h2 className="font-display font-bold text-sm text-ink mt-6">What I built</h2>
      <ul className="mt-2 space-y-1.5">
        {project.outcomes.map((o) => (
          <li key={o} className="relative pl-3.5 text-[11px] text-muted leading-relaxed">
            <span className="absolute left-0 top-[7px] w-1 h-1 rounded-full bg-amber" />
            {o}
          </li>
        ))}
      </ul>

      <div className="flex flex-wrap gap-1.5 mt-5">
        {project.tech.map((t) => (
          <span key={t} className="font-mono text-[7px] px-2 py-1 rounded bg-surface border border-line text-muted">{t}</span>
        ))}
      </div>

      <div className="flex flex-wrap items-center gap-3 mt-6">
        {project.links.live && (
          <a href={project.links.live} target="_blank" rel="noopener noreferrer"
             className="inline-flex items-center gap-1.5 h-8 px-4 rounded-lg bg-ink text-paper text-[11px] font-medium elev-sm">
            View live <IconArrowUpRight className="w-3 h-3" />
          </a>
        )}
        {project.links.code && (
          <a href={project.links.code} target="_blank" rel="noopener noreferrer"
             className="inline-flex items-center gap-1.5 h-8 px-4 rounded-lg bg-surface border border-line text-ink text-[11px] font-medium elev-sm">
            Source <IconArrowUpRight className="w-3 h-3" />
          </a>
        )}
        {project.links.note && <span className="font-mono text-[8px] text-muted">{project.links.note}</span>}
      </div>
    </article>
  );
}
