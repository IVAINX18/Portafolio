import Reveal from './ui/Reveal';
import SectionHeading from './ui/SectionHeading';

// --- Constants & Data ---

const PUBLICATIONS_DATA = [
  {
    title: 'Academic Research Publication',
    subtitle: 'IEEE Publication',
    description:
      'Published research work in collaboration with IEEE, contributing to the advancement of technology and innovation in the field of Systems Engineering.',
    link: 'https://ieeexplore.ieee.org/document/11214618',
    publisher: 'IEEE',
    documentId: '11214618',
    source: 'IEEE Xplore Digital Library',
  },
];

// --- Sub-components ---

const PublicationMeta = ({ label, value, isMono = false }) => (
  <div className="bg-dark/50 border border-slate-800 rounded-lg p-4">
    <p className="text-sm text-slate-400 mb-1">{label}</p>
    <p
      className={`text-lg font-semibold text-slate-200 ${isMono ? 'font-mono' : ''}`}
    >
      {value}
    </p>
  </div>
);

const PublicationCard = ({ publication }) => (
  <Reveal>
    <article
      aria-labelledby={`publication-${publication.documentId}-title`}
      className="bg-gradient-to-r from-primary/10 to-cyan-500/10 border border-primary/30 rounded-2xl p-6 sm:p-8 md:p-12 relative overflow-hidden group transition-colors duration-500 hover:border-primary/50 focus-within:border-primary/50"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-gradient-to-r from-primary/5 to-cyan-500/5 opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 transition-opacity duration-500"
      />

      <div className="relative z-10">
        <div className="flex items-start gap-4 mb-6">
          <div aria-hidden="true" className="p-4 bg-primary/10 rounded-xl shrink-0">
            <svg
              className="w-8 h-8 text-primary"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
              />
            </svg>
          </div>
          <div className="flex-1 min-w-0">
            <p className="inline-block px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-mono mb-4">
              {publication.subtitle}
            </p>
            <h3
              id={`publication-${publication.documentId}-title`}
              className="text-2xl md:text-3xl font-bold mb-4"
            >
              {publication.title}
            </h3>
          </div>
        </div>

        <div className="mb-8">
          <p className="text-slate-300 leading-relaxed mb-4">
            {publication.description}
          </p>
          <div className="flex items-center gap-3 text-slate-400">
            <svg
              className="w-5 h-5 shrink-0"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"
              />
            </svg>
            <span className="font-mono text-sm">{publication.source}</span>
          </div>
        </div>

        <div className="grid sm:grid-cols-2 gap-4 sm:gap-6 mb-8">
          <PublicationMeta label="Publisher" value={publication.publisher} />
          <PublicationMeta
            label="Document ID"
            value={publication.documentId}
            isMono
          />
        </div>

        <a
          href={publication.link}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Read full publication on IEEE Xplore (opens in a new tab)"
          className="inline-flex items-center gap-3 px-8 py-4 bg-primary hover:bg-sky-400 text-darker font-semibold rounded-lg transition-all duration-300 hover:shadow-xl hover:shadow-primary/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-dark"
        >
          <span>Read Full Publication</span>
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M14 5l7 7m0 0l-7 7m7-7H3"
            />
          </svg>
        </a>
      </div>
    </article>
  </Reveal>
);

// --- Main component ---

const Publications = () => {
  return (
    <section
      aria-labelledby="publications-title"
      className="py-20 md:py-28 px-6"
    >
      <div className="max-w-7xl mx-auto">
        <SectionHeading
          id="publications-title"
          eyebrow="Research"
          title="Research &"
          highlight="Publications"
          description="Contributing to academic research in technology and innovation."
        />

        {PUBLICATIONS_DATA.map((pub) => (
          <PublicationCard key={pub.documentId} publication={pub} />
        ))}
      </div>
    </section>
  );
};

export default Publications;
