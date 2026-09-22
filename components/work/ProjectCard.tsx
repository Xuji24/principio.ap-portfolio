import Image from "next/image";
import Link from "next/link";
import type { Project } from "@/lib/content/types";
import { cn } from "@/lib/utils";

export function ProjectCard({ project, wide = false }: { project: Project; wide?: boolean }) {
  return (
    <Link
      href={`/work/${project.slug}`}
      className={cn(
        "group/card bg-surface border border-line rounded-xl overflow-hidden elev-sm rim flex transition-[transform,box-shadow,border-color] duration-300",
        "hover:-translate-y-1.5 hover:elev-lg hover:border-amber/50",
        wide ? "flex-col lg:flex-row lg:col-span-3" : "flex-col",
      )}
      style={{ viewTransitionName: `project-${project.slug}` }}
    >
      <div
        className={cn("shot bg-paper w-full", wide ? "lg:w-[46%] lg:shrink-0" : "")}
        style={{ aspectRatio: "16 / 10" }}
      >
        <Image src={project.image} alt="" fill className="object-contain" sizes="(max-width:1024px) 100vw, 33vw" />
      </div>

      <div className="p-3 flex flex-col flex-1 justify-center">
        {project.kind === "professional" && (
          <span className="self-start font-mono text-[6.5px] uppercase tracking-[.08em] px-1.5 py-0.5 rounded bg-amber/15 border border-amber/40 text-ink mb-1.5">
            Professional · {project.org}
          </span>
        )}
        <p className={cn("font-display font-bold text-ink leading-tight", wide ? "text-base" : "text-[12.5px]")}>
          {project.title}
        </p>
        <p className="text-[9.5px] text-muted mt-1.5 leading-relaxed">{project.summary}</p>
        <div className="flex flex-wrap gap-1 mt-2">
          {project.tech.slice(0, 4).map((t) => (
            <span key={t} className="font-mono text-[6.5px] px-1.5 py-0.5 rounded bg-paper border border-line text-muted">{t}</span>
          ))}
        </div>
        <div className="flex gap-2.5 mt-2 font-mono text-[7.5px] text-muted">
          {project.links.live && <span className="text-ink">Live</span>}
          {project.links.code && <span>Code</span>}
          {project.links.note && <span>{project.links.note}</span>}
        </div>
      </div>
    </Link>
  );
}
