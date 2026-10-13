import { useEffect, useState } from 'react';
import { ArrowLeft, SquaresFour } from '@phosphor-icons/react';
import Reveal from '../ui/Reveal';
import TechnologyConstellation from './TechnologyConstellation';
import {
  SKILL_LEVELS,
  skillCategories,
} from '../../data/skills';

// La misma escala de color significa lo mismo en todo el bloque: el acento
// marca lo que uso a diario y el hueso se apaga conforme baja la profundidad
// de uso. Es identica en el mapa estelar, las estrellas, las fichas
// y la leyenda.
const CHIP_STYLES = {
  core: {
    chip: 'border-accent/50 bg-accent/10 text-bone',
    dot: 'bg-accent',
  },
  intermediate: {
    chip: 'border-line bg-ink-2 text-bone-dim',
    dot: 'bg-bone-dim',
  },
  familiar: {
    chip: 'border-line text-bone-faint',
    dot: 'bg-bone-faint',
  },
};

// Totales derivados del dataset para la intro del nivel 1; los calculo una
// sola vez fuera del componente porque src/data/skills.js es estatico.
const TOTAL_AREAS = skillCategories.length;
const TOTAL_TECHNOLOGIES = skillCategories.reduce(
  (sum, cat) => sum + cat.items.length,
  0
);

const tierCount = (category, level) =>
  category.items.filter((item) => item.level === level).length;

const TierLegend = () => (
  <ul
    aria-label="Skill level legend"
    className="flex flex-wrap gap-x-6 gap-y-2"
  >
    {Object.entries(SKILL_LEVELS).map(([key, level]) => (
      <li
        key={key}
        className="inline-flex items-center gap-2 font-mono text-[11px] tracking-[0.06em] text-bone-faint"
      >
        <span
          aria-hidden="true"
          className={`h-2 w-2 shrink-0 rounded-full ${
            CHIP_STYLES[key]?.dot ?? 'bg-bone-faint'
          }`}
        />
        <span className="uppercase text-bone-dim">{level.label}</span>
        <span>{level.description}</span>
      </li>
    ))}
  </ul>
);

/**
 * Maquina de estados del bloque (L1 -> L2 -> L3):
 * - L1 overview: sin area seleccionada; intro compacta + pista + areas + leyenda.
 * - L2 area: la constelacion se despliega; el panel muestra el detalle del area
 *   con fichas que son botones reales hacia L3.
 * - L3 tecnologia: el nodo queda marcado, los hermanos siguen visibles como
 *   contexto; el panel muestra el detalle de la tecnologia con vuelta atras.
 * La seleccion solo cambia con click/tap/Enter/Espacio o Escape (reset).
 * El hover/foco son solo pintura y vista previa, nunca mueven el estado.
 */
