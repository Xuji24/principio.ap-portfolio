"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Award, ChevronLeft, ChevronRight, X } from "lucide-react";

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
    <img
      ref={imgRef}
      src={src}
      alt={alt}
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

// Placeholder entries — swap `image` for the real certificate file in /public/certificates/
// and fill in the actual `date` once available.
const certifications: Certification[] = [
  {
    id: "salesforce-internship",
    title: "Salesforce Supported Virtual Internship Program",
    issuer: "Salesforce (Philippines)",
    date: "2025",
    image: "/certificates/salesforce-internship.png",
    description:
      "Completed a virtual internship program focused on Salesforce fundamentals, guided by industry mentors through hands-on project work within the Philippine developer community.",
  },
  {
    id: "cisco-modern-ai",
    title: "Introduction to Modern AI",
    issuer: "Cisco Networking Academy",
    date: "Month Year",
    image: "/certificates/cisco-modern-ai.png",
    description:
      "Covered the fundamentals of modern artificial intelligence, including machine learning concepts, real-world applications, and responsible AI practices.",
  },
  {
    id: "cisco-cybersecurity",
    title: "Introduction to Cybersecurity",
    issuer: "Cisco Networking Academy",
    date: "Month Year",
    image: "/certificates/cisco-cybersecurity.png",
    description:
      "Introduced core cybersecurity concepts, common threats, and best practices for protecting data, devices, and networks.",
  },
  {
    id: "cisco-python-essentials",
    title: "Python Essentials 1",
    issuer: "Cisco Networking Academy",
    date: "Month Year",
    image: "/certificates/cisco-python-essentials-1.png",
    description:
      "Covered foundational Python programming concepts including data types, control flow, functions, and basic data structures.",
  },
  {
    id: "placeholder-5",
    title: "Certification Title",
    issuer: "Issuing Organization",
    date: "Month Year",
    image: "/certificates/certificate-5.png",
    description: "Add a short description of this certificate here.",
  },
];

const COUNT = certifications.length;

// Shortest signed distance from `active` to `index` on a ring of size COUNT.
function ringOffset(index: number, active: number) {
  let diff = (index - active) % COUNT;
  if (diff > COUNT / 2) diff -= COUNT;
  if (diff < -COUNT / 2) diff += COUNT;
  return diff;
}

export default function Certifications() {
  const [active, setActive] = useState(0);
  const [selected, setSelected] = useState<Certification | null>(null);
  const [brokenImages, setBrokenImages] = useState<Set<string>>(new Set());

  const goPrev = useCallback(() => setActive((i) => (i - 1 + COUNT) % COUNT), []);
  const goNext = useCallback(() => setActive((i) => (i + 1) % COUNT), []);

  const handleCardClick = (index: number, cert: Certification) => {
    if (index === active) {
      setSelected(cert);
    } else {
      setActive(index);
    }
  };

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

        {/* Carousel */}
        <div className="relative flex items-center justify-center">
          <button
            type="button"
            onClick={goPrev}
            aria-label="Previous certificate"
            className="absolute left-0 z-20 p-2.5 md:p-3 rounded-full border border-border bg-card/60 backdrop-blur-md text-muted-foreground hover:text-primary hover:border-primary/50 transition-all duration-300 cursor-pointer"
          >
            <ChevronLeft size={20} />
          </button>

          <div
            className="relative w-full h-[280px] md:h-[340px] flex items-center justify-center"
            style={{ perspective: "1400px" }}
          >
            {certifications.map((cert, index) => {
              const offset = ringOffset(index, active);
              const absOffset = Math.abs(offset);
              const isCenter = offset === 0;
              const isVisible = absOffset <= 2;

              const translateX = `calc(${offset} * min(32vw, 240px))`;
              const rotateY = -offset * 28;
              const scale = 1 - absOffset * 0.16;
              const opacity = isVisible ? 1 - absOffset * 0.28 : 0;
              const zIndex = 10 - absOffset;
              const isBroken = brokenImages.has(cert.id);

              return (
                <div
                  key={cert.id}
                  onClick={() => handleCardClick(index, cert)}
                  className="absolute left-1/2 top-1/2 cursor-pointer"
                  style={{
                    transform: `translate(-50%, -50%) translateX(${translateX}) rotateY(${rotateY}deg) scale(${scale})`,
                    zIndex,
                    opacity,
                    pointerEvents: isVisible ? "auto" : "none",
                    transition:
                      "transform 0.6s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.6s ease",
                    transformStyle: "preserve-3d",
                  }}
                >
                  <div
                    className={`group relative w-56 h-36 md:w-72 md:h-44 lg:w-80 lg:h-48 rounded-2xl border overflow-hidden bg-card/60 backdrop-blur-md shadow-lg transition-all duration-300 hover:scale-[1.03] ${
                      isCenter
                        ? "border-primary/50 hover:shadow-[0_0_32px_rgba(0,229,255,0.18)]"
                        : "border-border hover:border-primary/40"
                    }`}
                  >
                    {!isBroken ? (
                      <CertImage
                        src={cert.image}
                        alt={cert.title}
                        onBroken={() => markBroken(cert.id)}
                        className="absolute inset-0 w-full h-full object-cover"
                      />
                    ) : (
                      <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 bg-linear-to-br from-primary/10 via-transparent to-secondary/10">
                        <Award className="text-primary/70" size={isCenter ? 36 : 26} />
                      </div>
                    )}

                    <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/10 to-transparent" />

                    <div className="absolute bottom-0 left-0 right-0 p-3 md:p-4">
                      <p
                        className={`font-heading font-bold text-white leading-tight ${
                          isCenter ? "text-sm md:text-base" : "text-xs md:text-sm line-clamp-2"
                        }`}
                      >
                        {cert.title}
                      </p>
                      <p className="font-mono text-[10px] md:text-xs text-white/70 mt-1">
                        {cert.issuer}
                      </p>
                    </div>

                    {isCenter && (
                      <span className="absolute top-3 right-3 text-[10px] font-mono px-2 py-1 rounded-full bg-primary/20 text-primary border border-primary/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        View details
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          <button
            type="button"
            onClick={goNext}
            aria-label="Next certificate"
            className="absolute right-0 z-20 p-2.5 md:p-3 rounded-full border border-border bg-card/60 backdrop-blur-md text-muted-foreground hover:text-primary hover:border-primary/50 transition-all duration-300 cursor-pointer"
          >
            <ChevronRight size={20} />
          </button>
        </div>
      </div>

      {/* Detail popup */}
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
              initial={{ opacity: 0, scale: 0.92, y: 12 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.92, y: 12 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-lg bg-card border border-border rounded-2xl p-6 md:p-8 shadow-xl"
            >
              <button
                type="button"
                onClick={() => setSelected(null)}
                aria-label="Close"
                className="absolute top-4 right-4 p-1.5 rounded-full text-muted-foreground hover:text-primary hover:bg-primary/10 transition-colors cursor-pointer"
              >
                <X size={18} />
              </button>

              <div className="relative w-full aspect-video rounded-lg overflow-hidden border border-border mb-5 bg-linear-to-br from-primary/10 via-transparent to-secondary/10">
                {!brokenImages.has(selected.id) ? (
                  <CertImage
                    src={selected.image}
                    alt={selected.title}
                    onBroken={() => markBroken(selected.id)}
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Award className="text-primary/70" size={40} />
                  </div>
                )}
              </div>

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
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
