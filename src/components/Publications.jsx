import { ArrowUpRight } from '@phosphor-icons/react';
import Reveal from './ui/Reveal';
import SectionHeading from './ui/SectionHeading';

// Datos reales de la publicacion: identificador y enlace del registro IEEE.
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

/**
 * Research: una publicacion presentada como ficha editorial sin tarjeta.
 * Los metadatos verificables van a la izquierda y la narrativa a la derecha,
 * separadas por un hairline superior que ordena el bloque completo.
 */
const PublicationEntry = ({ publication }) => (
  <Reveal>
    <article
      aria-labelledby={`publication-${publication.documentId}-title`}
      className="grid gap-10 border-t border-line pt-10 lg:grid-cols-12 lg:gap-8"
    >
      <div className="lg:col-span-3">
        <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-bone-faint">
          Publisher
        </p>
        <p className="mt-1 font-mono text-sm text-bone">
          {publication.publisher}
        </p>
        <p className="mt-6 font-mono text-[11px] uppercase tracking-[0.18em] text-bone-faint">
          Document ID
        </p>
        <p className="mt-1 font-mono text-sm text-bone">
          {publication.documentId}
        </p>
        <p className="mt-6 font-mono text-[11px] uppercase tracking-[0.18em] text-bone-faint">
          Indexed in
        </p>
        <p className="mt-1 font-mono text-sm text-bone">{publication.source}</p>
      </div>

      <div className="lg:col-span-8 lg:col-start-5">
        <h3
          id={`publication-${publication.documentId}-title`}
          className="mb-5 font-display uppercase leading-[0.95] text-2xl md:text-4xl"
        >
          {publication.title}
        </h3>
        <p className="mb-8 max-w-[62ch] leading-relaxed text-bone-dim">
          {publication.description}
        </p>
        <a
          href={publication.link}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Read full publication on IEEE Xplore (opens in a new tab)"
          className="group inline-flex items-center gap-3 rounded-full border border-line px-6 py-3.5 font-mono text-xs uppercase tracking-[0.14em] text-bone transition-colors duration-300 hover:border-accent/60 hover:text-accent-soft active:translate-y-px focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-ink"
        >
          Read on IEEE Xplore
          <ArrowUpRight
            className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
            weight="bold"
            aria-hidden="true"
          />
        </a>
      </div>
    </article>
  </Reveal>
);

const Publications = () => {
  return (
    <section
      id="publications"
      aria-labelledby="publications-title"
      className="scroll-mt-20 px-5 py-20 sm:px-8 md:py-28"
    >
      <div className="mx-auto max-w-[1400px]">
        <SectionHeading
          id="publications-title"
          title="Research"
          description="Peer-reviewed academic work, listed with its real registry data and link."
        />

        {PUBLICATIONS_DATA.map((pub) => (
          <PublicationEntry key={pub.documentId} publication={pub} />
        ))}
      </div>
    </section>
  );
};

export default Publications;
