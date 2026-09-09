import {
  AnimatePresence,
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
} from 'framer-motion';
import { useEffect, useMemo, useState } from 'react';
import { useActiveSection } from '../hooks/useActiveSection';
import { scrollToSection } from '../lib/scroll';

// --- Constants ---
// Order follows the page top-to-bottom: certificates precede skills in About.

const NAV_ITEMS = [
  { id: 'home', label: 'Home', href: '#home' },
  { id: 'projects', label: 'Projects', href: '#projects' },
  { id: 'certificates', label: 'Certificates', href: '#certificates' },
  { id: 'skills', label: 'Skills', href: '#skills' },
  { id: 'contact', label: 'Contact', href: '#contact' },
];

// --- Sub-components ---

const Logo = ({ onNavigate }) => (
  <motion.a
    href="#home"
    onClick={(event) => onNavigate(event, 'home')}
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    aria-label="Ivan Velasco — back to top"
    className="text-2xl font-black rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-darker"
  >
    <span className="text-gradient">IV</span>
  </motion.a>
);

/**
 * Desktop links with a sliding active indicator (spring layout animation).
 * This is the navbar's motion language — "you are navigating the system" —
 * deliberately different from the hero arrow's discovery bob.
 */
const DesktopMenu = ({ activeId, onNavigate }) => (
  <div className="hidden md:flex items-center gap-6 lg:gap-8">
    {NAV_ITEMS.map((item, index) => {
      const isActive = item.id === activeId;
      return (
        <motion.a
          key={item.id}
          href={item.href}
          onClick={(event) => onNavigate(event, item.id)}
          aria-current={isActive ? 'location' : undefined}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.08 }}
          whileHover={{ y: -1 }}
          className={`relative px-1 py-1.5 font-medium transition-colors duration-200 rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-darker ${
            isActive ? 'text-primary' : 'text-slate-300 hover:text-slate-100'
          }`}
        >
          {item.label}
          {isActive && (
            <motion.span
              layoutId="nav-active-underline"
              aria-hidden="true"
              transition={{ type: 'spring', stiffness: 480, damping: 42 }}
              className="absolute -bottom-0.5 left-0 right-0 h-0.5 rounded-full bg-primary"
            />
          )}
        </motion.a>
      );
    })}
  </div>
);

const MobileMenuButton = ({ isOpen, onClick }) => (
  <motion.button
    type="button"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    onClick={onClick}
    aria-expanded={isOpen}
    aria-controls="mobile-menu"
    aria-label={isOpen ? 'Close navigation menu' : 'Open navigation menu'}
    className="md:hidden p-2 -m-2 text-slate-300 hover:text-primary rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
  >
    <svg
      className="w-6 h-6"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      {isOpen ? (
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M6 18L18 6M6 6l12 12"
        />
      ) : (
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M4 6h16M4 12h16M4 18h16"
        />
      )}
    </svg>
  </motion.button>
);

const MobileMenu = ({ isOpen, activeId, onNavigate }) => (
  <AnimatePresence>
    {isOpen && (
      <motion.div
        id="mobile-menu"
        initial={{ opacity: 0, height: 0 }}
        animate={{ opacity: 1, height: 'auto' }}
        exit={{ opacity: 0, height: 0 }}
        transition={{ duration: 0.25, ease: 'easeOut' }}
        className="md:hidden overflow-hidden"
      >
        <ul className="mt-4 pb-4 space-y-1">
          {NAV_ITEMS.map((item, index) => {
            const isActive = item.id === activeId;
            return (
              <li key={item.id}>
                <motion.a
                  href={item.href}
                  onClick={(event) => onNavigate(event, item.id, true)}
                  aria-current={isActive ? 'location' : undefined}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className={`flex items-center gap-3 py-3 px-2 font-medium transition-colors duration-200 rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary ${
                    isActive ? 'text-primary' : 'text-slate-300 hover:text-primary'
                  }`}
                >
                  <span
                    aria-hidden="true"
                    className={`w-1 self-stretch rounded-full transition-colors duration-200 ${
                      isActive ? 'bg-primary' : 'bg-transparent'
                    }`}
                  />
                  {item.label}
                </motion.a>
              </li>
            );
          })}
        </ul>
      </motion.div>
    )}
  </AnimatePresence>
);

/** Scroll-linked progress hairline — transform-only, spring-smoothed. */
const ScrollProgress = () => {
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 140,
    damping: 30,
    mass: 0.4,
  });

  return (
    <motion.div
      aria-hidden="true"
      style={reduceMotion ? { scaleX: 0 } : { scaleX }}
      className="absolute bottom-0 left-0 right-0 h-[2px] origin-left bg-gradient-to-r from-primary via-blue-400 to-cyan-400"
    />
  );
};

// --- Main component ---

const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const sectionIds = useMemo(() => NAV_ITEMS.map((item) => item.id), []);
  const activeId = useActiveSection(sectionIds);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close the mobile menu with Escape for keyboard users
  useEffect(() => {
    if (!isMobileMenuOpen) return;
    const handleKey = (event) => {
      if (event.key === 'Escape') setIsMobileMenuOpen(false);
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [isMobileMenuOpen]);

  const handleNavigate = (event, id, fromMobile = false) => {
    event.preventDefault();
    if (fromMobile) setIsMobileMenuOpen(false);
    // Let the mobile menu collapse before measuring the target position.
    requestAnimationFrame(() => scrollToSection(id));
  };

  return (
    <motion.nav
      aria-label="Primary"
      initial={{ y: -60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled || isMobileMenuOpen
          ? 'bg-darker/95 border-b border-slate-800 backdrop-blur-lg'
          : 'bg-transparent border-b border-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <Logo onNavigate={handleNavigate} />
          <DesktopMenu activeId={activeId} onNavigate={handleNavigate} />
          <MobileMenuButton
            isOpen={isMobileMenuOpen}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          />
        </div>
        <MobileMenu
          isOpen={isMobileMenuOpen}
          activeId={activeId}
          onNavigate={handleNavigate}
        />
      </div>
      <ScrollProgress />
    </motion.nav>
  );
};

export default Navigation;
