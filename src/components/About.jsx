import Reveal from './ui/Reveal';
import SectionHeading from './ui/SectionHeading';
import TechnologyEcosystem from './skills/TechnologyEcosystem';
import { certifications, softSkills } from '../data/skills';

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

const CertificationBadge = () => (
  <span
    aria-hidden="true"
    className="mt-0.5 p-2 bg-primary/10 border border-primary/20 rounded-lg shrink-0"
  >
    <svg
      className="w-4 h-4 text-primary"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
      />
    </svg>
  </span>
);

const CertificationList = () => (
  <div
    id="certificates"
    className="bg-dark border border-slate-800 rounded-xl p-6 sm:p-8 h-full scroll-mt-24"
  >
    <div className="flex items-baseline justify-between gap-3 mb-6">
      <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-gradient">
        Certifications
      </h3>
      <p className="font-mono text-xs text-slate-400 shrink-0">
        {certifications.length} earned
      </p>
    </div>
    <ul className="space-y-3">
      {certifications.map((cert) => (
        <li
          key={cert.title}
          className="group flex items-start gap-3.5 rounded-xl border border-transparent p-3 -m-3 transition-colors duration-200 hover:border-slate-700 hover:bg-darker/50"
        >
          <CertificationBadge />
          <div className="min-w-0">
            <h4 className="text-[17px] font-semibold text-slate-200 leading-snug mb-1">
              {cert.title}
            </h4>
            <p className="text-slate-400 text-sm leading-relaxed">
              {cert.description}
            </p>
          </div>
        </li>
      ))}
    </ul>
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

        {/* Technology ecosystem — radar visualization, data-driven */}
        <div id="skills" className="mb-16 md:mb-20 scroll-mt-20">
          <TechnologyEcosystem />
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
