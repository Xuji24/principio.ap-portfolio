"use client";
import { useEffect, useRef } from "react";
import { computeGaze, lerp } from "@/lib/motion/gaze";

export function useGaze(svgRef: React.RefObject<SVGSVGElement | null>) {
  const locked = useRef(false);
  const forced = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;

    let cursor = { x: 0, y: 0 };
    let cur = { x: 0, y: 0 };
    let raf = 0;

    const onMove = (e: MouseEvent) => { cursor = { x: e.clientX, y: e.clientY }; };
    window.addEventListener("mousemove", onMove, { passive: true });

    const frame = () => {
      const svg = svgRef.current;
      if (svg) {
        const b = svg.getBoundingClientRect();
        let target = forced.current;
        if (!locked.current && b.width) {
          target = computeGaze(cursor, { x: b.left + b.width * 0.5, y: b.top + b.height * 0.38 });
        }
        cur = { x: lerp(cur.x, target.x, 0.13), y: lerp(cur.y, target.y, 0.13) };
        const t = `translate(${cur.x.toFixed(2)}px,${cur.y.toFixed(2)}px)`;
        svg.querySelectorAll<SVGGElement>(".ball").forEach((b2) => { b2.style.transform = t; });
        const head = svg.querySelector<SVGGElement>(".head");
        if (head) head.style.transform = `rotate(${(cur.x * 1.1).toFixed(2)}deg)`;
      }
      raf = requestAnimationFrame(frame);
    };
    raf = requestAnimationFrame(frame);

    return () => { window.removeEventListener("mousemove", onMove); cancelAnimationFrame(raf); };
  }, [svgRef]);

  return {
    lookAt: (offset: { x: number; y: number }) => { forced.current = offset; locked.current = true; },
    release: () => { locked.current = false; },
  };
}
