import { motion, useReducedMotion } from 'framer-motion';

/**
 * Reveal — single reusable scroll-reveal wrapper.
 * Replaces the duplicated initial/whileInView props scattered across sections.
 *
 * - Fades + rises subtly (no layout shift: transform + opacity only)
 * - Fires once, with a small viewport margin so content is visible before it
 *   reaches the very edge of the screen
 * - Respects prefers-reduced-motion: renders statically with no animation
 */
const Reveal = ({
  children,
  delay = 0,
  y = 24,
  className = '',
  as = 'div',
}) => {
  const reduceMotion = useReducedMotion();
  const Component = motion[as] || motion.div;

  if (reduceMotion) {
    const Static = as;
    return <Static className={className}>{children}</Static>;
  }

  return (
    <Component
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.6, delay, ease: 'easeOut' }}
      className={className}
    >
      {children}
    </Component>
  );
};

export default Reveal;
