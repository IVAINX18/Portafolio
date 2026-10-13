import { memo, useMemo } from 'react';
import { SKILL_LEVELS, categoryBreadth } from '../../data/skills';

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
 * constant-metrics label) NEVER changes size on hover or selection. Only
 * inner paint (dot fill, halo opacity, label color/opacity, spoke opacity)
 * and transform-only dot scale respond, so the pointer can never oscillate
 * between hover states. Selection happens ONLY via click/tap/Enter/Space;
 * hover and keyboard focus are paint-only emphasis and never move state.
 *
 * Technical-figure treatment (my restyle notes): the chart reads as a
 * printed figure, not a chart-library widget. The data area is a low-density
 * 45-degree hatch (1px accent lines, 7px spacing) over a faint flat base
 * instead of a translucent glow, with a 2px accent outline. Axis labels are
 * micro-caps mono (11px, uppercase, 0.14em tracking) and each label anchors
 * to its axis through a short radial tick. The center is a precise 1px cross
 * in line color. The selected axis gets a paint-only spoke highlight at 0.25
 * opacity; it reuses the existing selection state and never moves geometry.
 *
 * Constellation layer ("radar + constellations"): when an area is selected,
 * its technologies unfold OUTSIDE that area's axis label as one compact arc
 * of unlabeled nodes inside the axis' own angular sector. The only relation
 * shown is verifiable data membership (technology -> its category); I never
 * invent cross-technology edges. Node SIZE and STROKE/COLOR mirror the chip
 * semantics in TechnologyEcosystem exactly (core = largest + accent,
 * intermediate = mid + bone-dim, familiar = smallest + bone-faint), so the
 * two representations cannot disagree. Only the selected area renders nodes;
 * every other area dims but stays visible for orientation.
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
// Junction sits just beyond the perimeter labels; the node arc sits beyond
// the junction. Both radii keep an 8-node arc plus the largest node inside
// the 400x400 viewBox on every axis (max reach ~174 of 200 available).
const JUNCTION_RADIUS = 150;
const NODE_RADIUS = 168;
// El arco se ensancha con el numero de nodos en vez de ser fijo: apunto a
// ~16px de separacion entre centros (para que los circulos nunca se toquen,
// ni siquiera los core de 11px de diametro), con un minimo de 8 grados para
// arcos de 2-3 nodos y un tope de 20 grados. El sector de 7 areas mide ~51
// grados, asi que siempre quedan 30+ grados de holgura con los ejes vecinos.
const NODE_SPACING = 16;
const MIN_HALF_SPREAD_DEG = 8;
const MAX_HALF_SPREAD_DEG = 20;
const halfSpreadDeg = (count) =>
  count <= 1
    ? 0
    : Math.min(
        MAX_HALF_SPREAD_DEG,
        Math.max(
          MIN_HALF_SPREAD_DEG,
          ((NODE_SPACING * (count - 1)) / (2 * NODE_RADIUS)) * (180 / Math.PI)
        )
      );
// Invisible pointer target per node; keeps effective targets >= 24px.
const NODE_HIT_RADIUS = 13;

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

// Node paint mirrors CHIP_STYLES in TechnologyEcosystem one to one: I keep
// this table here (instead of importing) because fill/stroke/radius are SVG
// presentation values, not class names, but the tier meaning must match.
const NODE_STYLE = {
  core: { r: 5.5, fill: '#38bdf8', stroke: '#38bdf8' },
  intermediate: { r: 4, fill: '#0c0c0b', stroke: '#a6a299' },
  familiar: { r: 3, fill: '#6e6a62', stroke: '#6e6a62' },
};

/**
 * Static figure layer: rings, spokes, data polygon, origin cross, ticks.
 * I memoize it so selection/hover changes re-render only paint above this
 * layer instead of rebuilding the whole figure geometry every time.
 */
