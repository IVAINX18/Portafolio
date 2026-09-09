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
            initial: { opacity: 0, x: -50 },
            animate: { opacity: 1, x: 0 },
            transition: { duration: 0.8, ease: 'easeOut' },
          })}
      className="order-2 lg:order-1"
    >
      <motion.p
        {...fade(0.3)}
        className="text-primary text-lg md:text-xl font-mono mb-4"
      >
        Hi, I&apos;m
      </motion.p>

      <motion.h1
        id="hero-heading"
        {...fade(0.4)}
        className="text-5xl md:text-7xl lg:text-8xl font-black mb-6 leading-[1.05] text-balance"
      >
        Ivan Alexander <br />
        <span className="text-gradient">Velasco Sanchez</span>
      </motion.h1>

      <motion.p
        {...fade(0.6)}
        className="text-lg md:text-xl text-slate-400 mb-8 max-w-2xl leading-relaxed"
      >
        Systems Engineer &amp; Web Developer crafting innovative digital
        experiences with a focus on security and modern design.
      </motion.p>

      <motion.div
        {...fade(0.8)}
        className="flex flex-wrap gap-4"
      >
        <a
          href="#projects"
          onClick={(event) => {
            event.preventDefault();
            scrollToSection('projects');
          }}
          className="px-8 py-4 bg-primary hover:bg-sky-400 text-darker font-semibold rounded-lg transition-all duration-300 hover:shadow-xl hover:shadow-primary/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-darker"
        >
          View My Work
        </a>
        <a
          href="#contact"
          onClick={(event) => {
            event.preventDefault();
            scrollToSection('contact');
          }}
          className="px-8 py-4 border-2 border-primary hover:bg-primary/10 text-primary font-semibold rounded-lg transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-darker"
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
          initial: { opacity: 0, scale: 0.92 },
          animate: { opacity: 1, scale: 1 },
          transition: { duration: 0.8, delay: 0.2, ease: 'easeOut' },
        })}
    className="order-1 lg:order-2 flex justify-center"
  >
    <div className="relative">
      <motion.div
        {...(reduceMotion
          ? {}
          : {
              animate: { scale: [1, 1.03, 1] },
              transition: {
                duration: 6,
                repeat: Infinity,
                ease: 'easeInOut',
              },
            })}
        className="relative z-10"
      >
        <div className="w-52 h-52 sm:w-64 sm:h-64 md:w-80 md:h-80 lg:w-96 lg:h-96 rounded-full overflow-hidden border-4 border-primary shadow-2xl shadow-primary/40">
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
      </motion.div>

      <div
        aria-hidden="true"
        className={`absolute inset-0 rounded-full bg-primary/20 blur-3xl ${
          reduceMotion ? 'opacity-30' : 'animate-pulse-glow'
        }`}
      />
    </div>
  </motion.div>
);

/**
 * Discovery arrow — its own motion language ("keep exploring down"):
 * a slow organic vertical drift, a hover lift and a press dip on click,
 * then a designed glide into the next section. Deliberately different
 * from the navbar's sliding active indicator.
 */
const ScrollIndicator = ({ reduceMotion }) => (
  <motion.div
    {...(reduceMotion ? {} : { initial: { opacity: 0 }, animate: { opacity: 1 }, transition: { delay: 1.2 } })}
    className="mt-12 md:mt-20 text-center"
  >
    <a
      href="#projects"
      onClick={(event) => {
        event.preventDefault();
        scrollToSection('projects');
      }}
      aria-label="Scroll down to featured projects"
      className="group inline-block p-3 rounded-full text-primary transition-all duration-300 hover:text-sky-300 hover:-translate-y-0.5 active:translate-y-0 active:scale-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-darker"
    >
      <span
        aria-hidden="true"
        className={`block ${reduceMotion ? '' : 'animate-discover'}`}
      >
        <svg
          className="w-8 h-8 mx-auto transition-transform duration-300 group-hover:scale-110"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 14l-7 7m0 0l-7-7m7 7V3"
          />
        </svg>
      </span>
    </a>
  </motion.div>
);

// --- Main component ---

const Hero = () => {
  const reduceMotion = useReducedMotion();

  return (
    <section
      id="home"
      aria-labelledby="hero-heading"
      className="min-h-screen flex items-center justify-center px-6 pt-24 pb-14 md:py-20 scroll-mt-20"
    >
      <div className="max-w-6xl mx-auto w-full">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          <HeroContent reduceMotion={reduceMotion} />
          <ProfileImage reduceMotion={reduceMotion} />
        </div>
        <ScrollIndicator reduceMotion={reduceMotion} />
      </div>
    </section>
  );
};

export default Hero;
