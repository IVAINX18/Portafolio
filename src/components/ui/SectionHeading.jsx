import Reveal from './Reveal';

/**
 * SectionHeading: consistent section intros across the portfolio.
 * Plain-language headline + optional description. Hierarchy comes from the
 * display face and vertical rhythm; no decorative eyebrow labels and no
 * gradient word per section (both are the templated-AI default).
 */
const SectionHeading = ({ id, title, description, align = 'left' }) => (
  <Reveal
    className={`mb-12 md:mb-16 ${align === 'center' ? 'text-center' : ''}`}
  >
    <h2
      id={id}
      className="text-3xl sm:text-4xl md:text-5xl font-semibold text-slate-50 mb-4 md:mb-5"
    >
      {title}
    </h2>
    {description && (
      <p
        className={`text-base md:text-lg text-slate-400 leading-relaxed max-w-2xl ${
          align === 'center' ? 'mx-auto' : ''
        }`}
      >
        {description}
      </p>
    )}
  </Reveal>
);

export default SectionHeading;
