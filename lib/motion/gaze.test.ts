import { describe, it, expect } from "vitest";
import { computeGaze, lerp } from "./gaze";

const head = { x: 100, y: 100 };

describe("computeGaze", () => {
  it("looks right when the cursor is to the right", () => {
    expect(computeGaze({ x: 400, y: 100 }, head).x).toBeGreaterThan(0);
  });

  it("looks left when the cursor is to the left", () => {
    expect(computeGaze({ x: -200, y: 100 }, head).x).toBeLessThan(0);
  });

  it("never exceeds the configured reach", () => {
    const g = computeGaze({ x: 99999, y: 99999 }, head, { maxX: 4.4, maxY: 3.8 });
    expect(Math.abs(g.x)).toBeLessThanOrEqual(4.4);
    expect(Math.abs(g.y)).toBeLessThanOrEqual(3.8);
  });

  it("drifts only slightly when the cursor is close (falloff)", () => {
    const near = computeGaze({ x: 110, y: 100 }, head);
    const far = computeGaze({ x: 900, y: 100 }, head);
    expect(Math.abs(near.x)).toBeLessThan(Math.abs(far.x));
  });

  it("returns zero when the cursor is exactly on the head", () => {
    const g = computeGaze({ x: 100, y: 100 }, head);
    expect(g.x).toBeCloseTo(0);
    expect(g.y).toBeCloseTo(0);
  });
});

describe("lerp", () => {
  it("moves toward the target without overshooting", () => {
    expect(lerp(0, 10, 0.5)).toBe(5);
  });

  it("converges after repeated application", () => {
    let v = 0;
    for (let i = 0; i < 200; i++) v = lerp(v, 10, 0.13);
    expect(v).toBeCloseTo(10, 3);
  });
});
