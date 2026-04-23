"use client";

import { useEffect, useRef, type ReactNode } from "react";

interface ScrollRevealProps {
  children: ReactNode;
  delay?: number;
  direction?: "up" | "left" | "right" | "none";
  className?: string;
}

/**
 * ScrollReveal — wraps children and fades/slides them in when
 * they enter the viewport using IntersectionObserver.
 * Inspired by staggered-card animations from the design references.
 */
export default function ScrollReveal({
  children,
  delay = 0,
  direction = "up",
  className = "",
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add("is-visible");
          observer.unobserve(el);
        }
      },
      { threshold: 0.1, rootMargin: "0px 0px -40px 0px" },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const dirClass: Record<NonNullable<ScrollRevealProps["direction"]>, string> =
    {
      up: "reveal-up",
      left: "reveal-left",
      right: "reveal-right",
      none: "reveal-none",
    };

  return (
    <div
      ref={ref}
      className={`scroll-reveal ${dirClass[direction]} ${className}`}
      style={{ transitionDelay: delay > 0 ? `${delay}ms` : undefined }}
    >
      {children}
    </div>
  );
}
