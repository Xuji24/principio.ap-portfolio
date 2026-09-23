import { arm, BACK, OUT, wait } from "./animate";

type GazeHandle = { lookAt: (o: { x: number; y: number }) => void; release: () => void };

// Waves the raised arm while staying in the sit pose — no stand-up transition.
export async function waveHello(svg: SVGSVGElement, gaze: GazeHandle) {
  const arms = svg.querySelector<SVGGElement>(".arms");
  const armR = svg.querySelector<SVGGElement>(".arm-r");
  if (!arms || !armR) return;

  arms.style.transition = "opacity 120ms linear";
  arms.style.opacity = "1";
  gaze.lookAt({ x: 0, y: -1 });

  arm(armR, -42, 2, -6, 160, OUT);
  await wait(160);
  arm(armR, -16, 1, -3, 150, BACK);
  await wait(150);
  arm(armR, -42, 2, -6, 150, OUT);
  await wait(150);
  arm(armR, -16, 1, -3, 150, BACK);
  await wait(150);
  arm(armR, 0, 0, 0, 220, BACK);
  await wait(220);

  arms.style.opacity = "0";
  gaze.release();
}
