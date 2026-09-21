# Portfolio Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rebuild the portfolio as a recruiter-facing dashboard — sidebar shell, six routed views, an Ink & Amber token system that every component actually uses, and a black-cat identity component.

**Architecture:** A persistent sidebar shell in `app/layout.tsx` wraps six route segments under the App Router. All colour, depth, type and motion flow from CSS custom properties defined once in `app/globals.css` and exposed to Tailwind via `@theme inline` — no component contains a raw hex or a Tailwind palette colour. Content lives in typed modules under `lib/content/` so routes render data rather than embedding it. Animation maths is extracted into pure functions so it is unit-testable; React hooks are thin wrappers over them.

**Tech Stack:** Next.js 16 (App Router, RSC), React 19, TypeScript 5, Tailwind CSS 4 (CSS-first `@theme`), framer-motion 12, Vitest + React Testing Library + jsdom, Supabase (existing, view counter only), Nodemailer (existing).

**Spec:** `docs/superpowers/specs/2026-09-21-portfolio-redesign-design.md`

## Global Constraints

- **No raw colours in components.** Every colour is a token: `--paper`, `--surface`, `--ink`, `--muted`, `--amber`, `--line`, `--rose`. A hardcoded hex or a Tailwind palette class (`cyan-400`, `slate-900`) is a defect.
- **Light and dark express depth differently.** Light uses warm drop shadows (`--sh-sm/md/lg`). Dark uses surface tint plus a 1px top rim-light. Dark mode never uses shadows for elevation.
- **One transform chain per animated element**, written identically at every state: `translateY(…) rotate(…) scale(…)`. Mixing function lists between states cannot be interpolated and snaps.
- **Fonts:** Outfit (display, 700/800), Inter (body, 400/500/600), JetBrains Mono (data, 400/500). Headings are sentence case — no `uppercase`, no `tracking-tighter`.
- **No emoji anywhere.** Icons are stroked SVG inheriting `currentColor`.
- **Positioning line is "Full Stack Developer"** everywhere, including `lib/resume.ts`.
- **All motion honours `prefers-reduced-motion: reduce`.**
- **Amber `#E8A33D` is not AA on white for small text.** Permitted for large display text, borders, dots, icons, fills. Small text uses `--ink` or `--muted`.
- **Commit after every task.** Conventional commit prefixes (`feat:`, `fix:`, `chore:`, `test:`, `refactor:`).

---

## File Structure

**Created:**

| Path | Responsibility |
|---|---|
| `vitest.config.ts` | Test runner config, jsdom env, `@/` alias |
| `vitest.setup.ts` | RTL matchers, `matchMedia` stub |
| `lib/utils.ts` | `cn()` class merger (`components.json` already aliases this) |
| `lib/content/types.ts` | Shared content types |
| `lib/content/projects.ts` | Project data + selectors |
| `lib/content/experience.ts` | Timeline entries |
| `lib/content/skills.ts` | Capabilities + grouped stack |
| `lib/content/credentials.ts` | Certificates |
| `lib/content/site.ts` | Name, role, links, stat tiles |
| `lib/motion/gaze.ts` | Pure cursor-tracking maths |
| `lib/motion/nearest.ts` | Pure "which element is nearest centre" maths |
| `components/cat/CatSvg.tsx` | The SVG artwork, pose-agnostic |
| `components/cat/useGaze.ts` | Hook wrapping `gaze.ts` |
| `components/cat/Cat.tsx` | Public component: pose + interaction |
| `components/shell/Sidebar.tsx` | Nav rail with cat + name lockup |
| `components/shell/TopBar.tsx` | Theme toggle + résumé download |
| `components/shell/ViewCounter.tsx` | Floating counter |
| `components/ui/Segmented.tsx` | Segmented control (Work, Credentials) |
| `components/ui/RouteHeader.tsx` | Breadcrumb + title + subtitle |
| `components/ui/Icon.tsx` | Stroked SVG icon set |
| `app/(dashboard)/layout.tsx` | Shell wrapper for all routes |
| `app/(dashboard)/page.tsx` | Overview |
| `app/(dashboard)/work/page.tsx` | Work index |
| `app/(dashboard)/work/[slug]/page.tsx` | Project detail |
| `app/(dashboard)/experience/page.tsx` | Accordion timeline |
| `app/(dashboard)/skills/page.tsx` | Skills |
| `app/(dashboard)/credentials/page.tsx` | Credentials |
| `app/(dashboard)/contact/page.tsx` | Contact |
| `components/work/ProjectCard.tsx` | Card with panning preview |
| `components/experience/ExperienceList.tsx` | Accordion behaviour |
| `components/contact/ContactForm.tsx` | Form wired to `/api/contact` |
| `components/contact/LinkTiles.tsx` | Four link tiles |

**Modified:** `app/globals.css`, `app/layout.tsx`, `app/page.tsx` (deleted, replaced by route group), `tailwind.config.ts`, `app/api/contact/route.ts`, `lib/resume.ts`, `package.json`.

**Deleted:** `components/BackgroundCanvas.tsx`, `components/pages/**`, `components/sections/**`, `components/ProjectCard.tsx`, `components/TechStackIcon.tsx`, `components/TechStackIcons.tsx`, `components/ui/Card.tsx`, `components/Hero.tsx`, `components/Expertise.tsx`, `components/Journey.tsx`, `components/Projects.tsx`, `components/Contact.tsx`, `components/Certifications.tsx`, `components/TechStack.tsx`, `components/Navbar.tsx`, `components/BackgroundEffects.tsx`, `types/vanta.d.ts`.

---

## Task 1: Test infrastructure and `cn()`

**Files:**
- Create: `vitest.config.ts`, `vitest.setup.ts`, `lib/utils.ts`, `lib/utils.test.ts`
- Modify: `package.json`

**Interfaces:**
- Consumes: nothing
- Produces: `cn(...inputs: ClassValue[]): string`; `npm test` runs Vitest

- [ ] **Step 1: Install dependencies**

```bash
npm i clsx tailwind-merge
npm i -D vitest @vitejs/plugin-react jsdom @testing-library/react @testing-library/jest-dom @testing-library/user-event
```

- [ ] **Step 2: Create `vitest.config.ts`**

```ts
import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import path from "node:path";

export default defineConfig({
  plugins: [react()],
  test: {
    environment: "jsdom",
    setupFiles: ["./vitest.setup.ts"],
    globals: true,
    include: ["**/*.test.{ts,tsx}"],
    exclude: ["node_modules", ".next"],
  },
  resolve: { alias: { "@": path.resolve(__dirname, ".") } },
});
```

- [ ] **Step 3: Create `vitest.setup.ts`**

`matchMedia` does not exist in jsdom and the reduced-motion checks call it, so it is stubbed here.

```ts
import "@testing-library/jest-dom/vitest";

Object.defineProperty(window, "matchMedia", {
  writable: true,
  value: (query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addEventListener: () => {},
    removeEventListener: () => {},
    dispatchEvent: () => false,
  }),
});
```

- [ ] **Step 4: Add the test scripts to `package.json`**

Add to the `"scripts"` object:

```json
"test": "vitest run",
"test:watch": "vitest"
```

- [ ] **Step 5: Write the failing test**

Create `lib/utils.test.ts`:

```ts
import { describe, it, expect } from "vitest";
import { cn } from "./utils";

describe("cn", () => {
  it("joins class names", () => {
    expect(cn("a", "b")).toBe("a b");
  });

  it("drops falsy values", () => {
    expect(cn("a", false, undefined, "b")).toBe("a b");
  });

  it("lets a later tailwind class win over an earlier conflicting one", () => {
    expect(cn("px-2", "px-4")).toBe("px-4");
  });
});
```

- [ ] **Step 6: Run it and confirm it fails**

Run: `npm test -- lib/utils.test.ts`
Expected: FAIL — cannot resolve `./utils`.

- [ ] **Step 7: Create `lib/utils.ts`**

```ts
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}
```

- [ ] **Step 8: Run it and confirm it passes**

Run: `npm test -- lib/utils.test.ts`
Expected: PASS, 3 tests.

- [ ] **Step 9: Commit**

```bash
git add vitest.config.ts vitest.setup.ts lib/utils.ts lib/utils.test.ts package.json package-lock.json
git commit -m "test: add vitest infrastructure and cn() utility"
```

---

## Task 2: Design tokens, depth and fonts

Replaces the cyan system wholesale. After this task the old components will look wrong — that is expected; Task 3 deletes them.

**Files:**
- Modify: `app/globals.css` (full rewrite), `tailwind.config.ts`, `app/layout.tsx`
- Create: `app/globals.test.ts`

**Interfaces:**
- Produces: tokens `--paper --surface --ink --muted --amber --line --rose --sh-sm --sh-md --sh-lg --ease-out --ease-back --ease-soft --ease-in`; Tailwind colours `bg-paper text-ink border-line bg-surface text-muted bg-amber`; font vars `--font-outfit --font-inter --font-mono`

- [ ] **Step 1: Write the failing test**

This guards the spec's hardest rule — that dark mode redefines every colour token and does not use shadows for elevation.

Create `app/globals.test.ts`:

```ts
import { describe, it, expect } from "vitest";
import { readFileSync } from "node:fs";
import path from "node:path";

const css = readFileSync(path.resolve(__dirname, "globals.css"), "utf8");

const TOKENS = ["--paper", "--surface", "--ink", "--muted", "--amber", "--line", "--rose"];

describe("design tokens", () => {
  it("defines every colour token in :root", () => {
    const root = css.slice(css.indexOf(":root"), css.indexOf(".dark"));
    for (const t of TOKENS) expect(root).toContain(t);
  });

  it("redefines every colour token in .dark", () => {
    const dark = css.slice(css.indexOf(".dark"));
    for (const t of TOKENS) expect(dark).toContain(t);
  });

  it("defines the three light-mode elevation shadows", () => {
    for (const s of ["--sh-sm", "--sh-md", "--sh-lg"]) expect(css).toContain(s);
  });

  it("defines the four easing tokens", () => {
    for (const e of ["--ease-out", "--ease-back", "--ease-soft", "--ease-in"]) {
      expect(css).toContain(e);
    }
  });

  it("contains no cyan from the old palette", () => {
    expect(css).not.toMatch(/#00e5ff|#00bcd4|0,\s*255,\s*255/i);
  });
});
```

- [ ] **Step 2: Run it and confirm it fails**

Run: `npm test -- app/globals.test.ts`
Expected: FAIL — `--paper` not found, and the cyan assertion fails.

- [ ] **Step 3: Rewrite `app/globals.css`**

Replace the entire file:

```css
@import "tailwindcss";

@custom-variant dark (&:is(.dark *));

/* ============ TOKENS ============ */
:root {
  --radius: 0.625rem;

  --paper:   #FAF9F7;
  --surface: #FFFFFF;
  --ink:     #14110F;
  --muted:   #6B645C;
  --amber:   #E8A33D;
  --line:    #E8E4DE;
  --rose:    #C98F7C;

  --sh-sm: 0 1px 2px rgba(20,17,15,.05), 0 2px 8px  rgba(20,17,15,.04);
  --sh-md: 0 2px 4px rgba(20,17,15,.04), 0 8px 24px rgba(20,17,15,.07);
  --sh-lg: 0 6px 14px rgba(20,17,15,.07), 0 22px 56px rgba(20,17,15,.13);

  --rim: linear-gradient(90deg, transparent, rgba(255,255,255,0), transparent);

  --ease-out:  cubic-bezier(.22,.9,.32,1);
  --ease-back: cubic-bezier(.34,1.38,.52,1);
  --ease-soft: cubic-bezier(.25,.9,.28,1);
  --ease-in:   cubic-bezier(.55,0,.85,.45);
}

.dark {
  --paper:   #0F0D0C;
  --surface: #1A1715;
  --ink:     #EDE8E2;
  --muted:   #8B837B;
  --amber:   #F0B454;
  --line:    #2E2925;
  --rose:    #C98F7C;

  /* Dark expresses elevation as tint + rim-light, never as shadow. */
  --sh-sm: 0 0 0 0 transparent;
  --sh-md: 0 0 0 0 transparent;
  --sh-lg: 0 0 0 0 transparent;

  --surface-raised: #211D1A;
  --rim: linear-gradient(90deg, transparent, rgba(255,255,255,.14), transparent);
}

@theme inline {
  --color-paper:   var(--paper);
  --color-surface: var(--surface);
  --color-ink:     var(--ink);
  --color-muted:   var(--muted);
  --color-amber:   var(--amber);
  --color-line:    var(--line);
  --color-rose:    var(--rose);

  --font-display: var(--font-outfit), ui-sans-serif, system-ui, sans-serif;
  --font-sans:    var(--font-inter), ui-sans-serif, system-ui, sans-serif;
  --font-mono:    var(--font-mono-jb), ui-monospace, SFMono-Regular, monospace;

  --radius-md: var(--radius);
  --radius-lg: calc(var(--radius) + 4px);
}

/* ============ BASE ============ */
html { scroll-behavior: smooth; }
body {
  background: var(--paper);
  color: var(--ink);
  overflow-x: hidden;
}
* { border-color: var(--line); }

::selection { background: color-mix(in oklab, var(--amber) 28%, transparent); }

:focus-visible {
  outline: 2px solid var(--amber);
  outline-offset: 2px;
  border-radius: 4px;
}

/* ============ ELEVATION ============ */
@layer utilities {
  .elev-sm { box-shadow: var(--sh-sm); }
  .elev-md { box-shadow: var(--sh-md); }
  .elev-lg { box-shadow: var(--sh-lg); }

  /* Dark-mode rim-light: a bright 1px top edge reading as a light source above. */
  .rim { position: relative; }
  .rim::before {
    content: '';
    position: absolute;
    inset: 0 0 auto 0;
    height: 1px;
    background: var(--rim);
    border-radius: inherit;
    pointer-events: none;
  }

  .scrollbar-hidden { scrollbar-width: none; -ms-overflow-style: none; }
  .scrollbar-hidden::-webkit-scrollbar { display: none; }
}

/* ============ REDUCED MOTION ============ */
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}
```

