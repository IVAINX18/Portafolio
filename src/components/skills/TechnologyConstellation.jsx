import { SKILL_LEVELS } from '../../data/skills';

/**
 * TechnologyConstellation: mapa estelar dibujado a mano, sin librerias.
 *
 * Sustituye al antiguo radar Araña a peticion explicita: aquel grafico
 * radial ponia las etiquetas laterales (p. ej. DEVOPS) encima de nodos y
 * aristas, y su animacion moria tras la entrada. Aqui no queda geometria
 * radial: ni rejilla, ni poligono de anchura, ni ejes, ni centro. Siete
 * constelaciones en un campo 2D libre, una por area, con posiciones fijas
 * que elegi a mano como una lamina de atlas (margenes amplios entre
 * cumulos para que nada colisione con ningun texto a ningun ancho).
 *
 * Todo sale de `skillCategories` en src/data/skills.js: anado o quito
 * tecnologias sin tocar este archivo. Lo unico que ato a mano es la
 * posicion de cada cumulo (CLUSTER_LAYOUT, por id de area): si un dia hay
 * mas areas, las que no conozco caen a una fila inferior generica.
 *
 * La unica relacion dibujada es la pertenencia verificable (tecnologia ->
 * su categoria) como una cadenita serpenteante dentro del cumulo. Jamas
 * dibujo una arista entre dos areas distintas ni invento nodos.
 *
 * Tamano y pintura de cada estrella copian la semantica de las fichas de
 * TechnologyEcosystem una a una (core = grande + acento, intermedia =
 * media + hueso tenue, familiar = pequena + hueso apagado) para que las
 * dos representaciones no puedan contradecirse.
 *
 * Animacion ambiente constante, solo CSS y solo transform/opacity:
 * parpadeo por estrella, deriva por cumulo y un anillo suave desde la
 * estrella mas brillante. Todo desincronizado con delays negativos para
 * que nunca parezca un loop maestro. Los transforms infinitos viven en
 * <g> exteriores y los cambios de estado (atenuar, halo, escala) en
 * elementos interiores, asi nunca pelean por la misma propiedad.
 *
 * Contrato de interaccion (identico al anterior): la seleccion solo cambia
 * con click/tap/Enter/Espacio o Escape; hover y foco solo pintan y
 * previsualizan el readout, nunca mueven estado. En L1 las 7 etiquetas de
 * area son botones y las estrellas son decorativas; en L2 solo las
 * estrellas del area elegida se vuelven controles, el resto sigue
 * decorativo (aria-hidden, sin eventos de puntero).
 */

const WIDTH = 1000;
const HEIGHT = 620;
// Etiqueta del cumulo: micro-caps mono legible a tamano de panel (~15px
// con el SVG a ancho completo del panel de figura, ~780px en 1440).
const LABEL_FONT_SIZE = 19;
// Distancia vertical entre la fila extrema del cumulo y la base de su
// etiqueta: deja sitio al halo (14.5) y al anillo de pulso (21) con holgura.
const LABEL_GAP = 56;
// Area de impacto invisible por estrella: 18 unidades rinden ~28px de
// diametro con el panel a ~780px de ancho. Geometria constante, nunca se
// redimensiona con hover.
const STAR_HIT_RADIUS = 18;

// Pintura por nivel: copio CHIP_STYLES de TechnologyEcosystem en valores
// SVG (relleno/trazo/radio son presentacion, pero el significado manda).
const STAR_STYLE = {
  core: { r: 7.5, fill: '#38bdf8', stroke: '#38bdf8' },
  intermediate: { r: 5.5, fill: '#0c0c0b', stroke: '#a6a299' },
  familiar: { r: 4, fill: '#6e6a62', stroke: '#6e6a62' },
};

// Anclas elegidas a mano sobre el campo 1000x620, cumulo por id de area.
// Reparto las siete por el campo completo (x 88-878) en dos bandas y una
// fila, con calles de 100px+ para que estrellas, aristas, etiquetas y
// pulsos respiren; el paso (dx 54, dy 56) va medido con los halos grandes.
const CLUSTER_LAYOUT = {
  languages: { x: 185, y: 175, cols: 4, dx: 54, dy: 56 },
  frontend: { x: 470, y: 165, cols: 3, dx: 54, dy: 56 },
  backend: { x: 790, y: 170, cols: 3, dx: 54, dy: 56 },
  'ai-ml': { x: 185, y: 400, cols: 3, dx: 54, dy: 56 },
  databases: { x: 485, y: 395, cols: 2, dx: 64, dy: 56 },
  cybersecurity: { x: 790, y: 400, cols: 4, dx: 54, dy: 56 },
  tools: { x: 475, y: 545, cols: 7, dx: 60, dy: 56 },
};