const TechnologyEcosystem = () => {
  const [selectedAreaId, setSelectedAreaId] = useState(null);
  const [selectedTechName, setSelectedTechName] = useState(null);
  const [previewTechName, setPreviewTechName] = useState(null);

  const activeCategory =
    skillCategories.find((cat) => cat.id === selectedAreaId) ?? null;
  const selectedItem =
    activeCategory?.items.find((item) => item.name === selectedTechName) ??
    null;
  // Vista previa del readout al pasar o enfocar un nodo: solo pinta texto,
  // solo existe en L2 (en L3 el detalle ya ocupa el panel y no lo tapo).
  const previewItem =
    !selectedItem && previewTechName
      ? activeCategory?.items.find((item) => item.name === previewTechName) ??
        null
      : null;

  const selectArea = (id) => {
    setSelectedAreaId(id);
    setSelectedTechName(null);
    setPreviewTechName(null);
  };

  const resetAll = () => {
    setSelectedAreaId(null);
    setSelectedTechName(null);
    setPreviewTechName(null);
  };

  // Escape vuelve a L1 desde cualquier nivel; es keydown (no scroll), asi que
  // no choca con la prohibicion de listeners de scroll del proyecto.
  useEffect(() => {
    const onKeyDown = (event) => {
      if (event.key === 'Escape') resetAll();
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, []);

  const readout = selectedItem
    ? `${selectedItem.name} · ${SKILL_LEVELS[selectedItem.level]?.label}`
    : previewItem
      ? `${previewItem.name} · ${SKILL_LEVELS[previewItem.level]?.label}`
      : activeCategory
        ? `${activeCategory.label} · ${activeCategory.items.length} technologies`
          : 'Select an area to see its stars.';

  return (
    <div>
      <div className="grid items-stretch gap-5 md:gap-6 lg:grid-cols-5">
        {/* Star map: figura tecnica con lectura de estado y pie de panel */}
        <Reveal className="lg:col-span-3">
          <div className="flex h-full flex-col border border-line bg-ink-2/40 p-4 sm:p-6">
            <figure className="flex min-h-0 flex-1 flex-col">
              <div className="flex flex-1 items-center justify-center">
                <div className="w-full">
                  <TechnologyConstellation
                    categories={skillCategories}
                    selectedAreaId={selectedAreaId}
                    selectedTechName={selectedTechName}
                    onSelectArea={selectArea}
                    onSelectTech={setSelectedTechName}
                    onPreviewTech={setPreviewTechName}
                  />
                </div>
              </div>
              {/* Lectura de estado: espejo visual del panel. Es aria-hidden
                  porque la region viva del panel ya anuncia lo mismo y no
                  quiero doble anuncio en lectores de pantalla. */}
              <p
                aria-hidden="true"
                className="mt-4 min-h-[1.25rem] font-mono text-[11px] uppercase tracking-[0.14em] text-bone-dim"
              >
                {readout}
              </p>
              <figcaption className="mt-2 border-t border-line pt-4 font-mono text-[11px] uppercase leading-relaxed tracking-[0.14em] text-bone-faint">
                Star size and brightness mark depth of use, conceptual, not a score
              </figcaption>
            </figure>
          </div>
        </Reveal>

        {/* Detalle + navegacion */}
        <Reveal delay={0.1} className="lg:col-span-2">
          <div className="flex h-full flex-col gap-6 border border-line bg-ink-2/40 p-5 sm:p-6">
            <DetailPanel
              activeCategory={activeCategory}
              selectedItem={selectedItem}
              onSelectTech={setSelectedTechName}
              onBackToArea={() => setSelectedTechName(null)}
              onReset={resetAll}
            />

            <div>
              <h4 className="mb-3 font-mono text-[11px] uppercase tracking-[0.18em] text-bone-faint">
                Browse areas
              </h4>
              <ul className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
                {skillCategories.map((cat) => {
                  const isActive = cat.id === selectedAreaId;
                  return (
                    <li key={cat.id}>
                      <button
                        type="button"
                        aria-pressed={isActive}
                        aria-label={`Explore ${cat.label}, ${cat.items.length} technologies`}
                        onClick={() => selectArea(cat.id)}
                        className={`flex w-full items-center justify-between gap-2 border px-3.5 py-3 text-left text-sm font-medium transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-ink ${
                          isActive
                            ? 'border-accent/60 bg-accent/10 text-bone'
                            : 'border-line text-bone-dim hover:border-bone-faint hover:text-bone'
                        }`}
                      >
                        <span>{cat.label}</span>
                        <span className="shrink-0 font-mono text-xs text-bone-faint">
                          {cat.items.length}
                        </span>
                      </button>
                    </li>
                  );
                })}
              </ul>
            </div>

            <div className="mt-auto border-t border-line pt-4">
              <TierLegend />
            </div>
          </div>
        </Reveal>
      </div>

      {/* Equivalente textual completo para tecnologia de asistencia */}
      <ul className="sr-only" aria-label="Complete technology list by area">
        {skillCategories.map((cat) => (
          <li key={cat.id}>
            {cat.label}:{' '}
            {cat.items
              .map(
                (item) => `${item.name} (${SKILL_LEVELS[item.level]?.label})`
              )
              .join(', ')}
          </li>
        ))}
      </ul>
    </div>
  );
};

/**
 * Panel de detalle con altura minima FIJA: cambiar de nivel no debe
 * redimensionar el panel porque el reflujo bajo el cursor puede reactivar
 * interacciones y oscilar. El contenido cambia y la geometria no se mueve.
 */
const DetailPanel = ({
  activeCategory,
  selectedItem,
  onSelectTech,
  onBackToArea,
  onReset,
}) => (
  <div
    aria-live="polite"
    aria-label="Toolkit details"
    className="min-h-[15rem]"
  >
    {!activeCategory && (
      <div>
        <p className="mb-2 font-mono text-[11px] uppercase tracking-[0.18em] text-bone-dim">
          {TOTAL_AREAS} areas · {TOTAL_TECHNOLOGIES} technologies
        </p>
        <p className="text-sm leading-relaxed text-bone-dim">
          Each area is a constellation. Select one to bring it forward.
        </p>
      </div>
    )}

    {activeCategory && !selectedItem && (
      <div>
        <div className="mb-1.5 flex items-baseline justify-between gap-3">
          <h4 className="font-sans text-lg font-semibold text-bone">
            {activeCategory.label}
          </h4>
          <p className="shrink-0 font-mono text-xs text-bone-faint">
            {activeCategory.items.length} tech
          </p>
        </div>
        <p className="mb-4 font-mono text-xs text-bone-faint">
          {['core', 'intermediate', 'familiar']
            .map(
              (level) =>
                `${tierCount(activeCategory, level)} ${SKILL_LEVELS[level].label}`
            )
            .join(', ')}
        </p>
        <ul
          aria-label={`${activeCategory.label} technologies`}
          className="mb-5 flex flex-wrap gap-2"
        >
          {activeCategory.items.map((skill) => {
            const style = CHIP_STYLES[skill.level] || CHIP_STYLES.familiar;
            return (
              <li key={skill.name}>
                <button
                  type="button"
                  title={`${skill.name} (${SKILL_LEVELS[skill.level]?.label})`}
                  onClick={() => onSelectTech(skill.name)}
                  className={`inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-[13px] font-medium transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-ink hover:border-bone-faint hover:text-bone ${style.chip}`}
                >
                  <span
                    aria-hidden="true"
                    className={`h-1.5 w-1.5 shrink-0 rounded-full ${style.dot}`}
                  />
                  {skill.name}
                  <span className="sr-only">
                    ({SKILL_LEVELS[skill.level]?.label})
                  </span>
                </button>
              </li>
            );
          })}
        </ul>
        <ResetButton label="All areas" onClick={onReset} />
      </div>
    )}

    {activeCategory && selectedItem && (
      <div>
        <p className="mb-2 font-mono text-[11px] uppercase tracking-[0.18em] text-bone-faint">
          {activeCategory.label} · {SKILL_LEVELS[selectedItem.level]?.label}
        </p>
        <h4 className="mb-2 font-sans text-lg font-semibold text-bone">
          {selectedItem.name}
        </h4>
        <p className="mb-5 text-sm leading-relaxed text-bone-dim">
          {SKILL_LEVELS[selectedItem.level]?.description}
        </p>
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={onBackToArea}
            className="inline-flex items-center gap-2 rounded-full border border-line px-4 py-2 font-mono text-[11px] uppercase tracking-[0.14em] text-bone-dim transition-colors duration-200 hover:border-bone-faint hover:text-bone focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-ink"
          >
            <ArrowLeft aria-hidden="true" weight="bold" className="h-4 w-4" />
            Back to {activeCategory.label}
          </button>
          <ResetButton label="All areas" onClick={onReset} />
        </div>
      </div>
    )}
  </div>
);

const ResetButton = ({ label, onClick }) => (
  <button
    type="button"
    onClick={onClick}
    className="inline-flex items-center gap-2 rounded-full border border-line px-4 py-2 font-mono text-[11px] uppercase tracking-[0.14em] text-bone-dim transition-colors duration-200 hover:border-bone-faint hover:text-bone focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-ink"
  >
    <SquaresFour aria-hidden="true" weight="bold" className="h-4 w-4" />
    {label}
  </button>
);

export default TechnologyEcosystem;
