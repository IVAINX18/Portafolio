import { motion, useReducedMotion } from 'framer-motion';
import { scrollToSection } from '../lib/scroll';

// --- Sub-components ---

const HeroContent = ({ reduceMotion }) => {
  const fade = (delay) =>
    reduceMotion
      ? {}
      : {
          initial: { opacity: 0, y: 20 },
          animate: { opacity: 1, y: 0 },
          transition: { delay, duration: 0.6, ease: 'easeOut' },
        };

  return (
    <motion.div
      {...(reduceMotion
        ? {}
        : {
            initial: { opacity: 0, y: 24 },
            animate: { opacity: 1, y: 0 },
            transition: { duration: 0.7, ease: 'easeOut' },
          })}
      className="order-2 lg:order-1"
    >
      <motion.p
        {...fade(0.25)}
        className="text-primary font-mono text-sm md:text-base tracking-wide mb-4"
      >
        Hi, I&apos;m
      </motion.p>

      <motion.h1
        id="hero-heading"
        {...fade(0.35)}
        className="text-[2.6rem] sm:text-6xl lg:text-7xl font-semibold leading-[1.08] mb-6"
      >
        Ivan Alexander <br />
        <span className="text-gradient">Velasco Sanchez</span>
      </motion.h1>

      <motion.p
        {...fade(0.5)}
        className="text-lg md:text-xl text-slate-400 mb-10 max-w-xl leading-relaxed"
      >
        Systems Engineer &amp; Web Developer focused on cybersecurity and
        applied machine learning, building secure products from model to
        interface.
      </motion.p>

      <motion.div {...fade(0.65)} className="flex flex-wrap gap-4">
        <a
          href="#projects"
          onClick={(event) => {
            event.preventDefault();
            scrollToSection('projects');
          }}
          className="px-7 py-3.5 bg-primary hover:bg-sky-400 text-darker font-semibold rounded-lg transition-all duration-300 hover:shadow-xl hover:shadow-primary/40 active:translate-y-px focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-darker"
        >
          View My Work
        </a>
        <a
          href="#contact"
          onClick={(event) => {
            event.preventDefault();
            scrollToSection('contact');
          }}
          className="px-7 py-3.5 border-2 border-primary hover:bg-primary/10 text-primary font-semibold rounded-lg transition-all duration-300 active:translate-y-px focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-darker"
        >
          Get In Touch
        </a>
      </motion.div>
    </motion.div>
  );
};

const ProfileImage = ({ reduceMotion }) => (
  <motion.div
    {...(reduceMotion
      ? {}
      : {
          initial: { opacity: 0, scale: 0.94 },
          animate: { opacity: 1, scale: 1 },
          transition: { duration: 0.7, delay: 0.15, ease: 'easeOut' },
        })}
    className="order-1 lg:order-2 flex justify-center"
  >
    <div className="relative">
      <div
        aria-hidden="true"
        className="absolute inset-0 rounded-full bg-primary/20 blur-3xl"
      />
      <div className="relative z-10 w-52 h-52 sm:w-64 sm:h-64 md:w-80 md:h-80 lg:w-96 lg:h-96 rounded-full overflow-hidden border-2 border-primary/60 shadow-2xl shadow-primary/25">
        <img
          src="/FotoPerfil.png"
          alt="Portrait of Ivan Alexander Velasco Sanchez"
          width={384}
          height={384}
          fetchPriority="high"
          decoding="async"
          className="w-full h-full object-cover"
        />
      </div>
    </div>
  </motion.div>
);

// --- Main component ---

const Hero = () => {
  const reduceMotion = useReducedMotion();

  return (
    // min-h-[100dvh] (not h-screen): stable viewport height on mobile Safari.
    <section
      id="home"
      aria-labelledby="hero-heading"
      className="min-h-[100dvh] flex items-center px-6 pt-24 pb-16 md:py-24 scroll-mt-20"
    >
      <div className="max-w-6xl mx-auto w-full">
        <div className="grid lg:grid-cols-[1.15fr_1fr] gap-10 lg:gap-14 items-center">
          <HeroContent reduceMotion={reduceMotion} />
          <ProfileImage reduceMotion={reduceMotion} />
        </div>
      </div>
    </section>
  );
};

export default Hero;
