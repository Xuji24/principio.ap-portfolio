import type { Service } from "./types";

const SERVICES: Service[] = [
  {
    id: "full-stack",
    title: "Full-Stack Web Development",
    short: "Full-Stack Apps",
    description: "A complete application, not just the parts that are easy to demo.",
    pill: "End to end",
    checklist: [
      "Front end and backend built and wired together, not handed off in pieces",
      "Ships to production, not just a local demo",
      "Yours to extend — no vendor lock-in",
    ],
    tech: ["Next.js", "React", "Node.js", "Express", "FastAPI"],
  },
  {
    id: "api-integration",
    title: "REST API Design & Integration",
    short: "APIs & Integrations",
    description: "Your own API, or the third-party ones you already depend on, wired up correctly.",
    pill: "Plugs right in",
    checklist: [
      "Clean endpoints your front end (or someone else's) can actually consume",
      "Payment, email, and AI providers integrated, not just called",
      "Auth and error handling done once, correctly",
    ],
    tech: ["RESTful APIs", "Express", "FastAPI", "OpenAI"],
  },
  {
    id: "database",
    title: "Database Design & Management",
    short: "Databases",
    description: "A schema that's still correct after a year of real usage, not just at launch.",
    pill: "Holds up at scale",
    checklist: [
      "Migrations you can run without holding your breath",
      "Queries tuned before they become the slow part of your app",
      "Constraints that catch bad data before it's a support ticket",
    ],
    tech: ["PostgreSQL", "MySQL", "Supabase", "SQLAlchemy"],
  },
  {
    id: "automation",
    title: "Workflow & Internal-Tool Automation",
    short: "Automation",
    description: "The manual process your team dreads, replaced with something that runs on a schedule.",
    pill: "Runs without you",
    checklist: [
      "Scheduled jobs handle the parts that used to need a person",
      "Notifications go out without anyone remembering to send them",
      "Old or inactive data gets cleaned up on its own, on a schedule you set",
    ],
    tech: ["Python", "Node.js", "TypeScript"],
  },
  {
    id: "ai-integration",
    title: "AI Integration",
    short: "AI Integration",
    description: "AI wired into an actual product feature — chat, voice, or generated content — not a chatbot bolted on the side.",
    pill: "Real features, not a demo",
    checklist: [
      "Server-side keys, so nothing sensitive ships to the browser",
      "Built on OpenAI, OpenRouter, and ElevenLabs in production apps already",
      'Scoped to a real user problem, not "AI because AI"',
    ],
    tech: ["OpenAI", "OpenRouter", "ElevenLabs"],
  },
];

export function getServices(): Service[] { return SERVICES; }
