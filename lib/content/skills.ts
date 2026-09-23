import type { Capability, StackGroup, SkillGroup } from "./types";
import { getProjects } from "./projects";

const CAPABILITIES: Capability[] = [
  { id: "frontend", title: "Frontend", description: "Responsive interfaces in Next.js and React with Tailwind." },
  { id: "backend", title: "Backend", description: "APIs and automation in Python, Node and Express." },
  { id: "data", title: "Data", description: "Schema design, migrations and query work on PostgreSQL." },
  { id: "testing", title: "Testing", description: "End-to-end coverage with Playwright and typed contracts." },
];

const STACK: StackGroup[] = [
  { label: "Languages", items: ["TypeScript", "Python", "JavaScript", "C#", "SQL"] },
  { label: "Frameworks", items: ["Next.js", "React", "Express", "FastAPI", "Tailwind", "ShadCN"] },
  { label: "Data", items: ["PostgreSQL", "Supabase", "MySQL", "SQLAlchemy", "Alembic"] },
  { label: "Tooling", items: ["Playwright", "Git", "RESTful APIs", "Vite"] },
];

export function getCapabilities(): Capability[] { return CAPABILITIES; }
export function getStack(): StackGroup[] { return STACK; }

// ==========================
// Skills page — evidence-backed catalog
// ==========================
// Every item below is grounded in either a project's `tech` tags (see
// lib/content/projects.ts) or genuine use in this repo (checked against
// package.json / route source, not just an installed-but-unused dependency).
const SKILL_CATEGORY_ORDER = ["Languages", "Frontend", "Backend & APIs", "Data", "Testing", "Tooling & Deploy"] as const;

const SKILL_CATEGORY: Record<string, (typeof SKILL_CATEGORY_ORDER)[number]> = {
  TypeScript: "Languages", Python: "Languages", "C#": "Languages", JavaScript: "Languages", SQL: "Languages",
  "Next.js": "Frontend", React: "Frontend", Tailwind: "Frontend", ShadCN: "Frontend", "Framer Motion": "Frontend",
  "Node.js": "Backend & APIs", Express: "Backend & APIs", FastAPI: "Backend & APIs", Nodemailer: "Backend & APIs",
  OpenAI: "Backend & APIs", OpenRouter: "Backend & APIs", Groq: "Backend & APIs", "OpenCode Zen": "Backend & APIs",
  ElevenLabs: "Backend & APIs", hCaptcha: "Backend & APIs",
  PostgreSQL: "Data", Supabase: "Data", MySQL: "Data", SQLAlchemy: "Data", Alembic: "Data",
  Playwright: "Testing", Vitest: "Testing", "Testing Library": "Testing",
  Git: "Tooling & Deploy", Vite: "Tooling & Deploy", Vercel: "Tooling & Deploy",
};

/** Proven by this site's own code, not by a client project's tech tags. */
const PORTFOLIO_ONLY = [
  "JavaScript", "SQL", "Git", "Framer Motion", "Nodemailer", "Groq", "OpenRouter", "OpenCode Zen", "Vitest", "Testing Library",
];

export function getSkillGroups(): SkillGroup[] {
  const index = new Map<string, { evidence: { slug: string; title: string }[]; portfolio: boolean }>();
  const touch = (name: string) => {
    if (!index.has(name)) index.set(name, { evidence: [], portfolio: false });
    return index.get(name)!;
  };

  for (const p of getProjects()) {
    for (const t of p.tech) {
      if (!(t in SKILL_CATEGORY)) continue;
      touch(t).evidence.push({ slug: p.slug, title: p.title });
    }
    // Live deploys on a *.vercel.app URL are real evidence of Vercel usage.
    if (p.links.live?.includes("vercel.app")) touch("Vercel").evidence.push({ slug: p.slug, title: p.title });
  }

  for (const name of PORTFOLIO_ONLY) touch(name).portfolio = true;

  return SKILL_CATEGORY_ORDER.map((label) => ({
    label,
    items: Array.from(index.entries())
      .filter(([name]) => SKILL_CATEGORY[name] === label)
      .map(([name, v]) => ({ name, evidence: v.evidence, portfolio: v.portfolio }))
      .sort((a, b) => b.evidence.length - a.evidence.length || a.name.localeCompare(b.name)),
  })).filter((g) => g.items.length > 0);
}
