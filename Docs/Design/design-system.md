# Design System

Documented decisions for the portfolio's visual language. Update this file
whenever tokens, type roles, or interaction rules change.

## Identity: ink and bone

- Base canvas `#0c0c0b` (ink), elevated plates `#141412` (ink-2).
- Text `#edeae3` (bone), secondary `#a6a299` (bone-dim), tertiary `#6e6a62` (bone-faint).
- Single accent `#38bdf8` (accent), soft variant `#7dd3fc` (accent-soft):
  links, active states, marks and focus rings. Used sparingly.
- Hairlines `#262521` (line): the structure comes from 1px rules, not from
  cards or shadows.
- The palette is dark because the art direction is dark (black canvas with
  large light type, following the reference), not because the topic is tech.

## Typography (three roles)

| Role | Family | Usage |
| --- | --- | --- |
| Display | Anton (400) | Hero name, section titles, metric values, contact index |
| Body | Inter (100-900) | Paragraphs and UI text |
| Mono | JetBrains Mono (100-800) | Labels, annotations, captions, data, nav links |

- All three are self-hosted in `public/fonts/`, declared with `@font-face`
  in `src/index.css` and preloaded in `index.html`. No external font CDN.
- Anton (SIL OFL) substitutes the reference site's Tusker Grotesk, which is
  a commercial font and cannot be used here.
- Hierarchy comes from size: Anton ships a single weight on purpose, like a
  print poster.

## Shape system (one documented exception)

- Everything is square (radius 0): plates, panels, chips, tiles, images.
- Pills (`rounded-full`) are reserved for interactive controls: buttons and
  small status dots. This is the only allowed exception.

## Display scale

Display sizes use `clamp()` so the poster scales with the viewport:
hero name `clamp(3.6rem, 22vw, 12.5rem)`, section titles
`clamp(2.4rem, 7vw, 5.5rem)`, contact title `clamp(3rem, 11vw, 9rem)`.

## Motion policy

- Dials: `DESIGN_VARIANCE 9`, `MOTION_INTENSITY 6`, `VISUAL_DENSITY 3`.
- Motivated motion only: masked line reveals (hero), scroll reveals
  (`Reveal`), underlined links that draw on hover/focus, one marquee band
  acting as section divider, the staged radar entrance plus its per-area
  constellation unfold on selection, sliding nav indicator, and the
  animated mobile menu.
- The marquee band is capped at one per page.
- `prefers-reduced-motion` collapses everything to static via the global CSS
  kill-switch plus `useReducedMotion` guards in components.
- No `window.addEventListener('scroll')`: Motion's `useScroll` /
  `useMotionValueEvent` and `IntersectionObserver` (`useActiveSection`).
- `motion` is imported as `Motion` (alias): it keeps the JSX member usage
  readable and makes the project lint clean (`no-unused-vars`).

## Content rules

- No em-dashes in visible copy. No decorative eyebrows or section numbers.
  No gradient text. The hand-drawn underline in the hero is the single
  decorative mark, drawn as a simple SVG stroke.
- No live-app screenshots: the capture plates were retired because their
  palettes (bright green, violet) fought the ink/bone system. If a capture
  ever returns, it must be toned to the palette, with a caption describing
  exactly what it shows.
- Metrics and claims come from the real repositories; nothing is invented.
- Icons: Phosphor only. Brand marks use the canonical brand paths.

## Structure

- Sections: Hero, Work (flagship dossier + secondary entries), Marquee band,
  Research, About, Toolkit (radar with per-area constellation), Contact +
  footer.
- `src/data/projects.js` and `src/data/skills.js` are the single sources of
  truth. The `treatment` ('plate' or 'text') and `image` fields in the
  project data encode the visual composition, so components stay data-driven.
