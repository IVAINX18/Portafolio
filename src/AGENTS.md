# src/AGENTS.md — how to edit code inside src/

Project ops, repo structure and the component inventory live in root `AGENTS.md`; this file is the code contract for the src/ subtree.

## Overview

src/ is the whole app: entry (`main.jsx`, `App.jsx`), the flat section components, all content in `data/`, and the scroll/motion machinery in `hooks/` + `lib/`.

## Layout rules (where new code goes)

- Section component → flat file in `src/components/`, default export named like the file.
- Section-specific subview → `src/components/<section>/` (only `projects/` and `skills/` exist so far).
- Cross-section primitive → `src/components/ui/`.
- Content → `src/data/` (never hardcode copy in a section; `Publications.jsx` and `Contact.jsx` are the two sanctioned inline-constant exceptions).
- Scroll/motion helper → `src/hooks/` (observers) or `src/lib/` (imperative helpers).
- Styling → tokens/utilities in `src/index.css`, arbitrary Tailwind values in markup; do not add new top-level directories.

## Conventions

- App order is narrative: Navigation, Hero, Work, one Marquee band, Publications, About, Skills, Contact, plus a skip-link to `#main-content` (`src/App.jsx`).
- `#publications` is intentionally absent from `NAV_ITEMS` and the footer; section headings use separate `-title` ids (e.g. `work-title`) distinct from the scroll-target ids. Keep both stable (the full id list lives in root).
- `Publications.jsx` and `Contact.jsx` keep their small real-data constants in-file (`PUBLICATIONS_DATA`, `CONTACT_CHANNELS`, `FOOTER_LINKS`) plus their local subcomponents; Work, Skills and About render only from `src/data/`.
- Project contract: `treatment` is `text` or `plate` and drives ProjectEntry branching; `plate` needs real `image`/`imageAlt`/`caption`; `demo: null` omits the link (`demoLabel` defaults to "Live demo"). Skill levels are only `core | intermediate | familiar`; `categoryBreadth()` feeds radar shape, never visible text.
- Skills explorer contract: `TechnologyEcosystem` owns the selection state (L1 overview → L2 area → L3 tech; `Escape` and the reset button return to L1) and passes it to `TechnologyRadar`; selection happens only on click/tap/Enter/Space — hover just previews, so the unfold animation never retriggers — and the constellation may only link a technology to its own category (membership in `src/data/skills.js` is the only verifiable relation; never invent extra nodes or edges). The panel chips are real `<button>`s and are the non-SVG path to every technology — keep both paths in sync.
- Subcomponents colocate in their section file: Navigation holds Logo/DesktopMenu/MobileMenu/ScrollProgress; ProjectEntry holds ProjectLinks/ProjectMeta/ProjectIdentity/ProjectDetail; the skills explorer keeps its legend, panel and constellation pieces inside its two files.
- Scroll machinery: scrollspy is `IntersectionObserver` in `useActiveSection.js` (`rootMargin: '-40% 0px -55% 0px'`, `threshold: 0`) and carries an intentional `eslint-disable react-hooks/exhaustive-deps` — do not remove. `scrollToSection()` runs an rAF loop with offset 76, moves focus, `replaceState`s the hash, and parks `html{scroll-behavior:smooth}` to `auto` while running.
- Motion: use the `Motion` alias (see root "Lint gotcha"); the sole deviation is `ui/Reveal.jsx`, which uses lowercase `motion` in value position (`motion[as]`) — do not copy it. `Reveal` is the only reveal API.
- Icons: `@phosphor-icons/react` named imports, `weight="bold"`, size via className (`h-4 w-4`), `aria-hidden="true"` on decorative icons plus an explicit `aria-label` on the link.
- Shell and naming: `section#<id> scroll-mt-20 px-5 sm:px-8` with inner `mx-auto max-w-[1400px]`; `PascalCase.jsx` default export matches the filename, `useX.js` named hook exports, lowercase lib named exports, relative imports only (no aliases); Tailwind arbitrary values for sizes, `rounded-full` only on buttons and status dots.

## Anti-patterns (this subtree)

- Never render `TechBadge` (an `<li>`) outside a `<ul>`, and never move `MobileMenu` inside `<nav>` — nav's `backdrop-blur` creates a containing block that breaks the overlay's `position: fixed`.
- Never add a second reveal mechanism; `Reveal` is the only reveal API in the project.
- Never drop the `lockScrollBehavior` park or the focus/`replaceState` steps in `scrollToSection()` — they prevent the CSS/JS smooth-scroll fight and lost focus.
