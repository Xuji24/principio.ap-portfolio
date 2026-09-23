"use client";
import { useEffect, useRef } from "react";
import { CatSvg, type CatVariant } from "./CatSvg";
import { useGaze } from "./useGaze";
import { waveHello } from "./wave";

type Props = {
  size?: number;
  onClick?: () => void;
  className?: string;
  label?: string;
  waveTrigger?: number;
  variant?: CatVariant;
};

export function Cat({ size = 46, onClick, className, label = "Angelo's cat", waveTrigger, variant }: Props) {
  const ref = useRef<SVGSVGElement | null>(null);
  const gaze = useGaze(ref);

  useEffect(() => {
    if (!waveTrigger) return;
    const svg = ref.current;
    if (!svg) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    waveHello(svg, gaze);
  }, [waveTrigger, gaze]);

  useEffect(() => {
    const svg = ref.current;
    if (!svg) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const eyes = () => svg.querySelectorAll<SVGGElement>(".eye");
    const ears = () => svg.querySelectorAll<SVGPathElement>(".ear");

    const blink = window.setInterval(() => {
      if (Math.random() < 0.55) return;
      eyes().forEach((e) => e.classList.add("blink"));
      window.setTimeout(() => eyes().forEach((e) => e.classList.remove("blink")), 105);
    }, 3500);

    const twitch = window.setInterval(() => {
      if (Math.random() < 0.7) return;
      ears().forEach((e) => {
        e.classList.add("tw");
        window.setTimeout(() => e.classList.remove("tw"), 520);
      });
    }, 5400);

    return () => { window.clearInterval(blink); window.clearInterval(twitch); };
  }, []);

  const Tag = onClick ? "button" : "span";
  return (
    <Tag
      onClick={onClick}
      className={className}
      style={{ width: size, display: "inline-block", lineHeight: 0, background: "none", border: 0, padding: 0, cursor: onClick ? "pointer" : "default" }}
      {...(onClick ? { type: "button" as const, "aria-label": label } : {})}
    >
      <CatSvg ref={ref} variant={variant} />
    </Tag>
  );
}
