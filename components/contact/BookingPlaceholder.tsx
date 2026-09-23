"use client";
import { useCallback, useRef, useSyncExternalStore } from "react";
import { Cat } from "@/components/cat/Cat";
import { useCatBubble, CatBubble } from "@/components/cat/catBubble";
import { site } from "@/lib/content/site";

const SHY_GREETINGS = ["Oh! I'm Rika... need anything?", "I'll wait here, no rush.", "Sorry, was that okay?"];
const SHY_SPAM = "Eek— okay, okay!";

const getServerSnapshot = () => null;

/** Ticks every 30s on the client; `null` during SSR to avoid a hydration mismatch. */
function useManilaClock() {
  const cached = useRef<Date | null>(null);
  if (cached.current === null) cached.current = new Date();

  const subscribe = useCallback((onChange: () => void) => {
    const id = setInterval(() => {
      cached.current = new Date();
      onChange();
    }, 30_000);
    return () => clearInterval(id);
  }, []);

  return useSyncExternalStore(subscribe, () => cached.current, getServerSnapshot);
}

export function BookingPlaceholder() {
  const now = useManilaClock();
  const time = now?.toLocaleTimeString("en-US", { timeZone: "Asia/Manila", hour: "numeric", minute: "2-digit" });
  const day = now?.toLocaleDateString("en-US", { timeZone: "Asia/Manila", weekday: "long", month: "short", day: "numeric" });
  const catBubble = useCatBubble({ greetings: SHY_GREETINGS, spamMessage: SHY_SPAM });

  return (
    <div className="bg-surface border border-line rounded-xl p-5 elev-sm rim h-full flex flex-col">
      <div className="flex items-start justify-between gap-3 mb-4">
        <div>
          <p className="font-display font-bold text-base text-ink">Book a call</p>
          <p className="text-xs text-muted mt-0.5">However long it takes.</p>
        </div>
        <button
          type="button"
          onClick={() => catBubble.react(false)}
          aria-label="Rika"
          className="relative inline-block bg-transparent border-0 p-0 cursor-pointer"
        >
          <Cat size={60} variant="siamese" />
          <CatBubble bubble={catBubble.bubble} onDone={catBubble.dismiss} />
        </button>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center text-center bg-paper border border-line rounded-lg py-8 px-4">
        <p className="font-mono text-[10px] uppercase tracking-[.1em] text-muted">{site.timezone} · GMT+8</p>
        <p className="font-display font-extrabold text-4xl text-ink tracking-[-.02em] mt-2 tabular-nums">
          {time ?? "--:--"}
        </p>
        <p className="text-xs text-muted mt-1.5">{day ?? " "}</p>
      </div>

      <p className="text-xs text-muted leading-relaxed mt-4">
        Scheduling is being built — use the form for now and I&apos;ll reply with times that work.
      </p>
    </div>
  );
}
