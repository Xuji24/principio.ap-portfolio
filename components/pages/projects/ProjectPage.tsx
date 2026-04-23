import Image from "next/image";
import { ArrowRight, ExternalLink } from "lucide-react";
import ScrollReveal from "@/components/ui/ScrollReveal";

interface Project {
  id: number;
  title: string;
  description: string;
  link: string;
  status: string;
  image?: string;
  tags: string[];
}

const projects: Project[] = [
  {
    id: 1,
    title: "NextJS Project - Booking App",
    description:
      "A purpose-driven booking app focused on user-centric design and hassle-free reservations, supported by a robust backend with Supabase, PostgreSQL, NextJS and secure Google OAuth authentication.",
    link: "https://d-creatives.online",
    status: "Completed",
    image: "/booking-app-screenshot.png",
    tags: ["Full-Stack", "Next.js", "Supabase", "PostgreSQL"],
  },
  {
    id: 2,
    title: "JS Project - Coffee Shop Static Website",
    description:
      "A coffee shop app that lets users explore various coffee blends, view detailed descriptions, and place orders online through a user-friendly interface.",
    link: "https://julsmartinez.github.io/STOUTCAFE/",
    status: "Completed",
    image: "/stoutcafe.png",
    tags: ["Frontend", "JavaScript"],
  },
  {
    id: 3,
    title: "NextJS Project - Event Running App",
    description:
      "A progressive event running app focused on user-centric design, supported by Supabase, PostgreSQL and secure Google OAuth authentication.",
    link: "#",
    status: "In Progress",
    tags: ["Full-Stack", "Next.js"],
  },
  {
    id: 4,
    title: "Coming Soon - New Project",
    description: "New project coming soon. Stay tuned for updates!",
    link: "#",
    status: "In Progress",
    tags: [],
  },
  {
    id: 5,
    title: "Coming Soon - New Project",
    description: "New project coming soon. Stay tuned for updates!",
    link: "#",
    status: "In Progress",
    tags: [],
  },
];

const [featured, ...rest] = projects;

export default function ProjectsPage() {
  return (
    <div className="w-full min-h-screen py-24 px-6 lg:px-16">
      {/* Section label */}
      <ScrollReveal direction="up">
        <p className="text-xs font-bold tracking-[0.4em] uppercase text-primary mb-3">
          04 · PROJECTS
        </p>
        <h1 className="text-4xl lg:text-5xl font-black text-foreground leading-tight tracking-tighter mb-14">
          Featured <span className="text-primary">Work.</span>
        </h1>
      </ScrollReveal>

      {/* Featured project — large card */}
      <ScrollReveal direction="up" delay={80}>
        <a
          href={featured.link}
          target="_blank"
          rel="noopener noreferrer"
          className="group block mb-10 rounded-2xl overflow-hidden border border-border bg-card hover:border-primary/40 transition-all duration-300 hover:shadow-xl"
        >
          <div className="flex flex-col lg:flex-row">
            {/* Image */}
            <div className="relative w-full lg:w-1/2 h-64 lg:h-80 bg-muted overflow-hidden shrink-0">
              {featured.image ? (
                <Image
                  src={featured.image}
                  alt={featured.title}
                  fill
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-80"
                />
              ) : (
                <div className="w-full h-full bg-secondary flex items-center justify-center">
                  <span className="text-muted-foreground font-semibold text-lg px-4 text-center">
                    {featured.title}
                  </span>
                </div>
              )}
              <div className="absolute inset-0 bg-background/60 lg:block hidden" />
            </div>

            {/* Content */}
            <div className="p-8 lg:p-10 flex flex-col justify-center">
              <div className="flex items-center gap-3 mb-4">
                <span className="text-[10px] font-bold px-3 py-1 rounded-full border border-primary/30 bg-primary/10 text-primary tracking-widest uppercase">
                  {featured.status}
                </span>
                <span className="text-[10px] text-gray-500 font-mono">
                  FEATURED PROJECT
                </span>
              </div>
              <h2 className="text-2xl lg:text-3xl font-black text-foreground mb-3 group-hover:text-primary transition-colors duration-300">
                {featured.title}
              </h2>
              <p className="text-muted-foreground text-sm leading-relaxed mb-6 max-w-lg">
                {featured.description}
              </p>
              {featured.tags.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-6">
                  {featured.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-[10px] font-semibold px-3 py-1 rounded-full bg-secondary border border-border text-secondary-foreground"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}
              <div className="flex items-center gap-2 text-primary text-sm font-bold group-hover:gap-3 transition-all duration-300">
                <ExternalLink size={16} /> View Project{" "}
                <ArrowRight
                  size={16}
                  className="group-hover:translate-x-1 transition-transform duration-300"
                />
              </div>
            </div>
          </div>
        </a>
      </ScrollReveal>

      {/* Remaining projects — compact grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {rest.map((project, index) => (
          <ScrollReveal key={project.id} direction="up" delay={index * 80}>
            <a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="group block h-full rounded-xl overflow-hidden border border-border bg-card hover:border-primary/30 hover:bg-muted/40 transition-all duration-300 hover:-translate-y-1"
            >
              {/* Image / placeholder */}
              <div className="relative w-full h-40 bg-muted overflow-hidden">
                {project.image ? (
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover opacity-70 group-hover:scale-105 group-hover:opacity-90 transition-all duration-400"
                  />
                ) : (
                  <div className="w-full h-full bg-secondary flex items-center justify-center">
                    <span className="text-muted-foreground text-xs font-mono px-3 text-center">
                      {project.status === "In Progress"
                        ? "// in progress"
                        : project.title}
                    </span>
                  </div>
                )}
              </div>

              {/* Info */}
              <div className="p-5">
                <div className="flex items-center justify-between mb-2">
                  <span
                    className={`text-[9px] font-bold px-2 py-0.5 rounded-full border tracking-widest uppercase ${
                      project.status === "Completed"
                        ? "border-primary/30 bg-primary/10 text-primary"
                        : "border-accent/40 bg-accent/10 text-accent-foreground"
                    }`}
                  >
                    {project.status}
                  </span>
                  <ArrowRight
                    size={14}
                    className="text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all duration-300"
                  />
                </div>
                <h3 className="text-sm font-bold text-foreground mb-1.5 line-clamp-2 group-hover:text-primary transition-colors duration-300">
                  {project.title}
                </h3>
                <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed mb-3">
                  {project.description}
                </p>
                {project.tags.length > 0 && (
                  <div className="flex flex-wrap gap-1">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-[9px] font-semibold px-2 py-0.5 rounded-full bg-secondary border border-border text-secondary-foreground"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </a>
          </ScrollReveal>
        ))}
      </div>
    </div>
  );
}
