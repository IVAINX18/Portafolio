import { featuredProjects } from '../data/projects';
import FeaturedProjectCard from './projects/FeaturedProjectCard';
import SectionHeading from './ui/SectionHeading';

/**
 * FeaturedProjects — flagship work. Scales by adding objects to
 * `featuredProjects` in src/data/projects.js; no component changes needed.
 */
const FeaturedProjects = () => {
  return (
    <section id="projects" aria-labelledby="featured-projects-title" className="py-20 md:py-28 px-6 scroll-mt-20">
      <div className="max-w-7xl mx-auto">
        <SectionHeading
          id="featured-projects-title"
          eyebrow="Selected Work"
          title="Featured"
          highlight="Projects"
          description="Flagship work in cybersecurity and applied machine learning — deeper systems, documented end to end."
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