- [ ] **Step 4: Run it and confirm it passes**

Run: `npm test -- app/globals.test.ts`
Expected: PASS, 5 tests.

- [ ] **Step 5: Simplify `tailwind.config.ts`**

`@theme inline` is now the single source for colours, so the v3-style `colors` extend is removed.

```ts
import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: { extend: {} },
  plugins: [],
};

export default config;
```

- [ ] **Step 6: Swap the fonts in `app/layout.tsx`**

Replace the three `next/font/google` imports and the `<body>` class list:

```tsx
import { Outfit, Inter, JetBrains_Mono } from "next/font/google";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
});
const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});
const jetbrains = JetBrains_Mono({
  variable: "--font-mono-jb",
  subsets: ["latin"],
  weight: ["400", "500"],
});
```

And the body className becomes:

```tsx
className={`${outfit.variable} ${inter.variable} ${jetbrains.variable} font-sans antialiased`}
```

- [ ] **Step 7: Verify the app still builds**

Run: `npm run build`
Expected: build succeeds. Visual breakage in the old components is expected — Task 3 removes them.

- [ ] **Step 8: Commit**

```bash
git add app/globals.css app/globals.test.ts tailwind.config.ts app/layout.tsx
git commit -m "feat: replace cyan palette with Ink & Amber token system"
```

---

## Task 3: Remove dead code and unused dependencies

**Files:**
- Delete: the files listed below
- Modify: `package.json`, `app/page.tsx`

**Interfaces:**
- Produces: a tree containing only reachable code

- [ ] **Step 1: Confirm each file is unreachable before deleting**

```bash
for f in BackgroundCanvas ProjectCard TechStackIcon TechStackIcons; do
  echo "--- $f ---"
  grep -rn "$f" --include=*.tsx --include=*.ts app components lib | grep -v "components/$f.tsx"
done
```

Expected: no output for any of them. Anything printed means the file is still referenced — stop and investigate rather than deleting.

- [ ] **Step 2: Delete the orphaned files**

```bash
git rm -r components/pages components/sections
git rm components/BackgroundCanvas.tsx components/ProjectCard.tsx \
       components/TechStackIcon.tsx components/TechStackIcons.tsx \
       components/ui/Card.tsx types/vanta.d.ts
```

- [ ] **Step 3: Delete the old section components**

These are replaced by the new routes. `app/page.tsx` is removed because Task 7 introduces a `(dashboard)` route group that supplies its own `page.tsx`.

```bash
git rm components/Hero.tsx components/Expertise.tsx components/Journey.tsx \
       components/Projects.tsx components/Contact.tsx components/Certifications.tsx \
       components/TechStack.tsx components/Navbar.tsx components/BackgroundEffects.tsx
git rm app/page.tsx
```

- [ ] **Step 4: Remove the imports from `app/layout.tsx`**

Delete the `Navbar` and `BackgroundEffects` imports and their JSX usages. Keep `Providers`, `PortfolioChatbot`, `VisitorTracker`, the Supabase call and `viewCount` — Task 7 re-wires those into the shell.

- [ ] **Step 5: Uninstall the unused dependencies**

All five were confirmed to have zero imports.

```bash
npm uninstall three @types/three vanta react-icon-cloud lenis
```

- [ ] **Step 6: Verify nothing references them**

```bash
grep -rn "three\|vanta\|lenis\|react-icon-cloud" --include=*.ts --include=*.tsx app components lib utils || echo "clean"
```

Expected: `clean`.

- [ ] **Step 7: Run the tests**

Run: `npm test`
Expected: PASS — 8 tests across two files.

- [ ] **Step 8: Commit**

```bash
git add -A
git commit -m "chore: remove ~1000 lines of dead code and 5 unused dependencies"
```

---

## Task 4: Content data layer

Routes render data; they do not embed it. This is also where the spec's content decisions land.

**Files:**
- Create: `lib/content/types.ts`, `lib/content/site.ts`, `lib/content/projects.ts`, `lib/content/projects.test.ts`, `lib/content/experience.ts`, `lib/content/skills.ts`, `lib/content/credentials.ts`

**Interfaces:**
- Produces:
  - `type Project = { slug, title, kind: "professional" | "personal", org?, summary, outcomes: string[], tech: string[], image, links: { live?, code?, note? }, featured: boolean }`
  - `getProjects(): Project[]`, `getProject(slug: string): Project | undefined`, `getFeatured(): Project | undefined`, `filterProjects(kind: "all" | "professional" | "personal"): Project[]`
  - `type ExperienceEntry`, `getExperience(): ExperienceEntry[]`
  - `type Capability`, `type StackGroup`, `getCapabilities()`, `getStack()`
  - `type Credential`, `getCredentials()`, `getIssuers(): string[]`
  - `site: { name, role, email, links, stats }`

- [ ] **Step 1: Write the failing test**

These assertions encode the spec's content rules so a future edit cannot silently reintroduce AI tags or dead links.

Create `lib/content/projects.test.ts`:

```ts
import { describe, it, expect } from "vitest";
import { getProjects, getProject, getFeatured, filterProjects } from "./projects";

const AI_TOOLS = ["claude", "copilot", "antigravity", "gemini", "huggingface"];

describe("projects", () => {
  it("features the professional S.P. Madrid build", () => {
    const f = getFeatured();
    expect(f).toBeDefined();
    expect(f!.kind).toBe("professional");
    expect(f!.org).toMatch(/S\.P\. Madrid/);
  });

  it("has exactly one featured project", () => {
    expect(getProjects().filter((p) => p.featured)).toHaveLength(1);
  });

  it("lists no AI tooling in any tech stack", () => {
    for (const p of getProjects()) {
      for (const t of p.tech) {
        expect(AI_TOOLS).not.toContain(t.toLowerCase());
      }
    }
  });

  it("has no dead '#' links", () => {
    for (const p of getProjects()) {
      expect(p.links.live ?? "").not.toBe("#");
      expect(p.links.code ?? "").not.toBe("#");
    }
  });

  it("gives every project a unique slug", () => {
    const slugs = getProjects().map((p) => p.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
  });

  it("looks a project up by slug", () => {
    const slug = getProjects()[0].slug;
    expect(getProject(slug)?.slug).toBe(slug);
    expect(getProject("nope")).toBeUndefined();
  });

  it("filters by kind, with 'all' returning everything", () => {
    expect(filterProjects("all")).toHaveLength(getProjects().length);
    expect(filterProjects("professional").every((p) => p.kind === "professional")).toBe(true);
    expect(filterProjects("personal").every((p) => p.kind === "personal")).toBe(true);
  });
});
```

- [ ] **Step 2: Run it and confirm it fails**

Run: `npm test -- lib/content/projects.test.ts`
Expected: FAIL — cannot resolve `./projects`.

- [ ] **Step 3: Create `lib/content/types.ts`**

```ts
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
```

- [ ] **Step 4: Create `lib/content/projects.ts`**

Descriptions are outcome-led per the spec. The S.P. Madrid system is promoted to featured; PUP EduTrack's dead links become a note.

```ts
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
    image: "/performance-tracking.png",
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
```

- [ ] **Step 5: Run it and confirm it passes**

Run: `npm test -- lib/content/projects.test.ts`
Expected: PASS, 7 tests.

- [ ] **Step 6: Create `lib/content/experience.ts`**

```ts
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
    tech: ["Next.js", "Python", "TypeScript", "PostgreSQL", "SQLAlchemy", "Alembic", "Playwright", "Tailwind", "ShadCN"],
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
      "Coursework across software engineering, database systems and web development",
      "Built PUP EduTrack, a student and faculty tracking system, in C# against MySQL",
      "Completed the degree while shipping five personal projects to production",
    ],
    tech: ["C#", "MySQL", "Software Engineering", "Databases"],
  },
];

export function getExperience(): ExperienceEntry[] {
  return ENTRIES;
}
```

- [ ] **Step 7: Create `lib/content/skills.ts`**

No AI tooling, per the spec. The fourth capability is "Testing", not "Testing & AI".

```ts
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
```

- [ ] **Step 8: Create `lib/content/credentials.ts`**

Filenames match the images already committed under `public/`.

```ts
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
```

- [ ] **Step 9: Create `lib/content/site.ts`**

```ts
import { getProjects } from "./projects";
import { getCredentials } from "./credentials";
import { getStack } from "./skills";

export const site = {
  name: "Angelo Principio",
  role: "Full Stack Developer",
  tagline: "Automation-driven web applications that make internal operations measurably faster.",
  email: "principio.ap@gmail.com",
  timezone: "Asia/Manila",
  links: {
    linkedin: "https://www.linkedin.com/in/angelo-principio-6b8380296/",
    github: "https://github.com/Xuji24",
    resume: "/angelo-principio-resume.pdf",
  },
} as const;

export function getStats() {
  const projects = getProjects();
  return [
    { label: "Projects", value: projects.length },
    { label: "Credentials", value: getCredentials().length },
    { label: "Technologies", value: new Set(getStack().flatMap((g) => g.items)).size },
    { label: "Live Deploys", value: projects.filter((p) => p.links.live).length },
  ];
}
```

- [ ] **Step 10: Run the full suite**

Run: `npm test`
Expected: PASS, 15 tests.

- [ ] **Step 11: Commit**

```bash
git add lib/content
git commit -m "feat: add typed content layer with outcome-led copy, no AI tags, no dead links"
```

---

## Task 5: Cat — gaze maths and SVG

Extracting the maths keeps the interesting part testable; the hook is a thin wrapper.

**Files:**
- Create: `lib/motion/gaze.ts`, `lib/motion/gaze.test.ts`, `components/cat/CatSvg.tsx`, `components/cat/useGaze.ts`, `components/cat/Cat.tsx`

**Interfaces:**
- Produces:
  - `computeGaze(cursor: Point, head: Point, opts?: GazeOpts): Point` — clamped offset
  - `lerp(current: number, target: number, factor: number): number`
  - `<CatSvg pose="sit" | "stand" />` with `.eye`, `.ball`, `.ear`, `.head`, `.tailg` hooks
  - `<Cat size={number} onClick?={() => void} className?={string} />`

- [ ] **Step 1: Write the failing test**

Create `lib/motion/gaze.test.ts`:

```ts
import { describe, it, expect } from "vitest";
import { computeGaze, lerp } from "./gaze";

const head = { x: 100, y: 100 };

describe("computeGaze", () => {
  it("looks right when the cursor is to the right", () => {
    expect(computeGaze({ x: 400, y: 100 }, head).x).toBeGreaterThan(0);
  });

  it("looks left when the cursor is to the left", () => {
    expect(computeGaze({ x: -200, y: 100 }, head).x).toBeLessThan(0);
  });

  it("never exceeds the configured reach", () => {
    const g = computeGaze({ x: 99999, y: 99999 }, head, { maxX: 4.4, maxY: 3.8 });
    expect(Math.abs(g.x)).toBeLessThanOrEqual(4.4);
    expect(Math.abs(g.y)).toBeLessThanOrEqual(3.8);
  });

  it("drifts only slightly when the cursor is close (falloff)", () => {
    const near = computeGaze({ x: 110, y: 100 }, head);
    const far = computeGaze({ x: 900, y: 100 }, head);
    expect(Math.abs(near.x)).toBeLessThan(Math.abs(far.x));
  });

  it("returns zero when the cursor is exactly on the head", () => {
    const g = computeGaze({ x: 100, y: 100 }, head);
    expect(g.x).toBeCloseTo(0);
    expect(g.y).toBeCloseTo(0);
  });
});

describe("lerp", () => {
  it("moves toward the target without overshooting", () => {
    expect(lerp(0, 10, 0.5)).toBe(5);
  });

  it("converges after repeated application", () => {
    let v = 0;
    for (let i = 0; i < 200; i++) v = lerp(v, 10, 0.13);
    expect(v).toBeCloseTo(10, 3);
  });
});
```

- [ ] **Step 2: Run it and confirm it fails**

Run: `npm test -- lib/motion/gaze.test.ts`
Expected: FAIL — cannot resolve `./gaze`.

- [ ] **Step 3: Create `lib/motion/gaze.ts`**

```ts
export type Point = { x: number; y: number };

export type GazeOpts = {
  maxX?: number;
  maxY?: number;
  /** Distance in px at which the gaze reaches full extension. */
  falloff?: number;
};

/**
 * Offset to apply to the eyeballs so the cat looks at `cursor`.
 * Reach ramps up with distance so the eyes drift gently when the cursor is
 * near and swing fully when it is far away.
 */
export function computeGaze(cursor: Point, head: Point, opts: GazeOpts = {}): Point {
  const { maxX = 4.4, maxY = 3.8, falloff = 150 } = opts;
  const dx = cursor.x - head.x;
  const dy = cursor.y - head.y;
  const dist = Math.hypot(dx, dy);
  if (dist < 0.001) return { x: 0, y: 0 };
  const reach = Math.min(dist / falloff, 1);
  return { x: (dx / dist) * maxX * reach, y: (dy / dist) * maxY * reach };
}

/** Frame-wise easing toward a target. `factor` in (0,1]. */
export function lerp(current: number, target: number, factor: number): number {
  return current + (target - current) * factor;
}
```

