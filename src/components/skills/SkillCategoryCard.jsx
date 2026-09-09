import { SKILL_LEVELS } from '../../data/skills';

const LEVEL_STYLES = {
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

/**
 * SkillCategoryCard — one technology group inside the ecosystem.
 * Renders purely from a category object (see src/data/skills.js).
 */
const SkillCategoryCard = ({ category }) => (
  <article
    aria-label={`${category.label} skills`}
    className="bg-dark border border-slate-800 rounded-xl p-6 transition-colors duration-300 hover:border-primary/40"
  >
    <div className="flex items-baseline justify-between gap-3 mb-5">
      <h4 className="text-base font-bold text-slate-100">{category.label}</h4>
      <p className="font-mono text-xs text-slate-400 shrink-0">
        {category.items.length} tech
      </p>
    </div>
    <ul className="flex flex-wrap gap-2" aria-label={category.label}>
      {category.items.map((skill) => {
        const style = LEVEL_STYLES[skill.level] || LEVEL_STYLES.familiar;
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
  </article>
);

export default SkillCategoryCard;
