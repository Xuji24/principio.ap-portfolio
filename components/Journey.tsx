"use client";

import { motion } from "framer-motion";
import { Briefcase } from "lucide-react";

const experiences = [
  {
    title: "Full Stack Developer | Data Analyst Intern",
    company: "S.P. Madrid",
    date: "Mar 2026 - June 2026",
    duration: "3 Months",
    responsibilities: [
      "Developed an automated performance tracking and incentive system using Next.js for the frontend and Python for the backend.",
      "Applied TypeScript to improve code quality and support early detection of issues during development.",
      "Managed data using PostgreSQL, with database migrations handled through Alembic and schema management using SQLAlchemy.",
      "Built responsive and user-friendly interfaces with Tailwind CSS, incorporating component libraries such as ShadCN and Lucide React.",
      "Performed end-to-end testing using Playwright to ensure frontend reliability and identify bugs effectively.",
      "Leveraged AI tools including Claude AI, GitHub Copilot, Antigravity, and ChatGPT to streamline development, enhance collaboration, and support the creation of AI-driven workflows and agent-based solutions.",
    ],
  },
];

export default function Journey() {
  return (
    <section id="journey" className="relative py-24 px-6 lg:px-16 bg-background overflow-hidden">
      {/* Decorative Background */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        {/* Deep Cyan Radial Gradient for depth */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(0,255,255,0.05)_0%,transparent_70%)]" />

        {/* Subtle cyan grid pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(0,255,255,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,255,255,0.03)_1px,transparent_1px)] bg-size-[32px_32px] mask-image:[radial-gradient(ellipse_at_center,black_40%,transparent_80%)]" />
        
        {/* Layered Glowing Orbs for 3D Depth */}
        <motion.div
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.15, 0.25, 0.15],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[10%] -right-[5%] w-125 h-125 rounded-full bg-cyan-500/20 blur-[120px]"
        />
        <motion.div
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.1, 0.2, 0.1],
          }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className="absolute top-[40%] -left-[10%] w-96 h-96 rounded-full bg-primary/20 blur-[100px]"
        />
        <motion.div
          animate={{
            scale: [1, 1.4, 1],
            opacity: [0.1, 0.25, 0.1],
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          className="absolute bottom-[-10%] right-[10%] w-150 h-150 rounded-full bg-cyan-600/10 blur-[150px]"
        />
        
        {/* Deep gradient overlay at the bottom for smooth transition */}
        <div className="absolute bottom-0 left-0 w-full h-1/3 bg-linear-to-t from-background via-background/80 to-transparent" />
      </div>

      <div className="max-w-4xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="mb-16 md:mb-24"
        >
          <h2 className="font-heading font-black text-4xl md:text-6xl text-foreground mb-4 uppercase tracking-tighter">
            My Journey
          </h2>
          <div className="h-1 w-24 bg-primary mb-6" />
          <p className="font-mono text-muted-foreground text-sm">
            {"// PROFESSIONAL EXPERIENCE AND INTERNSHIPS."}
          </p>
        </motion.div>

        <div className="relative border-l-2 border-border pl-8 ml-4 md:ml-0 md:pl-12">
          {experiences.map((exp, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5 }}
              className="relative mb-16 last:mb-0"
            >
              {/* Timeline dot */}
              <div className="absolute -left-10.25 md:-left-14.25 top-1 p-2 bg-background border-2 border-primary rounded-full">
                <Briefcase size={16} className="text-primary" />
              </div>

              <div className="bg-card/60 backdrop-blur-md border border-border rounded-2xl p-6 md:p-8 hover:border-primary/50 transition-colors shadow-lg">
                <div className="flex flex-col md:flex-row md:items-start justify-between mb-4 gap-2">
                  <div>
                    <h3 className="text-2xl font-bold font-heading text-foreground tracking-tight">
                      {exp.title}
                    </h3>
                    <p className="text-xl font-heading text-primary font-medium">
                      {exp.company}
                    </p>
                  </div>
                  <div className="text-left md:text-right">
                    <span className="inline-block px-3 py-1 bg-primary/10 text-primary font-mono text-xs rounded-full border border-primary/20 mb-1">
                      {exp.date}
                    </span>
                    <p className="font-mono text-muted-foreground text-xs">
                      {exp.duration}
                    </p>
                  </div>
                </div>

                <div className="mt-6">
                  <h4 className="font-mono text-sm uppercase tracking-wider text-muted-foreground mb-4">
                    Duties & Responsibilities:
                  </h4>
                  <ul className="space-y-3">
                    {exp.responsibilities.map((resp, i) => (
                      <li key={i} className="flex items-start gap-3 text-foreground/80 leading-relaxed font-sans text-sm md:text-base">
                        <span className="text-primary mt-1.5">•</span>
                        <span>{resp}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
