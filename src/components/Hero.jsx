import { ArrowDown } from '@phosphor-icons/react';
import { motion as Motion, useReducedMotion } from 'framer-motion';
import { scrollToSection } from '../lib/scroll';

/**
 * Hero editorial: el nombre funciona como cartel y cada linea emerge desde
 * una mascara, como si la pagina se compusiera frente al visitante. Cuando
 * el sistema pide menos movimiento, todo aparece ya colocado.
 */
const maskLine = (reduce, delay) =>
  reduce
    ? {}
    : {
        initial: { y: '110%' },
        animate: { y: '0%' },
        transition: { duration: 0.9, delay, ease: [0.22, 1, 0.36, 1] },
      };

const fade = (reduce, delay, y = 16) =>
  reduce
    ? {}
    : {
        initial: { opacity: 0, y },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.7, delay, ease: 'easeOut' },
      };

const Hero = () => {
  const reduce = useReducedMotion();

  const go = (id) => (event) => {
    event.preventDefault();
    scrollToSection(id);
  };

  return (
    <section
      id="home"
      aria-labelledby="hero-heading"
      className="relative flex min-h-[100dvh] flex-col justify-end overflow-hidden px-5 pb-10 pt-28 sm:px-8 md:pb-14"
    >
      <div className="mx-auto w-full max-w-[1400px]">
        {/* Ficha de identidad en una linea, como el pie de un cartel */}
        <Motion.p
          {...fade(reduce, 0.1, 8)}
          className="mb-6 font-mono text-[11px] uppercase tracking-[0.18em] text-bone-faint md:mb-10"
        >
          Ivan Alexander Velasco Sanchez
        </Motion.p>

        <h1
          id="hero-heading"
          className="font-display uppercase leading-[0.86] text-[clamp(3.6rem,22vw,12.5rem)]"
        >
          <span className="block overflow-hidden">
            <Motion.span className="block" {...maskLine(reduce, 0.15)}>
              Ivan
            </Motion.span>
          </span>
          <span className="relative block overflow-hidden">
            <Motion.span className="block" {...maskLine(reduce, 0.25)}>
              Velasco
            </Motion.span>
            {/* Subrayado imperfecto: un solo trazo a mano que firma el nombre.
                Lo dibujo como SVG porque un border no puede curvarse. */}
            <Motion.svg
              {...fade(reduce, 0.9, 0)}
              aria-hidden="true"
              viewBox="0 0 300 12"
              preserveAspectRatio="none"
              className="absolute bottom-[8%] left-[1%] h-[8px] w-[52%]"
            >
              <path
                d="M4 8 C 70 3, 160 11, 296 5"
                fill="none"
                stroke="#38bdf8"
                strokeWidth="3"
                strokeLinecap="round"
              />
            </Motion.svg>
          </span>
        </h1>

        <div className="mt-10 grid items-end gap-10 md:mt-14 lg:grid-cols-12 lg:gap-8">
          <div className="order-2 lg:order-1 lg:col-span-7">
            <Motion.p
              {...fade(reduce, 0.55)}
              className="mb-8 max-w-[46ch] font-sans text-lg leading-relaxed text-bone-dim md:text-xl"
            >
              Systems Engineering student building AI-powered security tools
              and web products. Creator of Shadow-Net Technologies.
            </Motion.p>
            <Motion.div
              {...fade(reduce, 0.7)}
              className="flex flex-wrap items-center gap-4"
            >
              <a
                href="#projects"
                onClick={go('projects')}
                className="group inline-flex items-center gap-3 rounded-full bg-accent px-6 py-3.5 font-mono text-xs uppercase tracking-[0.14em] text-ink transition-colors duration-300 hover:bg-accent-soft active:translate-y-px focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-ink"
              >
                See selected work
                <ArrowDown
                  className="h-4 w-4 transition-transform duration-300 group-hover:translate-y-0.5"
                  weight="bold"
                  aria-hidden="true"
                />
              </a>
              <a
                href="#contact"
                onClick={go('contact')}
                className="inline-flex items-center gap-3 rounded-full border border-line px-6 py-3.5 font-mono text-xs uppercase tracking-[0.14em] text-bone transition-colors duration-300 hover:border-accent/60 hover:text-accent-soft active:translate-y-px focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-ink"
              >
                Get in touch
              </a>
            </Motion.div>
          </div>

          <Motion.div
            {...fade(reduce, 0.45, 24)}
            className="order-1 flex lg:order-2 lg:col-span-5 lg:justify-end"
          >
            {/* El retrato va montado como una placa: marco fino, leve giro y
                pie en mono, para que se lea como material de archivo. */}
            <figure className="w-52 -rotate-[1.5deg] sm:w-60 md:w-72">
              <div className="border border-line bg-ink-2 p-2">
                <img
                  src="/FotoPerfil.png"
                  alt="Portrait of Ivan Alexander Velasco Sanchez"
                  width={384}
                  height={384}
                  fetchPriority="high"
                  decoding="async"
                  className="h-auto w-full"
                />
              </div>
              <figcaption className="mt-2 font-mono text-[11px] uppercase tracking-[0.14em] text-bone-faint">
                Ivan Velasco, portrait
              </figcaption>
            </figure>
          </Motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
