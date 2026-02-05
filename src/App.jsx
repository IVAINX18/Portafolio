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
      <Navigation />
      <main>
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
