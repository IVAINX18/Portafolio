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
 * NotableProjectCard — compact, scannable card for supporting projects.
 * Equal-height cards (h-full + mt-auto footer) keep grids aligned.
 * Renders purely from a project object (see src/data/projects.js).
 */
const NotableProjectCard = ({ project }) => {
  const { links } = project;
  const hasDemo = Boolean(links?.demo);
  const hasGithub = Boolean(links?.github);

  return (
    <Reveal className="h-full">
      <article
        aria-labelledby={`${project.id}-title`}
        className="group h-full flex flex-col bg-dark border border-slate-800 rounded-xl p-6 sm:p-7 transition-all duration-300 hover:border-primary/50 hover:shadow-xl hover:shadow-primary/10 hover:-translate-y-1 focus-within:border-primary/50"
      >
        <p className="font-mono text-xs tracking-[0.16em] uppercase text-primary mb-3">
          {project.eyebrow}
        </p>
        <h3
          id={`${project.id}-title`}
          className="text-xl sm:text-2xl font-bold mb-3 leading-snug"
        >
          {project.title}
        </h3>
        <p className="text-slate-300 text-[15px] leading-relaxed mb-5">
          {project.description}
        </p>

        <ul
          aria-label={`Technologies used in ${project.title}`}
          className="flex flex-wrap gap-2 mb-5"
        >
          {project.tech.map((tech) => (
            <TechBadge key={tech}>{tech}</TechBadge>
          ))}
        </ul>

        {project.highlights?.length > 0 && (
          <ul aria-label={`${project.title} highlights`} className="space-y-1.5 mb-6">
            {project.highlights.map((highlight) => (
              <li
                key={highlight}
                className="text-sm text-slate-400 flex items-start gap-2"
              >
                <span aria-hidden="true" className="text-primary">
                  ▸
                </span>
                <span>{highlight}</span>
              </li>
            ))}
          </ul>
        )}

        {(hasDemo || hasGithub) && (
          <div className="flex gap-3 mt-auto pt-2">
            {hasDemo && (
              <a
                href={links.demo}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${project.title} live demo (opens in a new tab)`}
                className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-primary hover:bg-sky-400 text-darker text-sm font-semibold rounded-lg transition-all duration-300 hover:shadow-lg hover:shadow-primary/25 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-dark"
              >
                <span>Live Demo</span>
                <ExternalIcon />
              </a>
            )}
            {hasGithub && (
              <a
                href={links.github}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${project.title} repository on GitHub (opens in a new tab)`}
                className={`inline-flex items-center justify-center gap-2 px-4 py-2.5 border-2 border-primary/70 text-primary hover:bg-primary/10 text-sm font-semibold rounded-lg transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-dark ${
                  hasDemo ? '' : 'flex-1'
                }`}
              >
                <GitHubIcon />
                <span>{hasDemo ? 'Code' : 'View Code'}</span>
              </a>
            )}
          </div>
        )}
      </article>
    </Reveal>
  );
};

export default NotableProjectCard;
