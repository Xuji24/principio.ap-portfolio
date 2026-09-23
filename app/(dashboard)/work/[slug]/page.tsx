import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getProject, getProjects } from "@/lib/content/projects";
import { getExperience } from "@/lib/content/experience";
import { IconArrowUpRight } from "@/components/ui/Icon";
import { RouteHeader } from "@/components/ui/RouteHeader";

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

  const experience = project.experienceId
    ? getExperience().find((e) => e.id === project.experienceId)
    : undefined;

  const projects = getProjects();
  const index = projects.findIndex((p) => p.slug === project.slug);
  const prevProject = index > 0 ? projects[index - 1] : undefined;
  const nextProject = index < projects.length - 1 ? projects[index + 1] : undefined;

  return (
    <article className="max-w-3xl" style={{ viewTransitionName: `project-${project.slug}` }}>
      <RouteHeader
        crumb={
          <Link href="/work" className="hover:text-ink">
            ‹ Work
          </Link>
        }
        title={project.title}
        subtitle={project.summary}
        right={
          project.kind === "professional" ? (
            <span className="inline-block font-mono text-[11px] uppercase tracking-[.08em] px-2 py-1 rounded bg-amber/15 border border-amber/40 text-ink">
              Professional · {project.org}
            </span>
          ) : undefined
        }
      />

      {experience && (
        <div className="flex items-center gap-6 mt-1 mb-5">
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[.08em] text-muted">Role</p>
            <p className="text-sm text-ink font-medium mt-0.5">{experience.title}</p>
          </div>
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[.08em] text-muted">Timeline</p>
            <p className="text-sm text-ink font-medium mt-0.5">
              {experience.start} – {experience.end} · {experience.meta.split(" · ")[0]}
            </p>
          </div>
        </div>
      )}

      {project.why && (
        <p className="text-sm text-muted leading-relaxed border-l-2 border-line pl-3 mb-6">{project.why}</p>
      )}

      <p className="font-mono text-xs uppercase tracking-[.12em] text-muted mb-3">Preview</p>
      <div className="preview-zoom bg-surface border border-line rounded-xl rim overflow-hidden btn-lift transition-[box-shadow,border-color] duration-300 hover:border-amber/40">
        <div className="flex items-center gap-1.5 px-3.5 h-9 border-b border-line" aria-hidden="true">
          <span className="w-2.5 h-2.5 rounded-full bg-[#EC6A5E]" />
          <span className="w-2.5 h-2.5 rounded-full bg-[#F4BF4F]" />
          <span className="w-2.5 h-2.5 rounded-full bg-[#61C554]" />
        </div>
        <div className="bg-paper overflow-hidden">
          <Image
            src={project.image}
            alt={`${project.title} screenshot`}
            width={project.imageWidth}
            height={project.imageHeight}
            className="w-full h-auto"
            sizes="(max-width: 1024px) 100vw, 720px"
            priority
          />
        </div>
      </div>

      {project.highlights && project.highlights.length > 0 && (
        <>
          <h2 className="font-display font-bold text-lg text-ink mt-8">Highlights</h2>
          <div className="mt-3 space-y-4">
            {project.highlights.map((h) => (
              <div key={h.title}>
                <p className="text-sm font-semibold text-ink">{h.title}</p>
                <p className="text-sm text-muted leading-relaxed mt-0.5">{h.body}</p>
              </div>
            ))}
          </div>
        </>
      )}

      <h2 className="font-display font-bold text-lg text-ink mt-8">What I built</h2>
      <ul className="mt-3 space-y-2">
        {project.outcomes.map((o) => (
          <li key={o} className="relative pl-4 text-sm text-muted leading-relaxed">
            <span className="absolute left-0 top-2.25 w-1.5 h-1.5 rounded-full bg-amber" />
            {o}
          </li>
        ))}
      </ul>

      <div className="flex flex-wrap gap-2 mt-6">
        {project.tech.map((t) => (
          <span key={t} className="font-mono text-[11px] px-2.5 py-1.5 rounded bg-surface border border-line text-muted">{t}</span>
        ))}
      </div>

      <div className="flex flex-wrap items-center gap-3 mt-7">
        {project.links.live && (
          <a href={project.links.live} target="_blank" rel="noopener noreferrer"
             className="inline-flex items-center gap-1.5 h-10 px-5 rounded-lg bg-ink text-paper text-sm font-medium elev-sm">
            View live <IconArrowUpRight className="w-3.5 h-3.5" />
          </a>
        )}
        {project.links.code && (
          <a href={project.links.code} target="_blank" rel="noopener noreferrer"
             className="inline-flex items-center gap-1.5 h-10 px-5 rounded-lg bg-surface border border-line text-ink text-sm font-medium elev-sm">
            Source <IconArrowUpRight className="w-3.5 h-3.5" />
          </a>
        )}
        {project.links.note && <span className="font-mono text-xs text-muted">{project.links.note}</span>}
      </div>

      {(prevProject || nextProject) && (
        <div className="flex items-center justify-between gap-4 mt-10 pt-5 border-t border-line">
          {prevProject ? (
            <Link href={`/work/${prevProject.slug}`} className="group text-left">
              <p className="font-mono text-[10px] uppercase tracking-[.08em] text-muted">‹ Previous</p>
              <p className="text-sm font-semibold text-ink mt-0.5 group-hover:text-amber">{prevProject.title}</p>
            </Link>
          ) : <span />}
          {nextProject && (
            <Link href={`/work/${nextProject.slug}`} className="group text-right">
              <p className="font-mono text-[10px] uppercase tracking-[.08em] text-muted">Next ›</p>
              <p className="text-sm font-semibold text-ink mt-0.5 group-hover:text-amber">{nextProject.title}</p>
            </Link>
          )}
        </div>
      )}
    </article>
  );
}
