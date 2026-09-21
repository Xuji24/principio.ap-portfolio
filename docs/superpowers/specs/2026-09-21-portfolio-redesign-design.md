# Portfolio Redesign — Design

**Date:** 2026-09-21
**Repo:** `Xuji24/principio.ap-portfolio`
**Status:** Approved, ready for implementation planning

---

## 1. Purpose

Rebuild the portfolio as a recruiter-facing dashboard. The current site is a
single scrolling page of seven visually identical sections, built on a cyan
palette that half the components bypass with hardcoded colours. The redesign
replaces the shell, the visual system and the information architecture.

**Primary audience:** recruiters and hiring managers.
**Success criteria:** a recruiter can determine role, credibility and how to
make contact without leaving the landing route; every colour responds to the
theme; no dead links.

**Positioning line:** "Full Stack Developer." This is now the single source of
truth and `lib/resume.ts` must be updated to match — it currently says "Backend
Developer", so the chatbot contradicts the headline.

---

## 2. Problems in the current build

These are the defects the redesign must resolve, not incidental cleanup.

| # | Problem | Evidence |
|---|---------|----------|
| 1 | Two parallel colour systems | `Hero.tsx`, `Expertise.tsx`, `Journey.tsx` hardcode `cyan-400`, `cyan-500`, `rgba(0,255,255,…)` alongside `--primary`. These do not respond to the theme, so **light mode is visibly broken** in those sections. |
| 2 | No visual rhythm | All seven sections use the same header formula (`font-black text-4xl md:text-6xl uppercase tracking-tighter` + `h-1 w-24 bg-primary` + a `// MONO COMMENT`) and the same `initial/whileInView` fade-up with `delay: index * 0.1`. |
| 3 | ~1,000 lines of dead code | `BackgroundCanvas`, `AboutPage`, `ContactPage`, `ProjectPage`, `ProjectCard`, `HeroSection`, `WhatIDo`, `TechStackIcon(s)`, `Card`, `sections/TechStack` — none imported anywhere. |
| 4 | Unused dependencies | `three`, `vanta`, `@types/three` are used only by the dead `BackgroundCanvas`. `lenis` and `react-icon-cloud` are imported nowhere at all. |
| 5 | Redundant Tailwind config | `tailwind.config.ts` declares a v3-style `colors` extend that `@theme inline` in `globals.css` already supersedes. |
| 6 | Contact API has no caller | `/api/contact` and the `utils/email/` templates are fully wired; the Contact section is a `mailto:` link. |
| 7 | Reply-to bug | The admin notification sends `from: EMAIL_USER` → `to: EMAIL_USER` with no `replyTo`. Hitting Reply replies to yourself. |
| 8 | Dead links | PUP EduTrack has `github: "#"` and `live: "#"` rendered as two working-looking buttons. |
| 9 | Professional work is invisible | The S.P. Madrid performance system exists only as prose inside `Journey.tsx`. It is not in the projects list, while personal work is featured. |
| 10 | Scroll trap | `Certifications.tsx` uses `max-h-[70vh]` with `scrollbar-hidden` — an inner scroll area with no visible scrollbar nested in a scrolling page. |

---

## 3. Visual system

### 3.1 Palette — "Ink & Amber"

The accent is the cat's eye colour. All values are tokens; **no component may
contain a raw hex or a Tailwind palette colour.**

```css
:root {                      /* light — "paper" */
  --paper:    #FAF9F7;       /* page background */
  --surface:  #FFFFFF;       /* cards */
  --ink:      #14110F;       /* text, the cat */
  --muted:    #6B645C;       /* secondary text */
  --amber:    #E8A33D;       /* accent, focus, active nav */
  --line:     #E8E4DE;       /* borders */
  --rose:     #C98F7C;       /* cat inner ear / nose only */
}

.dark {                      /* dark — "void" */
  --paper:    #0F0D0C;
  --surface:  #1A1715;
  --ink:      #EDE8E2;
  --muted:    #8B837B;
  --amber:    #F0B454;       /* brightened for contrast on warm black */
  --line:     #2E2925;
}
```

### 3.2 Depth — different strategy per theme

This is the core of the "2D with depth" direction. Drop shadows barely register
on a near-black background, so dark mode does not simply invert.

**Light:** soft warm shadows, three elevations.