// Motas de fondo: polvo de carta estelar, estatico y decorativo. Las
// coloque en las calles entre cumulos, lejos de cualquier estrella.
const SPECKS = [
  [330, 100], [630, 105], [60, 295], [335, 290], [620, 290], [940, 300],
  [60, 480], [200, 545], [720, 565], [940, 520],
];

// Rejilla compacta centrada en el ancla: 4x2, 3+2, parejas o fila unica
// segun el cumulo. Posiciones deterministicas, sin azar.
function clusterPositions(items, layout) {
  const { x: cx, y: cy, cols, dx, dy } = layout;
  const rows = Math.ceil(items.length / cols);
  return items.map((item, i) => {
    const row = Math.floor(i / cols);
    const inRow = Math.min(cols, items.length - row * cols);
    const col = i % cols;
    return {
      item,
      index: i,
      x: cx + (col - (inRow - 1) / 2) * dx,
      y: cy + (row - (rows - 1) / 2) * dy,
    };
  });
}

// Orden serpenteante (fila par de izquierda a derecha, impar al reves)
// para que la cadenita de pertenencia una vecinos cercanos sin diagonales
// largas entre filas.
function serpentineOrder(positions, cols) {
  const rows = new Map();
  positions.forEach((p) => {
    const r = Math.floor(p.index / cols);
    if (!rows.has(r)) rows.set(r, []);
    rows.get(r).push(p);
  });
  return [...rows.keys()]
    .sort((a, b) => a - b)
    .flatMap((r, ri) => (ri % 2 ? rows.get(r).reverse() : rows.get(r)));
}

// Parpadeo desincronizado por estrella: duracion 3.6-5.4s y delay negativo
// derivados del indice, asi cada estrella arranca a mitad de su ciclo.
const twinkleStyle = (clusterIndex, starIndex) => ({
  animationDuration: `${(3.6 + ((starIndex * 13 + clusterIndex * 7) % 19) / 10).toFixed(2)}s`,
  animationDelay: `-${((starIndex * 1.37 + clusterIndex * 2.1) % 5.4).toFixed(2)}s`,
});

