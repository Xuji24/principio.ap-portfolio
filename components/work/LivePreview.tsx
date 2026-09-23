"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { IconArrowUpRight, IconClose } from "@/components/ui/Icon";

export function LivePreview({
  url, title, slug, onClose,
}: { url: string; title: string; slug: string; onClose: () => void }) {
  const [loaded, setLoaded] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [leaving, setLeaving] = useState(false);
  const [autoBlocked, setAutoBlocked] = useState(false);
  const [iframeKey, setIframeKey] = useState(0);

  const dismissLeaving = () => {
    setLeaving(false);
    // The frame is stuck on whatever page it auto-navigated to (e.g. a blocked
    // sign-in redirect) — remount it to bring the original preview back.
    if (autoBlocked) {
      setLoaded(false);
      setIframeKey((k) => k + 1);
    }
    setAutoBlocked(false);
  };

  useEffect(() => {
    const timer = window.setTimeout(() => setShowHint(true), 2500);
    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      if (leaving) dismissLeaving();
      else onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose, leaving, autoBlocked]);

  let host = url;
  try { host = new URL(url).host; } catch {}

  return (
    <div role="dialog" aria-modal="true" aria-label={`Live preview of ${title}`}
      onClick={onClose}
      className="fixed inset-0 z-50 bg-ink/60 backdrop-blur-sm grid place-items-center p-2 md:p-6">
      <div onClick={(e) => e.stopPropagation()}
        className="w-full max-w-[1600px] h-full max-h-[96vh] bg-surface rounded-xl border border-line elev-lg overflow-hidden flex flex-col">
        <div className="flex items-center gap-3 px-4 h-12 border-b border-line bg-paper shrink-0">
          <div className="flex gap-1.5 shrink-0" aria-hidden="true">
            <span className="w-2.5 h-2.5 rounded-full bg-[#EC6A5E]" />
            <span className="w-2.5 h-2.5 rounded-full bg-[#F4BF4F]" />
            <span className="w-2.5 h-2.5 rounded-full bg-[#61C554]" />
          </div>
          <div className="flex-1 min-w-0 h-7 rounded-md bg-surface border border-line px-3 flex items-center">
            <span className="text-xs text-muted truncate font-mono">{host}</span>
          </div>
          <Link href={`/work/${slug}`} onClick={onClose} className="text-xs text-muted hover:text-ink whitespace-nowrap shrink-0">
            Case study
          </Link>
          <button type="button" onClick={() => setLeaving(true)} aria-label="Open in new tab"
            className="w-7 h-7 grid place-items-center rounded-md hover:bg-line/60 text-muted hover:text-ink shrink-0">
            <IconArrowUpRight className="w-3.5 h-3.5" />
          </button>
          <button type="button" onClick={onClose} aria-label="Close"
            className="w-7 h-7 grid place-items-center rounded-md hover:bg-line/60 text-ink shrink-0">
            <IconClose className="w-4 h-4" />
          </button>
        </div>

        <div className="flex-1 relative bg-paper">
          {!loaded && (
            <div className="absolute inset-0 grid place-items-center">
              <div className="w-5 h-5 rounded-full border-2 border-line border-t-amber animate-spin" aria-hidden="true" />
            </div>
          )}
          {/* Always mounted (even while the leaving notice covers it) so toggling the notice doesn't reload it. */}
          <iframe
            key={iframeKey}
            src={url}
            title={title}
            onLoad={() => {
              // A second load event means the iframe navigated again after its
              // first paint (e.g. a sign-in redirect) — providers like Google
              // refuse to render inside a frame and would otherwise show their
              // own 403 in its place, so bail out to the "open directly" prompt.
              if (loaded) {
                setAutoBlocked(true);
                setLeaving(true);
              }
              setLoaded(true);
            }}
            sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-popups-to-escape-sandbox"
            className="absolute inset-0 w-full h-full border-0"
          />
          {showHint && !leaving && (
            <button type="button" onClick={() => setLeaving(true)}
              className="absolute bottom-4 left-1/2 -translate-x-1/2 inline-flex items-center gap-1.5 h-8 px-3.5 rounded-full bg-ink text-paper text-[11px] font-medium elev-md">
              Taking a while, or blocked from embedding? Open directly <IconArrowUpRight className="w-3 h-3" />
            </button>
          )}

          {leaving && (
            <div className="absolute inset-0 grid place-items-center text-center p-8 bg-paper">
              <div className="max-w-xs">
                <p className="font-display font-bold text-sm text-ink">
                  {autoBlocked ? "Sign-in can't load in this preview" : "You’re about to leave this preview"}
                </p>
                <p className="text-xs text-muted mt-1.5 leading-relaxed">
                  {autoBlocked
                    ? `${title} tried to sign you in, but providers like Google block that inside an embedded preview. Open ${host} in a new tab to sign in there.`
                    : <>This opens {host} in a new tab, outside the portfolio. If {title} needs an account, you&rsquo;ll sign in there — not here.</>}
                </p>
                <div className="flex items-center justify-center gap-2 mt-4">
                  <button type="button" onClick={dismissLeaving}
                    className="h-9 px-4 rounded-lg border border-line text-xs text-ink hover:bg-line/30">
                    Stay here
                  </button>
                  <a href={url} target="_blank" rel="noopener noreferrer" onClick={dismissLeaving}
                    className="btn-lift-lg inline-flex items-center gap-1.5 h-9 px-4 rounded-lg bg-ink text-paper text-xs font-medium">
                    Continue to {host} <IconArrowUpRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
