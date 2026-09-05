"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Award, Maximize2, X } from "lucide-react";
import Image from "next/image";

// Server-rendered <img> tags can finish erroring before React hydrates and
// attaches the onError listener, so the event is missed. Checking
// `complete && naturalWidth === 0` on mount catches those already-failed loads.
function CertImage({
  src,
  alt,
  className,
  onBroken,
}: {
  src: string;
  alt: string;
  className: string;
  onBroken: () => void;
}) {
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const el = imgRef.current;
    if (el && el.complete && el.naturalWidth === 0) {
      onBroken();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [src]);

  return (
    <Image
      ref={imgRef}
      src={src}
      alt={alt}
      fill
      sizes="(max-width: 768px) 90vw, (max-width: 1024px) 45vw, 30vw"
      onError={onBroken}
      className={className}
      draggable={false}
    />
  );
}

interface Certification {
  id: string;
  title: string;
  issuer: string;
  date: string;
  image: string;
  description: string;
}

const certifications: Certification[] = [
  {
    id: "salesforce-internship",
    title: "Salesforce Supported Virtual Internship Program",
    issuer: "Salesforce (Philippines)",
    date: "January 2025",
    image: "/Salesforce.png",
    description:
      "Hands-on virtual internship covering Salesforce fundamentals, mentored by industry professionals within the Philippine developer community.",
  },
  {
    id: "cisco-modern-ai",
    title: "Introduction to Modern AI",
    issuer: "Cisco Networking Academy",
    date: "September 2025",
    image: "/Introduction_to_Modern_AI.png",
    description:
      "Fundamentals of modern AI, covering machine learning concepts, real-world applications, and responsible AI practices.",
  },
  {
    id: "cisco-cybersecurity",
    title: "Introduction to Cybersecurity",
    issuer: "Cisco Networking Academy",
    date: "April 2025",
    image: "/cybersecurity.png",
    description:
      "Core cybersecurity concepts, common threats, and best practices for protecting data, devices, and networks.",
  },
  {
    id: "cisco-python-essentials",
    title: "Python Essentials 1",
    issuer: "Cisco Networking Academy",
    date: "July 2026",
    image: "/Python_Essentials_1.png",
    description:
      "Foundational Python programming: data types, control flow, functions, and basic data structures.",
  },
  {
    id: "google-ai-fundamentals",
    title: "AI Fundamentals",
    issuer: "Google",
    date: "August 2026",
    image: "/ai-fundamentals.jpeg",
    description:
      "Core AI concepts — LLMs, training data, models and agents, and effective prompting — with hands-on practice using Gemini.",
  },
  {
    id: "ai-brainstorming-and-planning",
    title: "AI for Brainstorming and Planning",
    issuer: "Google",
    date: "August 2026",
    image: "/ai-brainstorm-and-planning.png",
    description:
      "Using AI to brainstorm concepts, build detailed timelines, and organize a clear plan for any goal.",
  },
  {
    id: "ai-research-and-insights",
    title: "AI for Research and Insights",
    issuer: "Google",
    date: "August 2026",
    image: "/ai-research-and-insights.png",
    description:
      "Advanced research workflows: evidence-based problem-solving with Gemini Deep Research, synthesizing dense documentation into focused knowledge bases with NotebookLM, and engineering AI personas for expert-level reviews.",
  },
  {
    id: "ai-writing-and-communicating",
    title: "AI for Writing and Communicating",
    issuer: "Google",
    date: "August 2026",
    image: "/ai-writing-communicating.png",
    description:
      "AI-assisted professional communication: stakeholder-specific messaging with Gemini Canvas, pressure-testing ideas through multi-stage HR/technical/director interviews, and refining real-time verbal communication with Gemini Live.",
  },
  {
    id: "ai-content-creation",
    title: "AI for Content Creation",
    issuer: "Google",
    date: "August 2026",
    image: "/ai-content-creation.png",
    description:
      "Streamlining product presentation and UI asset generation: multimodal AI for intro videos, Gemini Canvas for turning documentation into stakeholder slide decks, precise prompt engineering for UI graphics, and AI-driven feedback loops for visual assets.",
  },
  {
    id: "ai-data-analysis",
    title: "AI for Data Analysis",
    issuer: "Google",
    date: "August 2026",
    image: "/ai-data-analysis.png",
    description:
      "Extracting and visualizing business intelligence: defining key performance metrics, converting unstructured assets into queryable data with NLP and Sheets' =AI() function, and simulating business impact with Gemini Canvas for stakeholder dashboards.",
  },
];

const MORPH_TRANSITION = { duration: 0.45, ease: [0.16, 1, 0.3, 1] as const };

