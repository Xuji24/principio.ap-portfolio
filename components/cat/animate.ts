export const OUT = "cubic-bezier(.22,.9,.32,1)";
export const BACK = "cubic-bezier(.34,1.38,.52,1)";
export const SOFT = "cubic-bezier(.25,.9,.28,1)";
export const IN = "cubic-bezier(.55,0,.85,.45)";

export const wait = (ms: number) => new Promise((r) => setTimeout(r, ms));

export function pose(el: SVGElement, y: number, rot: number, sx: number, sy: number, ms: number, ease: string) {
  el.style.transition = `transform ${ms}ms ${ease}`;
  el.style.transform = `translateY(${y}px) rotate(${rot}deg) scale(${sx},${sy})`;
}

export function arm(el: SVGElement, rot: number, x: number, y: number, ms: number, ease: string) {
  el.style.transition = `transform ${ms}ms ${ease}`;
  el.style.transform = `rotate(${rot}deg) translate(${x}px,${y}px)`;
}
