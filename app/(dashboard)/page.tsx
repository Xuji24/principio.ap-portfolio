"use client";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { FolderKanban, Layers, Briefcase, Award, MessageCircle, Wrench, type LucideIcon } from "lucide-react";
import { IconArrowUpRight } from "@/components/ui/Icon";
import { site } from "@/lib/content/site";
import { getFeatured } from "@/lib/content/projects";
import { getCredentials } from "@/lib/content/credentials";
import { getStack } from "@/lib/content/skills";
import { getServices } from "@/lib/content/services";
import { SERVICE_ICONS } from "@/components/services/ServicesGrid";
import { getDailyDrivers } from "@/lib/content/tools";
import { getExperience } from "@/lib/content/experience";
import { TECH_ICONS } from "@/lib/content/techIcons";
import { liftPress } from "@/lib/motion/liftPress";
import { LogoLoop } from "@/components/LogoLoop";
import { IconMail, IconLinkedIn, IconGitHub } from "@/components/ui/Icon";


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
      <Icon className="w-5 h-5" strokeWidth={2} />
    </motion.span>
  );
}

function CardHeader({ icon, title, blurb, inverted, showArrow = true }: { icon: LucideIcon; title: string; blurb: string; inverted?: boolean; showArrow?: boolean }) {
  return (
    <div className="relative flex items-center gap-3">
      <CardIcon icon={icon} inverted={inverted} />
      <div className="flex-1 min-w-0">
        <p className={`font-display font-bold text-base ${inverted ? "text-paper" : "text-ink"}`}>{title}</p>
        <p className={`text-xs mt-0.5 ${inverted ? "text-paper/65" : "text-muted"}`}>{blurb}</p>
      </div>
      {showArrow && (
        <IconArrowUpRight className={`w-4 h-4 shrink-0 transition-colors ${inverted ? "text-paper/50 group-hover:text-paper" : "text-muted group-hover:text-ink"}`} />
      )}
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

function WorkCard({ featured }: { featured: ReturnType<typeof getFeatured> }) {
  if (!featured) return null;
  return (
    <Link
      href={`/work/${featured.slug}`}
      className="btn-lift transition-shadow relative bg-surface border border-line rounded-xl overflow-hidden rim block group flex h-full min-h-0"
    >
      <span className="absolute top-3 right-3 z-20 w-7 h-7 rounded-full bg-surface/90 backdrop-blur border border-line grid place-items-center text-muted transition-colors group-hover:text-ink">
        <IconArrowUpRight className="w-3.5 h-3.5" />
      </span>

      <div className="relative min-w-0 min-h-0 flex-1 flex flex-col p-4 overflow-hidden">
        <CardHeader icon={FolderKanban} title="Work" blurb="Funnels, workflows and apps built to solve real problems." showArrow={false} />
        <div className="mt-2.5 pt-3 min-w-0">
          <span className="inline-block max-w-full truncate align-bottom font-mono text-[9px] uppercase tracking-[.08em] px-2 py-1 rounded bg-amber/15 border border-amber/40 text-ink">
            Professional · {featured.org}
          </span>
          <p className="font-display font-bold text-base text-ink mt-2 truncate">{featured.title}</p>
          <p className="text-xs text-muted mt-1 leading-relaxed line-clamp-2">{featured.summary}</p>
        </div>
      </div>

      <div className="relative w-[44%] shrink-0 overflow-hidden flex items-center">
        <Image
          src={featured.image}
          alt=""
          fill
          aria-hidden="true"
          className="object-cover scale-125 blur-2xl opacity-70"
        />
        <div className="relative w-full h-3/4">
          <Image
            src={featured.image}
            alt=""
            fill
            className="object-contain drop-shadow-lg transition-transform duration-700 ease-out group-hover:scale-105"
            sizes="(max-width:1024px) 100vw, 20vw"
            priority
          />
        </div>
        <div className="absolute inset-y-0 left-0 w-10 bg-gradient-to-r from-surface to-transparent" />
      </div>
    </Link>
  );
}

function SkillsCard({ compact }: { compact?: boolean }) {
  const groups = compact ? getStack().slice(0, 2) : getStack();
  return (
    <Link
      href="/skills"
      className="btn-lift transition-shadow bg-surface border border-line rounded-xl p-4 rim block group h-full flex flex-col overflow-hidden"
    >
      <div className="shrink-0">
        <CardHeader icon={Layers} title="Skills" blurb="Languages, frameworks and tools I build with." />
      </div>
      <div className="mt-4 space-y-3 flex-1 min-h-0 flex flex-col justify-start overflow-hidden">
        {groups.map((g) => (
          <div key={g.label}>
            <p className="font-mono text-[9px] uppercase tracking-widest text-muted mb-1.5">{g.label}</p>
            <LogoLoop
              logos={g.items.map((t) => {
                const TechIcon = TECH_ICONS[t];
                return {
                  ariaLabel: t,
                  node: (
                    <span className="inline-flex items-center gap-1.5 text-[11px] font-medium text-ink bg-paper border border-line rounded-md px-2 py-1.5 whitespace-nowrap">
                      {TechIcon && <TechIcon className="w-3 h-3 shrink-0" />}
                      {t}
                    </span>
                  ),
                };
              })}
              speed={26}
              gap={6}
              logoHeight={26}
              pauseOnHover
              fadeOut
              fadeOutColor="var(--surface)"
              ariaLabel={`${g.label} skills`}
            />
          </div>
        ))}
      </div>
    </Link>
  );
}

function ExperienceCard({ latestRole }: { latestRole: ReturnType<typeof getExperience>[number] }) {
  return (
    <Link
      href="/experience"
      className="btn-lift transition-shadow relative overflow-hidden bg-surface border border-line rounded-xl p-4 rim block group h-full flex flex-col"
    >
      <Watermark icon={Briefcase} />
      <div className="shrink-0">
        <CardHeader icon={Briefcase} title="Experience" blurb="Where the work actually happened." />
      </div>
      <div className="relative mt-4 flex-1 min-h-0 flex flex-col justify-start overflow-hidden">
        <span className="font-mono text-[9px] uppercase tracking-[.08em] px-2 py-1 rounded bg-amber/15 border border-amber/40 text-ink w-fit">
          {latestRole.meta}
        </span>
        <p className="font-display font-bold text-sm text-ink mt-2">{latestRole.title}</p>
        <p className="text-xs text-muted mt-1">{latestRole.org} · {latestRole.start}–{latestRole.end}</p>
      </div>
    </Link>
  );
}

function CredentialsCard({ latestCredentials }: { latestCredentials: ReturnType<typeof getCredentials> }) {
  return (
    <Link
      href="/credentials"
      className="btn-lift transition-shadow relative overflow-hidden bg-surface border border-line rounded-xl p-4 rim block group h-full flex flex-col"
    >
      <Watermark icon={Award} />
      <div className="shrink-0">
        <CardHeader icon={Award} title="Credentials" blurb="Latest certifications earned." />
      </div>
      <div className="relative flex flex-col gap-2.5 mt-4 flex-1 min-h-0 justify-start">
        {latestCredentials.map((credential) => (
          <div key={credential.id} className="flex items-center gap-3">
            <div className="relative w-10 h-10 rounded-lg overflow-hidden bg-paper border border-line shrink-0">
              <Image src={credential.image} alt="" fill className="object-cover" sizes="40px" />
            </div>
            <div className="min-w-0">
              <p className="font-display font-bold text-xs text-ink leading-tight truncate">{credential.title}</p>
              <p className="text-[11px] text-muted mt-0.5">{credential.issuer} · {credential.year}</p>
            </div>
          </div>
        ))}
      </div>
    </Link>
  );
}

function ServicesCard({ compact }: { compact?: boolean }) {
  const services = compact ? getServices().slice(0, 3) : getServices();
  return (
    <Link
      href="/services"
      className="btn-lift transition-shadow relative overflow-hidden bg-surface border border-line rounded-xl p-4 rim block group h-full flex flex-col"
    >
      <Watermark icon={Wrench} />
      <div className="shrink-0">
        <CardHeader icon={Wrench} title="Services" blurb="What I can build for you." />
      </div>
      <div className="relative flex flex-col gap-1.5 mt-4 flex-1 min-h-0 justify-start overflow-hidden">
        {services.map((s, i) => {
          const ServiceIcon = SERVICE_ICONS[s.id];
          return (
            <div key={s.id} className="flex items-center gap-2.5 bg-paper border border-line rounded-lg px-2.5 py-1.5 shrink-0">
              <span className="w-6 h-6 rounded-md bg-amber/15 border border-amber/30 text-amber grid place-items-center shrink-0">
                {ServiceIcon && <ServiceIcon className="w-3.5 h-3.5" strokeWidth={2} />}
              </span>
              <span className="text-xs font-semibold text-ink flex-1 min-w-0 truncate">{s.short}</span>
              <span className="font-mono text-[10px] text-muted shrink-0">{String(i + 1).padStart(2, "0")}</span>
            </div>
          );
        })}
      </div>
    </Link>
  );
}

function ContactCard() {
  return (
    <Link
      href="/contact"
      className="btn-lift transition-shadow relative overflow-hidden bg-ink rounded-xl p-4 block group flex flex-col justify-between h-full"
    >
      <Watermark icon={MessageCircle} inverted />
      <CardHeader icon={MessageCircle} title="Contact" blurb="Have a project in mind?" inverted />
      <div className="relative flex flex-col gap-2.5 mt-4 ml-2 flex-1 min-h-0 justify-start">
        <p className="relative font-display font-semibold text-sm text-paper mt-4 inline-flex items-center gap-1.5 group-hover:gap-2.5 transition-[gap]">
          <IconMail className="w-3.5 h-3.5" /> {site.email}
        </p>
        <p className="relative font-display font-semibold text-sm text-paper mt-4 inline-flex items-center gap-1.5 group-hover:gap-2.5 transition-[gap]">
          <IconLinkedIn className="w-3.5 h-3.5" /> /in/angelo-principio
        </p>
        <p className="relative font-display font-semibold text-sm text-paper mt-4 inline-flex items-center gap-1.5 group-hover:gap-2.5 transition-[gap]">
          <IconGitHub className="w-3.5 h-3.5" /> github.com/Xuji24
        </p>
      </div>
      <p className="relative font-display font-semibold text-sm text-paper mt-4 inline-flex items-center gap-1.5 group-hover:gap-2.5 transition-[gap]">
        Let&rsquo;s talk <IconArrowUpRight className="w-3.5 h-3.5" />
      </p>
      
    </Link>
  );
}

export default function OverviewPage() {
  const featured = getFeatured();
  const latestCredentials = getCredentials().slice(0, 3);
  const latestRole = getExperience()[0];

  return (
    <div className="lg:h-[calc(100dvh-4rem)] lg:flex lg:flex-col lg:overflow-hidden">
      <div className="shrink-0">
        <p className="font-mono text-[10px] uppercase tracking-[.12em] text-muted">Overview</p>
        <h1 className="font-display font-extrabold text-4xl md:text-5xl text-ink tracking-[-.022em] leading-[1.05] mt-2">
          {site.role}<span className="text-amber">.</span>
        </h1>
        <p className="text-sm md:text-[15px] text-muted mt-3 max-w-lg leading-relaxed">{site.tagline}</p>
      </div>

      <div className="bg-surface border border-line rounded-xl p-4 elev-sm rim mt-8 flex flex-col sm:flex-row sm:items-center gap-4 shrink-0">
        <div className="shrink-0 sm:pr-5 sm:border-r sm:border-line">
          <p className="font-mono text-[10px] uppercase tracking-[.12em] text-amber">Daily Drivers</p>
          <p className="font-display font-bold text-base text-ink mt-1 whitespace-nowrap">Tools I work with</p>
        </div>
        <div className="flex-1 min-w-0 sm:pl-5">
          <LogoLoop
            logos={getDailyDrivers().map((t) => {
              const ToolIcon = TECH_ICONS[t];
              return {
                ariaLabel: t,
                node: (
                  <span className="inline-flex items-center gap-1.5 text-[11px] font-medium text-ink bg-paper border border-line rounded-md px-2 py-1.5 whitespace-nowrap">
                    {ToolIcon && <ToolIcon className="w-3 h-3 shrink-0" />}
                    {t}
                  </span>
                ),
              };
            })}
            speed={26}
            gap={6}
            logoHeight={26}
            pauseOnHover
            fadeOut
            fadeOutColor="var(--surface)"
            ariaLabel="Daily driver tools"
          />
        </div>
      </div>

      {/* Below lg: natural stacking, page scrolls if content overflows. */}
      <div className="grid grid-cols-1 gap-3.5 mt-3.5 lg:hidden">
        <WorkCard featured={featured} />
        <SkillsCard />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
          <ExperienceCard latestRole={latestRole} />
          <CredentialsCard latestCredentials={latestCredentials} />
          <ServicesCard />
          <ContactCard />
        </div>
      </div>

      {/* lg+: uniform 3-column x 2-row grid filling the remaining viewport, no page scroll. */}
      <div className="hidden lg:grid lg:grid-cols-3 lg:grid-rows-2 gap-3.5 mt-3.5 lg:flex-1 lg:min-h-0">
        <WorkCard featured={featured} />
        <SkillsCard compact />
        <ExperienceCard latestRole={latestRole} />
        <CredentialsCard latestCredentials={latestCredentials} />
        <ServicesCard compact />
        <ContactCard />
      </div>
    </div>
  );
}
