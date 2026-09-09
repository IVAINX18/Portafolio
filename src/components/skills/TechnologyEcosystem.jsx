import { useState } from 'react';
import Reveal from '../ui/Reveal';
import TechnologyRadar from './TechnologyRadar';
import { SKILL_LEVELS, categoryBreadth, skillCategories } from '../../data/skills';

const CHIP_STYLES = {
  core: {
    chip: 'border-primary/40 bg-primary/10 text-slate-100',
    dot: 'bg-primary',
  },
  intermediate: {
    chip: 'border-slate-700 bg-slate-800/50 text-slate-300',
    dot: 'bg-slate-400',
  },
  familiar: {
    chip: 'border-slate-800 bg-transparent text-slate-400',
    dot: 'bg-slate-600',
  },
};

const tierCount = (category, level) =>
  category.items.filter((item) => item.level === level).length;

/** Category with the widest conceptual shape — deterministic default. */
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
        className="inline-flex items-center gap-2 text-[13px] text-slate-400"
      >
        <span
          aria-hidden="true"
          className={`w-2 h-2 rounded-full ${
            key === 'core'
              ? 'bg-primary'
              : key === 'intermediate'
                ? 'bg-slate-400'
                : 'bg-slate-600'
          }`}
        />
        <span className="font-semibold text-slate-200">{level.label}</span>
        <span aria-hidden="true">·</span>
        <span>{level.description}</span>
      </li>
    ))}
  </ul>
);

const ActiveCategoryPanel = ({ category }) => (
  <div aria-live="polite" aria-label="Selected area details">
    <div className="flex items-baseline justify-between gap-3 mb-1.5">
      <h4 className="text-lg font-bold text-slate-100">{category.label}</h4>
      <p className="font-mono text-xs text-slate-400 shrink-0">
        {category.items.length} tech
      </p>
    </div>
    <p className="font-mono text-xs text-slate-400 mb-4">
      {(['core', 'intermediate', 'familiar'])
        .map(
          (level) => `${tierCount(category, level)} ${SKILL_LEVELS[level].label}`
        )
        .join(' · ')}
    </p>
    <ul aria-label={`${category.label} technologies`} className="flex flex-wrap gap-2">
      {category.items.map((skill) => {
        const style = CHIP_STYLES[skill.level] || CHIP_STYLES.familiar;
        return (
          <li key={skill.name}>
            <span
              title={`${skill.name} — ${SKILL_LEVELS[skill.level]?.label}`}
              className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-[13px] font-medium border transition-colors duration-200 ${style.chip}`}
            >
              <span
                aria-hidden="true"
                className={`w-1.5 h-1.5 rounded-full shrink-0 ${style.dot}`}
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
 * TechnologyEcosystem — radar visualization + textual access to the stack.
 * Single source of truth: `skillCategories` in src/data/skills.js.
 * The radar is never the only representation: area buttons, the detail
 * panel and a screen-reader listing expose the same data as text.
 */
const TechnologyEcosystem = () => {
  const [activeId, setActiveId] = useState(defaultActiveId);
  const active =
    skillCategories.find((cat) => cat.id === activeId) ?? skillCategories[0];

  return (
    <div>
      <Reveal className="mb-8 md:mb-10">
        <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center">
          Technology <span className="text-gradient">Ecosystem</span>
        </h3>
        <p className="text-slate-400 text-center mt-3 max-w-2xl mx-auto leading-relaxed">
          Relative breadth of each area — a conceptual shape, not a measured
          score. Explore every area for the full list.
        </p>
      </Reveal>

      <div className="grid gap-5 md:gap-6 lg:grid-cols-5 items-stretch">
        {/* Radar */}
        <Reveal className="lg:col-span-3">
          <div className="bg-dark border border-slate-800 rounded-2xl p-4 sm:p-6 h-full flex flex-col">
            <div className="w-full max-w-[420px] mx-auto">
              <TechnologyRadar
                categories={skillCategories}
                activeId={activeId}
                onSelect={setActiveId}
              />
            </div>
            <p className="font-mono text-[11px] text-slate-400 text-center mt-2 leading-relaxed">
              Shape reflects tier mix per area · conceptual, not a score
            </p>
          </div>
        </Reveal>

        {/* Detail + navigation */}
        <Reveal delay={0.1} className="lg:col-span-2">
          <div className="bg-dark border border-slate-800 rounded-2xl p-5 sm:p-6 h-full flex flex-col gap-6">
            <ActiveCategoryPanel category={active} />

            <div>
              <h4 className="font-mono text-xs uppercase tracking-[0.18em] text-slate-400 mb-3">
                Browse areas
              </h4>
              <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 gap-2">
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
                        className={`w-full flex items-center justify-between gap-2 px-3.5 py-2.5 rounded-lg border text-sm font-medium text-left transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-dark ${
                          isActive
                            ? 'border-primary/50 bg-primary/10 text-slate-100'
                            : 'border-slate-800 text-slate-400 hover:border-slate-600 hover:text-slate-200'
                        }`}
                      >
                        <span>{cat.label}</span>
                        <span className="font-mono text-xs opacity-70 shrink-0">
                          {cat.items.length}
                        </span>
                      </button>
                    </li>
                  );
                })}
              </ul>
            </div>

            <div className="mt-auto pt-2 border-t border-slate-800/80">
              <TierLegend />
            </div>
          </div>
        </Reveal>
      </div>

      {/* Complete textual equivalent for assistive technology */}
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
