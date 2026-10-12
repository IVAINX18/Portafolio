import { useState } from 'react';
import Reveal from '../ui/Reveal';
import TechnologyRadar from './TechnologyRadar';
import {
  SKILL_LEVELS,
  categoryBreadth,
  skillCategories,
} from '../../data/skills';

// La misma escala de color significa lo mismo en todo el bloque: el acento
// marca lo que uso a diario y el hueso se apaga conforme baja la profundidad
// de uso. Es identica en el radar, las fichas y la leyenda.
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

const tierCount = (category, level) =>
  category.items.filter((item) => item.level === level).length;

/** Categoria con la forma conceptual mas amplia; la uso como seleccion por defecto. */
const defaultActiveId = () =>
  skillCategories.reduce((best, cat) =>
    categoryBreadth(cat) > categoryBreadth(best) ? cat : best
  ).id;

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
 * Panel de detalle con altura minima FIJA: cambiar de categoria no debe
 * redimensionar el panel porque el reflujo bajo el cursor puede reactivar
 * el hover y oscilar. El contenido hace cross-fade y la geometria no se mueve.
 */
const ActiveCategoryPanel = ({ category }) => (
  <div
    aria-live="polite"
    aria-label="Selected area details"
    className="min-h-[15rem]"
  >
    <div className="mb-1.5 flex items-baseline justify-between gap-3">
      <h4 className="font-sans text-lg font-semibold text-bone">
        {category.label}
      </h4>
      <p className="shrink-0 font-mono text-xs text-bone-faint">
        {category.items.length} tech
      </p>
    </div>
    <p className="mb-4 font-mono text-xs text-bone-faint">
      {['core', 'intermediate', 'familiar']
        .map((level) => `${tierCount(category, level)} ${SKILL_LEVELS[level].label}`)
        .join(', ')}
    </p>
    <ul
      aria-label={`${category.label} technologies`}
      className="flex flex-wrap gap-2"
    >
      {category.items.map((skill) => {
        const style = CHIP_STYLES[skill.level] || CHIP_STYLES.familiar;
        return (
          <li key={skill.name}>
            <span
              title={`${skill.name} (${SKILL_LEVELS[skill.level]?.label})`}
              className={`inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-[13px] font-medium transition-colors duration-200 ${style.chip}`}
            >
              <span
                aria-hidden="true"
                className={`h-1.5 w-1.5 shrink-0 rounded-full ${style.dot}`}
              />
              {skill.name}
              <span className="sr-only">
                ({SKILL_LEVELS[skill.level]?.label})
              </span>
            </span>
          </li>
        );
      })}
    </ul>
  </div>
);

/**
 * TechnologyEcosystem: radar + acceso textual al stack. El radar nunca es la
 * unica representacion: los botones de area, el panel de detalle y la lista
 * para lectores de pantalla exponen los mismos datos como texto.
 */
const TechnologyEcosystem = () => {
  const [activeId, setActiveId] = useState(defaultActiveId);
  const active =
    skillCategories.find((cat) => cat.id === activeId) ?? skillCategories[0];

  return (
    <div>
      <div className="grid items-stretch gap-5 md:gap-6 lg:grid-cols-5">
        {/* Radar: figura tecnica con pie de panel, espejo del pie de leyenda */}
        <Reveal className="lg:col-span-3">
          <div className="flex h-full flex-col border border-line bg-ink-2/40 p-4 sm:p-6">
            <figure className="flex min-h-0 flex-1 flex-col">
              <div className="flex flex-1 items-center justify-center">
                <div className="w-full max-w-[520px]">
                  <TechnologyRadar
                    categories={skillCategories}
                    activeId={activeId}
                    onSelect={setActiveId}
                  />
                </div>
              </div>
              <figcaption className="mt-auto border-t border-line pt-4 font-mono text-[11px] uppercase leading-relaxed tracking-[0.14em] text-bone-faint">
                Shape reflects tier mix per area, conceptual, not a score
              </figcaption>
            </figure>
          </div>
        </Reveal>

        {/* Detalle + navegacion */}
        <Reveal delay={0.1} className="lg:col-span-2">
          <div className="flex h-full flex-col gap-6 border border-line bg-ink-2/40 p-5 sm:p-6">
            <ActiveCategoryPanel category={active} />

            <div>
              <h4 className="mb-3 font-mono text-[11px] uppercase tracking-[0.18em] text-bone-faint">
                Browse areas
              </h4>
              <ul className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
                {skillCategories.map((cat) => {
                  const isActive = cat.id === activeId;
                  return (
                    <li key={cat.id}>
                      <button
                        type="button"
                        aria-pressed={isActive}
                        onClick={() => setActiveId(cat.id)}
                        onMouseEnter={() => setActiveId(cat.id)}
                        onFocus={() => setActiveId(cat.id)}
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

export default TechnologyEcosystem;