const RadarStaticLayer = memo(function RadarStaticLayer({
  categories,
  dataAttr,
}) {
  const count = categories.length;
  return (
    <g aria-hidden="true">
      {/* Grid rings: hairlines, no dashes, no fills. The outer ring is
          slightly heavier; inner rings step down in opacity. Rings print
          first in the entrance sequence (stagger handled by delay). */}
      {RINGS.map((fraction, i) => (
        <polygon
          key={fraction}
          points={toPointsAttr(
            Array.from({ length: count }, (_, j) =>
              polar((360 / count) * j, RADIUS * fraction)
            )
          )}
          fill="none"
          stroke="#262521"
          strokeWidth={fraction === 1 ? 1.5 : 1}
          opacity={fraction === 1 ? 1 : 0.6}
          className="radar-enter-structure"
          style={{ animationDelay: `${i * 40}ms` }}
        />
      ))}

      {/* Spokes */}
      {pointsFor(RADIUS)(count).map(([x, y], i) => (
        <line
          key={categories[i].id}
          x1={CENTER}
          y1={CENTER}
          x2={x}
          y2={y}
          stroke="#262521"
          strokeWidth={1}
          className="radar-enter-structure"
          style={{ animationDelay: '80ms' }}
        />
      ))}

      {/* Data area: faint flat base plus hatch texture, accent outline.
          Prints after the grid (opacity + slight scale, never scale(0)). */}
      <polygon points={dataAttr} fill="#38bdf8" opacity={0.05} />
      <polygon points={dataAttr} fill="url(#radar-hatch)" />
      <polygon
        points={dataAttr}
        fill="none"
        stroke="#38bdf8"
        strokeWidth={2}
        strokeLinejoin="round"
        className="radar-enter-data"
      />

      {/* Origin mark: a precise 1px cross in line color, 9px total. */}
      <g stroke="#262521" strokeWidth={1}>
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
          />
        );
      })}
    </g>
  );
});

/**
 * Constellation for exactly one area: junction dot beyond the label, thin
 * 1px membership edges, one node per technology along a single arc. Mounts
 * only for the selected area and unmounts on reset, so the DOM never holds
 * 40 always-on nodes.
 */
function AreaConstellation({
  category,
  axisAngle,
  selectedTechName,
  onSelectTech,
  onPreviewTech,
}) {
  const layout = useMemo(() => {
    const items = category.items;
    const n = items.length;
    const [jx, jy] = polar(axisAngle, JUNCTION_RADIUS);
    const nodes = items.map((item, i) => {
      const t = n === 1 ? 0 : i / (n - 1) - 0.5;
      const [x, y] = polar(
        axisAngle + t * halfSpreadDeg(n) * 2,
        NODE_RADIUS
      );
      return { item, x, y };
    });
    return { jx, jy, nodes };
  }, [category, axisAngle]);

  return (
    <g aria-hidden="false">
      {/* Membership edges: junction to each node, one shared fade. */}
      {layout.nodes.map(({ item, x, y }) => {
        const isSelected = item.name === selectedTechName;
        return (
          <line
            key={`edge-${item.name}`}
            x1={layout.jx}
            y1={layout.jy}
            x2={x}
            y2={y}
            stroke={isSelected ? '#38bdf8' : '#262521'}
            strokeWidth={1}
            opacity={isSelected ? 0.7 : 1}
            className="const-edge const-edge-line"
          />
        );
      })}
      {/* Junction: the single point every edge visibly belongs to. */}
      <circle
        cx={layout.jx}
        cy={layout.jy}
        r={2}
        fill="#a6a299"
        className="const-junction"
      />
      {/* Nodes: unlabeled circles; tier lives in size + paint. Each node is
          a real keyboard- and touch-operable control with an oversized
          invisible hit area; hover/focus only paints (halo + scale) and
          previews the readout, it never moves selection state. */}
      {layout.nodes.map(({ item, x, y }, i) => {
        const style = NODE_STYLE[item.level] || NODE_STYLE.familiar;
        const isSelected = item.name === selectedTechName;
        const tierLabel =
          SKILL_LEVELS[item.level]?.label || SKILL_LEVELS.familiar.label;
        return (
          <g
            key={item.name}
            role="button"
            tabIndex={0}
            aria-pressed={isSelected}
            aria-label={`${item.name}, ${tierLabel} level in ${category.label}. Select for details.`}
            className={`const-node-g${isSelected ? ' is-selected' : ''}`}
            style={{ animationDelay: `${i * 30}ms` }}
            onClick={() => onSelectTech(item.name)}
            onKeyDown={(event) => {
              if (event.key === 'Enter' || event.key === ' ') {
                event.preventDefault();
                onSelectTech(item.name);
              }
            }}
            onMouseEnter={() => onPreviewTech(item.name)}
            onMouseLeave={() => onPreviewTech(null)}
            onFocus={() => onPreviewTech(item.name)}
            onBlur={() => onPreviewTech(null)}
          >
            {/* Wide invisible hit-area: the visible dot stays small while
                the effective target stays >= 24px. Constant geometry. */}
            <circle cx={x} cy={y} r={NODE_HIT_RADIUS} fill="transparent" />
            {/* Halo: mounted always, paint-only. Hover/focus/selection only
                change its opacity; geometry never moves. */}
            <circle
              cx={x}
              cy={y}
              r={style.r + 5}
              fill="none"
              stroke="#38bdf8"
              strokeWidth={1.5}
              className="const-halo"
            />
            <circle
              cx={x}
              cy={y}
              r={style.r}
              fill={style.fill}
              stroke={style.stroke}
              strokeWidth={1.5}
              className="const-node"
            />
          </g>
        );
      })}
    </g>
  );
}

