import Image from "next/image";
import Link from "next/link";
import type { Project } from "@/lib/content/types";
import { cn } from "@/lib/utils";

export function ProjectCard({ project, onPreview }: { project: Project; onPreview?: () => void }) {
  const className = cn(
    "btn-lift-lg group/card bg-surface border border-line rounded-xl overflow-hidden rim flex flex-col w-full text-left",
    "transition-[transform,box-shadow,border-color] duration-300 hover:-translate-y-1.5 hover:border-amber/50",
  );

  const body = (
    <>
      <div className="shot bg-paper w-full" style={{ aspectRatio: "16 / 9" }}>
        <Image src={project.image} alt="" fill className="object-contain" sizes="(max-width:1024px) 100vw, 33vw" />
      </div>

      <div className="p-2.5 flex flex-col flex-1 min-h-0">
        {project.kind === "professional" && (
          <span className="self-start font-mono text-[6.5px] uppercase tracking-[.08em] px-1.5 py-0.5 rounded bg-amber/15 border border-amber/40 text-ink mb-1.5">
            Professional · {project.org}
          </span>
        )}
        <p className="font-display font-bold text-[12.5px] text-ink leading-tight">{project.title}</p>
        <p className="text-[9.5px] text-muted mt-1 leading-relaxed line-clamp-2">{project.summary}</p>
        <div className="flex flex-wrap gap-1 mt-1.5">
          {project.tech.slice(0, 3).map((t) => (
            <span key={t} className="font-mono text-[6.5px] px-1.5 py-0.5 rounded bg-paper border border-line text-muted">{t}</span>
          ))}
        </div>
        <div className="flex gap-2.5 mt-auto pt-1.5 font-mono text-[7.5px] text-muted">
          {project.links.live && <span className="text-ink">Live preview</span>}
          {project.links.code && <span>Code</span>}
          {project.links.note && <span>{project.links.note}</span>}
        </div>
      </div>
    </>
  );

  if (onPreview) {
    return (
      <button type="button" onClick={onPreview} className={className}>
        {body}
      </button>
    );
  }

  if (project.links.live && project.embeddable === false) {
    return (
      <a href={project.links.live} target="_blank" rel="noopener noreferrer" className={className}>
        {body}
      </a>
    );
  }

  return (
    <Link href={`/work/${project.slug}`} className={className} style={{ viewTransitionName: `project-${project.slug}` }}>
      {body}
    </Link>
  );
}
