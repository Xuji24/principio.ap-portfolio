/** Index of the centre closest to `focus`. Ties resolve to the earlier index. */
export function nearestIndex(centers: number[], focus: number): number {
  let best = 0;
  let bestDist = Infinity;
  for (let i = 0; i < centers.length; i++) {
    const d = Math.abs(centers[i] - focus);
    if (d < bestDist) { bestDist = d; best = i; }
  }
  return best;
}
