/**
 * Cinta de texto en movimiento: dejo dos mitades identicas dentro de un
 * track y desplazo exactamente el 50%, de modo que el bucle no tiene salto.
 * La marco como decorativa porque repite el nombre del producto que ya vive
 * en la seccion de proyectos; es el unico marquee de la pagina y funciona
 * como separador entre bloques.
 */
const Sparkle = () => (
  <svg
    viewBox="0 0 24 24"
    className="h-4 w-4 shrink-0 text-accent md:h-5 md:w-5"
    aria-hidden="true"
  >
    <path
      d="M12 0 C13 7 17 11 24 12 C17 13 13 17 12 24 C11 17 7 13 0 12 C7 11 11 7 12 0 Z"
      fill="currentColor"
    />
  </svg>
);

const Half = ({ text }) => (
  <span className="flex shrink-0">
    {Array.from({ length: 5 }).map((_, index) => (
      <span key={index} className="flex items-center">
        <span className="whitespace-nowrap px-7 font-display uppercase text-4xl leading-none md:text-6xl">
          {text}
        </span>
        <Sparkle />
      </span>
    ))}
  </span>
);

const Marquee = ({ text }) => (
  <div
    aria-hidden="true"
    className="select-none overflow-hidden border-y border-line py-6 md:py-8"
  >
    <div className="marquee-track flex w-max">
      <Half text={text} />
      <Half text={text} />
    </div>
  </div>
);

export default Marquee;
