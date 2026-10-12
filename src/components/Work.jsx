import { featuredProjects, notableProjects } from '../data/projects';
import FlagshipProject from './projects/FlagshipProject';
import ProjectEntry from './projects/ProjectEntry';
import SectionHeading from './ui/SectionHeading';

/**
 * Selected work: el flagship abre con la composicion mas grande; el bloque
 * "More work" es un libro mayor editorial a todo el ancho (etiqueta con
 * hairline a borde derecho y filas separadas por hairlines), asi ninguna
 * entrada vuelve a leerse como una columna central estrecha.
 */
const Work = () => (
  <section
    id="projects"
    aria-labelledby="work-title"
    className="scroll-mt-20 px-5 pb-20 pt-24 sm:px-8 md:pb-28 md:pt-36"
  >
    <div className="mx-auto max-w-[1400px]">
      <SectionHeading
        id="work-title"
        title="Selected work"
        description="Flagship systems and smaller builds, each with its real links and an honest label of what it is."
      />

      {featuredProjects.map((project) => (
        <FlagshipProject key={project.id} project={project} />
      ))}

      <div className="mt-24 md:mt-32">
        {/* Etiqueta flotante convertida en regla a todo el ancho: su borde
            inferior es el hairline de apertura de la primera fila. */}
        <div className="border-b border-line pb-4">
          <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-bone-faint">
            More work
          </p>
        </div>
        <div>
          {notableProjects.map((project) => (
            <ProjectEntry key={project.id} project={project} />
          ))}
        </div>
      </div>
    </div>
  </section>
);

export default Work;
