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
    description: "Structuring robust data models and optimizing queries using PostgreSQL, MongoDB, and Supabase.",
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
    <section id="expertise" className="relative min-h-screen py-24 px-6 lg:px-16 overflow-hidden">
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
                className="group relative p-8 rounded-2xl border border-border bg-card/50 backdrop-blur-sm hover:border-primary/50 transition-colors duration-300"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl pointer-events-none" />
                
                <div className="mb-6 inline-flex p-3 rounded-lg bg-primary/10 text-primary group-hover:scale-110 transition-transform duration-300">
                  <Icon size={32} />
                </div>
                
                <h3 className="text-2xl font-bold font-heading mb-4 tracking-tight group-hover:text-primary transition-colors">
                  {skill.title}
                </h3>
                
                <p className="text-muted-foreground font-sans leading-relaxed">
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
