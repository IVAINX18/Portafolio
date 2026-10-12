import Reveal from './Reveal';

/**
 * Titulo de seccion: una sola idea por bloque. Dejo que Anton cargue todo
 * el peso visual y mantengo la descripcion en Inter con un ancho maximo de
 * lectura comoda. No uso etiquetas decorativas encima del titulo porque el
 * propio titulo ya situa la seccion.
 */
const SectionHeading = ({ id, title, description, align = 'left' }) => (
  <Reveal
    className={`mb-14 md:mb-20 ${align === 'center' ? 'text-center' : ''}`}
  >
    <h2
      id={id}
      className="font-display uppercase leading-[0.92] text-[clamp(2.4rem,7vw,5.5rem)] mb-5"
    >
      {title}
    </h2>
    {description && (
      <p
        className={`text-base md:text-lg text-bone-dim leading-relaxed max-w-[54ch] ${
          align === 'center' ? 'mx-auto' : ''
        }`}
      >
        {description}
      </p>
    )}
  </Reveal>
);

export default SectionHeading;
