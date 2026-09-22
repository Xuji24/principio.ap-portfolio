export type Point = { x: number; y: number };

export type GazeOpts = {
  maxX?: number;
  maxY?: number;
  /** Distance in px at which the gaze reaches full extension. */
  falloff?: number;
};

/**
 * Offset to apply to the eyeballs so the cat looks at `cursor`.
 * Reach ramps up with distance so the eyes drift gently when the cursor is
 * near and swing fully when it is far away.
 */
export function computeGaze(cursor: Point, head: Point, opts: GazeOpts = {}): Point {
  const { maxX = 4.4, maxY = 3.8, falloff = 150 } = opts;
  const dx = cursor.x - head.x;
  const dy = cursor.y - head.y;
  const dist = Math.hypot(dx, dy);
  if (dist < 0.001) return { x: 0, y: 0 };
  const reach = Math.min(dist / falloff, 1);
  return { x: (dx / dist) * maxX * reach, y: (dy / dist) * maxY * reach };
}

/** Frame-wise easing toward a target. `factor` in (0,1]. */
export function lerp(current: number, target: number, factor: number): number {
  return current + (target - current) * factor;
}
