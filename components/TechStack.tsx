"use client";

import React from "react";
import { motion } from "framer-motion";
import LogoLoop, { type LogoLoopItem } from "@/components/LogoLoop";

const toLogo = (name: string, icon: string): LogoLoopItem => ({
  src: icon,
  alt: name,
  title: name,
});

const textLogo = (name: string): LogoLoopItem => ({
  node: (
    <span className="text-xs font-semibold px-3 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary whitespace-nowrap">
      {name}
    </span>
  ),
  title: name,
  ariaLabel: name,
});

const languages: LogoLoopItem[] = [
  toLogo("TypeScript", "/Typescript.png"),
  toLogo("HTML5", "/HTML.png"),
  toLogo("CSS3", "/CSS.png"),
  toLogo("JavaScript", "/Javascript.png"),
  toLogo("Python", "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg"),
  toLogo("Java", "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg"),
];

const frameworks: LogoLoopItem[] = [
  toLogo("Next.js", "/NextJS.png"),
  toLogo("React", "/ReactJs.png"),
  toLogo("Node.js", "/NodeJs.png"),
  toLogo("Express", "/expressjs-light.png"),
  toLogo("Tailwind CSS", "/tailwindcss.png"),
  toLogo("jQuery", "/Jquery.png"),
  toLogo("FastAPI", "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/fastapi/fastapi-original.svg"),
];

const integrations: LogoLoopItem[] = [
  toLogo("PostgreSQL", "/PostgreSQL.png"),
  toLogo("MySQL", "/MySQL.png"),
  toLogo("Supabase", "/Supabase.png"),
  textLogo("RESTful API"),
  toLogo("Claude AI", "/anthropic.svg"),
  toLogo("Antigravity", "/antigravity-color.svg"),
  toLogo("Gemini", "https://upload.wikimedia.org/wikipedia/commons/8/8a/Google_Gemini_logo.svg"),
  toLogo("GitHub Copilot", "/githubcopilot.svg"),
];

const rows = [
  { items: [...languages, ...frameworks.slice(0, 5)], direction: "left" as const },
  { items: [...frameworks.slice(5), ...integrations], direction: "right" as const },
];

export default function TechStack() {
  return (
    <section id="techstack" className="relative py-12 md:py-24 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="mb-8 md:mb-16"
        >
          <h2 className="font-heading font-black text-4xl md:text-6xl text-foreground mb-4 uppercase tracking-tighter">
            Tech Skills
          </h2>
          <div className="h-1 w-24 bg-primary mb-6" />
          <p className="font-mono text-muted-foreground text-sm max-w-2xl">
            {"// TECHNOLOGIES AND TOOLS I UTILIZE TO BUILD SCALABLE APPLICATIONS."}
          </p>
        </motion.div>
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-16 flex flex-col gap-6 md:gap-10 overflow-hidden">
        {rows.map((row, i) => (
          <LogoLoop
            key={i}
            logos={row.items}
            direction={row.direction}
            speed={40}
            logoHeight={40}
            gap={48}
            pauseOnHover
            scaleOnHover
            ariaLabel="Tech stack logos"
          />
        ))}
      </div>
    </section>
  );
}
