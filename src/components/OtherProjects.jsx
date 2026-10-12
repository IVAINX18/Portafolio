import { notableProjects } from '../data/projects';
import NotableProjectCard from './projects/NotableProjectCard';
import SectionHeading from './ui/SectionHeading';

/**
 * OtherProjects: supporting work. Scales by adding objects to
 * `notableProjects` in src/data/projects.js; no component changes needed.
 */
const OtherProjects = () => {
  return (
    <section
      aria-labelledby="notable-projects-title"
      className="py-24 md:py-32 px-6 bg-dark/30"
    >
      <div className="max-w-7xl mx-auto">
        <SectionHeading
          id="notable-projects-title"
          title="Other Projects"
          description="Supporting work in real-time communication and multi-page web, each shipped and documented."
        />

        <div className="grid md:grid-cols-2 gap-6 md:gap-8">
          {notableProjects.map((project) => (
            <NotableProjectCard key={project.id} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default OtherProjects;
