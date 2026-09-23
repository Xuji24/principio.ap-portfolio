import type { Credential } from "./types";

const CREDENTIALS: Credential[] = [
  {
    id: "modern-ai",
    title: "Introduction to Modern AI",
    issuer: "Cisco",
    year: "2025",
    image: "/Introduction_to_Modern_AI.png",
    description:
      "A Cisco Networking Academy primer on how modern AI actually works — capabilities, limits, and effective prompting — with hands-on practice across 10+ tools including ChatGPT, Gemini, and Claude.",
  },
  {
    id: "ai-fundamentals",
    title: "AI Fundamentals",
    issuer: "Google",
    year: "2026",
    image: "/ai-fundamentals.jpeg",
    description:
      "The first course in Google's AI Professional Certificate, covering core generative AI concepts and how to evaluate AI output responsibly, with hands-on prompting practice in Gemini.",
  },
  {
    id: "ai-data-analysis",
    title: "AI for Data Analysis",
    issuer: "Google",
    year: "2026",
    image: "/ai-data-analysis.png",
    description:
      "Part of Google's AI Professional Certificate — using Gemini in Google Sheets to clean messy data, build formulas from plain language, and turn raw numbers into clear charts and insights.",
  },
  {
    id: "ai-content",
    title: "AI for Content Creation",
    issuer: "Google",
    year: "2026",
    image: "/ai-content-creation.png",
    description:
      "Part of Google's AI Professional Certificate — using Gemini to generate and refine images, video, and presentations, and to critique creative work against brand guidelines.",
  },
  {
    id: "ai-research",
    title: "AI for Research and Insights",
    issuer: "Google",
    year: "2026",
    image: "/ai-research-and-insights.png",
    description:
      "Part of Google's AI Professional Certificate — using Gemini and Deep Research as a research partner to summarize sources, surface insights, and pressure-test ideas quickly.",
  },
  {
    id: "ai-writing",
    title: "AI for Writing and Communicating",
    issuer: "Google",
    year: "2026",
    image: "/ai-writing-communicating.png",
    description:
      "Part of Google's AI Professional Certificate — using AI as a writing partner to turn rough notes into clear, audience-ready messages.",
  },
  {
    id: "ai-brainstorm",
    title: "AI for Brainstorming and Planning",
    issuer: "Google",
    year: "2026",
    image: "/ai-brainstorm-and-planning.png",
    description:
      "Part of Google's AI Professional Certificate — using Gemini to generate and stress-test ideas and turn them into structured, actionable project plans.",
  },
  {
    id: "python-essentials",
    title: "Python Essentials 1",
    issuer: "Cisco",
    year: "2026",
    image: "/Python_Essentials_1.png",
    description:
      "A 30-hour Cisco Networking Academy and Python Institute course covering Python syntax, data types, control flow, and functions — preparation for the PCEP entry-level certification.",
  },
  {
    id: "cybersecurity",
    title: "Introduction to Cybersecurity",
    issuer: "Cisco",
    year: "2025",
    image: "/cybersecurity.png",
    description:
      "A Cisco Networking Academy course on cybersecurity fundamentals — privacy, network vulnerabilities, common threats, and the confidentiality/integrity/availability principles behind defending against them.",
  },
  {
    id: "salesforce",
    title: "Salesforce Fundamentals",
    issuer: "Salesforce",
    year: "2025",
    image: "/Salesforce.png",
    description:
      "Completed as part of an 8-week Salesforce-supported virtual internship (with AICTE and SmartBridge) — Trailhead modules spanning Salesforce Fundamentals, data modeling, declarative automation, Apex, Lightning Web Components, and Agentforce, capped with a capstone project.",
  },
];

export function getCredentials(): Credential[] { return CREDENTIALS; }

export function getIssuers(): string[] {
  return Array.from(new Set(CREDENTIALS.map((c) => c.issuer)));
}
