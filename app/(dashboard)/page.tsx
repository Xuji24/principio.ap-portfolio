"use client";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { FolderKanban, Layers, Briefcase, Award, MessageCircle, type LucideIcon } from "lucide-react";
import { IconArrowUpRight } from "@/components/ui/Icon";
import { site, getStats } from "@/lib/content/site";
import { getFeatured } from "@/lib/content/projects";
import { getCredentials } from "@/lib/content/credentials";
import { getStack } from "@/lib/content/skills";
import { getExperience } from "@/lib/content/experience";
import { TECH_ICONS } from "@/lib/content/techIcons";
import { liftPress } from "@/lib/motion/liftPress";

function CardIcon({ icon: Icon, inverted }: { icon: LucideIcon; inverted?: boolean }) {
  return (
    <motion.span
      {...liftPress}
      className={
        inverted
          ? "w-9 h-9 rounded-xl bg-paper/10 border border-paper/20 text-amber grid place-items-center shrink-0"
          : "w-9 h-9 rounded-xl bg-amber/15 border border-amber/30 text-amber grid place-items-center shrink-0"
      }
    >
      <Icon className="w-4 h-4" strokeWidth={2} />
    </motion.span>
  );
}

function CardHeader({ icon, title, blurb, inverted }: { icon: LucideIcon; title: string; blurb: string; inverted?: boolean }) {
  return (
    <div className="relative flex items-center gap-3">
      <CardIcon icon={icon} inverted={inverted} />
      <div className="flex-1 min-w-0">
        <p className={`font-display font-bold text-base ${inverted ? "text-paper" : "text-ink"}`}>{title}</p>
        <p className={`text-xs mt-0.5 ${inverted ? "text-paper/65" : "text-muted"}`}>{blurb}</p>
      </div>
      <IconArrowUpRight className={`w-4 h-4 shrink-0 transition-colors ${inverted ? "text-paper/50 group-hover:text-paper" : "text-muted group-hover:text-ink"}`} />
    </div>
  );
}

function Watermark({ icon: Icon, inverted }: { icon: LucideIcon; inverted?: boolean }) {
  return (
    <Icon
      aria-hidden="true"
      strokeWidth={1.5}
      className={`absolute -right-5 -bottom-5 w-32 h-32 pointer-events-none ${inverted ? "text-paper/[0.07]" : "text-ink/[0.045]"}`}
    />
  );
}

export default function OverviewPage() {
  const stats = getStats();
  const featured = getFeatured();
  const latestCredential = getCredentials()[0];
  const latestRole = getExperience()[0];

  return (
    <>
      <p className="font-mono text-[10px] uppercase tracking-[.12em] text-muted">Overview</p>
      <h1 className="font-display font-extrabold text-4xl md:text-5xl text-ink tracking-[-.022em] leading-[1.05] mt-2">
        {site.role}<span className="text-amber">.</span>
      </h1>
      <p className="text-sm md:text-[15px] text-muted mt-3 max-w-lg leading-relaxed">{site.tagline}</p>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-8">
        {stats.map((s) => (
          <div key={s.label} className="bg-surface border border-line rounded-xl p-4 elev-sm rim">
            <p className="font-display font-extrabold text-3xl text-ink leading-none tracking-[-.02em]">{s.value}</p>
            <p className="font-mono text-[9px] uppercase tracking-[.09em] text-muted mt-2">{s.label}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-3.5 mt-3.5">
        {featured && (
          <Link
            href={`/work/${featured.slug}`}
            className="btn-lift transition-shadow lg:col-span-2 bg-surface border border-line rounded-xl overflow-hidden rim block group"
          >
            <div className="p-4 pb-0">
              <CardHeader icon={FolderKanban} title="Work" blurb="Funnels, workflows and apps built to solve real problems." />
            </div>
            <div className="relative h-44 md:h-52 bg-paper mt-4 mx-4 rounded-lg overflow-hidden">
              <Image src={featured.image} alt="" fill className="object-cover" sizes="(max-width:1024px) 100vw, 60vw" priority />
            </div>
            <div className="p-4">
              <span className="font-mono text-[9px] uppercase tracking-[.08em] px-2 py-1 rounded bg-amber/15 border border-amber/40 text-ink">
                Professional · {featured.org}
              </span>
              <p className="font-display font-bold text-base text-ink mt-2">{featured.title}</p>
              <p className="text-xs text-muted mt-1 leading-relaxed">{featured.summary}</p>
            </div>
          </Link>
        )}

        <Link href="/skills" className="btn-lift transition-shadow bg-surface border border-line rounded-xl p-4 rim block group">
          <CardHeader icon={Layers} title="Skills" blurb="Languages, frameworks and tools I build with." />
          <div className="mt-4 space-y-3">
            {getStack().map((g) => (
              <div key={g.label}>
                <p className="font-mono text-[9px] uppercase tracking-[.1em] text-muted mb-1.5">{g.label}</p>
                <div className="flex flex-wrap gap-1.5">
                  {g.items.map((t) => {
                    const TechIcon = TECH_ICONS[t];
                    return (
                      <span key={t} className="inline-flex items-center gap-1.5 text-[11px] font-medium text-ink bg-paper border border-line rounded-md px-2 py-1.5">
                        {TechIcon && <TechIcon className="w-3 h-3 shrink-0" />}
                        {t}
                      </span>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </Link>

        <Link href="/experience" className="btn-lift transition-shadow relative overflow-hidden bg-surface border border-line rounded-xl p-4 rim block group">
          <Watermark icon={Briefcase} />
          <CardHeader icon={Briefcase} title="Experience" blurb="Where the work actually happened." />
          <div className="relative mt-4">
            <span className="font-mono text-[9px] uppercase tracking-[.08em] px-2 py-1 rounded bg-amber/15 border border-amber/40 text-ink">
              {latestRole.meta}
            </span>
            <p className="font-display font-bold text-sm text-ink mt-2">{latestRole.title}</p>
            <p className="text-xs text-muted mt-1">{latestRole.org} · {latestRole.start}–{latestRole.end}</p>
          </div>
        </Link>

        <Link href="/credentials" className="btn-lift transition-shadow relative overflow-hidden bg-surface border border-line rounded-xl p-4 rim block group">
          <Watermark icon={Award} />
          <CardHeader icon={Award} title="Credentials" blurb="Latest certification earned." />
          <div className="relative flex items-center gap-3 mt-4">
            <div className="relative w-16 h-16 rounded-lg overflow-hidden bg-paper border border-line shrink-0">
              <Image src={latestCredential.image} alt="" fill className="object-cover" sizes="64px" />
            </div>
            <div className="min-w-0">
              <p className="font-display font-bold text-sm text-ink leading-tight">{latestCredential.title}</p>
              <p className="text-xs text-muted mt-1">{latestCredential.issuer} · {latestCredential.year}</p>
            </div>
          </div>
        </Link>

        <Link href="/contact" className="btn-lift transition-shadow relative overflow-hidden bg-ink rounded-xl p-4 block group flex flex-col justify-between">
          <Watermark icon={MessageCircle} inverted />
          <CardHeader icon={MessageCircle} title="Contact" blurb="Have a project in mind?" inverted />
          <p className="relative font-display font-semibold text-sm text-paper mt-4 inline-flex items-center gap-1.5 group-hover:gap-2.5 transition-[gap]">
            Let&rsquo;s talk <IconArrowUpRight className="w-3.5 h-3.5" />
          </p>
        </Link>
      </div>
    </>
  );
}
