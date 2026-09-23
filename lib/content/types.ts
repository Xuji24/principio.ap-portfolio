export type ProjectKind = "professional" | "personal";

export type ProjectHighlight = { title: string; body: string };

export type Project = {
  slug: string;
  title: string;
  kind: ProjectKind;
  org?: string;
  summary: string;
  why?: string;
  highlights?: ProjectHighlight[];
  experienceId?: string;
  outcomes: string[];
  tech: string[];
  image: string;
  imageWidth: number;
  imageHeight: number;
  links: { live?: string; code?: string; note?: string };
  featured: boolean;
  /** Set false when the live site sends X-Frame-Options/CSP that refuses framing — the live link opens in a new tab instead of the in-app preview modal. */
  embeddable?: boolean;
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
