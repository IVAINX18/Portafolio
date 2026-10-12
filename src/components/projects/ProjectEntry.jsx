import { ArrowUpRight, GithubLogo } from '@phosphor-icons/react';
import Reveal from '../ui/Reveal';
import TechBadge from '../ui/TechBadge';

/**
 * Entrada secundaria con dos tratamientos: 'plate' pone la captura real en
 * primer plano y 'text' resuelve todo con tipografia cuando no existe una
 * demo publica que merezca captura. El campo `treatment` viene del dataset,
 * asi que anadir un proyecto nuevo no requiere tocar este componente.
 */
const ProjectLinks = ({ project }) => {
  const demoLabel = project.links?.demoLabel || 'Live demo';

  return (
    <div className="flex flex-wrap gap-x-8 gap-y-3">
      {project.links?.github && (
        <a
          href={project.links.github}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`${project.title} repository on GitHub (opens in a new tab)`}
          className="group inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.14em] text-bone"
        >
          <GithubLogo className="h-4 w-4" aria-hidden="true" />
          <span className="link-underline">Repository</span>
          <ArrowUpRight
            className="h-3.5 w-3.5 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
            weight="bold"
            aria-hidden="true"
          />
        </a>
      )}
      {project.links?.demo && (
        <a
          href={project.links.demo}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`${project.title}, ${demoLabel.toLowerCase()} (opens in a new tab)`}
          className="group inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.14em] text-accent-soft"
        >
          <span className="link-underline">{demoLabel}</span>
          <ArrowUpRight
            className="h-3.5 w-3.5 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
            weight="bold"
            aria-hidden="true"
          />
        </a>
      )}
    </div>
  );
};

const ProjectMeta = ({ project }) => (
  <>
    <p className="mb-3 font-mono text-[11px] uppercase tracking-[0.18em] text-bone-faint">
      {project.eyebrow}
    </p>
    <h3
      id={`${project.id}-title`}
      className="mb-3 font-display uppercase leading-[0.95] text-3xl md:text-4xl"
    >
      {project.title}
    </h3>
    {project.role && (
      <p className="mb-4 font-mono text-[11px] uppercase tracking-[0.14em] text-accent-soft">
        {project.role}
      </p>
    )}
    <p className="mb-6 max-w-[54ch] leading-relaxed text-bone-dim">
      {project.description}
    </p>
    {project.highlights?.length > 0 && (
      <ul className="mb-6 space-y-1.5 font-mono text-xs uppercase tracking-[0.08em] text-bone-dim">
        {project.highlights.map((highlight) => (
          <li key={highlight} className="flex items-start gap-2">
            <span aria-hidden="true" className="mt-0.5 text-accent">
              ▸
            </span>
            <span>{highlight}</span>
          </li>
        ))}
      </ul>
    )}
    <ul
      aria-label={`Technologies used in ${project.title}`}
      className="mb-8 flex flex-wrap gap-2"
    >
      {project.tech.map((tech) => (
        <TechBadge key={tech}>{tech}</TechBadge>
      ))}
    </ul>
    <ProjectLinks project={project} />
  </>
);

const ProjectEntry = ({ project }) => {
  const isPlate = project.treatment === 'plate';

  // Variante tipografica: el bloque se desplaza a la derecha para romper la
  // alineacion de la columna principal y crear la asimetria editorial.
  if (!isPlate) {
    return (
      <article aria-labelledby={`${project.id}-title`}>
        <div className="grid lg:grid-cols-12">
          <Reveal className="lg:col-span-6 lg:col-start-6">
            <ProjectMeta project={project} />
          </Reveal>
        </div>
      </article>
    );
  }

  return (
    <article aria-labelledby={`${project.id}-title`}>
      <div className="grid items-end gap-10 lg:grid-cols-12 lg:gap-8">
        <Reveal className="lg:col-span-7">
          <figure className="group">
            <div className="overflow-hidden border border-line bg-ink-2">
              <img
                src={project.image}
                alt={project.imageAlt}
                width={1440}
                height={900}
                loading="lazy"
                decoding="async"
                className="h-auto w-full transition-transform duration-700 ease-out group-hover:scale-[1.015]"
              />
            </div>
            {project.caption && (
              <figcaption className="mt-3 font-mono text-[11px] uppercase tracking-[0.14em] text-bone-faint">
                {project.caption}
              </figcaption>
            )}
          </figure>
        </Reveal>
        <Reveal delay={0.08} className="lg:col-span-4 lg:col-start-9">
          <ProjectMeta project={project} />
        </Reveal>
      </div>
    </article>
  );
};

export default ProjectEntry;
