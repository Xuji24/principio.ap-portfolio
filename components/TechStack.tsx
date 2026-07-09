"use client";

import React, { useMemo } from "react";
import { motion } from "framer-motion";
import dynamic from "next/dynamic";

const Cloud = dynamic(() => import("react-icon-cloud").then((mod) => mod.Cloud), {
  ssr: false,
});

type TechItem = {
  name: string;
  icon?: string;
  isExternal?: boolean;
  isTextOnly?: boolean;
};

const languages: TechItem[] = [
  { name: "TypeScript", icon: "/Typescript.png" },
  { name: "HTML5", icon: "/HTML.png" },
  { name: "CSS3", icon: "/CSS.png" },
  { name: "JavaScript", icon: "/Javascript.png" },
  { name: "Python", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg", isExternal: true },
];

const frameworks: TechItem[] = [
  { name: "Next.js", icon: "/NextJS.png" },
  { name: "React", icon: "/ReactJs.png" },
  { name: "Node.js", icon: "/NodeJs.png" },
  { name: "Express", icon: "/expressjs-light.png" },
  { name: "Tailwind CSS", icon: "/tailwindcss.png" },
  { name: "jQuery", icon: "/Jquery.png" },
  { name: "FastAPI", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/fastapi/fastapi-original.svg", isExternal: true },
];

const integrations: TechItem[] = [
  { name: "PostgreSQL", icon: "/PostgreSQL.png" },
  { name: "MySQL", icon: "/MySQL.png" },
  { name: "Supabase", icon: "/Supabase.png" },
  { name: "RESTful API", isTextOnly: true },
  { name: "Claude AI", icon: "/anthropic.svg", isExternal: false },
  { name: "Antigravity", icon: "/antigravity-color.svg", isExternal: false },
  { name: "Gemini", icon: "https://upload.wikimedia.org/wikipedia/commons/8/8a/Google_Gemini_logo.svg", isExternal: true },
  { name: "GitHub Copilot", icon: "/githubcopilot.svg", isExternal: false },
];

const allTech = [...languages, ...frameworks, ...integrations];

const TechSphere = ({ items }: { items: TechItem[] }) => {
  const icons = useMemo(() => {
    return items.map((item, i) => {
      if (item.isTextOnly) {
        return (
          <a key={i} href="#" onClick={(e) => e.preventDefault()} title={item.name}>
            {item.name}
          </a>
        );
      }
      return (
        <a key={i} href="#" onClick={(e) => e.preventDefault()} title={item.name}>
          <img src={item.icon as string} alt={item.name} height={42} width={42} crossOrigin="anonymous" />
        </a>
      );
    });
  }, [items]);

  return (
    <div className="relative w-full h-[350px] md:h-[600px] flex items-center justify-center overflow-visible touch-none select-none">
      <Cloud
        containerProps={{
          style: {
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
            height: "100%",
          },
        }}
        options={{
          reverse: true,
          depth: 1,
          wheelZoom: false,
          imageScale: 2,
          activeCursor: "default",
          tooltip: "native",
          initial: [0.1, -0.1],
          clickToFront: 500,
          tooltipDelay: 0,
          outlineColour: "#0000",
          maxSpeed: 0.04,
          minSpeed: 0.02,
          dragControl: true,
          textColour: "#06b6d4",
          textHeight: 22,
          textFont: "Montserrat, sans-serif",
          imagePadding: 10,
        }}
      >
        {icons}
      </Cloud>
    </div>
  );
};

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

      <div className="w-full flex items-center justify-center mt-12 md:mt-0">
        <TechSphere items={allTech} />
      </div>
    </section>
  );
}
