import { describe, it, expect } from "vitest";
import { nearestIndex } from "./nearest";

describe("nearestIndex", () => {
  it("picks the element whose centre is closest to the focus line", () => {
    expect(nearestIndex([0, 100, 200], 90)).toBe(1);
    expect(nearestIndex([0, 100, 200], 10)).toBe(0);
    expect(nearestIndex([0, 100, 200], 195)).toBe(2);
  });

  it("returns 0 for an empty list", () => {
    expect(nearestIndex([], 50)).toBe(0);
  });

  it("prefers the earlier element on an exact tie", () => {
    expect(nearestIndex([0, 100], 50)).toBe(0);
  });
});