- [ ] **Step 4: Run it and confirm it passes**

Run: `npm test -- lib/motion/gaze.test.ts`
Expected: PASS, 7 tests.

- [ ] **Step 5: Create `components/cat/CatSvg.tsx`**

Both body paths are always present; `pose` controls opacity so the crossfade in Task 6 has something to fade between.

```tsx
type Props = { pose?: "sit" | "stand"; className?: string };

export function CatSvg({ pose = "sit", className }: Props) {
  return (
    <svg viewBox="0 0 140 152" className={className} aria-hidden="true" style={{ overflow: "visible" }}>
      <g className="cat-root">
        <g className="tailg">
          <path
            d="M98 132 C130 134 138 108 129 91 C122 78 104 80 102 91 C100 100 109 105 115 100"
            fill="none" stroke="var(--ink)" strokeWidth="10" strokeLinecap="round"
          />
        </g>
        <path
          className="body-sit"
          style={{ opacity: pose === "sit" ? 1 : 0, transition: "opacity 80ms linear" }}
          d="M70 64 C43 64 29 86 29 110 L29 128 C29 135 33 139 40 139 L100 139 C107 139 111 135 111 128 L111 110 C111 86 97 64 70 64 Z"
          fill="var(--ink)"
        />
        <path
          className="body-stand"
          style={{ opacity: pose === "stand" ? 1 : 0, transition: "opacity 80ms linear" }}
          d="M70 42 C55 42 46 64 46 92 L46 128 C46 135 50 139 57 139 L83 139 C90 139 94 135 94 128 L94 92 C94 64 85 42 70 42 Z"
          fill="var(--ink)"
        />
        <ellipse cx="55" cy="136" rx="12" ry="7.5" fill="var(--ink)" opacity=".82" />
        <ellipse cx="85" cy="136" rx="12" ry="7.5" fill="var(--ink)" opacity=".82" />

        <g className="arms" style={{ opacity: 0, transition: "opacity 80ms linear" }}>
          <path d="M52 74 q-13 10 -11 25 q1 8 8 7 q7 -1 6 -9 q-1 -11 7 -18z" fill="var(--ink)" />
          <g className="arm-r">
            <path d="M90 72 q17 4 23 18 q3 8 -4 11 q-7 3 -10 -4 q-4 -10 -14 -13z" fill="var(--ink)" />
            <circle cx="113" cy="92" r="8.5" fill="var(--ink)" opacity=".82" />
          </g>
        </g>

        <g className="headwrap">
          <g className="head">
            <path className="ear" d="M38 31 L29 3 L61 18 Z" fill="var(--ink)" />
            <path className="ear" d="M102 31 L111 3 L79 18 Z" fill="var(--ink)" />
            <path d="M41 28 L35 12 L55 21 Z" fill="var(--rose)" opacity=".6" />
            <path d="M99 28 L105 12 L85 21 Z" fill="var(--rose)" opacity=".6" />
            <circle cx="70" cy="58" r="41" fill="var(--ink)" />

            <g className="eye">
              <ellipse cx="52" cy="59" rx="15" ry="16.5" fill="var(--surface)" />
              <g className="ball">
                <circle cx="52" cy="59" r="10.6" fill="var(--amber)" />
                <circle cx="52" cy="59" r="7" fill="var(--ink)" />
                <circle cx="48.4" cy="55" r="3.7" fill="#fff" />
                <circle cx="55" cy="62.6" r="1.9" fill="#fff" opacity=".8" />
              </g>
            </g>
            <g className="eye">
              <ellipse cx="88" cy="59" rx="15" ry="16.5" fill="var(--surface)" />
              <g className="ball">
                <circle cx="88" cy="59" r="10.6" fill="var(--amber)" />
                <circle cx="88" cy="59" r="7" fill="var(--ink)" />
                <circle cx="84.4" cy="55" r="3.7" fill="#fff" />
                <circle cx="91" cy="62.6" r="1.9" fill="#fff" opacity=".8" />
              </g>
            </g>

            <path d="M70 83 L64.5 77.5 Q70 74.8 75.5 77.5 Z" fill="var(--rose)" />
            <path d="M70 83 q-4.5 5.5 -9 1.8" fill="none" stroke="var(--muted)" strokeWidth="2" strokeLinecap="round" />
            <path d="M70 83 q4.5 5.5 9 1.8" fill="none" stroke="var(--muted)" strokeWidth="2" strokeLinecap="round" />
          </g>
        </g>
      </g>
    </svg>
  );
}
```

- [ ] **Step 6: Add the cat's CSS to `app/globals.css`**

Append:

```css
/* ============ CAT RIG ============ */
.cat-root   { transform-box: fill-box; transform-origin: 50% 100%;
              transform: translateY(0px) rotate(0deg) scale(1,1); }
.headwrap   { transform-box: fill-box; transform-origin: 50% 100%;
              transform: translateY(0px) rotate(0deg) scale(1,1); }
.arm-r      { transform-box: fill-box; transform-origin: 16% 84%;
              transform: rotate(0deg) translate(0px,0px); }
.cat-root .eye  { transform-box: fill-box; transform-origin: center; transition: transform 70ms ease; }
.cat-root .eye.blink { transform: scaleY(.07); }
.cat-root .ball { transform-box: fill-box; transform-origin: center; }
.cat-root .head { transform-box: fill-box; transform-origin: center bottom;
                  transition: transform 280ms var(--ease-out); }
.cat-root .ear  { transform-box: fill-box; transform-origin: bottom center; }
.cat-root .ear.tw { animation: cat-ear .5s ease; }
@keyframes cat-ear { 0%,100% { transform: rotate(0deg); } 35% { transform: rotate(-13deg); } 70% { transform: rotate(6deg); } }
.cat-root .tailg { transform-box: fill-box; transform-origin: bottom left;
                   animation: cat-tail 3.6s ease-in-out infinite; }
@keyframes cat-tail { 0%,100% { transform: rotate(0deg); } 50% { transform: rotate(7deg); } }
```

- [ ] **Step 7: Create `components/cat/useGaze.ts`**

One shared listener and one shared rAF loop regardless of how many cats are mounted.

```tsx
"use client";
import { useEffect, useRef } from "react";
import { computeGaze, lerp } from "@/lib/motion/gaze";

export function useGaze(svgRef: React.RefObject<SVGSVGElement | null>) {
  const locked = useRef(false);
  const forced = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;

    let cursor = { x: 0, y: 0 };
    let cur = { x: 0, y: 0 };
    let raf = 0;

    const onMove = (e: MouseEvent) => { cursor = { x: e.clientX, y: e.clientY }; };
    window.addEventListener("mousemove", onMove, { passive: true });

    const frame = () => {
      const svg = svgRef.current;
      if (svg) {
        const b = svg.getBoundingClientRect();
        let target = forced.current;
        if (!locked.current && b.width) {
          target = computeGaze(cursor, { x: b.left + b.width * 0.5, y: b.top + b.height * 0.38 });
        }
        cur = { x: lerp(cur.x, target.x, 0.13), y: lerp(cur.y, target.y, 0.13) };
        const t = `translate(${cur.x.toFixed(2)}px,${cur.y.toFixed(2)}px)`;
        svg.querySelectorAll<SVGGElement>(".ball").forEach((b2) => { b2.style.transform = t; });
        const head = svg.querySelector<SVGGElement>(".head");
        if (head) head.style.transform = `rotate(${(cur.x * 1.1).toFixed(2)}deg)`;
      }
      raf = requestAnimationFrame(frame);
    };
    raf = requestAnimationFrame(frame);

    return () => { window.removeEventListener("mousemove", onMove); cancelAnimationFrame(raf); };
  }, [svgRef]);

  return {
    lookAt: (offset: { x: number; y: number }) => { forced.current = offset; locked.current = true; },
    release: () => { locked.current = false; },
  };
}
```

- [ ] **Step 8: Create `components/cat/Cat.tsx`**

```tsx
"use client";
import { useEffect, useRef } from "react";
import { CatSvg } from "./CatSvg";
import { useGaze } from "./useGaze";

type Props = { size?: number; onClick?: () => void; className?: string; label?: string };

export function Cat({ size = 46, onClick, className, label = "Angelo's cat" }: Props) {
  const ref = useRef<SVGSVGElement | null>(null);
  useGaze(ref);

  useEffect(() => {
    const svg = ref.current;
    if (!svg) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const eyes = () => svg.querySelectorAll<SVGGElement>(".eye");
    const ears = () => svg.querySelectorAll<SVGPathElement>(".ear");

    const blink = window.setInterval(() => {
      if (Math.random() < 0.55) return;
      eyes().forEach((e) => e.classList.add("blink"));
      window.setTimeout(() => eyes().forEach((e) => e.classList.remove("blink")), 105);
    }, 3500);

    const twitch = window.setInterval(() => {
      if (Math.random() < 0.7) return;
      ears().forEach((e) => {
        e.classList.add("tw");
        window.setTimeout(() => e.classList.remove("tw"), 520);
      });
    }, 5400);

    return () => { window.clearInterval(blink); window.clearInterval(twitch); };
  }, []);

  const Tag = onClick ? "button" : "span";
  return (
    <Tag
      onClick={onClick}
      className={className}
      style={{ width: size, display: "inline-block", lineHeight: 0, background: "none", border: 0, padding: 0, cursor: onClick ? "pointer" : "default" }}
      {...(onClick ? { type: "button" as const, "aria-label": label } : {})}
    >
      <CatSvg />
    </Tag>
  );
}
```

- [ ] **Step 9: Run the suite and build**

Run: `npm test && npm run build`
Expected: PASS, 22 tests; build succeeds.

- [ ] **Step 10: Commit**

```bash
git add lib/motion components/cat app/globals.css
git commit -m "feat: add cat component with tested cursor-tracking gaze rig"
```

---

## Task 6: Cat — the name easter egg

**Files:**
- Create: `components/cat/playWithName.ts`, `components/cat/NameLockup.tsx`
- Modify: `components/cat/Cat.tsx` (accept a `pose` ref handle)

**Interfaces:**
- Consumes: `Cat`, `useGaze` from Task 5
- Produces: `playWithName(svg: SVGSVGElement, letters: HTMLElement[], gaze: GazeHandle): Promise<void>`; `<NameLockup />`

> **Open item from the spec (§5.1):** the letter effect is due to be replaced by a reference the user will supply. Implement the sequence below as specified; the timing budget is ~900 ms (swipe connects at 860 ms, the cat begins sitting at 1.8 s). Revisit Step 3's keyframes when the reference arrives.

- [ ] **Step 1: Add the animation CSS to `app/globals.css`**

The A spins at exactly 90° per quarter-keyframe — constant angular velocity, landing on 360 with no counter-rotation. The others keep springy overshoot.

```css
/* ============ NAME EASTER EGG ============ */
.name-ltr { display: inline-block; transform-origin: 50% 58%; will-change: transform; }

.name-ltr.spin { animation: ltr-spin .72s cubic-bezier(.42,0,.22,1) both; }
@keyframes ltr-spin {
  0%   { transform: translateY(0)     rotate(0deg)   scale(1); }
  25%  { transform: translateY(-11px) rotate(90deg)  scale(1.11); }
  50%  { transform: translateY(-14px) rotate(180deg) scale(1.14); }
  75%  { transform: translateY(-8px)  rotate(270deg) scale(1.09); }
  100% { transform: translateY(0)     rotate(360deg) scale(1); }
}

.name-ltr.hop { animation: ltr-hop .52s cubic-bezier(.3,1.55,.45,1) both; }
@keyframes ltr-hop {
  0%   { transform: translateY(0)     rotate(0deg)  scale(1); }
  30%  { transform: translateY(-12px) rotate(9deg)  scale(1.14); }
  58%  { transform: translateY(4px)   rotate(-5deg) scale(.95); }
  80%  { transform: translateY(-3px)  rotate(2deg)  scale(1.03); }
  100% { transform: translateY(0)     rotate(0deg)  scale(1); }
}
```

- [ ] **Step 2: Create `components/cat/playWithName.ts`**

Note `pose()` and `arm()` always write the same transform chain — this is the fix for the snapping bug described in the Global Constraints.

