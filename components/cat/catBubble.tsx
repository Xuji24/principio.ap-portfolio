"use client";
import { useCallback, useRef, useState } from "react";

const GREETINGS = ["Hi!", "Hello!", "What brings you here?"];
const SPAM_MESSAGE = "Stop nagging me!";
const LIFESPAN_MS = 5000;

type Bubble = { id: number; text: string } | null;

function reducedMotion() {
  return typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

// Cycles through a greeting each normal click; a spam click (as classified
// by useCatClickSound) always shows the same annoyed line instead. Pass
// custom `greetings`/`spamMessage` to give a cat its own voice.
export function useCatBubble(options?: { greetings?: string[]; spamMessage?: string }) {
  const greetings = options?.greetings ?? GREETINGS;
  const spamMessage = options?.spamMessage ?? SPAM_MESSAGE;
  const [bubble, setBubble] = useState<Bubble>(null);
  const greetingIndex = useRef(0);

  const react = useCallback((isSpam: boolean) => {
    const text = isSpam ? spamMessage : greetings[greetingIndex.current % greetings.length];
    if (!isSpam) greetingIndex.current += 1;

    const id = Date.now();
    setBubble({ id, text });

    // The global prefers-reduced-motion rule crushes the CSS animation's
    // duration to ~0, so its animationend fires almost immediately — drive
    // the 5s dwell time with a timer instead so the message stays readable.
    if (reducedMotion()) {
      window.setTimeout(() => {
        setBubble((cur) => (cur?.id === id ? null : cur));
      }, LIFESPAN_MS);
    }
  }, []);

  const dismiss = useCallback(() => setBubble(null), []);

  return { bubble, react, dismiss };
}

export function CatBubble({
  bubble,
  onDone,
  placement = "center",
}: {
  bubble: Bubble;
  onDone: () => void;
  /** "center" pops up centered above the cat; "ear" leans it toward the right ear — use when a narrow anchor sits right next to other content. Both stay above the cat, so neither ever covers what's beside it. */
  placement?: "center" | "ear";
}) {
  if (!bubble) return null;
  const static_ = reducedMotion();
  const classes = ["cat-bubble", placement === "ear" && "cat-bubble--ear", static_ && "cat-bubble--static"]
    .filter(Boolean)
    .join(" ");
  return (
    <div key={bubble.id} className={classes} onAnimationEnd={static_ ? undefined : onDone} role="status">
      {bubble.text}
      <span className="cat-bubble-tail" aria-hidden="true" />
    </div>
  );
}
