import { describe, it, expect } from "vitest";
import { getProjects, getProject, getFeatured, filterProjects } from "./projects";

const AI_TOOLS = ["claude", "copilot", "antigravity", "gemini", "huggingface"];

describe("projects", () => {
  it("features the professional S.P. Madrid build", () => {
    const f = getFeatured();
    expect(f).toBeDefined();
    expect(f!.kind).toBe("professional");
    expect(f!.org).toMatch(/S\.P\. Madrid/);
  });

  it("has exactly one featured project", () => {
    expect(getProjects().filter((p) => p.featured)).toHaveLength(1);
  });

  it("lists no AI tooling in any tech stack", () => {
    for (const p of getProjects()) {
      for (const t of p.tech) {
        expect(AI_TOOLS).not.toContain(t.toLowerCase());
      }
    }
  });

  it("has no dead '#' links", () => {
    for (const p of getProjects()) {
      expect(p.links.live ?? "").not.toBe("#");
      expect(p.links.code ?? "").not.toBe("#");
    }
  });

  it("gives every project a unique slug", () => {
    const slugs = getProjects().map((p) => p.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
  });

  it("looks a project up by slug", () => {
    const slug = getProjects()[0].slug;
    expect(getProject(slug)?.slug).toBe(slug);
    expect(getProject("nope")).toBeUndefined();
  });

  it("filters by kind, with 'all' returning everything", () => {
    expect(filterProjects("all")).toHaveLength(getProjects().length);
    expect(filterProjects("professional").every((p) => p.kind === "professional")).toBe(true);
    expect(filterProjects("personal").every((p) => p.kind === "personal")).toBe(true);
  });
});