```ts
type GazeHandle = { lookAt: (o: { x: number; y: number }) => void; release: () => void };

const OUT = "cubic-bezier(.22,.9,.32,1)";
const BACK = "cubic-bezier(.34,1.38,.52,1)";
const SOFT = "cubic-bezier(.25,.9,.28,1)";
const IN = "cubic-bezier(.55,0,.85,.45)";

const wait = (ms: number) => new Promise((r) => setTimeout(r, ms));

function pose(el: HTMLElement | SVGElement, y: number, rot: number, sx: number, sy: number, ms: number, ease: string) {
  (el as SVGElement & { style: CSSStyleDeclaration }).style.transition = `transform ${ms}ms ${ease}`;
  (el as SVGElement & { style: CSSStyleDeclaration }).style.transform =
    `translateY(${y}px) rotate(${rot}deg) scale(${sx},${sy})`;
}

function arm(el: SVGElement, rot: number, x: number, y: number, ms: number, ease: string) {
  (el as SVGElement & { style: CSSStyleDeclaration }).style.transition = `transform ${ms}ms ${ease}`;
  (el as SVGElement & { style: CSSStyleDeclaration }).style.transform =
    `rotate(${rot}deg) translate(${x}px,${y}px)`;
}

export async function playWithName(svg: SVGSVGElement, letters: HTMLElement[], gaze: GazeHandle) {
  const root = svg.querySelector<SVGGElement>(".cat-root");
  const hw = svg.querySelector<SVGGElement>(".headwrap");
  const sit = svg.querySelector<SVGPathElement>(".body-sit");
  const stand = svg.querySelector<SVGPathElement>(".body-stand");
  const arms = svg.querySelector<SVGGElement>(".arms");
  const armR = svg.querySelector<SVGGElement>(".arm-r");
  if (!root || !hw || !sit || !stand || !arms || !armR) return;

  // 1 — crouch
  pose(root, 6, 0, 1.10, 0.87, 190, OUT);
  pose(hw, 3, 0, 1.06, 0.93, 190, OUT);
  await wait(190);

  // 2 — launch. Body swap is hidden at the bottom of the crouch, where the
  //     silhouette is most compressed. Head lifts 40ms behind for follow-through.
  sit.style.opacity = "0";
  stand.style.opacity = "1";
  arms.style.opacity = "1";
  pose(root, -13, 2, 0.93, 1.10, 250, OUT);
  await wait(40);
  pose(hw, -30, 0, 0.95, 1.07, 260, OUT);
  await wait(210);

  // 3 — settle upright, lock the gaze on the name
  pose(root, -4, 4, 1, 1, 240, BACK);
  gaze.lookAt({ x: 4.2, y: -1.4 });
  await wait(40);
  pose(hw, -26, 0, 1, 1, 240, BACK);
  await wait(220);

  // 4 — one swipe: the A spins, the rest bounce outward from it
  arm(armR, -46, 2, -6, 190, OUT);
  await wait(160);
  const [first, ...rest] = letters;
  if (first) { first.classList.remove("spin", "hop"); void first.offsetWidth; first.classList.add("spin"); }
  rest.forEach((l, i) => {
    setTimeout(() => { l.classList.remove("spin", "hop"); void l.offsetWidth; l.classList.add("hop"); }, 200 + i * 30);
  });
  await wait(90);
  arm(armR, 0, 0, 0, 240, BACK);

  // 5 — a pleased beat
  await wait(610);

  // 6 — descend. The head travels ALL the way home during the descent so that
  //     when the body swaps back, head and body already agree. This is the fix
  //     for the landing pop.
  arms.style.opacity = "0";
  await wait(60);
  pose(root, 4, 0, 1.06, 0.93, 240, IN);
  pose(hw, 0, 0, 1.04, 0.95, 240, IN);
  await wait(240);

  // 7 — no outro. The last keyframe IS the rest pose. Body settles with a
  //     slight overshoot; the head lands soft so it cannot dip into the body.
  sit.style.opacity = "1";
  stand.style.opacity = "0";
  pose(root, 0, 0, 1, 1, 300, BACK);
  pose(hw, 0, 0, 1, 1, 300, SOFT);
  gaze.release();
  await wait(320);
}
```

- [ ] **Step 3: Create `components/cat/NameLockup.tsx`**

```tsx
"use client";
import { useRef, useState } from "react";
import { CatSvg } from "./CatSvg";
import { useGaze } from "./useGaze";
import { playWithName } from "./playWithName";
import { site } from "@/lib/content/site";

export function NameLockup() {
  const svgRef = useRef<SVGSVGElement | null>(null);
  const nameRef = useRef<HTMLSpanElement | null>(null);
  const gaze = useGaze(svgRef);
  const [busy, setBusy] = useState(false);

  async function play() {
    if (busy || !svgRef.current || !nameRef.current) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    setBusy(true);
    const letters = Array.from(nameRef.current.querySelectorAll<HTMLElement>(".name-ltr"));
    await playWithName(svgRef.current, letters, gaze);
    setBusy(false);
  }

  return (
    <div className="flex items-end gap-2.5 px-1.5 pb-4">
      <button
        type="button"
        onClick={play}
        aria-label="Play with the cat"
        className="w-10 shrink-0 leading-none bg-transparent border-0 p-0 cursor-pointer"
      >
        <CatSvg />
      </button>
      <div>
        <span ref={nameRef} className="font-display font-extrabold text-[15px] leading-tight tracking-[-.01em] text-ink block">
          {site.name.split("").map((c, i) => (
            <span key={i} className="name-ltr">{c === " " ? " " : c}</span>
          ))}
        </span>
        <span className="font-mono text-[7.5px] uppercase tracking-[.1em] text-muted mt-1 block">
          {site.role}
        </span>
      </div>
    </div>
  );
}
```

Note: `CatSvg` is rendered directly here (rather than via `Cat`) because this lockup owns its own gaze handle so `playWithName` can lock and release it.

- [ ] **Step 4: Wire the ref through `CatSvg`**

Change the `CatSvg` signature to forward a ref:

```tsx
import { forwardRef } from "react";

type Props = { pose?: "sit" | "stand"; className?: string };

export const CatSvg = forwardRef<SVGSVGElement, Props>(function CatSvg({ pose = "sit", className }, ref) {
  return (
    <svg ref={ref} viewBox="0 0 140 152" className={className} aria-hidden="true" style={{ overflow: "visible" }}>
      {/* ...unchanged contents from Task 5 Step 5... */}
    </svg>
  );
});
```

Then in `NameLockup.tsx` pass `ref={svgRef}` to `<CatSvg />`, and in `Cat.tsx` pass `ref={ref}`.

- [ ] **Step 5: Verify manually**

Run: `npm run dev`, open the app, click the cat.
Expected: crouch → stand → A spins smoothly through a full turn → remaining letters bounce in a wave → cat settles and **stops dead** on the sitting pose with no flourish and no pop.

- [ ] **Step 6: Run the suite and build**

Run: `npm test && npm run build`
Expected: PASS, 22 tests; build succeeds.

- [ ] **Step 7: Commit**

```bash
git add components/cat app/globals.css
git commit -m "feat: add name easter egg with smooth A spin and no-outro landing"
```

---

## Task 7: Dashboard shell

**Files:**
- Create: `components/ui/Icon.tsx`, `components/shell/Sidebar.tsx`, `components/shell/TopBar.tsx`, `components/shell/ViewCounter.tsx`, `app/(dashboard)/layout.tsx`, `app/(dashboard)/page.tsx` (placeholder), `components/shell/Sidebar.test.tsx`
- Modify: `app/layout.tsx`
- Delete: `components/VisitCounterBadge.tsx`

**Interfaces:**
- Consumes: `NameLockup` (Task 6), `site` (Task 4)
- Produces: `NAV_ITEMS: { href: string; label: string }[]`; `<Sidebar />`, `<TopBar />`, `<ViewCounter count={number} />`

- [ ] **Step 1: Write the failing test**

Create `components/shell/Sidebar.test.tsx`:

```tsx
import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { Sidebar, NAV_ITEMS } from "./Sidebar";

vi.mock("next/navigation", () => ({ usePathname: () => "/work" }));

describe("Sidebar", () => {
  it("renders all six routes", () => {
    render(<Sidebar />);
    expect(NAV_ITEMS).toHaveLength(6);
    for (const item of NAV_ITEMS) {
      expect(screen.getByRole("link", { name: item.label })).toBeInTheDocument();
    }
  });

  it("marks the current route with aria-current", () => {
    render(<Sidebar />);
    expect(screen.getByRole("link", { name: "Work" })).toHaveAttribute("aria-current", "page");
    expect(screen.getByRole("link", { name: "Overview" })).not.toHaveAttribute("aria-current");
  });

  it("uses a nav landmark", () => {
    render(<Sidebar />);
    expect(screen.getByRole("navigation")).toBeInTheDocument();
  });
});
```

- [ ] **Step 2: Run it and confirm it fails**

Run: `npm test -- components/shell/Sidebar.test.tsx`
Expected: FAIL — cannot resolve `./Sidebar`.

- [ ] **Step 3: Create `components/ui/Icon.tsx`**

No emoji anywhere; these inherit `currentColor` so they theme.

```tsx
type IconProps = { className?: string };

const base = {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

export const IconDoc = ({ className }: IconProps) => (
  <svg {...base} className={className}><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" /><path d="M14 2v6h6" /></svg>
);
export const IconMail = ({ className }: IconProps) => (
  <svg {...base} className={className}><rect x="2" y="4" width="20" height="16" rx="2" /><path d="M2 7l10 6 10-6" /></svg>
);
export const IconLinkedIn = ({ className }: IconProps) => (
  <svg {...base} className={className}><rect x="2" y="9" width="4" height="12" /><circle cx="4" cy="4" r="2" /><path d="M10 21V9m0 4a4 4 0 018 0v8" /></svg>
);
export const IconGitHub = ({ className }: IconProps) => (
  <svg {...base} className={className}><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.9a3.4 3.4 0 00-1-2.6c3-.3 6-1.5 6-6.5a5 5 0 00-1.4-3.5 4.7 4.7 0 00-.1-3.5s-1.1-.3-3.5 1.3a12 12 0 00-6.2 0C6.9 1.2 5.8 1.5 5.8 1.5a4.7 4.7 0 00-.1 3.5A5 5 0 004.3 8.5c0 5 3 6.2 6 6.5a3.4 3.4 0 00-1 2.6V21" /></svg>
);
export const IconSun = ({ className }: IconProps) => (
  <svg {...base} className={className}><circle cx="12" cy="12" r="4" /><path d="M12 2v2m0 16v2M4.9 4.9l1.4 1.4m11.4 11.4l1.4 1.4M2 12h2m16 0h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" /></svg>
);
export const IconMoon = ({ className }: IconProps) => (
  <svg {...base} className={className}><path d="M21 12.8A9 9 0 1111.2 3a7 7 0 009.8 9.8z" /></svg>
);
export const IconArrowUpRight = ({ className }: IconProps) => (
  <svg {...base} className={className}><path d="M7 17L17 7M7 7h10v10" /></svg>
);
```

- [ ] **Step 4: Create `components/shell/Sidebar.tsx`**

```tsx
"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { NameLockup } from "@/components/cat/NameLockup";
import { cn } from "@/lib/utils";

export const NAV_ITEMS = [
  { href: "/", label: "Overview" },
  { href: "/work", label: "Work" },
  { href: "/experience", label: "Experience" },
  { href: "/skills", label: "Skills" },
  { href: "/credentials", label: "Credentials" },
  { href: "/contact", label: "Contact" },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-[200px] shrink-0 bg-surface border-r border-line flex flex-col p-4 min-h-dvh">
      <NameLockup />
      <nav aria-label="Main">
        <ul className="flex flex-col gap-px">
          {NAV_ITEMS.map((item) => {
            const active = item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  aria-current={active ? "page" : undefined}
                  className={cn(
                    "flex items-center gap-2 px-2.5 py-2 rounded-lg font-display font-semibold text-xs transition-colors",
                    active ? "bg-amber/10 text-ink" : "text-muted hover:text-ink hover:bg-paper",
                  )}
                >
                  <span className={cn("w-1 h-1 rounded-full", active ? "bg-amber" : "bg-transparent")} />
                  {item.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </aside>
  );
}
```

- [ ] **Step 5: Run it and confirm it passes**

Run: `npm test -- components/shell/Sidebar.test.tsx`
Expected: PASS, 3 tests.

- [ ] **Step 6: Create `components/shell/TopBar.tsx`**

```tsx
"use client";
import { useTheme } from "@/components/ThemeContext";
import { IconSun, IconMoon, IconDoc } from "@/components/ui/Icon";
import { site } from "@/lib/content/site";

export function TopBar() {
  const { theme, setTheme } = useTheme();
  const dark = theme === "dark";

  return (
    <div className="absolute top-3 right-4 flex items-center gap-2 z-20">
      <button
        type="button"
        onClick={() => setTheme(dark ? "light" : "dark")}
        aria-label={dark ? "Switch to light mode" : "Switch to dark mode"}
        className="w-7 h-7 grid place-items-center rounded-lg bg-surface border border-line elev-sm text-ink"
      >
        {dark ? <IconSun className="w-3.5 h-3.5" /> : <IconMoon className="w-3.5 h-3.5" />}
      </button>
      <a
        href={site.links.resume}
        download
        className="flex items-center gap-1.5 h-7 px-3 rounded-lg bg-ink text-paper text-[10.5px] font-medium elev-sm"
      >
        <IconDoc className="w-3 h-3" /> Résumé
      </a>
    </div>
  );
}
```

> If `ThemeContext` does not export `setTheme`, read `components/ThemeContext.tsx` and use whatever toggle it does export. Do not add a second theme mechanism.

- [ ] **Step 7: Create `components/shell/ViewCounter.tsx`**

Bottom-**left**, resolving the spec's flagged collision with the chatbot launcher.

```tsx
export function ViewCounter({ count }: { count: number }) {
  return (
    <div className="fixed bottom-4 left-4 z-30 inline-flex items-center gap-1.5 h-7 px-3 rounded-full bg-surface border border-line elev-lg rim font-mono text-[10px] text-ink">
      <span className="w-1.5 h-1.5 rounded-full bg-amber shadow-[0_0_0_3px_color-mix(in_oklab,var(--amber)_18%,transparent)]" />
      {count.toLocaleString()} views
    </div>
  );
}
```

- [ ] **Step 8: Create `app/(dashboard)/layout.tsx`**

```tsx
import { Sidebar } from "@/components/shell/Sidebar";
import { TopBar } from "@/components/shell/TopBar";
import { ViewCounter } from "@/components/shell/ViewCounter";
import { createClient } from "@/lib/supabase/server";

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const supabase = await createClient();
  const { data } = await supabase.rpc("page_view_count");
  const viewCount = typeof data === "number" ? data : 0;

  return (
    <div className="flex min-h-dvh bg-paper">
      <Sidebar />
      <main className="flex-1 relative px-6 py-5 md:px-8 md:py-6">
        <TopBar />
        {children}
      </main>
      <ViewCounter count={viewCount} />
    </div>
  );
}
```