```css
--sh-sm: 0 1px 2px rgba(20,17,15,.05), 0 2px 8px  rgba(20,17,15,.04);
--sh-md: 0 2px 4px rgba(20,17,15,.04), 0 8px 24px rgba(20,17,15,.07);
--sh-lg: 0 6px 14px rgba(20,17,15,.07), 0 22px 56px rgba(20,17,15,.13);
```

**Dark:** elevation is expressed as **surface tint plus a 1px rim-light** on the
top edge, reading as a light source above. Shadows are not used for elevation.

```
base   #0F0D0C  →  raised #1A1715  →  higher #211D1A
rim: linear-gradient(90deg, transparent, rgba(255,255,255,.14), transparent)
```

### 3.3 Typography

| Role | Family | Weights | Used for |
|---|---|---|---|
| Display | **Outfit** | 700 / 800 | Headings, stat numbers, nav items, card titles |
| Body | **Inter** | 400 / 500 / 600 | Paragraphs, form inputs, descriptions |
| Data | **JetBrains Mono** | 400 / 500 | Dates, tech chips, labels, timezone, counts |

Retires Montserrat and Fira Code. Headings are **sentence case**, normal
tracking — no `uppercase`, no `tracking-tighter`. Fira Code is a code-ligature
font and was being used for UI labels, which is not its purpose.

### 3.4 Iconography

Stroked SVG (lucide) inheriting `currentColor`. **No emoji** — full-colour OS
glyphs cannot theme, render differently per platform, and read as generic.

### 3.5 Motion

Every animated element writes **one consistent transform chain**
(`translateY → rotate → scale`) at every keyframe. Mixing function lists between
states (e.g. `scale(...)` → `rotate(...)`) cannot be interpolated by the browser
and snaps — this was a real bug found during design.

| Token | Curve | Use |
|---|---|---|
| `--ease-out` | `cubic-bezier(.22,.9,.32,1)` | Entrances, expansions |
| `--ease-back` | `cubic-bezier(.34,1.38,.52,1)` | Settles that should overshoot |
| `--ease-soft` | `cubic-bezier(.25,.9,.28,1)` | Landings that must **not** overshoot |
| `--ease-in` | `cubic-bezier(.55,0,.85,.45)` | Exits, descents |

All motion respects `prefers-reduced-motion: reduce` — transforms collapse to
opacity-only, the cat stops tracking and idling, the marquee does not run.

---

## 4. Shell

Persistent across all routes; does not re-render on navigation.

```
┌──────────────┬────────────────────────────────────────┐
│ 🐈 Angelo    │                    [◐]  [↓ Résumé]     │
│    Principio │   breadcrumb                           │
│  FULL STACK  │   Route title                          │
│              │                                        │
│ ▸ Overview   │   ┌──────────┐ ┌──────────┐            │
│ ▸ Work       │   │  content │ │  content │            │
│ ▸ Experience │   └──────────┘ └──────────┘            │
│ ▸ Skills     │                                        │
│ ▸ Credentials│                          ( ● 1,204 )   │
│ ▸ Contact    │                           floating     │
└──────────────┴────────────────────────────────────────┘
```

- **Sidebar:** cat + name lockup at top, then nav. Active item gets an amber
  tint background and an amber dot.
- **Top right:** theme toggle and Résumé download. Not in the sidebar.
- **View counter:** floats free, bottom right. Not docked under the cat.
- **Mobile:** sidebar collapses to a slide-over; the cat rides along.

**Collision note:** `PortfolioChatbot` currently launches bottom-right, where
the counter now floats. One must move — recommendation is the counter goes
bottom-left, since the chatbot launcher is the more conventional bottom-right
element.

---

## 5. The cat

One component, one rig, **three poses**. Not three implementations.

**Rendering:** inline SVG (~3 KB), themeable, no image request. Big glossy eyes
— cream sclera, amber iris, large round pupil, twin white highlights — with a
deliberately large head-to-body ratio, which is what reads as "cute".

**Shared behaviour (all poses):**
- Pupils track the cursor globally, eased on a per-frame lerp (**not** set
  directly on `mousemove`, which snaps and is what made the first version feel
  wrong). Reach falloff: small drift when the cursor is near, full swing far.
- Head rotation lags the eyes slightly — that lag is most of the difference
  between "puppet" and "alive".
- Idle blink every ~3.5 s (randomised), occasional ear twitch.

| Pose | Location | Interaction |
|---|---|---|
| **Sitting** | Sidebar, beside the name | Click → stands and plays with the name |
| **Standing** | Same element, animated pose swap | The easter egg below |
| **Sitting (small)** | `/contact` Book-a-call header, 46 px | Click → raises a paw and waves |

