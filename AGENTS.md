# AGENTS.md

**Generated:** 2026-10-12 · **Commit:** 493ebc5 · **Branch:** main

Portfolio of Ivan Velasco: React 19 + Vite 7 + Tailwind 3.4 + Framer Motion, plain JSX (no TypeScript, no test suite). The README is stale where it says React 18 and `cd portfolio-app` — trust `package.json`.

## Project structure

```
Portafolio/
├── src/
│   ├── main.jsx      # createRoot + StrictMode → App
│   ├── App.jsx       # composition root: Navigation + sections in narrative order + skip-link + the one Marquee
│   ├── index.css     # design tokens, @font-face, utilities, reduced-motion kill-switch
│   ├── components/   # one section per file (Hero, Work, Publications, About, Skills, Contact) + Navigation
│   │   ├── projects/ # Work-only subviews: FlagshipProject, ProjectEntry
│   │   ├── skills/   # Skills-only subviews: TechnologyEcosystem, TechnologyRadar
│   │   └── ui/       # shared primitives: Reveal, SectionHeading, Marquee, TechBadge
│   ├── data/         # projects.js, skills.js — content for Work, Skills and About
│   ├── hooks/        # useActiveSection.js (IntersectionObserver scrollspy)
│   ├── lib/          # scroll.js (rAF scrollToSection)
│   └── assets/       # react.svg (Vite default, unused)
├── public/           # _redirects (SPA fallback), fonts/ (3 woff2), FotoPerfil.png
├── Docs/Design/      # design-system.md, redesign-editorial.md
└── dist/             # committed build output (see "The build output is committed")
```

## Where to look

| Task | Location | Notes |
|------|----------|-------|
| Add or edit content | `src/data/projects.js`, `src/data/skills.js` | append data objects; Work, Skills and About render from these arrays only (Publications and Contact keep small inline constants) |
| Page composition and section order | `src/App.jsx` | narrative order, skip-link, the single `Marquee` |
| Nav links and scrollspy | `src/components/Navigation.jsx`, `src/hooks/useActiveSection.js` | `NAV_ITEMS` drives the nav, `SECTION_IDS` the active id |
| Smooth scrolling | `src/lib/scroll.js` | rAF easing, header offset, reduced-motion aware |
| Shared UI primitives | `src/components/ui/` | `Reveal` is the only reveal API, `Marquee` is a singleton, `TechBadge` renders an `<li>` |
| Project cards | `src/components/projects/` | `FlagshipProject` (featured) and `ProjectEntry` (ledger row, `treatment: 'text' \| 'plate'`) |
| Skills visuals | `src/components/skills/` | `TechnologyEcosystem` (cards + radar) and `TechnologyRadar` (figure) |
| Visual rules | `Docs/Design/design-system.md` | read before any UI change |

## Code map

| Symbol | Type | Location | Role |
|--------|------|----------|------|
| `App` | component | `src/App.jsx` | renders every section in order, plus skip-link and the one `Marquee` |
| `Navigation` | component | `src/components/Navigation.jsx` | sticky nav, scroll progress, mobile menu, scrollspy wiring |
| `Hero`, `Work`, `Publications`, `About`, `Skills`, `Contact` | section | `src/components/*.jsx` | one page section each; ids `home`, `projects`, `publications`, `about` (nested `certificates`), `skills`, `contact` |
| `FlagshipProject`, `ProjectEntry` | component | `src/components/projects/` | featured card and ledger row for `Work` |
| `TechnologyEcosystem`, `TechnologyRadar` | component | `src/components/skills/` | radar plus area cards for `Skills` |
| `Reveal`, `SectionHeading`, `Marquee`, `TechBadge` | component | `src/components/ui/` | cross-section primitives |
| `useActiveSection` | hook | `src/hooks/useActiveSection.js` | IntersectionObserver scrollspy |
| `scrollToSection` | function | `src/lib/scroll.js` | rAF smooth scroll with header offset |
| `featuredProjects`, `notableProjects` | data | `src/data/projects.js` | content source for `Work` |
| `skillCategories`, `SKILL_LEVELS`, `softSkills`, `certifications` | data | `src/data/skills.js` | content source for `Skills` and the `About` certifications list |

