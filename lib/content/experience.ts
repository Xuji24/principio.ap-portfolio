import type { ExperienceEntry } from "./types";

const ENTRIES: ExperienceEntry[] = [
  {
    id: "sp-madrid",
    kind: "work",
    title: "Full Stack Developer / Data Analyst",
    org: "S.P. Madrid & Associates",
    start: "Mar 2026",
    end: "Jun 2026",
    meta: "Internship · 3 months",
    outcomes: [
      "Built an automated performance tracking and incentive system, replacing a manual spreadsheet workflow",
      "Modelled and migrated the database schema with SQLAlchemy and Alembic on PostgreSQL",
      "Wrote end-to-end Playwright coverage across the frontend to catch regressions before release",
      "Used TypeScript throughout to surface defects at build time rather than in review",
      "Built the interface with Tailwind and ShadCN against the team's existing design conventions",
    ],
    tech: ["Next.js", "Python", "FastAPI", "TypeScript", "PostgreSQL", "SQLAlchemy", "Alembic", "Playwright", "Tailwind", "ShadCN"],
  },
  {
    id: "pup-bsit",
    kind: "education",
    title: "BS Information Technology",
    org: "Polytechnic University of the Philippines",
    start: "2022",
    end: "2026",
    meta: "Education · 4 years",
    outcomes: [
      "Created different projects across different tech stack, from ",
      "Built PUP EduTrack, a student and faculty tracking system, in C# against MySQL",
      "StoutCafe, a static website integrated with HTML, CSS, Javascript, JQuery for interactivity",
      "D.Creatives, a full stack reservation platform integrated with payment gateway using paymongo, AI face-swap feature via hugging face, real-time admin analytics, dashboard, audit logs, and feature updates.",
      "Completed the degree while shipping two university projects and three personal projects to production",
    ],
    tech: ["C#", ".NETFramework", "HTML", "CSS", "Javascript", "JQuery", "React.js", "Node.js", "Next.js", "Express.js", "SQL", "PostgreSQL", "MySQL"],
  },
];

export function getExperience(): ExperienceEntry[] {
  return ENTRIES;
}
