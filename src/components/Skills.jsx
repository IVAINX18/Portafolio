import { softSkills } from '../data/skills';
import TechnologyEcosystem from './skills/TechnologyEcosystem';
import Reveal from './ui/Reveal';
import SectionHeading from './ui/SectionHeading';
import TechBadge from './ui/TechBadge';

/**
 * Toolkit: el mapa de capacidades. El radar, las fichas por area y la
 * leyenda de niveles salen del mismo dataset (src/data/skills.js), y las
 * habilidades blandas cierran el bloque porque son la otra mitad del
 * "como trabajo", no una lista aparte en otra seccion.
 */
const Skills = () => (
  <section
    id="skills"
    aria-labelledby="skills-title"
    className="scroll-mt-20 border-t border-line px-5 py-24 sm:px-8 md:py-36"
  >
    <div className="mx-auto max-w-[1400px]">
      <SectionHeading
        id="skills-title"
        title="Toolkit"
        description="An honest map: what I use daily, what I use with some autonomy, and what I have working knowledge of."
      />

      <TechnologyEcosystem />

      <Reveal className="mt-16 border-t border-line pt-8">
        <p className="mb-4 font-mono text-[11px] uppercase tracking-[0.18em] text-bone-faint">
          Ways of working
        </p>
        <ul aria-label="Soft skills" className="flex flex-wrap gap-2">
          {softSkills.map((skill) => (
            <TechBadge key={skill}>{skill}</TechBadge>
          ))}
        </ul>
      </Reveal>
    </div>
  </section>
);

export default Skills;