export default function Certifications() {
  const [selected, setSelected] = useState<Certification | null>(null);
  const [brokenImages, setBrokenImages] = useState<Set<string>>(new Set());

  const markBroken = (id: string) => {
    setBrokenImages((prev) => new Set(prev).add(id));
  };

  useEffect(() => {
    if (!selected) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSelected(null);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [selected]);

  return (
    <section id="certifications" className="relative py-16 md:py-24 px-6 lg:px-16 overflow-hidden">
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(0,255,255,0.05)_0%,transparent_70%)]" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="mb-16 md:mb-20 text-center"
        >
          <h2 className="font-heading font-black text-4xl md:text-6xl text-foreground mb-4 uppercase tracking-tighter">
            Certifications
          </h2>
          <div className="h-1 w-24 bg-primary mb-6 mx-auto" />
          <p className="font-mono text-muted-foreground text-sm max-w-2xl mx-auto">
            {"// CREDENTIALS AND COURSES I'VE COMPLETED ALONG THE WAY."}
          </p>
        </motion.div>

        {/* Modal cards grid — scrolls internally with the scrollbar hidden */}
        <div className="relative">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-8 max-h-[70vh] overflow-y-auto scrollbar-hidden pr-1 pb-1">
          {certifications.map((cert, index) => {
            const isBroken = brokenImages.has(cert.id);
            return (
              <motion.div
                key={cert.id}
                layoutId={`cert-card-${cert.id}`}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.5, delay: (index % 3) * 0.08 }}
                onClick={() => setSelected(cert)}
                className="group relative flex flex-col rounded-2xl border border-border bg-card/60 backdrop-blur-md overflow-hidden cursor-pointer transition-colors duration-300 hover:border-primary/50 hover:shadow-[0_0_32px_rgba(0,229,255,0.12)]"
              >
                <motion.div
                  layoutId={`cert-image-${cert.id}`}
                  className="relative w-full aspect-video bg-linear-to-br from-primary/50 to-secondary/10 flex items-center justify-center"
                >
                  {!isBroken ? (
                    <CertImage
                      src={cert.image}
                      alt={cert.title}
                      onBroken={() => markBroken(cert.id)}
                      className="object-contain p-3 w-full h-full transition-transform duration-500 ease-in-out hover:scale-105"
                    />
                  ) : (
                    <Award className="text-primary/70" size={32} />
                  )}
                </motion.div>

                <button
                  type="button"
                  aria-label="View details"
                  className="absolute top-3 right-3 z-10 flex items-center justify-center w-8 h-8 rounded-full bg-background/70 backdrop-blur-md border border-border text-muted-foreground group-hover:text-primary group-hover:border-primary/50 transition-colors duration-300"
                >
                  <Maximize2 size={16} />
                </button>

                <div className="p-4 md:p-5">
                  <p className="font-heading font-bold text-sm md:text-base text-foreground leading-tight mb-1">
                    {cert.title}
                  </p>
                  <p className="font-mono text-[10px] md:text-xs text-muted-foreground">
                    {cert.issuer} &middot; {cert.date}
                  </p>
                </div>
              </motion.div>
            );
          })}
          </div>

          {/* Fade hint — signals more content below since the scrollbar is hidden */}
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-background to-transparent" />
        </div>
      </div>

      {/* Detail modal */}
      <AnimatePresence>
        {selected && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={() => setSelected(null)}
            className="fixed inset-0 z-100 flex items-center justify-center p-6 bg-background/90 backdrop-blur-sm"
          >
            <motion.div
              layoutId={`cert-card-${selected.id}`}
              transition={MORPH_TRANSITION}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-2xl bg-card border border-border rounded-2xl overflow-y-auto shadow-xl max-h-[85vh]"
            >
              <button
                type="button"
                onClick={() => setSelected(null)}
                aria-label="Close"
                className="absolute top-4 right-4 z-10 flex items-center justify-center w-9 h-9 rounded-full bg-background/70 backdrop-blur-md border border-border text-muted-foreground hover:text-primary hover:border-primary/50 transition-colors cursor-pointer"
              >
                <X size={18} />
              </button>

              <motion.div
                layoutId={`cert-image-${selected.id}`}
                className="relative w-full aspect-video min-h-40 bg-linear-to-br from-primary/50 to-secondary/10 flex items-center justify-center"
              >
                {!brokenImages.has(selected.id) ? (
                  <CertImage
                    src={selected.image}
                    alt={selected.title}
                    onBroken={() => markBroken(selected.id)}
                    className="object-contain p-4"
                  />
                ) : (
                  <Award className="text-primary/70" size={40} />
                )}
              </motion.div>

              <div className="p-6 md:p-8">
                <h3 className="font-heading font-bold text-xl md:text-2xl text-foreground tracking-tight mb-1">
                  {selected.title}
                </h3>
                <p className="font-heading text-primary font-medium mb-3">{selected.issuer}</p>
                <span className="inline-block px-3 py-1 bg-primary/10 text-primary font-mono text-xs rounded-full border border-primary/20 mb-4">
                  {selected.date}
                </span>
                <p className="text-foreground/80 leading-relaxed font-sans text-sm md:text-base">
                  {selected.description}
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
