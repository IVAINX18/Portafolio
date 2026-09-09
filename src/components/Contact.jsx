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
      <svg
        className="w-6 h-6"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        aria-hidden="true"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
        />
      </svg>
    ),
  },
];

// --- Sub-components ---

const ContactHeader = () => (
  <Reveal>
    <p className="font-mono text-sm tracking-[0.2em] uppercase text-primary mb-4">
      <span aria-hidden="true">{'// '}</span>Contact
    </p>
    <h2 id="contact-title" className="text-5xl md:text-7xl font-black mb-6">
      Let&apos;s <span className="text-gradient">Connect</span>
    </h2>
    <p className="text-lg md:text-xl text-slate-400 mb-12 max-w-2xl mx-auto leading-relaxed">
      I&apos;m always open to discussing new projects, creative ideas, or
      opportunities to be part of your vision.
    </p>
  </Reveal>
);

const ContactHighlight = () => (
  <Reveal delay={0.1}>
    <div className="bg-dark border border-slate-800 rounded-2xl p-8 sm:p-12 mb-12">
      <div className="flex flex-col items-center gap-6 sm:gap-8">
        <div aria-hidden="true" className="p-6 bg-primary/10 rounded-full">
          <svg
            className="w-12 h-12 text-primary"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
            />
          </svg>
        </div>
        <div>
          <h3 className="text-2xl font-bold mb-3">Get In Touch</h3>
          <p className="text-slate-400">
            Feel free to reach out through any of these platforms
          </p>
        </div>
      </div>
    </div>
  </Reveal>
);

const SocialLinks = () => (
  <Reveal delay={0.15}>
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
            aria-label={`${social.name} — ${social.url.startsWith('mailto:') ? 'send an email' : `open ${social.name} profile in a new tab`}`}
            className="flex items-center gap-3 px-6 sm:px-8 py-4 bg-dark border-2 border-slate-800 rounded-lg transition-all duration-300 hover:border-primary hover:-translate-y-0.5 text-slate-200 hover:text-white font-semibold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-darker"
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
  <Reveal delay={0.2}>
    <footer className="mt-16 md:mt-20 pt-8 border-t border-slate-800">
      <p className="text-slate-400 text-sm">
        Built with React, TailwindCSS &amp; Framer Motion
      </p>
      <p className="text-slate-400 text-sm mt-2">
        © 2024 Ivan Alexander Velasco Sanchez. All rights reserved.
      </p>
    </footer>
  </Reveal>
);

// --- Main component ---

const Contact = () => {
  return (
    <section
      id="contact"
      aria-labelledby="contact-title"
      className="py-20 md:py-28 px-6 scroll-mt-20"
    >
      <div className="max-w-4xl mx-auto text-center">
        <ContactHeader />
        <ContactHighlight />
        <SocialLinks />
        <Footer />
      </div>
    </section>
  );
};

export default Contact;
