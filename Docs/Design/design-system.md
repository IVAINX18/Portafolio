# Design System

Documented decisions for the portfolio's visual language. Update this file
whenever tokens, type roles, or interaction rules change.

## Identity (preserved)

- Base background `#020617` (darker), panels `#0f172a` (dark).
- Single accent: `#0EA5E9` (primary), used identically everywhere: links,
  CTAs, metrics, radar, focus rings. No secondary accent.
- Dark theme only (`<meta name="color-scheme" content="dark">`).

## Typography (three-role system)

| Role | Family | Usage |
| --- | --- | --- |
| Display | Space Grotesk (300-700) | h1-h6, logo, metric values |
| Body | Inter (100-900) | paragraphs and UI text |
| Data / code | JetBrains Mono (100-800) | labels, badges, metric captions, chips |

- Self-hosted variable fonts in `public/fonts/`, declared with `@font-face`
  in `src/index.css` (`font-display: swap`) and preloaded in `index.html`.
  No external font CDN.
- Headings render at `font-semibold`; hierarchy comes from the display face
  and spacing, not from decoration.

## Shape scale (locked)

- Panels and cards: `rounded-2xl` (16px).
- Buttons and small tiles: `rounded-lg` (8px).
- Chips, badges, pills: `rounded-full`.
- Avatar: circle.

## Motion policy

- Dials: `DESIGN_VARIANCE 7`, `MOTION_INTENSITY 5`, `VISUAL_DENSITY 4`.
- Every animation must be motivated (hierarchy, storytelling, feedback, or
  state transition). No infinite decorative loops.
- The motion system: entrance transitions, scroll reveals (`Reveal`),
  hover and active feedback, and the navbar scroll progress bar.
- `prefers-reduced-motion` collapses everything to static (global kill-switch
  in `src/index.css` plus `useReducedMotion` guards in components).
- No `window.addEventListener('scroll')`: use Motion's `useScroll` /
  `useMotionValueEvent` or `IntersectionObserver` (`useActiveSection`).

## Content rules

- No em-dashes in visible copy: headlines, body, buttons, aria-labels, meta.
- No section-level eyebrow labels (the `//` comment motif was retired to
  break the templated section rhythm).
- No gradient text except the hero name (single brand moment).
- Metrics and claims come from real repository data; never invented.
- Icons come from Phosphor (`@phosphor-icons/react`) with `weight="bold"`.
  Brand marks (GitHub, LinkedIn) are the canonical brand SVG paths.

## Structure

- Sections in order: Hero, Featured Projects, Other Projects, Publications,
  About, Contact.
- `src/data/projects.js` and `src/data/skills.js` are the single sources of
  truth; components render from data and adapt automatically.