### 5.1 The name easter egg

Click-only. **Never autoplays** — it must not interrupt someone reading.

1. Crouch (anticipation, squash)
2. Rise onto hind legs — sit/stand bodies are **two paths crossfaded at the
   bottom of the crouch**, where the silhouette is most compressed, so the swap
   is invisible. Head lifts 40 ms behind the body for follow-through.
3. One swipe at the name: **the "A" does a smooth 360° spin** — exactly 90° per
   quarter keyframe for constant angular velocity, landing on 360 with no
   overshoot. 200 ms later the remaining letters hop in a 30 ms stagger with
   springy overshoot, so the spin visibly propagates outward.
4. **No outro.** The final keyframe *is* the resting pose at
   `translateY(0) rotate(0) scale(1,1)`. Head and body both land soft, with no
   back-overshoot on the head. The cat does not transition into the sitting
   graphic — it stops on it.

> **Open item:** the letter effect is to be replaced with a reference the user
> will supply. The sequence above is the current agreed behaviour and the
> timing budget is ~900 ms (swipe connects at 860 ms; the cat begins sitting at
> 1.8 s). Revisit before implementing §5.1 step 3.

**Deliberately excluded:** the cat reacting to hovered project cards. It would
compete for attention with the content a recruiter came to read.

---

## 6. Routes

Real routed views, not anchors. Each is deep-linkable.

| Route | Replaces | Contents |
|---|---|---|
| `/` **Overview** | `Hero` | Positioning line, cat, stat tiles, featured work, latest credential, résumé download |
| `/work` **Work** | `Projects` | Segmented All / Professional / Personal |
| `/work/[slug]` | — | Project detail |
| `/experience` | `Journey` | Accordion timeline: internship + education |
| `/skills` | `Expertise` + `TechStack` | Four capability cards + grouped stack |
| `/credentials` | `Certifications` | Certificate grid, filterable, modal viewer |
| `/contact` | `Contact` | Form + booking + link tiles |

**Overview carries the recruiter.** Routed views cost the single-scroll skim, so
`/` must repay it: someone can decide about Angelo without clicking once, and
click in only for depth.

### 6.1 `/work`

- Segmented control, not separate routes — one place to look, distinction still
  explicit.
- **Featured card:** the S.P. Madrid performance system, wide, badged
  "Professional".
- **Hover:** card lifts, and a **tall screenshot pans vertically** so one card
  shows a whole page rather than a header crop. This reveals more work; it is
  not decoration. *(Keep.)*
- **Click:** card morphs into the detail view via the View Transitions API,
  navigating to a real `/work/[slug]` URL. App-like feel *and* a link a
  recruiter can forward. *(Keep — it is navigation.)*
- **Filter reflow:** FLIP animation on segment change. *(Cut. Polish on polish;
  first thing to drop.)*

### 6.2 `/experience`

Accordion timeline. Entries **shrink and expand** on both triggers:

- **Scroll:** the entry nearest 42% of the viewport opens; others collapse.
- **Click:** takes over and holds for 1.4 s, then scroll resumes control.
- One entry is always open — the page cannot collapse to blank.

Collapsed entries sit *back*: `scale(.975)`, `--sh-sm`, 55% opacity. The open
one sits forward: `scale(1)`, `--sh-lg`, full opacity. The amber rail fills down
to the active entry.

**Height animates `grid-template-rows: 0fr → 1fr`, not `max-height`.** The
`max-height` approach requires guessing a value: guess high and the easing runs
against a number the content never reaches so deceleration is wrong; guess low
and long entries clip. Entries here vary from three to five bullets.

> With two entries the scroll trigger has little room to demonstrate itself. It
> is built for a list that outgrows the screen and will earn its keep as roles
> are added.

### 6.3 `/skills`

Four capability cards (Frontend, Backend, Data, Testing) over a grouped stack
list (Languages / Frameworks / Data / Tooling).

**Retires the `LogoLoop` marquee from this route.** A scrolling rail makes
someone checking "do they know Postgres?" wait for it to come around. Grouped
static chips answer instantly. The component stays in the repo and may be used
as Overview decoration.

### 6.4 `/credentials`

Flat grid grouped by issuer, filterable, click opens the existing modal viewer.
No inner scroll container — on its own route it lays out flat.

### 6.5 `/contact`

Two options side by side, **form wider than booking** (`1.42fr` / `0.78fr`) so
the calendar reads as secondary:

