import Reveal from '../ui/Reveal';
import TechBadge from '../ui/TechBadge';

const GitHubIcon = () => (
  <svg
    className="w-5 h-5"
    fill="currentColor"
    viewBox="0 0 24 24"
    aria-hidden="true"
  >
    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
  </svg>
);

const ExternalIcon = () => (
  <svg
    className="w-4 h-4"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
    aria-hidden="true"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
    />
  </svg>
);

/**
 * FeaturedProjectCard — flagship treatment for high-complexity work.
 * Renders purely from a project object (see src/data/projects.js).
 * No per-project branches: every section guards on data presence.
 */
const FeaturedProjectCard = ({ project }) => {
  const { links } = project;

  return (
    <Reveal>
      <article
        aria-labelledby={`${project.id}-title`}
        className="group relative bg-dark border border-slate-800 rounded-2xl p-6 sm:p-8 md:p-12 overflow-hidden transition-all duration-300 hover:border-primary/50 hover:shadow-2xl hover:shadow-primary/10 hover:-translate-y-1 focus-within:border-primary/50"
      >
        {/* Discreet accent: single-hue wash, fades in on hover/focus */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 transition-opacity duration-500"
        />
        {/* Top accent hairline */}
        <div
          aria-hidden="true"
          className="absolute top-0 left-8 right-8 h-px bg-gradient-to-r from-transparent via-primary/60 to-transparent"
        />

        <div className="relative">
          {/* Header */}
          <div className="flex flex-wrap items-start justify-between gap-4 mb-6">
            <div className="min-w-0">
              <p className="inline-flex items-center gap-2 px-3 py-1.5 bg-primary/10 text-primary rounded-full text-xs font-mono tracking-wide border border-primary/20 mb-4">
                {project.eyebrow}
              </p>
              <h3
                id={`${project.id}-title`}
                className="text-2xl sm:text-3xl md:text-4xl font-bold leading-tight"
              >
                {project.title}
              </h3>
            </div>
            {project.status && (
              <p className="shrink-0 font-mono text-xs text-slate-400 border border-slate-700 rounded-full px-3 py-1.5">
                {project.status}
              </p>
            )}
          </div>

          {/* Problem → solution narrative */}
          {project.problem && (
            <div className="border-l-2 border-primary/60 pl-4 sm:pl-5 mb-5">
              <p className="font-mono text-xs uppercase tracking-[0.18em] text-primary/90 mb-1.5">
                Problem
              </p>
              <p className="text-slate-300 leading-relaxed text-[15px] md:text-base">
                {project.problem}
              </p>
            </div>
          )}

          <p className="text-slate-300 leading-relaxed text-[15px] md:text-lg mb-8 max-w-3xl">
            {project.description}
          </p>

          {/* Verifiable indicators */}
          {project.metrics?.length > 0 && (
            <dl className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-8">
              {project.metrics.map((metric) => (
                <div
                  key={metric.label}
                  className="bg-darker/60 border border-slate-800 rounded-xl px-4 py-3.5"
                >
                  <dt className="order-2 font-mono text-[11px] uppercase tracking-[0.14em] text-slate-400">
                    {metric.label}
                  </dt>
                  <dd className="order-1 text-xl md:text-2xl font-bold text-slate-100 mb-1">
                    {metric.value}
                  </dd>
                </div>
              ))}
            </dl>
          )}

          {/* Key capabilities */}
          {project.features?.length > 0 && (
            <div className="mb-8">
              <h4 className="font-mono text-xs uppercase tracking-[0.18em] text-slate-400 mb-3">
                Key capabilities
              </h4>
              <ul className="grid sm:grid-cols-2 gap-x-6 gap-y-2.5">
                {project.features.map((feature) => (
                  <li
                    key={feature}
                    className="flex items-start gap-2.5 text-[15px] text-slate-300 leading-relaxed"
                  >
                    <span aria-hidden="true" className="text-primary mt-0.5">
                      ▸
                    </span>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Stack */}
          <ul
            aria-label={`Technologies used in ${project.title}`}
            className="flex flex-wrap gap-2 mb-8"
          >
            {project.tech.map((tech) => (
              <TechBadge key={tech}>{tech}</TechBadge>
            ))}
          </ul>

          {/* Actions + provenance */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-4">
            <div className="flex flex-wrap gap-3">
              {links?.github && (
                <a
                  href={links.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${project.title} repository on GitHub (opens in a new tab)`}
                  className="inline-flex items-center gap-2.5 px-6 py-3 bg-primary hover:bg-sky-400 text-darker font-semibold rounded-lg transition-all duration-300 hover:shadow-lg hover:shadow-primary/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-dark"
                >
                  <GitHubIcon />
                  <span>View Repository</span>
                </a>
              )}
              {links?.demo && (
                <a
                  href={links.demo}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${project.title} live demo (opens in a new tab)`}
                  className="inline-flex items-center gap-2 px-6 py-3 border-2 border-primary text-primary hover:bg-primary/10 font-semibold rounded-lg transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-dark"
                >
                  <span>Live Demo</span>
                  <ExternalIcon />
                </a>
              )}
            </div>
          </div>

          {project.footnote && (
            <p className="mt-6 font-mono text-xs text-slate-400 leading-relaxed">
              {project.footnote}
            </p>
          )}
        </div>
      </article>
    </Reveal>
  );
};

export default FeaturedProjectCard;
