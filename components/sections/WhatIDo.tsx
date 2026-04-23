import { Code2, Server, Database, Layers } from "lucide-react";
import ScrollReveal from "@/components/ui/ScrollReveal";
import type { LucideIcon } from "lucide-react";

interface Service {
  id: string;
  title: string;
  description: string;
  tags: string[];
  Icon: LucideIcon;
}

const services: Service[] = [
  {
    id: "01",
    title: "Frontend Development",
    description:
      "Building responsive, accessible UIs with React, Next.js, and Tailwind CSS that users love.",
    tags: ["React", "Next.js", "Tailwind CSS"],
    Icon: Code2,
  },
  {
    id: "02",
    title: "Backend Development",
    description:
      "Designing robust REST APIs and server-side logic with Node.js and Next.js API routes.",
    tags: ["Node.js", "REST API", "Next.js"],
    Icon: Server,
  },
  {
    id: "03",
    title: "Database Design",
    description:
      "Structuring PostgreSQL databases and Supabase schemas for performance and scalability.",
    tags: ["Supabase", "PostgreSQL", "MySQL"],
    Icon: Database,
  },
  {
    id: "04",
    title: "Full-Stack Solutions",
    description:
      "End-to-end development from concept to deployment — front, back, auth, and data together.",
    tags: ["Next.js", "Supabase", "Vercel"],
    Icon: Layers,
  },
];

export default function WhatIDo() {
  return (
    <section className="py-24 px-6 lg:px-16">
      <ScrollReveal direction="up">
        <div className="mb-14">
          <p className="text-xs font-bold tracking-[0.4em] uppercase text-primary mb-3">
            01 · SERVICES
          </p>
          <h2 className="text-4xl lg:text-5xl font-black text-foreground leading-tight tracking-tighter">
            What I{" "}
            <span className="text-primary">
              Build.
            </span>
          </h2>
        </div>
      </ScrollReveal>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {services.map((s, i) => (
          <ScrollReveal key={s.id} direction="up" delay={i * 100}>
            <div className={`group h-full p-7 rounded-2xl bg-card border border-border transition-all duration-300 hover:shadow-lg hover:-translate-y-1 hover:border-primary/30`}>
              <span className="text-xs font-black text-muted-foreground/50 tracking-widest mb-5 block font-mono">
                {s.id}
              </span>
              <div className="w-12 h-12 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300">
                <s.Icon size={24} className="text-primary" />
              </div>
              <h3 className="text-base font-bold text-foreground mb-2.5">
                {s.title}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed mb-5">
                {s.description}
              </p>
              <div className="flex flex-wrap gap-1.5">
                {s.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-[10px] font-semibold px-2.5 py-1 rounded-full bg-secondary text-secondary-foreground border border-border"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </ScrollReveal>
        ))}
      </div>
    </section>
  );
}
