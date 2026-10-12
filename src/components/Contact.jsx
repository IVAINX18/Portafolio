import {
  ArrowUpRight,
  EnvelopeSimple,
  GithubLogo,
  LinkedinLogo,
} from '@phosphor-icons/react';
import Reveal from './ui/Reveal';

// Canales reales de contacto. Los declaro como datos para que anadir uno
// nuevo solo requiera una linea y el render no cambie.
const CONTACT_CHANNELS = [
  {
    name: 'GitHub',
    url: 'https://github.com/IVAINX18',
    external: true,
    icon: GithubLogo,
  },
  {
    name: 'LinkedIn',
    url: 'https://www.linkedin.com/in/ivan-velasco-660a512bb/',
    external: true,
    icon: LinkedinLogo,
  },
  {
    name: 'Email',
    url: 'mailto:ivanvelascosanchez74@gmail.com',
    external: false,
    icon: EnvelopeSimple,
  },
];

const FOOTER_LINKS = [
  { label: 'Work', href: '#projects' },
  { label: 'About', href: '#about' },
  { label: 'Toolkit', href: '#skills' },
  { label: 'Back to top', href: '#home' },
];

const Footer = () => (
  <Reveal delay={0.15}>
    <footer className="mt-24 flex flex-col gap-6 border-t border-line pt-8 font-mono text-[11px] uppercase tracking-[0.14em] text-bone-faint md:flex-row md:items-center md:justify-between">
      <p>© {new Date().getFullYear()} Ivan Alexander Velasco Sanchez</p>
      <nav aria-label="Footer" className="flex flex-wrap gap-6">
        {FOOTER_LINKS.map((link) => (
          <a
            key={link.href}
            href={link.href}
            className="link-underline transition-colors hover:text-bone"
          >
            {link.label}
          </a>
        ))}
      </nav>
      <p>Built with React, Tailwind CSS and Framer Motion</p>
    </footer>
  </Reveal>
);

/**
 * Contact: cierre de cartel. El titular vuelve a la escala del hero y los
 * canales van como un indice tipografico grande, no como una fila de
 * botones, para que la pagina termine en el mismo idioma con el que empezo.
 */
const Contact = () => {
  return (
    <section
      id="contact"
      aria-labelledby="contact-title"
      className="scroll-mt-20 border-t border-line px-5 pb-12 pt-24 sm:px-8 md:pt-36"
    >
      <div className="mx-auto max-w-[1400px]">
        <Reveal>
          <h2
            id="contact-title"
            className="mb-8 font-display uppercase leading-[0.9] text-[clamp(3rem,11vw,9rem)]"
          >
            Let&apos;s talk
          </h2>
        </Reveal>

        <Reveal delay={0.05}>
          <p className="mb-14 max-w-[52ch] text-lg leading-relaxed text-bone-dim">
            I am open to internships, junior roles and collaborations on
            security or web projects. Email is the fastest way to reach me.
          </p>
        </Reveal>

        <ul className="border-b border-line">
          {CONTACT_CHANNELS.map((channel, index) => {
            const Icon = channel.icon;
            return (
              <li key={channel.name} className="border-t border-line">
                <Reveal delay={0.05 + index * 0.05}>
                  <a
                    href={channel.url}
                    target={channel.external ? '_blank' : undefined}
                    rel={channel.external ? 'noopener noreferrer' : undefined}
                    aria-label={
                      channel.external
                        ? `${channel.name}, open profile in a new tab`
                        : 'Email, send a message'
                    }
                    className="group flex items-center justify-between gap-6 py-6 md:py-8"
                  >
                    <span className="flex items-center gap-5">
                      <Icon
                        className="h-6 w-6 shrink-0 text-accent md:h-7 md:w-7"
                        aria-hidden="true"
                      />
                      <span className="font-display uppercase text-3xl leading-none transition-colors duration-300 group-hover:text-accent-soft md:text-5xl">
                        {channel.name}
                      </span>
                    </span>
                    <ArrowUpRight
                      className="h-6 w-6 shrink-0 text-bone-faint transition-all duration-300 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-accent-soft"
                      weight="bold"
                      aria-hidden="true"
                    />
                  </a>
                </Reveal>
              </li>
            );
          })}
        </ul>

        <Footer />
      </div>
    </section>
  );
};

export default Contact;
