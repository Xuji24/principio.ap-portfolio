"use client";

import { motion } from "framer-motion";
import { Code2, Server, Smartphone, Database } from "lucide-react";

const skills = [
  {
    title: "Frontend Development",
    description: "Building responsive, accessible, and highly interactive user interfaces using React, Next.js, and modern CSS frameworks like Tailwind.",
    icon: Code2,
  },
  {
    title: "Backend Architecture",
    description: "Designing scalable server-side applications and RESTful/GraphQL APIs using Node.js, Express, and Python.",
    icon: Server,
  },
  {
    title: "Database Management",
    description: "Structuring robust data models and optimizing queries using MySQL, PostgreSQL, and Supabase.",
    icon: Database,
  },
  {
    title: "Responsive Design",
    description: "Creating fluid layouts that adapt seamlessly to any device, ensuring a flawless experience from mobile to desktop.",
    icon: Smartphone,
  },
];

export default function Expertise() {
  return (
    <section id="expertise" className="relative md:min-h-screen py-16 md:py-24 px-6 lg:px-16 overflow-hidden">
      {/* Background motifs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-[0.03] select-none text-foreground font-mono text-[20vw] leading-none font-black flex flex-col justify-between -z-10">
        <span className="-ml-10 mt-10">&lt;div&gt;</span>
        <span className="self-end -mr-10 mb-10">&lt;/div&gt;</span>
      </div>

      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="mb-16 md:mb-24"
        >
          <h2 className="font-heading font-black text-4xl md:text-6xl text-foreground mb-4 uppercase tracking-tighter">
            My Expertise
          </h2>
          <div className="h-1 w-24 bg-primary" />
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          {skills.map((skill, index) => {
            const Icon = skill.icon;
            return (
              <motion.div
                key={skill.title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group relative p-8 rounded-3xl border border-border bg-card/60 backdrop-blur-2xl hover:border-cyan-500/50 transition-colors duration-500 shadow-2xl overflow-hidden"
              >
                {/* Subtle Cyan Accents for Depth */}
                <div className="absolute top-0 right-0 w-[150%] h-[150%] bg-[linear-gradient(45deg,transparent_45%,rgba(0,255,255,0.02)_50%,transparent_55%)] bg-length:[12px_12px] opacity-40 z-0 pointer-events-none" />
                <div className="hidden md:block absolute -bottom-10 -right-10 w-48 h-48 bg-cyan-500/10 rounded-full blur-[50px] z-0 pointer-events-none opacity-50 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="hidden md:block absolute -top-10 -left-10 w-32 h-32 bg-primary/10 rounded-full blur-2xl z-0 pointer-events-none opacity-50 group-hover:opacity-100 transition-opacity duration-500" />

                <div className="w-16 h-16 rounded-full bg-card border border-border flex items-center justify-center mb-6 shadow-[0_10px_30px_rgba(0,0,0,0.5)] relative z-10 group-hover:border-cyan-500/50 transition-colors duration-500 group-hover:scale-110">
                  <Icon size={28} className="text-cyan-400" />
                </div>

                <h3 className="text-2xl font-bold font-heading mb-4 tracking-tight group-hover:text-cyan-400 transition-colors relative z-10 text-foreground">
                  {skill.title}
                </h3>

                <p className="text-muted-foreground font-sans leading-relaxed relative z-10">
                  {skill.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
