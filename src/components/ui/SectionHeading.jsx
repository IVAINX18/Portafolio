import Reveal from './Reveal';

/**
 * SectionHeading — consistent section intros across the portfolio.
 * Keeps the original identity: oversized black headings + gradient accent word.
 */
const SectionHeading = ({
  id,
  eyebrow,
  title,
  highlight,
  description,
  align = 'left',
}) => (
  <Reveal
    className={`mb-12 md:mb-16 ${align === 'center' ? 'text-center' : ''}`}
  >
    {eyebrow && (
      <p className="font-mono text-sm tracking-[0.2em] uppercase text-primary mb-4">
        <span aria-hidden="true">{'// '}</span>
        {eyebrow}
      </p>
    )}
    <h2
      id={id}
      className="text-4xl md:text-6xl font-black mb-4 md:mb-6 leading-tight"
    >
      {title} <span className="text-gradient">{highlight}</span>
    </h2>
    {description && (
      <p
        className={`text-lg text-slate-400 leading-relaxed max-w-2xl ${
          align === 'center' ? 'mx-auto' : ''
        }`}
      >
        {description}
      </p>
    )}
  </Reveal>
);

export default SectionHeading;