const TechnologyRadar = ({
  categories,
  selectedAreaId,
  selectedTechName,
  onSelectArea,
  onSelectTech,
  onPreviewTech,
}) => {
  const count = categories.length;
  const dataPoints = categories.map((cat, i) => {
    const [x, y] = polar((360 / count) * i, RADIUS * categoryBreadth(cat));
    return { id: cat.id, x, y };
  });
  const dataAttr = dataPoints
    .map((p) => `${p.x.toFixed(1)},${p.y.toFixed(1)}`)
    .join(' ');
  const selectedIndex = categories.findIndex(
    (cat) => cat.id === selectedAreaId
  );
  const hasSelection = selectedIndex !== -1;

  return (
    <svg
      viewBox={`0 0 ${SIZE} ${SIZE}`}
      role="img"
      aria-label={`Radar chart of relative technology breadth across ${count} areas: ${categories
        .map((c) => c.label)
        .join(', ')}. Conceptual representation, not a measured score.`}
      className={`w-full h-auto select-none${
        hasSelection ? ' radar-has-selection' : ''
      }`}
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

      <RadarStaticLayer categories={categories} dataAttr={dataAttr} />

      {/* Paint-only spoke highlight for the selected axis. Opacity is the
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
            opacity={cat.id === selectedAreaId ? 0.25 : 0}
            className="radar-spoke"
            aria-hidden="true"
          />
        );
      })}

      {/* Interactive axes: hubs that select an area. Anchors (hubs + labels)
          enter last in the mount choreography with a ~20ms stagger. */}
      {categories.map((cat, i) => {
        const angle = (360 / count) * i;
        const point = dataPoints[i];
        const cos = Math.cos(((angle - 90) * Math.PI) / 180);
        const anchor =
          cos > 0.35 ? 'start' : cos < -0.35 ? 'end' : 'middle';
        const labelR =
          anchor === 'middle' ? LABEL_RADIUS + MIDDLE_LABEL_EXTRA : LABEL_RADIUS;
        const [lx, ly] = polar(angle, labelR);
        const isSelected = cat.id === selectedAreaId;
        return (
          <g
            key={cat.id}
            tabIndex={0}
            role="button"
            aria-pressed={isSelected}
            aria-label={`Explore ${cat.label}, ${cat.items.length} technologies`}
            className={`radar-axis radar-enter-anchor${
              hasSelection ? (isSelected ? ' is-selected' : ' is-dim') : ''
            }`}
            style={{ animationDelay: `${340 + i * 20}ms` }}
            onClick={() => onSelectArea(cat.id)}
            onKeyDown={(event) => {
              if (event.key === 'Enter' || event.key === ' ') {
                event.preventDefault();
                onSelectArea(cat.id);
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
              opacity={isSelected ? 0.35 : 0}
              className="radar-halo"
              aria-hidden="true"
            />
            <circle
              cx={point.x}
              cy={point.y}
              r={4.5}
              fill={isSelected ? '#38bdf8' : '#0c0c0b'}
              stroke="#38bdf8"
              strokeWidth={2}
              className="radar-dot"
              aria-hidden="true"
            />
            {/* Micro-caps label: uppercase, 11px mono, wide tracking.
                Metrics never change (constant size and weight) so the
                rendered text cannot resize the hover region; only paint
                (fill/opacity) responds. */}
            <text
              x={lx}
              y={ly}
              textAnchor={anchor}
              dominantBaseline="middle"
              fontSize={11}
              fontFamily="JetBrains Mono, monospace"
              fontWeight={500}
              letterSpacing={1.54}
              fill={isSelected ? '#7dd3fc' : '#a6a299'}
              className="radar-label"
              aria-hidden="true"
            >
              {(cat.shortLabel || cat.label).toUpperCase()}
            </text>
          </g>
        );
      })}

      {/* Constellation: only the selected area unfolds; remounts per area
          (key) so the staggered entrance replays on every area change. */}
      {hasSelection && (
        <AreaConstellation
          key={categories[selectedIndex].id}
          category={categories[selectedIndex]}
          axisAngle={(360 / count) * selectedIndex}
          selectedTechName={selectedTechName}
          onSelectTech={onSelectTech}
          onPreviewTech={onPreviewTech}
        />
      )}
    </svg>
  );
};

export default TechnologyRadar;
