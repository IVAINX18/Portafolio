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

  // Mantengo cada enlace en una sola linea (whitespace-nowrap): el quiebre,
  // si hace falta en pantallas muy estrechas, ocurre entre enlaces, nunca
  // dentro de uno.
  return (
    <div className="flex flex-wrap items-center gap-x-8 gap-y-3">
      {project.links?.github && (
        <a
          href={project.links.github}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`${project.title} repository on GitHub (opens in a new tab)`}
          className="group inline-flex items-center gap-2 whitespace-nowrap font-mono text-xs uppercase tracking-[0.14em] text-bone"
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
          className="group inline-flex items-center gap-2 whitespace-nowrap font-mono text-xs uppercase tracking-[0.14em] text-accent-soft"
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

/**
 * Composicion apilada de identidad + detalle para la variante 'plate'.
 * No duplico el marcado: reuso ProjectIdentity y ProjectDetail y solo agrego
 * la separacion vertical que la placa necesita con un wrapper.
 */
const ProjectMeta = ({ project }) => (
  <>
    <ProjectIdentity project={project} />
    <div className="mt-6">
      <ProjectDetail project={project} />
    </div>
  </>
);

/**
 * Identidad de la fila del libro mayor: etiqueta, titulo de cartel y rol.
 * La uso en la variante tipografica ('text') y, a traves de ProjectMeta,
 * tambien en la variante 'plate'.
 */
const ProjectIdentity = ({ project }) => (
  <>
    <p className="mb-3 font-mono text-[11px] uppercase tracking-[0.18em] text-bone-faint">
      {project.eyebrow}
    </p>
    <h3
      id={`${project.id}-title`}
      className="font-display text-4xl uppercase leading-[0.95] md:text-5xl"
    >
      {project.title}
    </h3>
    {project.role && (
      <p className="mt-4 font-mono text-[11px] uppercase tracking-[0.14em] text-accent-soft">
        {project.role}
      </p>
    )}
  </>
);

/**
 * Detalle de la fila del libro mayor: descripcion, destacados, stack y
 * enlaces. Vive en el bloque derecho del grid para que la fila use las 12
 * columnas completas con la columna de aire en medio.
 */
const ProjectDetail = ({ project }) => (
  <>
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

  // Variante tipografica como fila de libro mayor a todo el ancho: identidad
  // a la izquierda (cols 1-5), columna de aire en medio y detalle a la
  // derecha (cols 7-12). El hairline de cierre lo pone el article; el de
  // apertura lo pone la regla de la etiqueta en Work.jsx.
  if (!isPlate) {
    return (
      <article
        aria-labelledby={`${project.id}-title`}
        className="border-b border-line"
      >
        <div className="grid gap-10 py-12 md:py-16 lg:grid-cols-12 lg:gap-8">
          <Reveal className="lg:col-span-5">
            <ProjectIdentity project={project} />
          </Reveal>
          <Reveal delay={0.08} className="lg:col-span-6 lg:col-start-7">
            <ProjectDetail project={project} />
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