- **Left — form:** Name, Email, Subject (with preset chips), Message.
- **Right — Book a call:** see the booking system spec. Ships as a
  "coming soon" state so `/contact` is not blocked on Google OAuth.
- **Below — four link tiles:** Résumé (dark, highest intent), Email, LinkedIn,
  GitHub.

No "Available for work" badge — the page demonstrates availability by having a
calendar on it.

---

## 7. Content changes

These are content decisions, agreed during design, not incidental edits.

1. **Promote the S.P. Madrid system to a featured project.** It is the only
   professional build and currently appears nowhere in the projects list. This
   is the largest credibility gain available.
2. **Descriptions become outcome-led** — "automated an internal workflow that
   previously ran on spreadsheets", not "a comprehensive platform integrating
   AI and robust data management".
3. **Remove AI tooling from skills and tech chips** — `Claude AI`,
   `GitHub Copilot`, `Antigravity`, `Gemini`, `HuggingFace`, and the
   "Testing & AI" capability framing. Listing an assistant as a skill reads as
   padding beside real engineering. **AI certifications are kept** — those are
   earned credentials and a different thing.
4. **PUP EduTrack loses its dead links**, replaced with a
   "Coursework — private repository" note.
5. **`lib/resume.ts` role updated** to "Full Stack Developer" to match the
   headline.
6. **Experience duties become outcomes**, and education is added as a second
   timeline anchor.

---

## 8. Technical work

### 8.1 Deletions

Remove: `BackgroundCanvas.tsx`, `pages/about/AboutPage.tsx`,
`pages/contact/ContactPage.tsx`, `pages/projects/ProjectPage.tsx`,
`ProjectCard.tsx`, `sections/HeroSection.tsx`, `sections/WhatIDo.tsx`,
`sections/TechStack.tsx`, `TechStackIcon.tsx`, `TechStackIcons.tsx`,
`ui/Card.tsx`, `types/vanta.d.ts`.

Uninstall: `three`, `@types/three`, `vanta`, `react-icon-cloud`, `lenis`. All
five are confirmed to have zero imports across `app/`, `components/`, `lib/`
and `utils/`.

### 8.2 Configuration

- Delete the redundant `colors` extend from `tailwind.config.ts`; `@theme
  inline` in `globals.css` is the single source.
- Create `lib/utils.ts` exporting `cn()`. `components.json` already aliases
  `@/lib/utils` but the file does not exist.
- Add `clsx` and `tailwind-merge` (shadcn is configured — `new-york`, lucide —
  but no components are installed).

### 8.3 Contact API fixes

```
CONTACT_TO=principio.ap@gmail.com
```

- `to:` → `process.env.CONTACT_TO ?? process.env.EMAIL_USER`
- `replyTo:` → the visitor's address, so Reply works
- `from:` stays `EMAIL_USER` — Gmail rejects unauthenticated sender addresses
- Accept `name` in the payload; keep the email-derived fallback only when absent
  (currently `principioangelo24@gmail.com` yields a greeting of
  "PRINCIPIOANGELO24")

**Abuse hardening**, required before launch: the endpoint currently emails
*any* submitted address with no rate limit or verification, which can be used to
send branded mail to strangers and get the account flagged.

- Per-IP rate limit
- Hidden honeypot field
- Message length cap

---

## 9. Accessibility and performance

- Amber `#E8A33D` on `#FFFFFF` is **not** AA for body text. It is permitted for
  large display text, borders, dots, icons and fills — never small body copy.
  Small text uses `--ink` or `--muted`.
- Visible focus rings on every interactive element, using the amber ring token.
- The accordion is keyboard operable; the calendar keeps react-day-picker's
  arrow-key navigation.
- Sidebar nav is a real `<nav>` with an `aria-current` active item.
- The cat is decorative: `aria-hidden` on the art, with the click target
  labelled for the easter egg.
- All motion honours `prefers-reduced-motion`.
- Calendar dependencies are lazy-loaded so they cost only on `/contact`.

---

## 10. Out of scope

- The booking system — see `2026-09-21-booking-system-design.md`.
- Chatbot behaviour changes beyond the `resume.ts` role fix.
- Supabase view-counting changes; the existing `page_view_count` RPC is reused.

## 11. Open items

1. **Letter effect** for the name easter egg — awaiting the user's reference
   (§5.1). Everything else in the cat is settled.
2. **Bottom-right collision** between the chatbot launcher and the view counter
   (§4) — recommend moving the counter bottom-left.
