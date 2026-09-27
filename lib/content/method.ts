import type { MethodStep } from "./types";

export const METHOD = {
  name: "Audit. Build. Automate.",
  tagline: "Always in that order — skip a step and it falls apart.",
} as const;

const STEPS: MethodStep[] = [
  {
    id: "audit",
    title: "Audit",
    description: "Find exactly where the manual work is actually costing time.",
    tags: ["Process mapping", "Requirements", "Data model"],
  },
  {
    id: "build",
    title: "Build",
    description: "A working system, not a mockup: real front end, real backend, real database.",
    tags: ["Next.js", "APIs", "PostgreSQL"],
  },
  {
    id: "automate",
    title: "Automate",
    description: "The parts that used to need a person running them by hand now run on their own.",
    tags: ["Cron jobs", "Email", "Cleanup"],
  },
];

export function getMethodSteps(): MethodStep[] { return STEPS; }
