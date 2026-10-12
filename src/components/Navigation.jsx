import {
  AnimatePresence,
  motion as Motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useSpring,
} from 'framer-motion';
import { List, X } from '@phosphor-icons/react';
import { useEffect, useMemo, useState } from 'react';
import { useActiveSection } from '../hooks/useActiveSection';
import { scrollToSection } from '../lib/scroll';

// Mantengo el orden del documento para que el indicador activo no salte de
// una seccion a otra saltandose lineas de lectura.
const NAV_ITEMS = [
  { id: 'projects', label: 'Work', href: '#projects' },
  { id: 'about', label: 'About', href: '#about' },
  { id: 'skills', label: 'Toolkit', href: '#skills' },
  { id: 'contact', label: 'Contact', href: '#contact' },
];

// El scrollspy tambien observa el hero para que ningun enlace quede activo
// cuando el visitante esta arriba del todo.
const SECTION_IDS = ['home', ...NAV_ITEMS.map((item) => item.id)];

const Logo = ({ onNavigate }) => (
  <Motion.a
    href="#home"
    onClick={(event) => onNavigate(event, 'home')}
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    aria-label="Ivan Velasco, back to top"
    className="font-display text-lg uppercase leading-none tracking-[0.01em] rounded-sm transition-colors duration-200 hover:text-accent-soft focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-ink"
  >
    Ivan Velasco
  </Motion.a>
);

/**
 * Enlaces de escritorio con indicador deslizante: el subrayado viaja entre
 * secciones con un spring, la misma senal de "estas navegando el sistema"
 * que usaba la version anterior, ahora en clave de rotulo mono.
 */
const DesktopMenu = ({ activeId, onNavigate }) => (
  <div className="hidden md:flex items-center gap-7 lg:gap-9">
    {NAV_ITEMS.map((item, index) => {
      const isActive = item.id === activeId;
      return (
        <Motion.a
          key={item.id}
          href={item.href}
          onClick={(event) => onNavigate(event, item.id)}
          aria-current={isActive ? 'location' : undefined}
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.06 }}
          className={`relative px-1 py-1.5 font-mono text-[11px] uppercase tracking-[0.16em] transition-colors duration-200 rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-ink ${
            isActive ? 'text-accent-soft' : 'text-bone-dim hover:text-bone'
          }`}
        >
          {item.label}
          {isActive && (
            <Motion.span
              layoutId="nav-active-underline"
              aria-hidden="true"
              transition={{ type: 'spring', stiffness: 480, damping: 42 }}
              className="absolute -bottom-0.5 left-0 right-0 h-px bg-accent"
            />
          )}
        </Motion.a>
      );
    })}
  </div>
);

const MobileMenuButton = ({ isOpen, onClick }) => (
  <Motion.button
    type="button"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    onClick={onClick}
    aria-expanded={isOpen}
    aria-controls="mobile-menu"
    aria-label={isOpen ? 'Close navigation menu' : 'Open navigation menu'}
    className="md:hidden p-2 -m-2 text-bone hover:text-accent-soft rounded-md transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
  >
    {isOpen ? (
      <X className="w-6 h-6" weight="bold" aria-hidden="true" />
    ) : (
      <List className="w-6 h-6" weight="bold" aria-hidden="true" />
    )}
  </Motion.button>
);

/**
 * Menu movil a pantalla completa: los enlaces entran como lineas de cartel
 * y dejo abajo los canales de contacto para no obligar a un viaje extra.
 */