- [ ] **Step 9: Simplify `app/layout.tsx`**

It now only owns `<html>`, `<body>`, fonts and providers. The Supabase call and the counter move into the dashboard layout.

```tsx
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${outfit.variable} ${inter.variable} ${jetbrains.variable} font-sans antialiased`}
        suppressHydrationWarning
      >
        <Providers>
          {children}
          <PortfolioChatbot />
          <VisitorTracker />
        </Providers>
      </body>
    </html>
  );
}
```

Also update `metadata.description` to `"Full Stack Developer building automation-driven web applications."` and delete `components/VisitCounterBadge.tsx`.

- [ ] **Step 10: Create a placeholder `app/(dashboard)/page.tsx`**

```tsx
export default function OverviewPage() {
  return <h1 className="font-display font-extrabold text-3xl text-ink">Overview</h1>;
}
```

- [ ] **Step 11: Verify**

Run: `npm test && npm run build && npm run dev`
Expected: 25 tests pass; build succeeds; the shell renders with a working sidebar, theme toggle and floating counter.

- [ ] **Step 12: Commit**

```bash
git add -A
git commit -m "feat: add dashboard shell with sidebar, top bar and floating view counter"
```

---

## Task 8: Shared route primitives

**Files:**
- Create: `components/ui/RouteHeader.tsx`, `components/ui/Segmented.tsx`, `components/ui/Segmented.test.tsx`

**Interfaces:**
- Produces: `<RouteHeader crumb title subtitle? right? />`; `<Segmented options={{value,label}[]} value onChange />`

- [ ] **Step 1: Write the failing test**

Create `components/ui/Segmented.test.tsx`:

```tsx
import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Segmented } from "./Segmented";

const options = [
  { value: "all", label: "All" },
  { value: "professional", label: "Professional" },
  { value: "personal", label: "Personal" },
];

describe("Segmented", () => {
  it("marks the selected option with aria-pressed", () => {
    render(<Segmented options={options} value="all" onChange={() => {}} />);
    expect(screen.getByRole("button", { name: "All" })).toHaveAttribute("aria-pressed", "true");
    expect(screen.getByRole("button", { name: "Personal" })).toHaveAttribute("aria-pressed", "false");
  });

  it("calls onChange with the clicked value", async () => {
    const onChange = vi.fn();
    render(<Segmented options={options} value="all" onChange={onChange} />);
    await userEvent.click(screen.getByRole("button", { name: "Professional" }));
    expect(onChange).toHaveBeenCalledWith("professional");
  });
});
```

- [ ] **Step 2: Run it and confirm it fails**

Run: `npm test -- components/ui/Segmented.test.tsx`
Expected: FAIL — cannot resolve `./Segmented`.

- [ ] **Step 3: Create `components/ui/Segmented.tsx`**

```tsx
"use client";
import { cn } from "@/lib/utils";

type Option = { value: string; label: string };
type Props = { options: Option[]; value: string; onChange: (v: string) => void };

export function Segmented({ options, value, onChange }: Props) {
  return (
    <div className="inline-flex bg-surface border border-line rounded-lg p-[3px] elev-sm">
      {options.map((o) => {
        const on = o.value === value;
        return (
          <button
            key={o.value}
            type="button"
            aria-pressed={on}
            onClick={() => onChange(o.value)}
            className={cn(
              "font-display font-semibold text-[10.5px] px-3 py-1.5 rounded-md transition-colors",
              on ? "bg-ink text-paper" : "text-muted hover:text-ink",
            )}
          >
            {o.label}
          </button>
        );
      })}
    </div>
  );
}
```

- [ ] **Step 4: Run it and confirm it passes**

Run: `npm test -- components/ui/Segmented.test.tsx`
Expected: PASS, 2 tests.

- [ ] **Step 5: Create `components/ui/RouteHeader.tsx`**

Sentence case, no uppercase, no `tracking-tighter` — this is what retires the repeated section-header formula.

```tsx
export function RouteHeader({
  crumb, title, subtitle, right,
}: { crumb: string; title: string; subtitle?: string; right?: React.ReactNode }) {
  return (
    <header className="flex items-end justify-between gap-4 mb-5">
      <div>
        <p className="font-mono text-[8px] uppercase tracking-[.12em] text-muted">{crumb}</p>
        <h1 className="font-display font-extrabold text-2xl md:text-3xl text-ink tracking-[-.022em] leading-tight mt-1.5">
          {title}
        </h1>
        {subtitle && <p className="text-[10.5px] text-muted mt-1 max-w-sm leading-relaxed">{subtitle}</p>}
      </div>
      {right}
    </header>
  );
}
```

- [ ] **Step 6: Commit**

```bash
git add components/ui
git commit -m "feat: add RouteHeader and Segmented primitives"
```

---

## Task 9: Overview route

**Files:**
- Modify: `app/(dashboard)/page.tsx`

**Interfaces:**
- Consumes: `site`, `getStats`, `getFeatured`, `getCredentials`, `RouteHeader`

- [ ] **Step 1: Implement the Overview page**

The stat tiles and featured card are what repay the loss of the single-scroll skim — someone can decide without clicking.

```tsx
import Image from "next/image";
import Link from "next/link";
import { site, getStats } from "@/lib/content/site";
import { getFeatured } from "@/lib/content/projects";
import { getCredentials } from "@/lib/content/credentials";

