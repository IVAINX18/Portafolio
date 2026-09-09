import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useState } from 'react';

// --- Constants ---

const NAV_ITEMS = [
  { label: 'Home', href: '#home' },
  { label: 'Projects', href: '#projects' },
  { label: 'About', href: '#about' },
  { label: 'Contact', href: '#contact' },
];

// --- Sub-components ---

const Logo = () => (
  <motion.a
    href="#home"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    aria-label="Ivan Velasco — back to top"
    className="text-2xl font-black rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-darker"
  >
    <span className="text-gradient">IV</span>
  </motion.a>
);

const DesktopMenu = () => (
  <div className="hidden md:flex items-center gap-8">
    {NAV_ITEMS.map((item, index) => (
      <motion.a
        key={item.href}
        href={item.href}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: index * 0.1 }}
        whileHover={{ scale: 1.05 }}
        className="nav-link text-slate-300 hover:text-primary font-medium transition-colors duration-200 relative group rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-darker"
      >
        {item.label}
        <span
          aria-hidden="true"
          className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full group-focus-visible:w-full"
        />
      </motion.a>
    ))}
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

const MobileMenu = ({ isOpen, onClose }) => (
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
          {NAV_ITEMS.map((item, index) => (
            <li key={item.href}>
              <motion.a
                href={item.href}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.06 }}
                onClick={onClose}
                className="block py-3 px-1 text-slate-300 hover:text-primary font-medium transition-colors duration-200 rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
              >
                {item.label}
              </motion.a>
            </li>
          ))}
        </ul>
      </motion.div>
    )}
  </AnimatePresence>
);

// --- Main component ---

const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

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
          <Logo />
          <DesktopMenu />
          <MobileMenuButton
            isOpen={isMobileMenuOpen}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          />
        </div>
        <MobileMenu
          isOpen={isMobileMenuOpen}
          onClose={() => setIsMobileMenuOpen(false)}
        />
      </div>
    </motion.nav>
  );
};

export default Navigation;
