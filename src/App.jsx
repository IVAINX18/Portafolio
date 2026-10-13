import Navigation from './components/Navigation';
import Hero from './components/Hero';
import Work from './components/Work';
import Publications from './components/Publications';
import About from './components/About';
import Skills from './components/Skills';
import Contact from './components/Contact';
import Marquee from './components/ui/Marquee';

// El orden de las secciones es la narrativa de la pagina: presentacion,
// trabajo, investigacion, perfil, herramientas y cierre. La cinta marquee
// (unica en la pagina) separa el bloque de trabajo del resto.
function App() {
  return (
    <div className="min-h-[100dvh] bg-ink">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:px-5 focus:py-3 focus:bg-accent focus:text-ink focus:font-mono focus:text-xs focus:uppercase focus:tracking-[0.14em] focus:rounded-full"
      >
        Skip to main content
      </a>
      <Navigation />
      <main id="main-content">
        <Hero />
        <Work />
        <Marquee
          items={[
            'Shadow-Net: Defender',
            'Shadow-Net: Bills',
            'Shadow-Net: StockFlow',
          ]}
        />
        <Publications />
        <About />
        <Skills />
        <Contact />
      </main>
    </div>
  );
}

export default App;
