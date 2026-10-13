import { ArrowUpRight, GithubLogo } from '@phosphor-icons/react';
import Reveal from '../ui/Reveal';
import TechBadge from '../ui/TechBadge';

/**
 * El flagship se presenta como dossier: titulo de cartel, la captura real
 * del producto como placa central, la ficha tecnica al lado y las metricas
 * verificadas del README como cierre. Todo el contenido sale del objeto del
 * proyecto en src/data/projects.js; el componente no escribe nada a mano.
 */
const FlagshipProject = ({ project }) => {
  const demoLabel = project.links?.demoLabel || 'Live demo';

  return (
    <article aria-labelledby={`${project.id}-title`}>
      <Reveal>
        <div className="mb-8 flex flex-wrap items-baseline justify-between gap-3 border-b border-line pb-4">
          <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-accent-soft">
            {project.eyebrow}
          </p>
          {project.status && (
            <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-bone-faint">
              {project.status}
            </p>
          )}
        </div>
      </Reveal>

      <Reveal delay={0.05}>
        <h3
          id={`${project.id}-title`}
          className="mb-10 font-display uppercase leading-[0.9] text-[clamp(2.4rem,7vw,5.5rem)] md:mb-12"
        >
          {project.title}
        </h3>
      </Reveal>

      {/* Placa central: la captura es real, tomada de la demo en vivo, y el
          pie describe exactamente lo que se ve. */}
      {project.image && (
        <Reveal delay={0.1}>
          <figure className="group mb-12 md:mb-16">
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
      )}

      {/* Dos columnas equilibradas: el texto ocupa la mitad y la ficha
          se pliega en dos columnas internas (Role | Links, Stack ancho
          completo, Note a todo lo ancho) para que ambos lados midan casi
          lo mismo y no quede un vacio bajo el texto. */}
      <div className="grid gap-10 lg:grid-cols-12 lg:gap-12">
        <Reveal className="lg:col-span-6">
          <p className="mb-3 font-mono text-[11px] uppercase tracking-[0.18em] text-bone-faint">
            Problem
          </p>
          <p className="mb-6 text-base leading-relaxed text-bone md:text-lg">
            {project.problem}
          </p>
          <p className="max-w-[62ch] leading-relaxed text-bone-dim">
            {project.description}
          </p>
        </Reveal>

        <Reveal delay={0.08} className="lg:col-span-6">
          <dl className="grid gap-x-8 border-t border-line sm:grid-cols-2">
            {project.role && (
              <div className="py-5">
                <dt className="mb-2 font-mono text-[11px] uppercase tracking-[0.18em] text-bone-faint">
                  Role
                </dt>
                <dd className="text-sm leading-relaxed text-bone-dim">
                  {project.role}
                </dd>
              </div>
            )}
            <div className="border-t border-line py-5 sm:border-t-0">
              <dt className="mb-3 font-mono text-[11px] uppercase tracking-[0.18em] text-bone-faint">
                Links
              </dt>
              <dd className="flex flex-wrap gap-x-8 gap-y-3">
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
              </dd>
            </div>
            <div className="border-t border-line py-5 sm:col-span-2">
              <dt className="mb-3 font-mono text-[11px] uppercase tracking-[0.18em] text-bone-faint">
                Stack
              </dt>
              <dd>
                <ul className="flex flex-wrap gap-2">
                  {project.tech.map((tech) => (
                    <TechBadge key={tech}>{tech}</TechBadge>
                  ))}
                </ul>
              </dd>
            </div>
          </dl>
        </Reveal>
      </div>

      {/* La nota baja a fila completa: con cuatro bloques apilados la ficha
          siempre superaba al texto y dejaba un vacio bajo la izquierda.
          Como tira de pie a todo lo ancho mantiene etiqueta y hairline. */}
      {project.footnote && (
        <Reveal delay={0.05}>
          <div className="mt-10 border-t border-line py-5 lg:mt-12">
            <p className="mb-2 font-mono text-[11px] uppercase tracking-[0.18em] text-bone-faint">
              Note
            </p>
            <p className="max-w-[72ch] font-mono text-xs leading-relaxed text-bone-faint">
              {project.footnote}
            </p>
          </div>
        </Reveal>
      )}

      {/* Metricas como tira tipografica: numeros grandes en Anton y etiqueta
          mono debajo, separadas por hairlines en vez de cajas. */}
      {project.metrics?.length > 0 && (
        <Reveal delay={0.1}>
          <dl className="mt-14 grid grid-cols-2 border-t border-line md:mt-20 md:grid-cols-4">
            {project.metrics.map((metric) => (
              <div
                key={metric.label}
                className="border-b border-line py-6 pr-6 md:border-b-0 md:border-r md:pl-6 md:first:pl-0 md:last:border-r-0"
              >
                <dd className="mb-1 font-display text-4xl md:text-5xl">
                  {metric.value}
                </dd>
                <dt className="font-mono text-[11px] uppercase tracking-[0.14em] text-bone-faint">
                  {metric.label}
                </dt>
              </div>
            ))}
          </dl>
        </Reveal>
      )}
    </article>
  );
};

export default FlagshipProject;
