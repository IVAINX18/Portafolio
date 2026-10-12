import { categoryBreadth } from '../../data/skills';

/**
 * TechnologyRadar: hand-rolled SVG radar/spider chart (no chart library).
 *
 * Renders purely from `skillCategories` in src/data/skills.js. Adding,
 * removing or renaming categories requires zero changes here: axes, rings,
 * labels and hit-areas all derive from the array length and item levels.
 *
 * Values are CONCEPTUAL breadth indicators derived from tier mix
 * (core > intermediate > familiar), clamped to a moderate band. They are
 * never displayed as numbers or percentages; the shape only suggests
 * relative breadth per area.
 *
 * Structural hover contract: the hitbox (wide transparent spoke line +
 * constant-metrics label) NEVER changes size on hover. Only inner paint
 * (dot fill, halo opacity, label color, spoke opacity) and a transform-only
 * dot scale respond, so the pointer can never oscillate between hover states.
 *
 * Technical-figure treatment (my restyle notes): the chart reads as a
 * printed figure, not a chart-library widget. The data area is a low-density
 * 45-degree hatch (1px accent lines, 7px spacing) over a faint flat base
 * instead of a translucent glow, with a 2px accent outline. Axis labels are
 * micro-caps mono (11px, uppercase, 0.14em tracking) and each label anchors
 * to its axis through a short radial tick. The center is a precise 1px cross
 * in line color. The active axis gets a paint-only spoke highlight at 0.25
 * opacity; it reuses the existing isActive state and never moves geometry.
 */

const SIZE = 400;
const CENTER = SIZE / 2;
// Data radius: leaves room for perimeter labels inside the viewBox.
const RADIUS = 126;
// I pulled the labels slightly inward (140 -> 134) so the longest
// uppercase micro-caps labels stay inside the viewBox on both edges.
const LABEL_RADIUS = 134;
// Extra outward push for middle-anchored labels (the top one) so the text
// clears the axis end tick instead of striking through it.
const MIDDLE_LABEL_EXTRA = 8;
// Short radial hairline between the outer ring and each label.
const TICK_INNER = 128;
const TICK_OUTER = 134;
const RINGS = [0.25, 0.5, 0.75, 1];

function polar(angleDeg, radius) {
  const rad = ((angleDeg - 90) * Math.PI) / 180;
  return [
    CENTER + radius * Math.cos(rad),
    CENTER + radius * Math.sin(rad),
  ];
}

const pointsFor = (radius) => (count) =>
  Array.from({ length: count }, (_, i) => polar((360 / count) * i, radius));

const toPointsAttr = (pts) =>
  pts.map(([x, y]) => `${x.toFixed(1)},${y.toFixed(1)}`).join(' ');

