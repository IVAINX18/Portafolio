import { EnvelopeSimple } from '@phosphor-icons/react';
import Reveal from './ui/Reveal';

// --- Constants & Data ---

const SOCIAL_LINKS = [
  {
    name: 'GitHub',
    url: 'https://github.com/IVAINX18',
    icon: (
      <svg
        className="w-6 h-6"
        fill="currentColor"
        viewBox="0 0 24 24"
        aria-hidden="true"
      >
        <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
      </svg>
    ),
  },
  {
    name: 'LinkedIn',
    url: 'https://www.linkedin.com/in/ivan-velasco-660a512bb/',
    icon: (
      <svg
        className="w-6 h-6"
        fill="currentColor"
        viewBox="0 0 24 24"
        aria-hidden="true"
      >
        <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.79M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
      </svg>
    ),
  },
  {
    name: 'Email',
    url: 'mailto:ivanvelascosanchez74@gmail.com',
    icon: (
      <EnvelopeSimple
        className="w-6 h-6"
        weight="bold"
        aria-hidden="true"
      />
    ),
  },
];

// --- Sub-components ---

const ContactHeader = () => (
  <Reveal>
    <h2 id="contact-title" className="text-4xl md:text-6xl font-semibold mb-6">
      Let&apos;s Connect
    </h2>
    <p className="text-lg md:text-xl text-slate-400 mb-12 max-w-2xl mx-auto leading-relaxed">
      I&apos;m always open to discussing new projects, creative ideas, or
      opportunities to be part of your vision.
    </p>
  </Reveal>
);

const SocialLinks = () => (
  <Reveal delay={0.1}>
    <ul
      aria-label="Social and contact links"
      className="flex flex-wrap justify-center gap-4 sm:gap-6"
    >
      {SOCIAL_LINKS.map((social) => (
        <li key={social.name}>
          <a
            href={social.url}
            target={social.url.startsWith('mailto:') ? undefined : '_blank'}
            rel={
              social.url.startsWith('mailto:') ? undefined : 'noopener noreferrer'
            }
            aria-label={`${social.name}, ${social.url.startsWith('mailto:') ? 'send an email' : `open ${social.name} profile in a new tab`}`}
            className="flex items-center gap-3 px-6 sm:px-8 py-4 bg-dark border border-slate-800 rounded-lg transition-all duration-300 hover:border-primary/60 hover:-translate-y-0.5 text-slate-200 hover:text-white font-semibold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-darker"
          >
            {social.icon}
            <span>{social.name}</span>
          </a>
        </li>
      ))}
    </ul>
  </Reveal>
);

const Footer = () => (
  <Reveal delay={0.15}>
    <footer className="mt-16 md:mt-20 pt-8 border-t border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-sm text-slate-500">
      <p>© {new Date().getFullYear()} Ivan Alexander Velasco Sanchez</p>
      <p>Built with React, Tailwind CSS &amp; Framer Motion</p>
    </footer>
  </Reveal>
);

// --- Main component ---

const Contact = () => {
  return (
    <section
      id="contact"
      aria-labelledby="contact-title"
      className="py-24 md:py-32 px-6 scroll-mt-20"
    >
      <div className="max-w-4xl mx-auto text-center">
        <ContactHeader />
        <SocialLinks />
        <Footer />
      </div>
    </section>
  );
};

export default Contact;
