type GazeHandle = { lookAt: (o: { x: number; y: number }) => void; release: () => void };

const OUT = "cubic-bezier(.22,.9,.32,1)";
const BACK = "cubic-bezier(.34,1.38,.52,1)";
const SOFT = "cubic-bezier(.25,.9,.28,1)";
const IN = "cubic-bezier(.55,0,.85,.45)";

const wait = (ms: number) => new Promise((r) => setTimeout(r, ms));

function pose(el: HTMLElement | SVGElement, y: number, rot: number, sx: number, sy: number, ms: number, ease: string) {
  (el as SVGElement & { style: CSSStyleDeclaration }).style.transition = `transform ${ms}ms ${ease}`;
  (el as SVGElement & { style: CSSStyleDeclaration }).style.transform =
    `translateY(${y}px) rotate(${rot}deg) scale(${sx},${sy})`;
}

function arm(el: SVGElement, rot: number, x: number, y: number, ms: number, ease: string) {
  (el as SVGElement & { style: CSSStyleDeclaration }).style.transition = `transform ${ms}ms ${ease}`;
  (el as SVGElement & { style: CSSStyleDeclaration }).style.transform =
    `rotate(${rot}deg) translate(${x}px,${y}px)`;
}

export async function playWithName(svg: SVGSVGElement, letters: HTMLElement[], gaze: GazeHandle) {
  const root = svg.querySelector<SVGGElement>(".cat-root");
  const hw = svg.querySelector<SVGGElement>(".headwrap");
  const sit = svg.querySelector<SVGPathElement>(".body-sit");
  const stand = svg.querySelector<SVGPathElement>(".body-stand");
  const arms = svg.querySelector<SVGGElement>(".arms");
  const armR = svg.querySelector<SVGGElement>(".arm-r");
  if (!root || !hw || !sit || !stand || !arms || !armR) return;

  // 1 — crouch
  pose(root, 6, 0, 1.10, 0.87, 190, OUT);
  pose(hw, 3, 0, 1.06, 0.93, 190, OUT);
  await wait(190);

  // 2 — launch. Body swap is hidden at the bottom of the crouch, where the
  //     silhouette is most compressed. Head lifts 40ms behind for follow-through.
  sit.style.opacity = "0";
  stand.style.opacity = "1";
  arms.style.opacity = "1";
  pose(root, -13, 2, 0.93, 1.10, 250, OUT);
  await wait(40);
  pose(hw, -30, 0, 0.95, 1.07, 260, OUT);
  await wait(210);

  // 3 — settle upright, lock the gaze on the name
  pose(root, -4, 4, 1, 1, 240, BACK);
  gaze.lookAt({ x: 4.2, y: -1.4 });
  await wait(40);
  pose(hw, -26, 0, 1, 1, 240, BACK);
  await wait(220);

  // 4 — one swipe: the A spins, the rest bounce outward from it
  arm(armR, -46, 2, -6, 190, OUT);
  await wait(160);
  const [first, ...rest] = letters;
  if (first) { first.classList.remove("spin", "hop"); void first.offsetWidth; first.classList.add("spin"); }
  rest.forEach((l, i) => {
    setTimeout(() => { l.classList.remove("spin", "hop"); void l.offsetWidth; l.classList.add("hop"); }, 200 + i * 30);
  });
  await wait(90);
  arm(armR, 0, 0, 0, 240, BACK);

  // 5 — a pleased beat
  await wait(610);

  // 6 — descend. The head travels ALL the way home during the descent so that
  //     when the body swaps back, head and body already agree. This is the fix
  //     for the landing pop.
  arms.style.opacity = "0";
  await wait(60);
  pose(root, 4, 0, 1.06, 0.93, 240, IN);
  pose(hw, 0, 0, 1.04, 0.95, 240, IN);
  await wait(240);

  // 7 — no outro. The last keyframe IS the rest pose. Body settles with a
  //     slight overshoot; the head lands soft so it cannot dip into the body.
  sit.style.opacity = "1";
  stand.style.opacity = "0";
  pose(root, 0, 0, 1, 1, 300, BACK);
  pose(hw, 0, 0, 1, 1, 300, SOFT);
  gaze.release();
  await wait(320);
}