const TechnologyRadar = ({ categories, activeId, onSelect }) => {
  const count = categories.length;
  const ringPoints = pointsFor(RADIUS);
  const dataPoints = categories.map((cat, i) => {
    const [x, y] = polar((360 / count) * i, RADIUS * categoryBreadth(cat));
    return { id: cat.id, x, y };
  });
  const dataAttr = dataPoints
    .map((p) => `${p.x.toFixed(1)},${p.y.toFixed(1)}`)
    .join(' ');

  return (
    <svg
      viewBox={`0 0 ${SIZE} ${SIZE}`}
      role="img"
      aria-label={`Radar chart of relative technology breadth across ${count} areas: ${categories
        .map((c) => c.label)
        .join(', ')}. Conceptual representation, not a measured score.`}
      className="w-full h-auto select-none"
    >
      <defs>
        {/* Print-like hatch for the data area: 45deg, 1px accent lines. */}
        <pattern
          id="radar-hatch"
          width="7"
          height="7"
          patternUnits="userSpaceOnUse"
          patternTransform="rotate(45)"
        >
          <line
            x1="0"
            y1="0"
            x2="0"
            y2="7"
            stroke="#38bdf8"
            strokeWidth="1"
            opacity="0.16"
          />
        </pattern>
      </defs>

      {/* Grid rings: hairlines, no dashes, no fills. The outer ring is
          slightly heavier; inner rings step down in opacity. */}
      {RINGS.map((fraction) => (
        <polygon
          key={fraction}
          points={toPointsAttr(
            Array.from({ length: count }, (_, i) =>
              polar((360 / count) * i, RADIUS * fraction)
            )
          )}
          fill="none"
          stroke="#262521"
          strokeWidth={fraction === 1 ? 1.5 : 1}
          opacity={fraction === 1 ? 1 : 0.6}
          aria-hidden="true"
        />
      ))}

      {/* Spokes */}
      {ringPoints(count).map(([x, y], i) => (
        <line
          key={categories[i].id}
          x1={CENTER}
          y1={CENTER}
          x2={x}
          y2={y}
          stroke="#262521"
          strokeWidth={1}
          aria-hidden="true"
        />
      ))}

      {/* Paint-only spoke highlight for the active axis. Opacity is the
          only thing that changes; geometry never moves on hover. */}
      {categories.map((cat, i) => {
        const angle = (360 / count) * i;
        const [x, y] = polar(angle, RADIUS);
        return (
          <line
            key={`spoke-${cat.id}`}
            x1={CENTER}
            y1={CENTER}
            x2={x}
            y2={y}
            stroke="#38bdf8"
            strokeWidth={1.5}
            opacity={cat.id === activeId ? 0.25 : 0}
            className="radar-spoke"
            aria-hidden="true"
          />
        );
      })}

      {/* Data area: faint flat base plus hatch texture, accent outline. */}
      <polygon points={dataAttr} fill="#38bdf8" opacity={0.05} aria-hidden="true" />
      <polygon points={dataAttr} fill="url(#radar-hatch)" aria-hidden="true" />
      <polygon
        points={dataAttr}
        fill="none"
        stroke="#38bdf8"
        strokeWidth={2}
        strokeLinejoin="round"
        className="radar-area"
        aria-hidden="true"
      />

      {/* Origin mark: a precise 1px cross in line color, 9px total. */}
      <g stroke="#262521" strokeWidth={1} aria-hidden="true">
        <line x1={CENTER - 4.5} y1={CENTER} x2={CENTER + 4.5} y2={CENTER} />
        <line x1={CENTER} y1={CENTER - 4.5} x2={CENTER} y2={CENTER + 4.5} />
      </g>

      {/* Axis end ticks: short radial hairlines anchoring each label. */}
      {categories.map((cat, i) => {
        const angle = (360 / count) * i;
        const [x1, y1] = polar(angle, TICK_INNER);
        const [x2, y2] = polar(angle, TICK_OUTER);
        return (
          <line
            key={`tick-${cat.id}`}
            x1={x1}
            y1={y1}
            x2={x2}
            y2={y2}
            stroke="#262521"
            strokeWidth={1}
            aria-hidden="true"
          />
        );
      })}

      {/* Interactive axes */}
      {categories.map((cat, i) => {
        const angle = (360 / count) * i;
        const point = dataPoints[i];
        const cos = Math.cos(((angle - 90) * Math.PI) / 180);
        const anchor =
          cos > 0.35 ? 'start' : cos < -0.35 ? 'end' : 'middle';
        const labelR =
          anchor === 'middle' ? LABEL_RADIUS + MIDDLE_LABEL_EXTRA : LABEL_RADIUS;
        const [lx, ly] = polar(angle, labelR);
        const isActive = cat.id === activeId;
        return (
          <g
            key={cat.id}
            tabIndex={0}
            role="button"
            aria-pressed={isActive}
            aria-label={`Show ${cat.label} technologies`}
            className="radar-axis"
            onMouseEnter={() => onSelect(cat.id)}
            onFocus={() => onSelect(cat.id)}
            onClick={() => onSelect(cat.id)}
            onKeyDown={(event) => {
              if (event.key === 'Enter' || event.key === ' ') {
                event.preventDefault();
                onSelect(cat.id);
              }
            }}
          >
            {/* Wide invisible hit-area for touch + mouse */}
            <line
              x1={CENTER}
              y1={CENTER}
              x2={polar(angle, RADIUS)[0]}
              y2={polar(angle, RADIUS)[1]}
              stroke="transparent"
              strokeWidth={28}
            />
            {/* Halo + dot: constant geometry, paint-only state change.
                The halo stays mounted and cross-fades via opacity. */}
            <circle
              cx={point.x}
              cy={point.y}
              r={10}
              fill="none"
              stroke="#38bdf8"
              strokeWidth={1.5}
              opacity={isActive ? 0.35 : 0}
              className="radar-halo"
              aria-hidden="true"
            />
            <circle
              cx={point.x}
              cy={point.y}
              r={4.5}
              fill={isActive ? '#38bdf8' : '#0c0c0b'}
              stroke="#38bdf8"
              strokeWidth={2}
              className="radar-dot"
              aria-hidden="true"
            />
            {/* Micro-caps label: uppercase, 11px mono, wide tracking.
                Metrics never change (constant size and weight) so the
                rendered text cannot resize the hover region; only paint
                (fill) responds. */}
            <text
              x={lx}
              y={ly}
              textAnchor={anchor}
              dominantBaseline="middle"
              fontSize={11}
              fontFamily="JetBrains Mono, monospace"
              fontWeight={500}
              letterSpacing={1.54}
              fill={isActive ? '#7dd3fc' : '#a6a299'}
              className="radar-label"
              aria-hidden="true"
            >
              {(cat.shortLabel || cat.label).toUpperCase()}
            </text>
          </g>
        );
      })}
    </svg>
  );
};

export default TechnologyRadar;
