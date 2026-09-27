/**
 * Travels along its positioned parent's full extent (0%,0% to 100%,100%).
 * The parent connector line is 1px thick on its cross-axis, so whichever
 * axis is actually long (left for a horizontal line, top for a vertical
 * one) is the only one that reads as movement — no orientation prop needed.
 * Plain CSS (see .pipeline-dot in globals.css), not Framer Motion — percentage
 * left/top isn't part of its optimized property set and silently no-ops.
 */
export function AnimatedDot({ delay = 0 }: { delay?: number }) {
  return (
    <span
      className="pipeline-dot absolute -translate-x-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-amber"
      style={{ animationDelay: `${delay}s` }}
    />
  );
}
