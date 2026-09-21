export type ProjectKind = "professional" | "personal";

export type Project = {
  slug: string;
  title: string;
  kind: ProjectKind;
  org?: string;
  summary: string;
  outcomes: string[];
  tech: string[];
  image: string;
  links: { live?: string; code?: string; note?: string };
  featured: boolean;
};

export type ExperienceEntry = {
  id: string;
  kind: "work" | "education";
  title: string;
  org: string;
  start: string;
  end: string;
  meta: string;
  outcomes: string[];
  tech: string[];
};

export type Capability = { id: string; title: string; description: string };
export type StackGroup = { label: string; items: string[] };
export type Credential = { id: string; title: string; issuer: string; year: string; image: string };
