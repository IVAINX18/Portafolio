import { ArrowUpRight, Globe } from '@phosphor-icons/react';
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
  <div className="bg-darker/60 border border-slate-800 rounded-lg p-4">
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
      className="bg-dark border border-slate-800 rounded-2xl p-6 sm:p-8 md:p-12 transition-colors duration-500 hover:border-primary/50 focus-within:border-primary/50"
    >
      <p className="inline-block px-3 py-1 bg-primary/10 text-primary border border-primary/20 rounded-full text-xs font-mono mb-5">
        {publication.subtitle}
      </p>

      <h3
        id={`publication-${publication.documentId}-title`}
        className="text-2xl md:text-3xl font-semibold mb-4"
      >
        {publication.title}
      </h3>

      <p className="text-slate-300 leading-relaxed mb-4 max-w-3xl">
        {publication.description}
      </p>

      <div className="flex items-center gap-3 text-slate-400 mb-8">
        <Globe className="w-5 h-5 shrink-0" weight="bold" aria-hidden="true" />
        <span className="font-mono text-sm">{publication.source}</span>
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
        className="inline-flex items-center gap-3 px-7 py-3.5 bg-primary hover:bg-sky-400 text-darker font-semibold rounded-lg transition-all duration-300 hover:shadow-xl hover:shadow-primary/40 active:translate-y-px focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-dark"
      >
        <span>Read Full Publication</span>
        <ArrowUpRight className="w-5 h-5" weight="bold" aria-hidden="true" />
      </a>
    </article>
  </Reveal>
);

// --- Main component ---

const Publications = () => {
  return (
    <section
      aria-labelledby="publications-title"
      className="py-24 md:py-32 px-6"
    >
      <div className="max-w-7xl mx-auto">
        <SectionHeading
          id="publications-title"
          title="Research & Publications"
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
