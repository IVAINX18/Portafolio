import Reveal from './ui/Reveal';
import SectionHeading from './ui/SectionHeading';
import SkillCategoryCard from './skills/SkillCategoryCard';
import {
  SKILL_LEVELS,
  certifications,
  skillCategories,
  softSkills,
} from '../data/skills';

// --- Sub-components ----------------------------------------------------------

const BackgroundCard = () => (
  <div className="bg-dark border border-slate-800 rounded-xl p-6 sm:p-8 h-full">
    <h3 className="text-xl sm:text-2xl md:text-3xl font-bold mb-6 text-gradient">
      Background
    </h3>
    <div className="space-y-4 text-slate-300 leading-relaxed text-[15px] md:text-base">
      <p>
        I&apos;m a Systems Engineering student with a solid foundation in
        programming tools, AI and cybersecurity. While my specialty is Web
        Development, I also have a keen interest in areas such as information
        security and data analysis.
      </p>
      <p>
        My goal is to continue growing as a developer and contribute to the
        creation of secure and innovative technological solutions. I combine
        technical expertise with creative problem-solving to build engaging
        digital experiences.
      </p>
      <p>
        I believe in writing clean, maintainable code and staying current with
        modern web technologies and security best practices.
      </p>
    </div>
  </div>
);

const CertificationList = () => (
  <div className="bg-dark border border-slate-800 rounded-xl p-6 sm:p-8 h-full">
    <h3 className="text-xl sm:text-2xl md:text-3xl font-bold mb-6 text-gradient">
      Certifications
    </h3>
    <ul className="space-y-6">
      {certifications.map((cert) => (
        <li key={cert.title} className="border-l-2 border-primary pl-5 sm:pl-6">
          <h4 className="text-lg font-semibold text-slate-200 mb-1.5">
            {cert.title}
          </h4>
          <p className="text-slate-400 text-[15px] leading-relaxed">
            {cert.description}
          </p>
        </li>
      ))}
    </ul>
  </div>
);

const LevelLegend = () => (
  <div
    aria-label="Skill level legend"
    className="flex flex-wrap justify-center gap-x-8 gap-y-3 mb-10"
  >
    {Object.entries(SKILL_LEVELS).map(([key, level]) => (
      <p
        key={key}
        className="inline-flex items-center gap-2.5 text-sm text-slate-400"
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
        <span className="text-slate-400">· {level.description}</span>
      </p>
    ))}
  </div>
);

// --- Main component ----------------------------------------------------------

const About = () => {
  return (
    <section
      id="about"
      aria-labelledby="about-title"
      className="py-20 md:py-28 px-6 bg-dark/30 scroll-mt-20"
    >
      <div className="max-w-7xl mx-auto">
        <SectionHeading
          id="about-title"
          eyebrow="Profile"
          title="About"
          highlight="Me"
        />

        {/* Background & Certifications */}
        <div className="grid lg:grid-cols-2 gap-6 md:gap-8 lg:gap-12 mb-16 md:mb-24">
          <Reveal>
            <BackgroundCard />
          </Reveal>
          <Reveal delay={0.1}>
            <CertificationList />
          </Reveal>
        </div>

        {/* Technology ecosystem — data-driven, no arbitrary percentages */}
        <Reveal className="mb-10">
          <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center">
            Technology <span className="text-gradient">Ecosystem</span>
          </h3>
          <p className="text-slate-400 text-center mt-3 max-w-2xl mx-auto leading-relaxed">
            Technologies grouped by domain and honest experience tier — no
            invented percentages.
          </p>
        </Reveal>

        <Reveal>
          <LevelLegend />
        </Reveal>

        <div className="grid sm:grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5 md:gap-6 mb-16 md:mb-20">
          {skillCategories.map((category, index) => (
            <Reveal key={category.id} delay={Math.min(index * 0.05, 0.3)}>
              <SkillCategoryCard category={category} />
            </Reveal>
          ))}
        </div>

        {/* Soft skills */}
        <Reveal>
          <h3 className="text-2xl sm:text-3xl font-bold mb-6 text-center">
            Soft <span className="text-gradient">Skills</span>
          </h3>
          <ul
            aria-label="Soft skills"
            className="flex flex-wrap justify-center gap-2.5 max-w-3xl mx-auto"
          >
            {softSkills.map((skill) => (
              <li
                key={skill}
                className="px-4 py-2 bg-dark border border-slate-800 rounded-full text-sm text-slate-300"
              >
                {skill}
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
};

export default About;
