import Navigation from './components/Navigation';
import Hero from './components/Hero';
import FeaturedProjects from './components/FeaturedProjects';
import OtherProjects from './components/OtherProjects';
import Publications from './components/Publications';
import About from './components/About';
import Contact from './components/Contact';

function App() {
  return (
    <div className="min-h-screen bg-darker">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:px-5 focus:py-3 focus:bg-primary focus:text-darker focus:font-semibold focus:rounded-lg"
      >
        Skip to main content
      </a>
      <Navigation />
      <main id="main-content">
        <Hero />
        <FeaturedProjects />
        <OtherProjects />
        <Publications />
        <About />
        <Contact />
      </main>
    </div>
  );
}

export default App;