const MobileMenu = ({ isOpen, activeId, onNavigate }) => {
  const reduce = useReducedMotion();

  return (
    <AnimatePresence>
      {isOpen && (
        <Motion.div
          id="mobile-menu"
          initial={reduce ? { opacity: 0 } : { opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25, ease: 'easeOut' }}
          className="fixed inset-0 z-40 flex flex-col justify-between bg-ink px-5 pb-10 pt-28 md:hidden"
        >
          <ul className="space-y-1">
            {NAV_ITEMS.map((item, index) => {
              const isActive = item.id === activeId;
              return (
                <li key={item.id} className="overflow-hidden">
                  <Motion.a
                    href={item.href}
                    onClick={(event) => onNavigate(event, item.id, true)}
                    aria-current={isActive ? 'location' : undefined}
                    initial={reduce ? false : { y: '110%' }}
                    animate={{ y: '0%' }}
                    exit={reduce ? undefined : { y: '110%' }}
                    transition={{
                      duration: 0.5,
                      delay: reduce ? 0 : 0.06 + index * 0.05,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                    className={`block font-display uppercase text-5xl leading-[1.05] ${
                      isActive ? 'text-accent-soft' : 'text-bone'
                    }`}
                  >
                    {item.label}
                  </Motion.a>
                </li>
              );
            })}
          </ul>

          <div className="space-y-4 font-mono text-[11px] uppercase tracking-[0.16em] text-bone-faint">
            <a
              href="mailto:ivanvelascosanchez74@gmail.com"
              className="link-underline block text-bone-dim"
            >
              ivanvelascosanchez74@gmail.com
            </a>
            <div className="flex gap-6">
              <a
                href="https://github.com/IVAINX18"
                target="_blank"
                rel="noopener noreferrer"
                className="link-underline text-bone-dim"
              >
                GitHub
              </a>
              <a
                href="https://www.linkedin.com/in/ivan-velasco-660a512bb/"
                target="_blank"
                rel="noopener noreferrer"
                className="link-underline text-bone-dim"
              >
                LinkedIn
              </a>
            </div>
          </div>
        </Motion.div>
      )}
    </AnimatePresence>
  );
};

/** Hairline de progreso de lectura: transform-only y suavizado con spring. */
const ScrollProgress = () => {
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 140,
    damping: 30,
    mass: 0.4,
  });

  return (
    <Motion.div
      aria-hidden="true"
      style={reduceMotion ? { scaleX: 0 } : { scaleX }}
      className="absolute bottom-0 left-0 right-0 h-px origin-left bg-accent"
    />
  );
};

// --- Main component ---

const Navigation = () => {
  // Estado inicial perezoso para recargas a mitad de pagina.
  const [isScrolled, setIsScrolled] = useState(() => window.scrollY > 40);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const sectionIds = useMemo(() => SECTION_IDS, []);
  const activeId = useActiveSection(sectionIds);
  const { scrollY } = useScroll();

  // El estado de scroll llega por motion value: solo re-renderiza cuando el
  // umbral booleano cambia, sin listener global de scroll.
  useMotionValueEvent(scrollY, 'change', (latest) => {
    setIsScrolled(latest > 40);
  });

  // Bloqueo el scroll del fondo mientras el menu movil esta abierto; es una
  // decision de experiencia, no una necesidad tecnica.
  useEffect(() => {
    if (!isMobileMenuOpen) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = previous;
    };
  }, [isMobileMenuOpen]);

  // Cierre con Escape para teclado.
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
    // Dejo que el menu colapse antes de medir la posicion destino.
    requestAnimationFrame(() => scrollToSection(id));
  };

  return (
    <>
      <Motion.nav
      aria-label="Primary"
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className={`fixed top-0 left-0 right-0 z-50 border-b transition-colors duration-300 ${
        isScrolled || isMobileMenuOpen
          ? 'bg-ink/85 border-line backdrop-blur-md'
          : 'bg-transparent border-transparent'
      }`}
    >
      <div className="mx-auto flex h-16 max-w-[1400px] items-center justify-between px-5 sm:px-8">
        <Logo onNavigate={handleNavigate} />
        <DesktopMenu activeId={activeId} onNavigate={handleNavigate} />
        <MobileMenuButton
          isOpen={isMobileMenuOpen}
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        />
      </div>
      <ScrollProgress />
      </Motion.nav>

      {/* Mantengo el menu fuera del <nav> a proposito: el backdrop-blur del
          nav crea un containing block y el overlay fijo se anclaria al
          header en vez de al viewport; como hermano, cubre toda la pantalla. */}
      <MobileMenu
        isOpen={isMobileMenuOpen}
        activeId={activeId}
        onNavigate={handleNavigate}
      />
    </>
  );
};

export default Navigation;
