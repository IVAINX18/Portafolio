import { featuredProjects } from '../data/projects';
import FeaturedProjectCard from './projects/FeaturedProjectCard';
import SectionHeading from './ui/SectionHeading';

/**
 * FeaturedProjects: flagship work. Scales by adding objects to
 * `featuredProjects` in src/data/projects.js; no component changes needed.
 */
const FeaturedProjects = () => {
  return (
    <section id="projects" aria-labelledby="featured-projects-title" className="py-24 md:py-32 px-6 scroll-mt-20">
      <div className="max-w-7xl mx-auto">
        <SectionHeading
          id="featured-projects-title"
          title="Featured Projects"
          description="Flagship work in cybersecurity and applied machine learning. Documented end to end."
        />

        <div className="space-y-8 md:space-y-12">
          {featuredProjects.map((project) => (
            <FeaturedProjectCard key={project.id} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedProjects;
