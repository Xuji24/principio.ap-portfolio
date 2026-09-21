import { describe, it, expect } from "vitest";
import { readFileSync } from "node:fs";
import path from "node:path";

const css = readFileSync(path.resolve(__dirname, "globals.css"), "utf8");

const TOKENS = ["--paper", "--surface", "--ink", "--muted", "--amber", "--line", "--rose"];

describe("design tokens", () => {
  it("defines every colour token in :root", () => {
    // NOTE: anchored on ".dark {" (the rule selector) rather than the bare
    // substring ".dark" — the latter also matches inside the earlier
    // `@custom-variant dark (&:is(.dark *));` line, which precedes :root
    // and would make this slice empty.
    const root = css.slice(css.indexOf(":root"), css.indexOf(".dark {"));
    for (const t of TOKENS) expect(root).toContain(t);
  });

  it("redefines every colour token in .dark", () => {
    const dark = css.slice(css.indexOf(".dark {"));
    for (const t of TOKENS) expect(dark).toContain(t);
  });

  it("defines the three light-mode elevation shadows", () => {
    for (const s of ["--sh-sm", "--sh-md", "--sh-lg"]) expect(css).toContain(s);
  });

  it("defines the four easing tokens", () => {
    for (const e of ["--ease-out", "--ease-back", "--ease-soft", "--ease-in"]) {
      expect(css).toContain(e);
    }
  });

  it("contains no cyan from the old palette", () => {
    expect(css).not.toMatch(/#00e5ff|#00bcd4|0,\s*255,\s*255/i);
  });
});
