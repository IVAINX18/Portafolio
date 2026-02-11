import { motion, useScroll, useTransform } from 'framer-motion';
import { useState, useEffect } from 'react';

// --- Constants ---

const NAV_ITEMS = [
  { label: 'Home', href: '#home' },
  { label: 'Projects', href: '#projects' },
  { label: 'About', href: '#about' },
  { label: 'Contact', href: '#contact' }
];

// --- Sub-components ---

const Logo = () => (
  <motion.a
    href="#home"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    className="text-2xl font-black"
  >
    <span className="text-gradient">IV</span>
  </motion.a>
);

const DesktopMenu = () => (
  <div className="hidden md:flex items-center gap-8">
    {NAV_ITEMS.map((item, index) => (
      <motion.a
        key={index}
        href={item.href}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: index * 0.1 }}
        whileHover={{ scale: 1.05 }}
        className="text-slate-300 hover:text-primary font-medium transition-colors duration-200 relative group"
      >
        {item.label}
        <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full" />
      </motion.a>
    ))}
  </div>
);

const MobileMenuButton = ({ isOpen, onClick }) => (
  <motion.button
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    onClick={onClick}
    className="md:hidden p-2 text-slate-300 hover:text-primary"
  >
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      {isOpen ? (
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
      ) : (
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
      )}
    </svg>
  </motion.button>
);

const MobileMenu = ({ isOpen, onClose }) => (
  <>
    {isOpen && (
      <motion.div
        initial={{ opacity: 0, height: 0 }}
        animate={{ opacity: 1, height: 'auto' }}
        exit={{ opacity: 0, height: 0 }}
        className="md:hidden mt-4 pb-4"
      >
        {NAV_ITEMS.map((item, index) => (
          <motion.a
            key={index}
            href={item.href}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            onClick={onClose}
            className="block py-3 text-slate-300 hover:text-primary font-medium transition-colors duration-200"
          >
            {item.label}
          </motion.a>
        ))}
      </motion.div>
    )}
  </>
);

// --- Main Component ---

const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { scrollY } = useScroll();
  const navBackground = useTransform(
    scrollY,
    [0, 100],
    ['rgba(2, 6, 23, 0)', 'rgba(2, 6, 23, 0.95)']
  );

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.nav
      style={{ backgroundColor: navBackground }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'border-b border-slate-800 backdrop-blur-lg' : ''
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
