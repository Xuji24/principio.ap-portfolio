"use client";
import { useRef, useState } from "react";
import { CatSvg } from "./CatSvg";
import { useGaze } from "./useGaze";
import { playWithName } from "./playWithName";
import { useCatBubble, CatBubble } from "./catBubble";
import { site } from "@/lib/content/site";

const COOL_GREETINGS = ["Luke.", "Cool.", "Sup."];
const COOL_SPAM = "Chill.";

export function NameLockup() {
  const svgRef = useRef<SVGSVGElement | null>(null);
  const nameRef = useRef<HTMLSpanElement | null>(null);
  const gaze = useGaze(svgRef);
  const [busy, setBusy] = useState(false);
  const catBubble = useCatBubble({ greetings: COOL_GREETINGS, spamMessage: COOL_SPAM });

  async function play() {
    if (busy || !svgRef.current || !nameRef.current) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    setBusy(true);
    const letters = Array.from(nameRef.current.querySelectorAll<HTMLElement>(".name-ltr"));
    await playWithName(svgRef.current, letters, gaze);
    setBusy(false);
  }

  function onCatClick() {
    catBubble.react(false);
    void play();
  }

  return (
    <div className="flex items-end gap-3 px-1">
      <button
        type="button"
        onClick={onCatClick}
        aria-label="Play with Luke"
        className="relative w-14 shrink-0 leading-none bg-transparent border-0 p-0 cursor-pointer"
      >
        <CatSvg ref={svgRef} variant="gray" />
        <CatBubble bubble={catBubble.bubble} onDone={catBubble.dismiss} placement="ear" />
      </button>
      <div className="min-w-0">
        <span ref={nameRef} className="font-display font-extrabold text-lg leading-tight tracking-[-.02em] text-ink block whitespace-nowrap">
          {site.name.split("").map((c, i) => (
            <span key={i} className="name-ltr">{c === " " ? " " : c}</span>
          ))}
        </span>
        <span className="font-mono text-[11px] uppercase tracking-widest text-muted mt-1 block">
          {site.role}
        </span>
      </div>
    </div>
  );
}
