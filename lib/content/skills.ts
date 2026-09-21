import type { Capability, StackGroup } from "./types";

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