const TechnologyConstellation = ({
  categories,
  selectedAreaId,
  selectedTechName,
  onSelectArea,
  onSelectTech,
  onPreviewTech,
}) => {
  const hasSelection = categories.some((cat) => cat.id === selectedAreaId);

  const activateWithKeyboard = (event, select) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      select();
    }
  };

  return (
    <svg
      viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
      role="group"
      aria-label={`Star map of the toolkit: ${categories.length} areas, each a constellation of its technologies. Star size and brightness mark depth of use, conceptual, not a score.`}
      className={`w-full h-auto select-none${hasSelection ? ' sky-has-selection' : ''}`}
    >
      {/* Polvo de fondo: estatico, decorativo, fuera de toda interaccion. */}
      <g aria-hidden="true">
        {SPECKS.map(([x, y], i) => (
          <circle key={i} cx={x} cy={y} r={1.1} fill="#6e6a62" opacity={0.5} />
        ))}
      </g>

      {categories.map((cat, ci) => {
        const layout = CLUSTER_LAYOUT[cat.id] ?? {
          x: 150 + (ci % 4) * 220,
          y: 560,
          cols: 3,
          dx: 40,
          dy: 42,
        };
        const positions = clusterPositions(cat.items, layout);
        const rows = Math.ceil(cat.items.length / layout.cols);
        // Etiqueta SIEMPRE encima del cumulo con el margen anti-colision:
        // ningun anillo ni halo la alcanza.
        const labelX = layout.x;
        const labelY = layout.y - ((rows - 1) / 2) * layout.dy - LABEL_GAP;
        const isActive = cat.id === selectedAreaId;
        const isDim = hasSelection && !isActive;
        const ordered = serpentineOrder(positions, layout.cols);
        const edges = ordered
          .slice(1)
          .map((p, i) => ({ from: ordered[i], to: p }));
        // El pulso nace de la estrella mas brillante: el primer core, o la
        // primera tecnologia si el cumulo no tiene core.
        const brightest =
          positions.find((p) => p.item.level === 'core') ?? positions[0];

        return (
          <g
            key={cat.id}
            className={`sky-cluster${isActive ? ' is-active' : ''}${isDim ? ' is-dim' : ''}`}
          >
            {/* Deriva ambiente del cumulo: va en este <g> y la atenuacion de
                estado en el exterior, para no mezclar keyframes y estado. */}
            <g
              className="sky-drift"
              style={{
                animationDuration: `${(9 + ((ci * 1.7) % 5)).toFixed(2)}s`,
                animationDelay: `${(-ci * 1.9).toFixed(2)}s`,
                '--sky-dx': ci % 2 ? '-3px' : '3px',
                '--sky-dy': ci % 3 === 0 ? '2px' : '-2px',
              }}
            >
              {/* Anillo de pulso: nace y muere en cada ciclo, opacidad tope
                  contenida. Decalado ~0.5s entre cumulos. */}
              {brightest && (
                <circle
                  aria-hidden="true"
                  cx={brightest.x}
                  cy={brightest.y}
                  r={14}
                  className="sky-pulse"
                  style={{
                    animationDuration: `${(4 + ((ci * 0.53) % 1.5)).toFixed(2)}s`,
                    animationDelay: `${(ci * 0.5).toFixed(2)}s`,
                  }}
                />
              )}

              {/* Aristas de pertenencia: solo dentro del cumulo, jamas entre
                  areas. Las incidentes a la estrella elegida se encienden. */}
              {edges.map(({ from, to }) => {
                const incident =
                  from.item.name === selectedTechName ||
                  to.item.name === selectedTechName;
                return (
                  <line
                    key={`edge-${from.item.name}-${to.item.name}`}
                    x1={from.x}
                    y1={from.y}
                    x2={to.x}
                    y2={to.y}
                    stroke={incident && isActive ? '#38bdf8' : '#262521'}
                    strokeWidth={1}
                    opacity={incident && isActive ? 0.7 : 1}
                    className="sky-edge"
                    aria-hidden="true"
                  />
                );
              })}

              {/* Estrellas: solo las del area elegida son controles; el resto
                  es decoracion sin puntero ni teclado. */}
              {positions.map(({ item, x, y, index }) => {
                const style = STAR_STYLE[item.level] ?? STAR_STYLE.familiar;
                const isSelected =
                  isActive && item.name === selectedTechName;
                const tierLabel =
                  SKILL_LEVELS[item.level]?.label ??
                  SKILL_LEVELS.familiar.label;
                const interactive = isActive;
                return (
                  <g
                    key={item.name}
                    role={interactive ? 'button' : undefined}
                    tabIndex={interactive ? 0 : undefined}
                    aria-hidden={interactive ? undefined : true}
                    aria-pressed={interactive ? isSelected : undefined}
                    aria-label={
                      interactive
                        ? `${item.name}, ${tierLabel} level in ${cat.label}. Select for details.`
                        : undefined
                    }
                    className={`sky-star${isSelected ? ' is-selected' : ''}${interactive ? '' : ' is-decorative'}`}
                    onClick={
                      interactive ? () => onSelectTech(item.name) : undefined
                    }
                    onKeyDown={
                      interactive
                        ? (event) =>
                            activateWithKeyboard(event, () =>
                              onSelectTech(item.name)
                            )
                        : undefined
                    }
                    onMouseEnter={
                      interactive ? () => onPreviewTech(item.name) : undefined
                    }
                    onMouseLeave={
                      interactive ? () => onPreviewTech(null) : undefined
                    }
                    onFocus={
                      interactive ? () => onPreviewTech(item.name) : undefined
                    }
                    onBlur={
                      interactive ? () => onPreviewTech(null) : undefined
                    }
                  >
                    {/* Impacto invisible de geometria constante. */}
                    <circle cx={x} cy={y} r={STAR_HIT_RADIUS} fill="transparent" />
                    {/* El parpadeo posee la opacidad de este envoltorio; el
                        halo y el punto solo cambian pintura y escala en sus
                        propios elementos. */}
                    <g className="sky-twinkle" style={twinkleStyle(ci, index)}>
                      <circle
                        cx={x}
                        cy={y}
                        r={style.r + 7}
                        className="sky-halo"
                        aria-hidden="true"
                      />
                      <circle
                        cx={x}
                        cy={y}
                        r={style.r}
                        fill={style.fill}
                        stroke={style.stroke}
                        strokeWidth={1.5}
                        className="sky-dot"
                        aria-hidden="true"
                      />
                    </g>
                  </g>
                );
              })}

              {/* Etiqueta del cumulo: boton real, geometria constante. */}
              <g
                role="button"
                tabIndex={0}
                aria-pressed={isActive}
                aria-label={`Explore ${cat.label}, ${cat.items.length} technologies`}
                className="sky-area"
                onClick={() => onSelectArea(cat.id)}
                onKeyDown={(event) =>
                  activateWithKeyboard(event, () => onSelectArea(cat.id))
                }
              >
                <rect
                  x={labelX - 100}
                  y={labelY - 26}
                  width={200}
                  height={40}
                  fill="transparent"
                />
                <text
                  x={labelX}
                  y={labelY}
                  textAnchor="middle"
                  dominantBaseline="middle"
                  fontSize={LABEL_FONT_SIZE}
                  fontFamily="JetBrains Mono, monospace"
                  fontWeight={500}
                  letterSpacing={2}
                  className="sky-label"
                  fill={isActive ? '#7dd3fc' : '#a6a299'}
                  aria-hidden="true"
                >
                  {(cat.shortLabel || cat.label).toUpperCase()}
                </text>
              </g>
            </g>
          </g>
        );
      })}
    </svg>
  );
};

export default TechnologyConstellation;
