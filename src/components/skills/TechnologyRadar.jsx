import { categoryBreadth } from '../../data/skills';

/**
 * TechnologyRadar — hand-rolled SVG radar/spider chart (no chart library).
 *
 * Renders purely from `skillCategories` in src/data/skills.js. Adding,
 * removing or renaming categories requires zero changes here: axes, rings,
 * labels and hit-areas all derive from the array length and item levels.
 *
 * Values are CONCEPTUAL breadth indicators derived from tier mix
 * (core > intermediate > familiar), clamped to a moderate band. They are
 * never displayed as numbers or percentages — the shape only suggests
 * relative breadth per area.
 */

const SIZE = 400;
const CENTER = SIZE / 2;
// Data radius: leaves room for perimeter labels inside the viewBox.
const RADIUS = 126;
const LABEL_RADIUS = 140;
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

  return (
    <svg
      viewBox={`0 0 ${SIZE} ${SIZE}`}
      role="img"
      aria-label={`Radar chart of relative technology breadth across ${count} areas: ${categories
        .map((c) => c.label)
        .join(', ')}. Conceptual representation, not a measured score.`}
      className="w-full h-auto select-none"
    >
      {/* Grid rings */}
      {RINGS.map((fraction) => (
        <polygon
          key={fraction}
          points={toPointsAttr(
            Array.from({ length: count }, (_, i) =>
              polar((360 / count) * i, RADIUS * fraction)
            )
          )}
          fill="none"
          stroke="#1e293b"
          strokeWidth={fraction === 1 ? 1.5 : 1}
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
          stroke="#1e293b"
          strokeWidth={1}
          aria-hidden="true"
        />
      ))}

      {/* Data area */}
      <polygon
        points={dataPoints.map((p) => `${p.x.toFixed(1)},${p.y.toFixed(1)}`).join(' ')}
        fill="rgba(14, 165, 233, 0.14)"
        stroke="#0EA5E9"
        strokeWidth={2}
        strokeLinejoin="round"
        className="radar-area"
        aria-hidden="true"
      />
      <circle cx={CENTER} cy={CENTER} r={2.5} fill="#0EA5E9" opacity={0.5} aria-hidden="true" />

      {/* Interactive axes */}
      {categories.map((cat, i) => {
        const angle = (360 / count) * i;
        const point = dataPoints[i];
        const [lx, ly] = polar(angle, LABEL_RADIUS);
        const cos = Math.cos(((angle - 90) * Math.PI) / 180);
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
            {isActive && (
              <circle
                cx={point.x}
                cy={point.y}
                r={10}
                fill="none"
                stroke="#0EA5E9"
                strokeOpacity={0.35}
                strokeWidth={1.5}
                aria-hidden="true"
              />
            )}
            <circle
              cx={point.x}
              cy={point.y}
              r={isActive ? 5.5 : 4}
              fill={isActive ? '#0EA5E9' : '#020617'}
              stroke="#0EA5E9"
              strokeWidth={2}
              className="radar-dot"
              aria-hidden="true"
            />
            <text
              x={lx}
              y={ly}
              textAnchor={
                cos > 0.35 ? 'start' : cos < -0.35 ? 'end' : 'middle'
              }
              dominantBaseline="middle"
              fontSize={12.5}
              fontFamily="JetBrains Mono, monospace"
              fontWeight={isActive ? 700 : 500}
              fill={isActive ? '#0EA5E9' : '#94a3b8'}
              className="radar-label"
              aria-hidden="true"
            >
              {cat.shortLabel || cat.label}
            </text>
          </g>
        );
      })}
    </svg>
  );
};

export default TechnologyRadar;
