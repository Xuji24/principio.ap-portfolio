"use client";

import { motion } from "framer-motion";
import { ExternalLink, Github } from "lucide-react";
import Image from "next/image";

const projects = [
  {
    title: "D-Creatives Booking App",
    description: "A comprehensive booking platform integrating AI and robust data management for a seamless scheduling experience.",
    tech: ["Next.js", "Node.js", "TypeScript", "React.js", "HuggingFace", "RESTful API", "Supabase", "PostgreSQL"],
    github: "https://github.com/Xuji24/d.creatives",
    live: "https://d-creatives.online",
    featured: true,
    image: "/dcreatives.png"
  },
  {
    title: "PUP Edu Track",
    description: "An educational tracking and management system designed for students and faculty.",
    tech: ["C#", "MySQL"],
    github: "#",
    live: "#",
    featured: false,
    image: "/PUP-EduTrack.png"
  },
  {
    title: "ThesisIT",
    description: "A web application designed to help students prepare for their thesis defense allowing them to practice, analyze document weaknesses, and real-time feedback, and chat with AI for guidance.",
    tech: ["React.js", "Vite", "Express.js", "Tailwind", "TypeScript"],
    github: "https://github.com/Xuji24/ThesisIT",
    live: "https://thesisit.vercel.app/",
    featured: false,
    image: "/thesisit.png"
  },
  {
    title: "StayQualifAI",
    description: "AI assisted web application that guides user to prepare for job, from resume building, interview preparation, job searching, and upskilling certifications. This project is an MVP created with teams",
    tech: ["React.js", "Node.js", "Express.js", "Tailwind", "Typescript", "PostgreSQL", "Supabase"],
    github: "https://github.com/Xuji24/Boji-AI",
    live: "https://stayqualifai.vercel.app/",
    featured: false,
    image: "/stayqualifai.png"
  },
  {
    title: "Be Fit Era",
    description: "A running and fitness web application that allows users to join running events, track their progress, and connect with other fitness enthusiasts.",
    tech: ["Next.js", "Node.js", "Express.js", "Tailwind", "TypeScript", "PostgreSQL", "Supabase"],
    github: "https://github.com/Xuji24/Fitra",
    live: "https://be-fit-era.vercel.app",
    featured: false,
    image: "/be-fit-era-mockup.png"
  },
  {
    title: "Boji-AI",
    description: "An AI assisted web application that guides user to prepare for job, from resume building, interview preparation, job searching, and upskilling certifications.",
    tech: ["React.js", "Node.js", "Express.js", "Tailwind", "Typescript", "PostgreSQL", "Supabase"],
    github: "https://github.com/Xuji24/boji-ai",
    live: "https://boji-ai.vercel.app/",
    featured: false,
    image: "/boji-ai-mockup.png"
  },
];

export default function Projects() {
  return (
    <section id="projects" className="relative md:min-h-screen py-16 md:py-24 px-6 lg:px-16 bg-background">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="mb-16 md:mb-24 flex flex-col md:flex-row md:items-end justify-between gap-8"
        >
          <div>
            <h2 className="font-heading font-black text-4xl md:text-6xl text-foreground mb-4 uppercase tracking-tighter">
              Selected Work
            </h2>
            <div className="h-1 w-24 bg-primary" />
          </div>
          <p className="font-mono text-muted-foreground text-sm max-w-sm">
            {"// A CURATED LIST OF RECENT PROJECTS SHOWCASING MY EXPERTISE AND PASSION FOR BUILDING."}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {projects.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`group relative flex flex-col rounded-2xl overflow-hidden border border-border bg-card/40 backdrop-blur-sm hover:border-primary/50 transition-all duration-500 ${
                project.featured ? "lg:col-span-2 lg:flex-row" : ""
              }`}
            >
              {/* Project Image */}
              <div
                className={`relative bg-muted overflow-hidden ${
                  project.featured ? "lg:w-[55%] min-h-75" : "h-64"
                }`}
              >
                <div className="absolute inset-0 group-hover:bg-transparent transition-colors duration-500 z-10 pointer-events-none" />
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes={project.featured ? "(max-width: 1024px) 100vw, 55vw" : "(max-width: 1024px) 100vw, 50vw"}
                  priority={project.featured}
                />
              </div>

              {/* Project Info */}
              <div className={`p-8 flex flex-col justify-center flex-1 ${project.featured ? "lg:p-12" : ""}`}>
                {project.featured && (
                  <span className="font-mono text-xs text-primary tracking-widest uppercase mb-2">
                    Featured Project
                  </span>
                )}
                <h3 className="text-2xl md:text-3xl font-bold font-heading mb-4 group-hover:text-primary transition-colors">
                  {project.title}
                </h3>
                <p className="text-muted-foreground font-sans leading-relaxed mb-6">
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-2 mb-8">
                  {project.tech.map((t) => (
                    <span
                      key={t}
                      className="px-3 py-1 text-xs font-mono rounded-full border border-border bg-background/50 text-foreground"
                    >
                      {t}
                    </span>
                  ))}
                </div>

                <div className="mt-auto flex items-center gap-6">
                  <a
                    href={project.github}
                    className="text-muted-foreground hover:text-foreground transition-colors flex items-center gap-2 font-mono text-sm uppercase tracking-wider"
                  >
                    <Github size={18} />
                    Code
                  </a>
                  <a
                    href={project.live}
                    className="text-muted-foreground hover:text-primary transition-colors flex items-center gap-2 font-mono text-sm uppercase tracking-wider"
                  >
                    <ExternalLink size={18} />
                    Live Demo
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
