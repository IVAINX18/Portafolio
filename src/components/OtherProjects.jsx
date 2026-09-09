import { notableProjects } from '../data/projects';
import NotableProjectCard from './projects/NotableProjectCard';
import SectionHeading from './ui/SectionHeading';

/**
 * OtherProjects — supporting work. Scales by adding objects to
 * `notableProjects` in src/data/projects.js; no component changes needed.
 */
const OtherProjects = () => {
  return (
    <section
      aria-labelledby="notable-projects-title"
      className="py-20 md:py-28 px-6 bg-dark/30"
    >
      <div className="max-w-7xl mx-auto">
        <SectionHeading
          id="notable-projects-title"
          eyebrow="More Work"
          title="Other Notable"
          highlight="Projects"
          description="Supporting projects across real-time communication and web fundamentals — each one shipped and documented."
        />

        <div className="grid sm:grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 md:gap-8">
          {notableProjects.map((project) => (
            <NotableProjectCard key={project.id} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default OtherProjects;
