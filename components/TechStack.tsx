"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const mainSkills = [
  { name: "Next.js", icon: "/NextJS.png" },
  { name: "React", icon: "/ReactJs.png" },
  { name: "TypeScript", icon: "/Typescript.png" },
  { name: "Node.js", icon: "/NodeJs.png" },
  { name: "Express", icon: "/expressjs-light.png" },
  { name: "HTML5", icon: "/HTML.png" },
  { name: "CSS3", icon: "/CSS.png" },
  { name: "JavaScript", icon: "/Javascript.png" },
  { name: "Tailwind CSS", icon: "/tailwindcss.png" },
  { name: "PostgreSQL", icon: "/PostgreSQL.png" },
  { name: "MySQL", icon: "/MySQL.png" },
  { name: "Supabase", icon: "/Supabase.png" },
  { name: "jQuery", icon: "/Jquery.png" },
];

const backendTools = [
  {
    name: "FastAPI",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/fastapi/fastapi-original.svg",
    isExternal: true,
  },
  {
    name: "RESTful API",
    isTextOnly: true,
  },
];

const aiTools = [
  { 
    name: "Claude AI", 
    icon: "/anthropic.svg",
    isExternal: false 
  },
  { 
    name: "Antigravity", 
    icon: "/antigravity-color.svg",
    isExternal: false 
  },
  { 
    name: "Gemini", 
    icon: "https://upload.wikimedia.org/wikipedia/commons/8/8a/Google_Gemini_logo.svg",
    isExternal: true 
  },
  { 
    name: "GitHub Copilot", 
    icon: "/githubcopilot.svg",
    isExternal: false 
  },
];

export default function TechStack() {
  return (
    <section id="techstack" className="relative py-24 px-6 lg:px-16 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <h2 className="font-heading font-black text-4xl md:text-6xl text-foreground mb-4 uppercase tracking-tighter">
            Tech Arsenal
          </h2>
          <div className="h-1 w-24 bg-primary mb-6" />
          <p className="font-mono text-muted-foreground text-sm max-w-2xl">
            // TECHNOLOGIES AND TOOLS I UTILIZE TO BUILD SCALABLE APPLICATIONS.
          </p>
        </motion.div>

        {/* Core Tech Stack */}
        <div className="mb-16">
          <h3 className="text-xl font-bold font-heading mb-8 text-foreground">Core Technologies</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
            {mainSkills.map((skill, index) => (
              <motion.div
                key={skill.name}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                className="flex flex-col items-center justify-center p-6 rounded-2xl bg-card border border-border hover:border-primary/50 transition-colors group"
              >
                <div className="relative w-12 h-12 mb-4 group-hover:scale-110 transition-transform duration-300">
                  <Image src={skill.icon} alt={skill.name} fill className="object-contain" />
                </div>
                <span className="font-mono text-xs text-muted-foreground group-hover:text-foreground transition-colors text-center">
                  {skill.name}
                </span>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Backend & API */}
          <div>
            <h3 className="text-xl font-bold font-heading mb-8 text-foreground">Backend & APIs</h3>
            <div className="grid grid-cols-2 gap-6">
              {backendTools.map((tool, index) => (
                <motion.div
                  key={tool.name}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className="flex flex-col items-center justify-center p-6 rounded-2xl bg-card border border-border hover:border-primary/50 transition-colors group"
                >
                  {tool.isTextOnly ? (
                    <div className="mb-4 flex items-center justify-center group-hover:scale-110 transition-transform duration-300 h-14">
                      <span className="font-heading font-black text-2xl tracking-tighter text-center drop-shadow-sm">
                        <span className="text-[#ef4444]">REST</span><span className="text-foreground">ful API</span>
                      </span>
                    </div>
                  ) : (
                    <div className="relative w-14 h-14 mb-4 p-2 bg-white rounded-full group-hover:scale-110 transition-transform duration-300 shadow-sm flex items-center justify-center">
                      <Image src={tool.icon as string} alt={tool.name} fill className="object-contain p-2" unoptimized={tool.isExternal} />
                    </div>
                  )}
                  <span className="font-mono text-xs text-muted-foreground group-hover:text-foreground transition-colors text-center">
                    {tool.name}
                  </span>
                </motion.div>
              ))}
            </div>
          </div>

          {/* AI Tools */}
          <div>
            <h3 className="text-xl font-bold font-heading mb-8 text-foreground">AI Integration Tools</h3>
            <div className="grid grid-cols-2 gap-6">
              {aiTools.map((tool, index) => (
                  <motion.div
                    key={tool.name}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    className="flex flex-col items-center justify-center p-6 rounded-2xl bg-card border border-border hover:border-primary/50 transition-colors group"
                  >
                    <div className="relative w-14 h-14 mb-4 p-2 bg-white rounded-full group-hover:scale-110 transition-transform duration-300 shadow-sm flex items-center justify-center">
                      <Image src={tool.icon as string} alt={tool.name} fill className="object-contain p-2" unoptimized={tool.isExternal} />
                    </div>
                    <span className="font-mono text-xs text-muted-foreground group-hover:text-foreground transition-colors text-center">
                      {tool.name}
                    </span>
                  </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
