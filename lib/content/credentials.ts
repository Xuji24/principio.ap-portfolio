import type { Credential } from "./types";

const CREDENTIALS: Credential[] = [
  { id: "modern-ai", title: "Introduction to Modern AI", issuer: "Anthropic", year: "2026", image: "/Introduction_to_Modern_AI.png" },
  { id: "ai-fundamentals", title: "AI Fundamentals", issuer: "Anthropic", year: "2026", image: "/ai-fundamentals.jpeg" },
  { id: "ai-data-analysis", title: "AI for Data Analysis", issuer: "Anthropic", year: "2026", image: "/ai-data-analysis.png" },
  { id: "ai-content", title: "AI for Content Creation", issuer: "Anthropic", year: "2026", image: "/ai-content-creation.png" },
  { id: "ai-research", title: "AI for Research and Insights", issuer: "Anthropic", year: "2026", image: "/ai-research-and-insights.png" },
  { id: "ai-writing", title: "AI for Writing and Communicating", issuer: "Anthropic", year: "2026", image: "/ai-writing-communicating.png" },
  { id: "ai-brainstorm", title: "AI for Brainstorming and Planning", issuer: "Anthropic", year: "2026", image: "/ai-brainstorm-and-planning.png" },
  { id: "python-essentials", title: "Python Essentials 1", issuer: "Cisco", year: "2025", image: "/Python_Essentials_1.png" },
  { id: "cybersecurity", title: "Introduction to Cybersecurity", issuer: "Cisco", year: "2025", image: "/cybersecurity.png" },
  { id: "salesforce", title: "Salesforce Fundamentals", issuer: "Salesforce", year: "2025", image: "/Salesforce.png" },
];

export function getCredentials(): Credential[] { return CREDENTIALS; }

export function getIssuers(): string[] {
  return Array.from(new Set(CREDENTIALS.map((c) => c.issuer)));
}
