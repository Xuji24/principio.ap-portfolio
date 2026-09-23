import type { Project, ProjectKind } from "./types";

const PROJECTS: Project[] = [
  {
    slug: "performance-tracking-system",
    title: "Performance Tracking & Incentive System",
    kind: "professional",
    org: "S.P. Madrid & Associates",
    summary:
      "Automated an internal performance and incentive workflow that previously ran on manual spreadsheets.",
    why: "Built to replace S.P. Madrid & Associates' manual, spreadsheet-based performance and incentive process with a system the team could actually rely on for tracking and payouts.",
    experienceId: "sp-madrid",
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
    image: "/Larkot.png",
    imageWidth: 755,
    imageHeight: 429,
    links: { note: "Internal system — source not public" },
    featured: true,
  },
  {
    slug: "d-creatives",
    title: "D-Creatives Booking",
    kind: "personal",
    summary: "A production booking platform handling scheduling, availability and client management.",
    why: "Built to bridge traditional photography and videography services with next-generation interactive technology — replacing the scattered emails and manual paperwork agencies run bookings through with one seamless, secure client journey from package discovery to signed contract.",
    highlights: [
      {
        title: "Contracts that sign themselves",
        body: "Once a package is finalized, the platform generates a downloadable PDF contract on the spot — the administrative back-and-forth that usually eats a studio's week happens in seconds instead.",
      },
      {
        title: "Seeing it before it happens",
        body: 'Clients can test their face against different event photo setups and walk a venue in VR before a single photo is taken — closing the "expectation vs. reality" gap that\'s usually impossible to bridge until the actual event day.',
      },
      {
        title: "One portal, not five threads",
        body: "Package customization, event details, bookings, and post-event reviews all live behind one authenticated account, instead of being scattered across email, spreadsheets, and messaging apps.",
      },
      {
        title: "Locked down where it matters",
        body: "Password resets and account deletion sit behind Multi-Factor Authentication and hCaptcha — the sensitive actions get real protection, not just a login screen.",
      },
    ],
    outcomes: [
      "Built scheduling and availability management against a Supabase-backed Postgres database",
      "Shipped to a live domain and kept it in production use",
    ],
    tech: ["Next.js", "Node.js", "TypeScript", "React", "Supabase", "PostgreSQL"],
    image: "/dcreatives.png",
    imageWidth: 2737,
    imageHeight: 1757,
    links: { live: "https://d-creatives.online", code: "https://github.com/Xuji24/d.creatives" },
    featured: false,
  },
  {
    slug: "boji-ai",
    title: "Boji-AI",
    kind: "personal",
    summary: "End-to-end job preparation — résumé building, interview practice, search and upskilling.",
    why: "Built for job applicants who don't know where to start preparing — one connected loop instead of five disconnected tools, covering resume building, mock interviews, job matching, and upskilling.",
    highlights: [
      {
        title: "One loop instead of five tools",
        body: "Resume building, mock interviews, job matching, cover letters, and application tracking all live behind one account instead of five disconnected apps.",
      },
      {
        title: "Interview practice that talks back",
        body: "AI mock interviews run with real voice via ElevenLabs, not just a text transcript to read through afterward.",
      },
      {
        title: "Jobs matched to the résumé you actually have",
        body: "Listings are scraped and matched against your resume, then a tailored cover letter is generated for each one instead of a generic template.",
      },
      {
        title: "Started as a hackathon build, still standing",
        body: "Began as StayQualifAI at a hackathon with the KiroBytes team; now developed and hardened solo, with the full original commit history preserved.",
      },
    ],
    outcomes: [
      "Built four connected workflows behind one account model",
      "Designed the Postgres schema covering résumés, sessions and progress",
    ],
    tech: ["React", "Node.js", "Express", "TypeScript", "PostgreSQL", "Supabase", "Tailwind"],
    image: "/boji-ai-mockup.png",
    imageWidth: 2737,
    imageHeight: 1757,
    links: { live: "https://boji-ai.vercel.app/", code: "https://github.com/Xuji24/boji-ai" },
    featured: false,
  },
  {
    slug: "be-fit-era",
    title: "Be Fit Era",
    kind: "personal",
    summary: "Running events platform where participants join events and track their progress.",
    why: "Combines two things that usually live in separate apps — Strava-style activity tracking and an AI personal-trainer experience — on top of the piece neither solves well: actually organizing and joining local races.",
    highlights: [
      {
        title: "Races that can't be oversold",
        body: "Organizers create races, pin a start location, and set capacity and deadlines — registration capacity is enforced atomically in Postgres, so a race can't be oversold even under concurrent signups.",
      },
      {
        title: "An AI coach that's actually a coach",
        body: "A three-tier subscription builds a personalized weekly training and nutrition plan, backed by a retrieval-augmented knowledge base for chat, plus procedurally generated 3D exercise demonstrations rather than pre-rendered video.",
      },
      {
        title: "Trust, but verify",
        body: "Strava-imported runs are distance-checked against Strava's own API instead of trusting the client-supplied value, and flagged for admin review if something looks off.",
      },
      {
        title: "Built for local reality",
        body: "Race registration accepts GCash, Maya, and QR Ph alongside free registration, and every admin/organizer/runner boundary is enforced at both the routing layer and the database via Postgres Row Level Security.",
      },
    ],
    outcomes: [
      "Built event registration and progress tracking on a shared Postgres schema",
      "Shipped to production on Vercel",
    ],
    tech: ["Next.js", "Node.js", "Express", "TypeScript", "PostgreSQL", "Supabase", "Tailwind"],
    image: "/be-fit-era-mockup.png",
    imageWidth: 2737,
    imageHeight: 1757,
    links: { live: "https://be-fit-era.vercel.app", code: "https://github.com/Xuji24/Fitra" },
    featured: false,
    embeddable: false,
  },
  {
    slug: "thesisit",
    title: "ThesisIT",
    kind: "personal",
    summary: "Helps students rehearse a thesis defence with practice runs and document analysis.",
    why: "Built for students with no realistic way to rehearse an oral thesis defense — turns an uploaded manuscript into a strict AI panel that questions and challenges the way a real one would, plus tools to analyze the manuscript and act on panel feedback.",
    highlights: [
      {
        title: "A panel that actually pushes back",
        body: 'Upload a manuscript and the AI plays a strict thesis panelist — one question at a time, follow-ups when an answer is vague, across three difficulty levels from Standard up to "Terror Panel."',
      },
      {
        title: "Know your weak spots before they do",
        body: "A dedicated analysis pass reads the uploaded manuscript for strengths and weaknesses, so the gaps surface before the real defense does.",
      },
      {
        title: "Ask your own thesis a question",
        body: "A chat tab lets you query the manuscript directly instead of re-reading it hunting for a specific claim or citation.",
      },
      {
        title: "Keys stay on the server",
        body: "An Express API holds the OpenAI/OpenRouter keys and proxies every AI call, so nothing sensitive ever ships to the browser.",
      },
    ],
    outcomes: [
      "Built practice sessions with structured feedback on submitted documents",
      "Shipped to production on Vercel",
    ],
    tech: ["React", "Vite", "Express", "TypeScript", "Tailwind"],
    image: "/thesisit.png",
    imageWidth: 2737,
    imageHeight: 1757,
    links: { live: "https://thesisit.vercel.app/", code: "https://github.com/Xuji24/ThesisIT" },
    featured: false,
  },
  {
    slug: "pup-edutrack",
    title: "PUP EduTrack",
    kind: "personal",
    summary: "Desktop tracking and management system for students and faculty.",
    why: "Built to replace manual, paper-based student record-keeping at PUP with a centralized, validated desktop system — and, just as much, to put the four pillars of object-oriented programming to real, practical use instead of leaving them as textbook theory.",
    highlights: [
      {
        title: "One flow, start to finish",
        body: "A splash screen hands off to login, login hands off to a central dashboard, and the dashboard opens into either student records or the gradebook — every session follows the same predictable path.",
      },
      {
        title: "Full lifecycle for every student",
        body: "Profiles are created, edited, and reviewed through dedicated forms — AddStudentForm, EditStudentForm, StudentInformationWindow — all backed by a MySQL schema underneath.",
      },
      {
        title: "A gradebook that stands on its own",
        body: "GradeBookWindow carries its own logic for associating results with specific students, kept deliberately separate from profile management so grading changes never risk touching student data.",
      },
      {
        title: "Built the textbook way, on purpose",
        body: "Partial classes keep auto-generated UI code out of business logic, every window inherits from .NET's Form class, and the MySQL connection string is abstracted behind App.config — encapsulation, inheritance, and abstraction as working code, not just definitions.",
      },
    ],
    outcomes: ["Built a desktop CRUD application in C# against a MySQL schema"],
    tech: ["C#", "MySQL"],
    image: "/PUP-EduTrack.png",
    imageWidth: 2737,
    imageHeight: 1757,
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