Centrality (reference counts) is not measured: no active LSP server for JS/JSX and codegraph queries timed out.

## Commands

- `npm run dev` — Vite dev server
- `npm run lint` — ESLint flat config (`eslint .`); `dist` is ignored
- `npm run build` — production build into `dist/`
- `npm run preview` — serve the built `dist/` locally

No tests, no CI. Verification before reporting work done = `npm run lint` + `npm run build` (both exit 0) + a browser pass against `npm run preview`.

## The build output is committed

`dist/` is tracked in git on purpose (it ships its own `_redirects` SPA fallback and static assets). After any change to `src/`, `public/`, `index.html`, or configs, run `npm run build` and include the whole regenerated `dist/` in the same commit. Vite cleans `outDir`, so old hashed assets in `dist/assets/` appear as deletions — commit those too.

## Lint gotcha: alias the motion import

`no-unused-vars` is configured with `varsIgnorePattern: '^[A-Z_]'`, and core ESLint does not count `<motion.div>` JSX usage as a use. The project convention is `import { motion as Motion } from 'framer-motion'` and render `<Motion.div>`; an un-aliased import trips the linter.

## Content and data

- All project/skill content lives in `src/data/projects.js` and `src/data/skills.js`; components render from those arrays only. Add projects by appending data objects — the `treatment` ('plate' | 'text') and `image`/`imageAlt`/`caption` fields drive layout, so no component edits are needed.
- Never invent clients, metrics, testimonials, awards, or results. Every UI claim must be traceable to the real repos/demos. Capture plates were retired (real screenshots of the live apps clashed with the ink/bone palette); if one is reintroduced it must still be a real capture.
- Visible copy rules: no em-dashes, no decorative section numbers ("01/02"), no gradient text.
- Comments: first person (Spanish or English), no emojis; explain WHY for non-obvious logic (see `src/lib/scroll.js`, `src/data/projects.js`).

## Design system (read before UI changes)

- `Docs/Design/design-system.md` — tokens, type roles, shape rule, motion policy. `Docs/Design/redesign-editorial.md` — rationale of the last full redesign. The current look is "ink/bone editorial"; the old navy/sky tokens are gone, do not reintroduce them.
- Fonts are self-hosted in `public/fonts/` (Anton display, Inter body, JetBrains Mono). Never load external font CDNs.
- Icons: `@phosphor-icons/react` only.
- Section ids are load-bearing for nav + scrollspy: `#home`, `#projects`, `#publications`, `#about` (nested `#certificates`), `#skills`, `#contact` — see `Navigation.jsx` (NAV_ITEMS drive the nav) and `src/hooks/useActiveSection.js`. Keep them stable when renaming sections.
- Motion: honor `prefers-reduced-motion` (global kill-switch in `src/index.css` + `useReducedMotion` guards); never use `window.addEventListener('scroll')` — use Motion's `useScroll` or IntersectionObserver. One marquee band per page; square corners everywhere except pill buttons.

## Deployment

- Production is Vercel (`portafolioivanvelasco.vercel.app`, Vite auto-detected, no `vercel.json`). Auto-deploys have been unreliable — a push can land on GitHub with no corresponding Vercel build (known Git-integration issue).
- `ivainx18.github.io/Portafolio` serves the raw `main` source, not a build — ignore it for verification.
- `public/_redirects` is a Netlify-style SPA fallback (`/* → /index.html 200`) for static hosts.

## Workflow notes

- `.omo/` and `.env` are gitignored. Per the user's standing workflow, `Docs/Tasks/` must also stay uncommitted — add it to `.gitignore` if you create it.
- Never commit or push unless explicitly asked; the user drives a dedicated `/commit` flow.
