import { CheckCircle } from "lucide-react";
import ScrollReveal from "@/components/ui/ScrollReveal";

const experience = [
  {
    id: 1,
    role: "Backend Developer",
    company: "Polytechnic University of the Philippines",
    date: "June 2024",
    description: "C# backend design in WinForms + MySQL database integration.",
  },
  {
    id: 2,
    role: "Frontend Developer",
    company: "Polytechnic University of the Philippines",
    date: "June 2025",
    description: "JavaScript & jQuery for interactive and dynamic UI design.",
  },
  {
    id: 3,
    role: "Full-Stack Developer",
    company: "Polytechnic University of the Philippines",
    date: "Oct 2025 – 2026",
    description:
      "Next.js, Node.js, REST API, and Supabase for web applications.",
  },
];

export default function AboutPage() {
  return (
    <div className="w-full">
      <section className="py-24 px-6 lg:px-16">
        <ScrollReveal direction="up">
          <div className="mb-14">
            <p className="text-xs font-bold tracking-[0.4em] uppercase text-primary mb-3">
              03 · ABOUT
            </p>
            <h1 className="text-4xl lg:text-5xl font-black text-foreground leading-tight tracking-tighter mb-4">
              My Journey & <span className="text-primary">Experience.</span>
            </h1>
            <p className="text-muted-foreground max-w-xl leading-relaxed">
              CS student at PUP building real-world full-stack applications from
              university projects to production deployments.
            </p>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Profile + bio */}
          <ScrollReveal direction="left">
            <div className="flex flex-col gap-6">
              <div className="p-5 rounded-xl bg-card border border-border">
                <h2 className="text-xl font-black text-foreground">
                  Angelo Principio
                </h2>
                <p className="text-sm text-primary font-mono mt-0.5">
                  Full-Stack Developer
                </p>
                <p className="text-xs text-muted-foreground mt-0.5">
                  Polytechnic University of the Philippines
                </p>
              </div>
              <p className="text-muted-foreground text-sm leading-relaxed">
                I&apos;m a computer science student passionate about backend
                systems, database design, and clean code. I build end-to-end web
                apps with Next.js, Supabase, and PostgreSQL — focusing on
                performance and scalability.
              </p>
              {/* Highlights */}
              {[
                "Backend-focused full-stack developer",
                "REST API design & database modeling",
                "Google OAuth, Supabase Auth experience",
                "Open to internships & collaborations",
              ].map((point) => (
                <div key={point} className="flex items-start gap-2.5">
                  <CheckCircle
                    size={15}
                    className="text-primary shrink-0 mt-0.5"
                  />
                  <span className="text-sm text-foreground">{point}</span>
                </div>
              ))}
            </div>
          </ScrollReveal>

          {/* Experience timeline */}
          <div>
            <ScrollReveal direction="right">
              <h2 className="text-2xl font-bold text-foreground mb-8 flex items-center gap-3">
                <div className="w-1.5 h-7 bg-primary rounded-full" />
                Experience
              </h2>
            </ScrollReveal>
            <div className="space-y-5">
              {experience.map((job, index) => (
                <ScrollReveal key={job.id} direction="left" delay={index * 100}>
                  <div className="group relative pl-7 rounded-xl p-5 bg-card border border-border hover:border-primary/30 hover:bg-muted/50 transition-all duration-300">
                    <div className="absolute left-0 top-6 w-3.5 h-3.5 bg-primary rounded-full border-2 border-background shadow-lg -translate-x-[7px]" />
                    {index !== experience.length - 1 && (
                      <div className="absolute left-0 top-10 w-px h-16 bg-border" />
                    )}
                    <h3 className="text-sm font-bold text-foreground group-hover:text-primary transition-colors duration-300">
                      {job.role}
                    </h3>
                    <p className="text-xs text-primary font-semibold mt-1">
                      {job.company}
                    </p>
                    <p className="text-[10px] text-muted-foreground mt-0.5 font-mono">
                      {job.date}
                    </p>
                    <p className="text-muted-foreground mt-2.5 text-xs leading-relaxed">
                      {job.description}
                    </p>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