export default function OverviewPage() {
  const stats = getStats();
  const featured = getFeatured();
  const latest = getCredentials()[0];

  return (
    <>
      <p className="font-mono text-[8px] uppercase tracking-[.12em] text-muted">Overview</p>
      <h1 className="font-display font-extrabold text-3xl md:text-5xl text-ink tracking-[-.022em] leading-[1.05] mt-2">
        {site.role}<span className="text-amber">.</span>
      </h1>
      <p className="text-[11px] md:text-xs text-muted mt-2 max-w-md leading-relaxed">{site.tagline}</p>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mt-6">
        {stats.map((s) => (
          <div key={s.label} className="bg-surface border border-line rounded-lg p-3 elev-sm rim">
            <p className="font-display font-extrabold text-xl text-ink leading-none tracking-[-.02em]">{s.value}</p>
            <p className="font-mono text-[6.5px] uppercase tracking-[.09em] text-muted mt-1.5">{s.label}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[1.35fr_1fr] gap-2 mt-2">
        {featured && (
          <Link href={`/work/${featured.slug}`} className="bg-surface border border-line rounded-lg overflow-hidden elev-sm rim block hover:elev-md transition-shadow">
            <div className="relative h-32 bg-paper">
              <Image src={featured.image} alt="" fill className="object-cover" sizes="(max-width:1024px) 100vw, 55vw" priority />
            </div>
            <div className="p-3">
              <span className="font-mono text-[6.5px] uppercase tracking-[.08em] px-1.5 py-0.5 rounded bg-amber/15 border border-amber/40 text-ink">
                Professional · {featured.org}
              </span>
              <p className="font-display font-bold text-sm text-ink mt-1.5">{featured.title}</p>
              <p className="text-[9.5px] text-muted mt-1 leading-relaxed">{featured.summary}</p>
            </div>
          </Link>
        )}
        <Link href="/credentials" className="bg-surface border border-line rounded-lg p-3 elev-sm rim block hover:elev-md transition-shadow">
          <p className="font-mono text-[6.5px] uppercase tracking-[.09em] text-muted">Latest credential</p>
          <p className="font-display font-bold text-sm text-ink mt-1.5">{latest.title}</p>
          <p className="text-[9.5px] text-muted mt-1">{latest.issuer} · {latest.year}</p>
        </Link>
      </div>
    </>
  );
}
```

- [ ] **Step 2: Verify**

Run: `npm run build && npm run dev`
Expected: `/` shows the positioning line, four stat tiles, the featured professional project and the latest credential.

- [ ] **Step 3: Commit**

```bash
git add app/\(dashboard\)/page.tsx
git commit -m "feat: add Overview route with stat tiles and featured work"
```

---

## Task 10: Work route

**Files:**
- Create: `components/work/ProjectCard.tsx`, `components/work/WorkGrid.tsx`, `app/(dashboard)/work/page.tsx`

**Interfaces:**
- Consumes: `filterProjects`, `Segmented`, `RouteHeader`
- Produces: `<ProjectCard project={Project} wide?={boolean} />`

Per the spec: **keep** the panning hover preview and click-to-expand; the FLIP filter reflow is **cut**.

- [ ] **Step 1: Add the panning-preview CSS to `app/globals.css`**

The image is rendered at natural height inside a short window and translated on hover, so one card shows a whole page rather than a header crop.

```css
/* ============ WORK CARD PREVIEW ============ */
.shot { overflow: hidden; position: relative; }
.shot > .shot-inner {
  transition: transform 2.6s var(--ease-out);
  will-change: transform;
}
.group\/card:hover .shot > .shot-inner { transform: translateY(calc(-100% + var(--shot-h))); }
@media (prefers-reduced-motion: reduce) {
  .group\/card:hover .shot > .shot-inner { transform: none; }
}
```

- [ ] **Step 2: Create `components/work/ProjectCard.tsx`**

```tsx
import Image from "next/image";
import Link from "next/link";
import type { Project } from "@/lib/content/types";
import { cn } from "@/lib/utils";

export function ProjectCard({ project, wide = false }: { project: Project; wide?: boolean }) {
  const shotH = wide ? 150 : 98;
  return (
    <Link
      href={`/work/${project.slug}`}
      className={cn(
        "group/card bg-surface border border-line rounded-xl overflow-hidden elev-sm rim flex transition-[transform,box-shadow,border-color] duration-300",
        "hover:-translate-y-1.5 hover:elev-lg hover:border-amber/50",
        wide ? "flex-col lg:flex-row lg:col-span-3" : "flex-col",
      )}
      style={{ viewTransitionName: `project-${project.slug}` }}
    >
      <div
        className={cn("shot bg-paper", wide ? "lg:w-[46%] lg:shrink-0" : "")}
        style={{ height: shotH, ["--shot-h" as string]: `${shotH}px` }}
      >
        <div className="shot-inner relative w-full" style={{ aspectRatio: "16 / 34" }}>
          <Image src={project.image} alt="" fill className="object-cover object-top" sizes="(max-width:1024px) 100vw, 33vw" />
        </div>
      </div>

      <div className="p-3 flex flex-col flex-1 justify-center">
        {project.kind === "professional" && (
          <span className="self-start font-mono text-[6.5px] uppercase tracking-[.08em] px-1.5 py-0.5 rounded bg-amber/15 border border-amber/40 text-ink mb-1.5">
            Professional · {project.org}
          </span>
        )}
        <p className={cn("font-display font-bold text-ink leading-tight", wide ? "text-base" : "text-[12.5px]")}>
          {project.title}
        </p>
        <p className="text-[9.5px] text-muted mt-1.5 leading-relaxed">{project.summary}</p>
        <div className="flex flex-wrap gap-1 mt-2">
          {project.tech.slice(0, 4).map((t) => (
            <span key={t} className="font-mono text-[6.5px] px-1.5 py-0.5 rounded bg-paper border border-line text-muted">{t}</span>
          ))}
        </div>
        <div className="flex gap-2.5 mt-2 font-mono text-[7.5px] text-muted">
          {project.links.live && <span className="text-amber">Live</span>}
          {project.links.code && <span>Code</span>}
          {project.links.note && <span>{project.links.note}</span>}
        </div>
      </div>
    </Link>
  );
}
```

- [ ] **Step 3: Create `components/work/WorkGrid.tsx`**

```tsx
"use client";
import { useState } from "react";
import { Segmented } from "@/components/ui/Segmented";
import { ProjectCard } from "./ProjectCard";
import { filterProjects } from "@/lib/content/projects";
import type { ProjectKind } from "@/lib/content/types";

const OPTIONS = [
  { value: "all", label: "All" },
  { value: "professional", label: "Professional" },
  { value: "personal", label: "Personal" },
];

export function WorkGrid() {
  const [kind, setKind] = useState<"all" | ProjectKind>("all");
  const projects = filterProjects(kind);

  return (
    <>
      <div className="flex justify-end -mt-12 mb-4 relative z-10">
        <Segmented options={OPTIONS} value={kind} onChange={(v) => setKind(v as "all" | ProjectKind)} />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
        {projects.map((p) => (
          <ProjectCard key={p.slug} project={p} wide={p.featured && kind !== "professional"} />
        ))}
      </div>
    </>
  );
}
```

- [ ] **Step 4: Create `app/(dashboard)/work/page.tsx`**

```tsx
import { RouteHeader } from "@/components/ui/RouteHeader";
import { WorkGrid } from "@/components/work/WorkGrid";
import { getProjects } from "@/lib/content/projects";

export const metadata = { title: "Work — Angelo Principio" };

export default function WorkPage() {
  const total = getProjects().length;
  const pro = getProjects().filter((p) => p.kind === "professional").length;
  return (
    <>
      <RouteHeader
        crumb="Work"
        title="Selected Work"
        subtitle={`${total} shipped projects — ${pro} professional, ${total - pro} personal.`}
      />
      <WorkGrid />
    </>
  );
}
```

- [ ] **Step 5: Verify**

Run: `npm run dev`, visit `/work`.
Expected: featured professional card spans the row; hovering any card lifts it and slowly pans the screenshot down; the segmented control filters.

- [ ] **Step 6: Commit**

```bash
git add components/work "app/(dashboard)/work" app/globals.css
git commit -m "feat: add Work route with panning previews and professional/personal filter"
```

---

## Task 11: Work detail route with View Transitions

**Files:**
- Create: `app/(dashboard)/work/[slug]/page.tsx`
- Modify: `app/globals.css`, `next.config.ts`

**Interfaces:**
- Consumes: `getProject`, `getProjects`

- [ ] **Step 1: Enable the View Transitions API**

In `next.config.ts`, inside the config object:

```ts
experimental: { viewTransition: true },
```

- [ ] **Step 2: Add the transition CSS to `app/globals.css`**

```css
/* ============ VIEW TRANSITIONS ============ */
@media (prefers-reduced-motion: no-preference) {
  ::view-transition-old(root),
  ::view-transition-new(root) { animation-duration: 260ms; }
}
```

- [ ] **Step 3: Create `app/(dashboard)/work/[slug]/page.tsx`**

```tsx
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getProject, getProjects } from "@/lib/content/projects";
import { IconArrowUpRight } from "@/components/ui/Icon";

export function generateStaticParams() {
  return getProjects().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const p = getProject(slug);
  return { title: p ? `${p.title} — Angelo Principio` : "Not found" };
}

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  return (
    <article style={{ viewTransitionName: `project-${project.slug}` }}>
      <Link href="/work" className="font-mono text-[8px] uppercase tracking-[.12em] text-muted hover:text-ink">
        ‹ Work
      </Link>

      <div className="relative h-44 md:h-60 rounded-xl overflow-hidden border border-line elev-md rim mt-3 bg-paper">
        <Image src={project.image} alt="" fill className="object-cover object-top" sizes="100vw" priority />
      </div>

      {project.kind === "professional" && (
        <span className="inline-block font-mono text-[6.5px] uppercase tracking-[.08em] px-1.5 py-0.5 rounded bg-amber/15 border border-amber/40 text-ink mt-4">
          Professional · {project.org}
        </span>
      )}
      <h1 className="font-display font-extrabold text-2xl md:text-3xl text-ink tracking-[-.022em] mt-2">{project.title}</h1>
      <p className="text-xs text-muted mt-2 max-w-xl leading-relaxed">{project.summary}</p>

      <h2 className="font-display font-bold text-sm text-ink mt-6">What I built</h2>
      <ul className="mt-2 space-y-1.5">
        {project.outcomes.map((o) => (
          <li key={o} className="relative pl-3.5 text-[11px] text-muted leading-relaxed">
            <span className="absolute left-0 top-[7px] w-1 h-1 rounded-full bg-amber" />
            {o}
          </li>
        ))}
      </ul>

      <div className="flex flex-wrap gap-1.5 mt-5">
        {project.tech.map((t) => (
          <span key={t} className="font-mono text-[7px] px-2 py-1 rounded bg-surface border border-line text-muted">{t}</span>
        ))}
      </div>

      <div className="flex flex-wrap items-center gap-3 mt-6">
        {project.links.live && (
          <a href={project.links.live} target="_blank" rel="noopener noreferrer"
             className="inline-flex items-center gap-1.5 h-8 px-4 rounded-lg bg-ink text-paper text-[11px] font-medium elev-sm">
            View live <IconArrowUpRight className="w-3 h-3" />
          </a>
        )}
        {project.links.code && (
          <a href={project.links.code} target="_blank" rel="noopener noreferrer"
             className="inline-flex items-center gap-1.5 h-8 px-4 rounded-lg bg-surface border border-line text-ink text-[11px] font-medium elev-sm">
            Source <IconArrowUpRight className="w-3 h-3" />
          </a>
        )}
        {project.links.note && <span className="font-mono text-[8px] text-muted">{project.links.note}</span>}
      </div>
    </article>
  );
}
```

- [ ] **Step 4: Verify**

Run: `npm run dev`, click a project card.
Expected: navigates to `/work/<slug>`; the card morphs rather than cutting; URL is deep-linkable; PUP EduTrack shows the note and **no** Code or Live buttons.

- [ ] **Step 5: Commit**

```bash
git add "app/(dashboard)/work/[slug]" app/globals.css next.config.ts
git commit -m "feat: add project detail route with view transitions"
```

---

## Task 12: Experience accordion

**Files:**
- Create: `lib/motion/nearest.ts`, `lib/motion/nearest.test.ts`, `components/experience/ExperienceList.tsx`, `app/(dashboard)/experience/page.tsx`

**Interfaces:**
- Produces: `nearestIndex(centers: number[], focus: number): number`

- [ ] **Step 1: Write the failing test**

Create `lib/motion/nearest.test.ts`:

```ts
import { describe, it, expect } from "vitest";
import { nearestIndex } from "./nearest";

describe("nearestIndex", () => {
  it("picks the element whose centre is closest to the focus line", () => {
    expect(nearestIndex([0, 100, 200], 90)).toBe(1);
    expect(nearestIndex([0, 100, 200], 10)).toBe(0);
    expect(nearestIndex([0, 100, 200], 195)).toBe(2);
  });

  it("returns 0 for an empty list", () => {
    expect(nearestIndex([], 50)).toBe(0);
  });

  it("prefers the earlier element on an exact tie", () => {
    expect(nearestIndex([0, 100], 50)).toBe(0);
  });
});
```

- [ ] **Step 2: Run it and confirm it fails**

Run: `npm test -- lib/motion/nearest.test.ts`
Expected: FAIL — cannot resolve `./nearest`.

- [ ] **Step 3: Create `lib/motion/nearest.ts`**

```ts
/** Index of the centre closest to `focus`. Ties resolve to the earlier index. */
export function nearestIndex(centers: number[], focus: number): number {
  let best = 0;
  let bestDist = Infinity;
  for (let i = 0; i < centers.length; i++) {
    const d = Math.abs(centers[i] - focus);
    if (d < bestDist) { bestDist = d; best = i; }
  }
  return best;
}
```

- [ ] **Step 4: Run it and confirm it passes**

Run: `npm test -- lib/motion/nearest.test.ts`
Expected: PASS, 3 tests.

- [ ] **Step 5: Add the accordion CSS to `app/globals.css`**

`grid-template-rows: 0fr → 1fr` tweens to the content's real height. `max-height` would require guessing a value — guess high and the easing runs against a number the content never reaches; guess low and long entries clip.

```css
/* ============ EXPERIENCE ACCORDION ============ */
.exp-body-wrap { display: grid; grid-template-rows: 0fr; transition: grid-template-rows 460ms var(--ease-out); }
.exp.is-open .exp-body-wrap { grid-template-rows: 1fr; }
.exp-body { overflow: hidden; min-height: 0; }
.exp-body-inner { opacity: 0; transform: translateY(-6px);
  transition: opacity 300ms ease 100ms, transform 380ms var(--ease-out) 80ms; }
.exp.is-open .exp-body-inner { opacity: 1; transform: none; }
```

- [ ] **Step 6: Create `components/experience/ExperienceList.tsx`**

Collapsed entries sit back (`scale(.975)`, `elev-sm`, 55% opacity); the open one sits forward (`scale(1)`, `elev-lg`, full opacity). A click holds for 1.4 s, then scroll resumes control. One entry is always open.

```tsx
"use client";
import { useEffect, useRef, useState } from "react";
import { nearestIndex } from "@/lib/motion/nearest";
import { getExperience } from "@/lib/content/experience";
import { cn } from "@/lib/utils";

export function ExperienceList() {
  const entries = getExperience();
  const [active, setActive] = useState(0);
  const refs = useRef<(HTMLLIElement | null)[]>([]);
  const manualUntil = useRef(0);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const onScroll = () => {
      if (Date.now() < manualUntil.current) return;
      const focus = window.innerHeight * 0.42;
      const centers = refs.current.map((el) => (el ? el.getBoundingClientRect().top + el.offsetHeight / 2 : Infinity));
      setActive(nearestIndex(centers, focus));
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <ol className="relative pl-24">
      <div className="absolute left-[78px] top-2 bottom-2 w-0.5 bg-line rounded" aria-hidden="true" />
      {entries.map((e, i) => {
        const open = i === active;
        return (
          <li key={e.id} ref={(el) => { refs.current[i] = el; }} className={cn("exp relative mb-3", open && "is-open")}>
            <span className={cn(
              "absolute -left-[18px] top-4 w-2.5 h-2.5 rounded-full border-2 border-surface transition-[background,transform] duration-300",
              open ? "bg-amber scale-125" : "bg-line",
            )} aria-hidden="true" />
            <span className={cn("absolute -left-24 top-3 w-16 text-right font-mono text-[8px] leading-relaxed transition-colors", open ? "text-ink" : "text-muted")}>
              {e.start}<br />{e.end}
            </span>

            <button
              type="button"
              aria-expanded={open}
              onClick={() => { manualUntil.current = Date.now() + 1400; setActive(i); }}
              className={cn(
                "w-full text-left bg-surface border rounded-xl overflow-hidden origin-left rim",
                "transition-[transform,box-shadow,opacity,border-color] duration-[420ms] [transition-timing-function:var(--ease-out)]",
                open ? "scale-100 opacity-100 elev-lg border-amber/40" : "scale-[.975] opacity-55 elev-sm border-line hover:opacity-85",
              )}
            >
              <div className="p-3.5">
                <span className="font-mono text-[6.5px] uppercase tracking-[.08em] px-1.5 py-0.5 rounded bg-amber/15 border border-amber/40 text-ink">
                  {e.meta}
                </span>
                <p className="font-display font-bold text-[13.5px] text-ink leading-tight mt-1.5">{e.title}</p>
                <p className="text-[10.5px] font-semibold text-muted mt-0.5">{e.org}</p>
              </div>

              <div className="exp-body-wrap">
                <div className="exp-body">
                  <div className="exp-body-inner px-3.5 pb-3.5">
                    <div className="h-px bg-line mb-2.5" />
                    <ul className="space-y-1">
                      {e.outcomes.map((o) => (
                        <li key={o} className="relative pl-3 text-[10.5px] text-muted leading-relaxed">
                          <span className="absolute left-0.5 top-[7px] w-1 h-1 rounded-full bg-amber" />
                          {o}
                        </li>
                      ))}
                    </ul>
                    <div className="flex flex-wrap gap-1 mt-2.5">
                      {e.tech.map((t) => (
                        <span key={t} className="font-mono text-[7px] px-1.5 py-0.5 rounded bg-paper border border-line text-muted">{t}</span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </button>
          </li>
        );
      })}
    </ol>
  );
}
```

- [ ] **Step 7: Create `app/(dashboard)/experience/page.tsx`**

```tsx
import { RouteHeader } from "@/components/ui/RouteHeader";
import { ExperienceList } from "@/components/experience/ExperienceList";

export const metadata = { title: "Experience — Angelo Principio" };

export default function ExperiencePage() {
  return (
    <>
      <RouteHeader crumb="Experience" title="Experience" subtitle="Where the work actually happened." />
      <ExperienceList />
    </>
  );
}
```

- [ ] **Step 8: Verify**

Run: `npm test && npm run dev`, visit `/experience`.
Expected: 30 tests pass; scrolling opens the nearest entry and collapses the others; clicking holds for ~1.4 s; one entry is always open.

- [ ] **Step 9: Commit**

```bash
git add lib/motion components/experience "app/(dashboard)/experience" app/globals.css
git commit -m "feat: add Experience accordion with scroll and click triggers"
```

---

## Task 13: Skills and Credentials routes

**Files:**
- Create: `app/(dashboard)/skills/page.tsx`, `components/credentials/CredentialGrid.tsx`, `app/(dashboard)/credentials/page.tsx`
- Delete: `components/LogoLoop.tsx`, `components/LogoLoop.css`

**Interfaces:**
- Consumes: `getCapabilities`, `getStack`, `getCredentials`, `getIssuers`, `Segmented`, `RouteHeader`

- [ ] **Step 1: Create `app/(dashboard)/skills/page.tsx`**

Grouped static chips replace the marquee: someone checking "do they know Postgres?" gets an answer immediately instead of waiting for a scroll cycle.

```tsx
import { RouteHeader } from "@/components/ui/RouteHeader";
import { getCapabilities, getStack } from "@/lib/content/skills";

export const metadata = { title: "Skills — Angelo Principio" };

export default function SkillsPage() {
  return (
    <>
      <RouteHeader crumb="Skills" title="Skills" subtitle="What I build, and what I build it with." />

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5">
        {getCapabilities().map((c) => (
          <div key={c.id} className="bg-surface border border-line rounded-xl p-3 elev-sm rim">
            <p className="font-display font-bold text-[11px] text-ink">{c.title}</p>
            <p className="text-[9px] text-muted mt-1 leading-relaxed">{c.description}</p>
          </div>
        ))}
      </div>

      <div className="mt-3 bg-surface border border-line rounded-xl px-3.5 elev-sm rim">
        {getStack().map((g, i) => (
          <div key={g.label} className={`grid grid-cols-[96px_1fr] gap-3 items-center py-2.5 ${i > 0 ? "border-t border-line" : ""}`}>
            <p className="font-mono text-[7.5px] uppercase tracking-[.1em] text-muted">{g.label}</p>
            <div className="flex flex-wrap gap-1.5">
              {g.items.map((t) => (
                <span key={t} className="text-[9px] font-medium text-ink bg-paper border border-line rounded-md px-2 py-1">{t}</span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
```

- [ ] **Step 2: Create `components/credentials/CredentialGrid.tsx`**

Flat layout — no `max-h` inner scroller, which is what made the old version trap the wheel.

```tsx
"use client";
import { useState } from "react";
import Image from "next/image";
import { Segmented } from "@/components/ui/Segmented";
import { getCredentials, getIssuers } from "@/lib/content/credentials";

export function CredentialGrid() {
  const [issuer, setIssuer] = useState("all");
  const [open, setOpen] = useState<string | null>(null);

  const options = [{ value: "all", label: "All" }, ...getIssuers().map((i) => ({ value: i, label: i }))];
  const items = getCredentials().filter((c) => issuer === "all" || c.issuer === issuer);
  const active = getCredentials().find((c) => c.id === open);

  return (
    <>
      <div className="flex justify-end -mt-12 mb-4 relative z-10">
        <Segmented options={options} value={issuer} onChange={setIssuer} />
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2.5">
        {items.map((c) => (
          <button key={c.id} type="button" onClick={() => setOpen(c.id)}
            className="bg-surface border border-line rounded-xl overflow-hidden elev-sm rim text-left transition-[transform,box-shadow] duration-200 hover:-translate-y-1 hover:elev-md">
            <div className="relative h-24 bg-paper">
              <Image src={c.image} alt="" fill className="object-cover" sizes="(max-width:1024px) 50vw, 25vw" />
            </div>
            <div className="p-2.5">
              <p className="font-mono text-[6.5px] uppercase tracking-[.07em] text-muted">{c.issuer} · {c.year}</p>
              <p className="font-display font-bold text-[10.5px] text-ink mt-1 leading-tight">{c.title}</p>
            </div>
          </button>
        ))}
      </div>

      {active && (
        <div role="dialog" aria-modal="true" aria-label={active.title}
          onClick={() => setOpen(null)}
          className="fixed inset-0 z-50 bg-ink/50 backdrop-blur-sm grid place-items-center p-6">
          <div className="relative w-full max-w-2xl aspect-[4/3] bg-surface rounded-xl overflow-hidden border border-line elev-lg"
               onClick={(e) => e.stopPropagation()}>
            <Image src={active.image} alt={active.title} fill className="object-contain" sizes="100vw" />
            <button type="button" onClick={() => setOpen(null)} aria-label="Close"
              className="absolute top-2 right-2 w-7 h-7 grid place-items-center rounded-lg bg-surface border border-line elev-sm text-ink">✕</button>
          </div>
        </div>
      )}
    </>
  );
}
```

- [ ] **Step 3: Create `app/(dashboard)/credentials/page.tsx`**

```tsx
import { RouteHeader } from "@/components/ui/RouteHeader";
import { CredentialGrid } from "@/components/credentials/CredentialGrid";
import { getCredentials } from "@/lib/content/credentials";

export const metadata = { title: "Credentials — Angelo Principio" };

export default function CredentialsPage() {
  return (
    <>
      <RouteHeader crumb="Credentials" title="Credentials"
        subtitle={`${getCredentials().length} certifications across AI, security and fundamentals.`} />
      <CredentialGrid />
    </>
  );
}
```

- [ ] **Step 4: Delete the marquee**

```bash
git rm components/LogoLoop.tsx components/LogoLoop.css
```

- [ ] **Step 5: Verify**

Run: `npm run build && npm run dev`, visit `/skills` and `/credentials`.
Expected: build succeeds; skills read as grouped chips with no marquee; credentials lay out flat with a working issuer filter and modal, and the page scrolls normally with no inner scroll trap.

- [ ] **Step 6: Commit**

```bash
git add -A
git commit -m "feat: add Skills and Credentials routes, retire LogoLoop marquee"
```

---

## Task 14: Contact route

**Files:**
- Create: `components/contact/ContactForm.tsx`, `components/contact/LinkTiles.tsx`, `components/contact/BookingPlaceholder.tsx`, `app/(dashboard)/contact/page.tsx`, `components/contact/ContactForm.test.tsx`

**Interfaces:**
- Consumes: `site`, `Cat` (Task 5), `RouteHeader`
- Produces: form posting `{ name, email, subject, message }` to `/api/contact`

- [ ] **Step 1: Write the failing test**

Subject is required by the API — it returns 400 without it — so the form must not allow submission until it is filled.

Create `components/contact/ContactForm.test.tsx`:

```tsx
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ContactForm } from "./ContactForm";

describe("ContactForm", () => {
  it("renders a required subject field", () => {
    render(<ContactForm />);
    expect(screen.getByLabelText(/subject/i)).toBeRequired();
  });

  it("keeps submit disabled until every required field is filled", async () => {
    render(<ContactForm />);
    const submit = screen.getByRole("button", { name: /send message/i });
    expect(submit).toBeDisabled();

    await userEvent.type(screen.getByLabelText(/name/i), "Jane");
    await userEvent.type(screen.getByLabelText(/email/i), "jane@example.com");
    await userEvent.type(screen.getByLabelText(/message/i), "Hello there");
    expect(submit).toBeDisabled(); // subject still empty

    await userEvent.type(screen.getByLabelText(/subject/i), "Job opportunity");
    expect(submit).toBeEnabled();
  });

  it("fills the subject from a preset chip", async () => {
    render(<ContactForm />);
    await userEvent.click(screen.getByRole("button", { name: "Job opportunity" }));
    expect(screen.getByLabelText(/subject/i)).toHaveValue("Job opportunity");
  });
});
```

- [ ] **Step 2: Run it and confirm it fails**

Run: `npm test -- components/contact/ContactForm.test.tsx`
Expected: FAIL — cannot resolve `./ContactForm`.

- [ ] **Step 3: Create `components/contact/ContactForm.tsx`**

```tsx
"use client";
import { useState } from "react";

const PRESETS = ["Job opportunity", "Freelance", "Collaboration"];
const FIELD = "h-[31px] w-full bg-paper border border-line rounded-lg px-2.5 text-[11px] text-ink outline-none focus:border-amber focus:ring-[3px] focus:ring-amber/20";
const LABEL = "font-mono text-[7.5px] uppercase tracking-[.11em] text-muted mb-1.5 block";

export function ContactForm() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "", website: "" });
  const [state, setState] = useState<"idle" | "sending" | "sent" | "error">("idle");

  const valid =
    form.name.trim() !== "" &&
    /\S+@\S+\.\S+/.test(form.email) &&
    form.subject.trim() !== "" &&
    form.message.trim().length > 4;

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!valid) return;
    setState("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      setState(res.ok ? "sent" : "error");
    } catch {
      setState("error");
    }
  }

  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm((f) => ({ ...f, [k]: e.target.value }));

  return (
    <form onSubmit={submit} className="bg-surface border border-line rounded-xl p-4 elev-sm rim">
      <div className="flex items-start justify-between mb-3 min-h-[44px]">
        <div>
          <p className="font-display font-bold text-[13px] text-ink">Send a message</p>
          <p className="text-[9.5px] text-muted mt-0.5">I usually reply within a day.</p>
        </div>
        <span className="font-mono text-[7px] uppercase tracking-[.14em] text-muted">Option A</span>
      </div>

      {/* honeypot — hidden from people, filled by bots */}
      <input
        type="text" name="website" tabIndex={-1} autoComplete="off" value={form.website}
        onChange={set("website")} aria-hidden="true"
        style={{ position: "absolute", left: "-9999px", width: 1, height: 1 }}
      />

      <div className="grid grid-cols-2 gap-2.5">
        <div className="mb-2.5">
          <label className={LABEL} htmlFor="c-name">Name *</label>
          <input id="c-name" className={FIELD} required value={form.name} onChange={set("name")} placeholder="Jane Dela Cruz" />
        </div>
        <div className="mb-2.5">
          <label className={LABEL} htmlFor="c-email">Email *</label>
          <input id="c-email" type="email" className={FIELD} required value={form.email} onChange={set("email")} placeholder="jane@company.com" />
        </div>
      </div>

      <div className="mb-2.5">
        <label className={LABEL} htmlFor="c-subject">Subject *</label>
        <div className="flex flex-wrap gap-1 mb-1.5">
          {PRESETS.map((p) => (
            <button key={p} type="button" onClick={() => setForm((f) => ({ ...f, subject: p }))}
              className={`font-mono text-[7px] px-2 py-1 rounded-full border transition-colors ${
                form.subject === p ? "bg-amber border-amber text-paper" : "bg-paper border-line text-muted hover:text-ink"}`}>
              {p}
            </button>
          ))}
        </div>
        <input id="c-subject" className={FIELD} required maxLength={80} value={form.subject}
               onChange={set("subject")} placeholder="Pick one, or write your own" />
      </div>

      <div className="mb-3">
        <label className={LABEL} htmlFor="c-message">Message *</label>
        <textarea id="c-message" required maxLength={2000} value={form.message} onChange={set("message")}
                  placeholder="A couple of lines about what you have in mind."
                  className={`${FIELD} h-[74px] py-2 resize-none leading-relaxed`} />
      </div>

      <button type="submit" disabled={!valid || state === "sending"}
        className="w-full h-10 rounded-lg bg-ink text-paper font-display font-semibold text-[11px] elev-sm disabled:opacity-40">
        {state === "sending" ? "Sending…" : state === "sent" ? "Sent ✓" : "Send message →"}
      </button>
      {state === "error" && <p role="alert" className="text-[10px] text-muted mt-2">Something went wrong. Email me directly instead.</p>}
    </form>
  );
}
```

- [ ] **Step 4: Run it and confirm it passes**

Run: `npm test -- components/contact/ContactForm.test.tsx`
Expected: PASS, 3 tests.

- [ ] **Step 5: Create `components/contact/LinkTiles.tsx`**

Résumé is the dark tile — for a recruiter it is the highest-intent action on the page.

```tsx
import { site } from "@/lib/content/site";
import { IconDoc, IconMail, IconLinkedIn, IconGitHub } from "@/components/ui/Icon";
import { cn } from "@/lib/utils";

const TILES = [
  { key: "resume", label: "Résumé", value: "PDF", href: site.links.resume, Icon: IconDoc, primary: true, arrow: "↓" },
  { key: "email", label: "Email", value: site.email, href: `mailto:${site.email}`, Icon: IconMail, primary: false, arrow: "↗" },
  { key: "linkedin", label: "LinkedIn", value: "/in/angelo-principio", href: site.links.linkedin, Icon: IconLinkedIn, primary: false, arrow: "↗" },
  { key: "github", label: "GitHub", value: "github.com/Xuji24", href: site.links.github, Icon: IconGitHub, primary: false, arrow: "↗" },
];

export function LinkTiles() {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5 mt-3.5">
      {TILES.map(({ key, label, value, href, Icon, primary, arrow }) => (
        <a key={key} href={href} {...(key === "resume" ? { download: true } : { target: "_blank", rel: "noopener noreferrer" })}
          className={cn(
            "group relative rounded-xl p-3.5 border elev-sm rim transition-[transform,box-shadow,border-color] duration-200 hover:-translate-y-1 hover:elev-lg hover:border-amber/50",
            primary ? "bg-ink border-ink" : "bg-surface border-line",
          )}>
          <span className={cn("absolute top-3.5 right-3.5 text-[11px] transition-colors", primary ? "text-muted" : "text-line group-hover:text-amber")}>{arrow}</span>
          <span className={cn("w-7 h-7 rounded-lg grid place-items-center border mb-2.5", primary ? "bg-paper/10 border-paper/20 text-paper" : "bg-paper border-line text-ink")}>
            <Icon className="w-3.5 h-3.5" />
          </span>
          <p className={cn("font-display font-bold text-[11.5px]", primary ? "text-paper" : "text-ink")}>{label}</p>
          <p className={cn("font-mono text-[7.5px] mt-1 truncate", primary ? "text-paper/60" : "text-muted")}>{value}</p>
        </a>
      ))}
    </div>
  );
}
```

- [ ] **Step 6: Create `components/contact/BookingPlaceholder.tsx`**

The booking backend is a separate spec; this reserves the slot so `/contact` is not blocked on Google OAuth.

```tsx
"use client";
import { Cat } from "@/components/cat/Cat";
import { site } from "@/lib/content/site";

export function BookingPlaceholder() {
  return (
    <div className="bg-surface border border-line rounded-xl p-4 elev-sm rim">
      <div className="flex items-start justify-between gap-2.5 mb-3 min-h-[44px]">
        <div>
          <p className="font-display font-bold text-[13px] text-ink">Book a call</p>
          <p className="text-[9.5px] text-muted mt-0.5">However long it takes.</p>
        </div>
        <Cat size={46} label="Angelo's cat" />
      </div>
      <div className="font-mono text-[7px] text-muted bg-paper border border-line rounded-md px-2 py-1.5 mb-2.5">
        {site.timezone} (GMT+8)
      </div>
      <div className="grid place-items-center h-[236px] text-center px-4">
        <p className="text-[10.5px] text-muted leading-relaxed">
          Scheduling is being built.<br />Use the form for now — I&apos;ll reply with times.
        </p>
      </div>
    </div>
  );
}
```

- [ ] **Step 7: Create `app/(dashboard)/contact/page.tsx`**

Form is the wider column (`1.42fr` / `0.78fr`) so booking reads as secondary. No "Available for work" badge.

```tsx
import { RouteHeader } from "@/components/ui/RouteHeader";
import { ContactForm } from "@/components/contact/ContactForm";
import { BookingPlaceholder } from "@/components/contact/BookingPlaceholder";
import { LinkTiles } from "@/components/contact/LinkTiles";

export const metadata = { title: "Contact — Angelo Principio" };

export default function ContactPage() {
  return (
    <>
      <RouteHeader crumb="Contact" title="Let's work together"
        subtitle="Send a message, or put a call straight in my calendar." />
      <div className="grid grid-cols-1 lg:grid-cols-[1.42fr_.78fr] gap-3.5 items-start">
        <ContactForm />
        <BookingPlaceholder />
      </div>
      <LinkTiles />
    </>
  );
}
```

- [ ] **Step 8: Verify**

Run: `npm test && npm run dev`, visit `/contact`.
Expected: 33 tests pass; both cards start on the same line; the cat is fully visible inside the booking card; four link tiles below with Résumé dark.

- [ ] **Step 9: Commit**

```bash
git add components/contact "app/(dashboard)/contact"
git commit -m "feat: add Contact route with subject field, link tiles and booking placeholder"
```

---

## Task 15: Contact API fixes and résumé role

**Files:**
- Modify: `app/api/contact/route.ts`, `lib/resume.ts`, `.env.example`
- Create: `app/api/contact/validate.ts`, `app/api/contact/route.test.ts`

**Interfaces:**
- Consumes: the form payload `{ name, email, subject, message, website }` from Task 14
- Produces: `parseContactPayload(body: unknown): { ok: true; data: ContactPayload } | { ok: false; error: string }`

- [ ] **Step 1: Write the failing test**

Create `app/api/contact/route.test.ts`:

```ts
import { describe, it, expect } from "vitest";
import { parseContactPayload } from "./validate";

const good = { name: "Jane", email: "jane@example.com", subject: "Hi", message: "Hello there" };

describe("parseContactPayload", () => {
  it("accepts a complete payload", () => {
    const r = parseContactPayload(good);
    expect(r.ok).toBe(true);
  });

  it("rejects a missing subject", () => {
    expect(parseContactPayload({ ...good, subject: "" }).ok).toBe(false);
  });

  it("rejects a malformed email", () => {
    expect(parseContactPayload({ ...good, email: "nope" }).ok).toBe(false);
  });

  it("rejects a filled honeypot", () => {
    expect(parseContactPayload({ ...good, website: "http://spam" }).ok).toBe(false);
  });

  it("rejects an over-long message", () => {
    expect(parseContactPayload({ ...good, message: "x".repeat(2001) }).ok).toBe(false);
  });

  it("falls back to an email-derived name when none is given", () => {
    const r = parseContactPayload({ ...good, name: "" });
    expect(r.ok).toBe(true);
    if (r.ok) expect(r.data.name).toBe("jane");
  });
});
```

- [ ] **Step 2: Run it and confirm it fails**

Run: `npm test -- app/api/contact/route.test.ts`
Expected: FAIL — cannot resolve `./validate`.

- [ ] **Step 3: Create `app/api/contact/validate.ts`**

```ts
export type ContactPayload = { name: string; email: string; subject: string; message: string };

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MAX = { name: 120, subject: 80, message: 2000 };

export function parseContactPayload(
  body: unknown,
): { ok: true; data: ContactPayload } | { ok: false; error: string } {
  if (typeof body !== "object" || body === null) return { ok: false, error: "Invalid body" };
  const b = body as Record<string, unknown>;

  // Honeypot: hidden from people, filled by bots.
  if (typeof b.website === "string" && b.website.trim() !== "") {
    return { ok: false, error: "Rejected" };
  }

  const email = typeof b.email === "string" ? b.email.trim() : "";
  const subject = typeof b.subject === "string" ? b.subject.trim() : "";
  const message = typeof b.message === "string" ? b.message.trim() : "";
  const rawName = typeof b.name === "string" ? b.name.trim() : "";

  if (!EMAIL.test(email)) return { ok: false, error: "Invalid email" };
  if (!subject) return { ok: false, error: "Missing subject" };
  if (!message) return { ok: false, error: "Missing message" };
  if (subject.length > MAX.subject || message.length > MAX.message || rawName.length > MAX.name) {
    return { ok: false, error: "Too long" };
  }

  // The old route derived a shouty name from the address
  // ("principioangelo24" -> "PRINCIPIOANGELO24"). Use the real name when given.
  const name = rawName || email.split("@")[0];
  return { ok: true, data: { name, email, subject, message } };
}
```

- [ ] **Step 4: Run it and confirm it passes**

Run: `npm test -- app/api/contact/route.test.ts`
Expected: PASS, 6 tests.

- [ ] **Step 5: Rewrite `app/api/contact/route.ts`**

The `replyTo` is the fix for replies going to yourself; `CONTACT_TO` sets the destination independently of the authenticating account.

```ts
import { NextRequest, NextResponse } from "next/server";
import transporter from "@/utils/email/nodemailer";
import EmailTemplate from "@/utils/email/EmailTemplate";
import AdminNotificationTemplate from "@/utils/email/AdminNotificationTemplate";
import { parseContactPayload } from "./validate";

const WINDOW_MS = 60_000;
const MAX_PER_WINDOW = 3;
const hits = new Map<string, number[]>();

function rateLimited(ip: string): boolean {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);
  return recent.length > MAX_PER_WINDOW;
}

export async function POST(request: NextRequest) {
  const ip = request.headers.get("x-forwarded-for")?.split(",")[0].trim() ?? "unknown";
  if (rateLimited(ip)) {
    return NextResponse.json({ error: "Too many requests" }, { status: 429 });
  }

  const parsed = parseContactPayload(await request.json().catch(() => null));
  if (!parsed.ok) {
    return NextResponse.json({ error: parsed.error }, { status: 400 });
  }
  const { name, email, subject, message } = parsed.data;
  const websiteName = process.env.NEXT_PUBLIC_WEBSITE_NAME || "Portfolio";
  const from = process.env.EMAIL_USER;
  const to = process.env.CONTACT_TO || process.env.EMAIL_USER;

  try {
    await transporter.sendMail({
      from,
      to: email,
      subject: `Re: ${subject}`,
      html: EmailTemplate({ name, subject, message, websiteName }),
    });

    await transporter.sendMail({
      from,
      to,
      replyTo: email, // without this, replying to the notification replies to yourself
      subject: `New Contact Form Submission: ${subject}`,
      html: AdminNotificationTemplate({ senderEmail: email, subject, message, websiteName }),
    });

    return NextResponse.json({ success: true }, { status: 200 });
  } catch {
    return NextResponse.json({ error: "Failed to send email" }, { status: 500 });
  }
}
```

> The in-memory rate limiter resets on cold start, which is acceptable for a
> portfolio. If this moves to a persistent store later, replace `hits` only.

- [ ] **Step 6: Fix the role in `lib/resume.ts`**

Both occurrences — line 24 (the `Role:` field) and line 30 (the opening of `## Summary`).

```bash
sed -i 's/^Backend Developer$/Full Stack Developer/; s/^Backend Developer with practical/Full Stack Developer with practical/' lib/resume.ts
grep -n "Full Stack Developer" lib/resume.ts
```

Expected: two matching lines, and no remaining "Backend Developer".

- [ ] **Step 7: Document the new environment variable**

Create or append to `.env.example`:

```
EMAIL_USER=
EMAIL_PASS=
CONTACT_TO=principio.ap@gmail.com
NEXT_PUBLIC_WEBSITE_NAME=Portfolio
```

- [ ] **Step 8: Verify**

Run: `npm test && npm run build`
Expected: PASS, 39 tests; build succeeds.

Then with `npm run dev`, submit the form and confirm: a confirmation arrives at the submitted address, a notification arrives at `CONTACT_TO`, and hitting Reply on the notification addresses the **visitor**, not yourself.

- [ ] **Step 9: Commit**

```bash
git add app/api/contact lib/resume.ts .env.example
git commit -m "fix: add replyTo, CONTACT_TO, validation and rate limiting to contact API"
```

---

## Task 16: Accessibility, reduced motion and final verification

**Files:**
- Create: `components/shell/MobileNav.tsx`, `app/not-found.tsx` (rewrite)
- Modify: `components/shell/Sidebar.tsx`, `app/(dashboard)/layout.tsx`

- [ ] **Step 1: Create `components/shell/MobileNav.tsx`**

```tsx
"use client";
import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { NAV_ITEMS } from "./Sidebar";
import { cn } from "@/lib/utils";

export function MobileNav() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  return (
    <div className="lg:hidden">
      <button type="button" onClick={() => setOpen(!open)} aria-expanded={open} aria-label="Toggle navigation"
        className="fixed top-3 left-4 z-40 w-8 h-8 grid place-items-center rounded-lg bg-surface border border-line elev-sm text-ink">
        <span className="sr-only">Menu</span>
        <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
          {open ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
        </svg>
      </button>

      {open && (
        <nav aria-label="Main" className="fixed inset-0 z-30 bg-paper/97 backdrop-blur-xl grid place-items-center">
          <ul className="flex flex-col gap-4 text-center">
            {NAV_ITEMS.map((item) => {
              const active = item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);
              return (
                <li key={item.href}>
                  <Link href={item.href} onClick={() => setOpen(false)} aria-current={active ? "page" : undefined}
                    className={cn("font-display font-bold text-xl", active ? "text-amber" : "text-muted")}>
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      )}
    </div>
  );
}
```

- [ ] **Step 2: Hide the desktop sidebar on small screens and mount `MobileNav`**

In `Sidebar.tsx`, change the `<aside>` class to start with `hidden lg:flex` (replacing the bare `flex`). In `app/(dashboard)/layout.tsx`, import and render `<MobileNav />` inside the flex container above `<main>`.

- [ ] **Step 3: Rewrite `app/not-found.tsx`**

```tsx
import Link from "next/link";
import { CatSvg } from "@/components/cat/CatSvg";

export default function NotFound() {
  return (
    <div className="min-h-dvh grid place-items-center bg-paper px-6 text-center">
      <div>
        <div className="w-20 mx-auto"><CatSvg /></div>
        <h1 className="font-display font-extrabold text-2xl text-ink mt-4">Nothing here</h1>
        <p className="text-[11px] text-muted mt-2">That page doesn&apos;t exist.</p>
        <Link href="/" className="inline-block mt-5 h-9 px-5 leading-9 rounded-lg bg-ink text-paper font-display font-semibold text-[11px] elev-sm">
          Back to overview
        </Link>
      </div>
    </div>
  );
}
```

- [ ] **Step 4: Audit for leaked raw colours**

```bash
grep -rnE "#[0-9a-fA-F]{6}|cyan-|slate-|indigo-|zinc-|gray-" --include=*.tsx components app | grep -v "fill=\"#fff\"" || echo "clean"
```

Expected: `clean`, apart from the two intentional `#fff` eye highlights in `CatSvg.tsx`. Anything else is a Global Constraints violation — replace it with a token.

- [ ] **Step 5: Audit for emoji**

```bash
grep -rnP "[\x{1F300}-\x{1FAFF}\x{2600}-\x{27BF}]" --include=*.tsx components app || echo "clean"
```

Expected: `clean`.

- [ ] **Step 6: Verify reduced motion**

In Chrome DevTools → Rendering → "Emulate CSS prefers-reduced-motion: reduce", then reload and check every route.
Expected: the cat does not track, blink or idle; the screenshot does not pan on hover; the accordion opens instantly; no transition runs longer than a frame.

- [ ] **Step 7: Verify dark mode depth**

Toggle to dark and check each route.
Expected: cards separate from the background by **tint and a 1px top rim-light**, not shadow; amber reads as `#F0B454`; no element is invisible or washed out.

- [ ] **Step 8: Verify keyboard navigation**

Tab through every route.
Expected: a visible amber focus ring on every interactive element; sidebar links reachable in order; the accordion opens with Enter/Space; the credential modal closes with the close button.

- [ ] **Step 9: Run the full suite and a production build**

```bash
npm test && npm run lint && npm run build
```

Expected: 39 tests pass, lint clean, build succeeds.

- [ ] **Step 10: Commit**

```bash
git add -A
git commit -m "feat: add mobile nav, 404 page and accessibility pass"
```

---

## Verification checklist

Run before calling the redesign done.

- [ ] `npm test` — 39 tests pass
- [ ] `npm run lint` — clean
- [ ] `npm run build` — succeeds
- [ ] No raw hex or Tailwind palette colours in `components/` or `app/` (Task 16 Step 4)
- [ ] No emoji (Task 16 Step 5)
- [ ] Light mode: cards lift via warm shadow
- [ ] Dark mode: cards lift via tint + rim, never shadow
- [ ] All six routes reachable from the sidebar, each with `aria-current` when active
- [ ] `/work/<slug>` deep-links directly and renders
- [ ] PUP EduTrack shows "Coursework — private repository" and no Code/Live buttons
- [ ] No `Claude`, `Copilot`, `Antigravity`, `Gemini` or `HuggingFace` in any tech chip
- [ ] `lib/resume.ts` says "Full Stack Developer" in both places
- [ ] Contact form sends; Reply on the notification addresses the visitor
- [ ] Cat tracks the cursor on `/` and `/contact`; clicking the sidebar cat plays the name animation and lands with no pop
- [ ] `prefers-reduced-motion` disables all of it

---

## Deferred to the booking plan

`components/contact/BookingPlaceholder.tsx` is replaced by the real booking UI.
See `docs/superpowers/specs/2026-09-21-booking-system-design.md`; that plan
depends on the tokens (Task 2), `cn()` (Task 1) and the shell (Task 7)
established here.

## Open items carried from the spec

1. **Letter effect** (Task 6) — awaiting the user's reference. Current keyframes
   are in `app/globals.css` under "NAME EASTER EGG"; the timing budget is
   ~900 ms.
2. **Résumé PDF** — `site.links.resume` points at
   `/angelo-principio-resume.pdf`, which must be added to `public/`, or the
   download tile 404s.
3. **Featured project image** — `/performance-tracking.png` is referenced by the
   S.P. Madrid entry and does not yet exist in `public/`. Add it, or swap
   `image` to an existing asset before Task 10.
