import type { Project, ProjectKind } from "./types";

const PROJECTS: Project[] = [
  {
    slug: "performance-tracking-system",
    title: "Performance Tracking & Incentive System",
    kind: "professional",
    org: "S.P. Madrid & Associates",
    summary:
      "Automated an internal performance and incentive workflow that previously ran on manual spreadsheets.",
    outcomes: [
      "Replaced a manual spreadsheet process with an automated tracking and incentive system",
      "Modelled and migrated the schema with SQLAlchemy and Alembic on PostgreSQL",
      "Wrote end-to-end Playwright coverage to catch regressions before release",
      "Used TypeScript throughout to surface defects at build time rather than in review",
    ],
    tech: ["Next.js", "Python", "TypeScript", "PostgreSQL", "SQLAlchemy", "Alembic", "Playwright", "Tailwind"],
    // Placeholder image: the real product screenshot hasn't been supplied yet.
    // Reusing this neutral background texture (formerly Hero.tsx's, now unused)
    // until the actual screenshot is available.
    image: "/cloud-bg.png",
    links: { note: "Internal system — source not public" },
    featured: true,
  },
  {
    slug: "d-creatives",
    title: "D-Creatives Booking",
    kind: "personal",
    summary: "A production booking platform handling scheduling, availability and client management.",
    outcomes: [
      "Built scheduling and availability management against a Supabase-backed Postgres database",
      "Shipped to a live domain and kept it in production use",
    ],
    tech: ["Next.js", "Node.js", "TypeScript", "React", "Supabase", "PostgreSQL"],
    image: "/dcreatives.png",
    links: { live: "https://d-creatives.online", code: "https://github.com/Xuji24/d.creatives" },
    featured: false,
  },
  {
    slug: "boji-ai",
    title: "Boji-AI",
    kind: "personal",
    summary: "End-to-end job preparation — résumé building, interview practice, search and upskilling.",
    outcomes: [
      "Built four connected workflows behind one account model",
      "Designed the Postgres schema covering résumés, sessions and progress",
    ],
    tech: ["React", "Node.js", "Express", "TypeScript", "PostgreSQL", "Supabase", "Tailwind"],
    image: "/boji-ai-mockup.png",
    links: { live: "https://boji-ai.vercel.app/", code: "https://github.com/Xuji24/boji-ai" },
    featured: false,
  },
  {
    slug: "be-fit-era",
    title: "Be Fit Era",
    kind: "personal",
    summary: "Running events platform where participants join events and track their progress.",
    outcomes: [
      "Built event registration and progress tracking on a shared Postgres schema",
      "Shipped to production on Vercel",
    ],
    tech: ["Next.js", "Node.js", "Express", "TypeScript", "PostgreSQL", "Supabase", "Tailwind"],
    image: "/be-fit-era-mockup.png",
    links: { live: "https://be-fit-era.vercel.app", code: "https://github.com/Xuji24/Fitra" },
    featured: false,
  },
  {
    slug: "thesisit",
    title: "ThesisIT",
    kind: "personal",
    summary: "Helps students rehearse a thesis defence with practice runs and document analysis.",
    outcomes: [
      "Built practice sessions with structured feedback on submitted documents",
      "Shipped to production on Vercel",
    ],
    tech: ["React", "Vite", "Express", "TypeScript", "Tailwind"],
    image: "/thesisit.png",
    links: { live: "https://thesisit.vercel.app/", code: "https://github.com/Xuji24/ThesisIT" },
    featured: false,
  },
  {
    slug: "pup-edutrack",
    title: "PUP EduTrack",
    kind: "personal",
    summary: "Desktop tracking and management system for students and faculty.",
    outcomes: ["Built a desktop CRUD application in C# against a MySQL schema"],
    tech: ["C#", "MySQL"],
    image: "/PUP-EduTrack.png",
    links: { note: "Coursework — private repository" },
    featured: false,
  },
];

export function getProjects(): Project[] {
  return PROJECTS;
}

export function getProject(slug: string): Project | undefined {
  return PROJECTS.find((p) => p.slug === slug);
}

export function getFeatured(): Project | undefined {
  return PROJECTS.find((p) => p.featured);
}

export function filterProjects(kind: "all" | ProjectKind): Project[] {
  return kind === "all" ? PROJECTS : PROJECTS.filter((p) => p.kind === kind);
}
