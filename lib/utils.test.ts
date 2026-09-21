import { describe, it, expect } from "vitest";
import { cn } from "./utils";

describe("cn", () => {
  it("joins class names", () => {
    expect(cn("a", "b")).toBe("a b");
  });

  it("drops falsy values", () => {
    expect(cn("a", false, undefined, "b")).toBe("a b");
  });

  it("lets a later tailwind class win over an earlier conflicting one", () => {
    expect(cn("px-2", "px-4")).toBe("px-4");
  });
});
