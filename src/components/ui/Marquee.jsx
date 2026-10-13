/**
 * Cinta de texto en movimiento: dejo dos mitades identicas dentro de un
 * track y desplazo exactamente el 50%, de modo que el bucle no tiene salto.
 * Cada mitad repite dos veces la secuencia de titulos de la familia: con ese
 * ancho alcanza para cubrir la ventana y el loop sigue siendo continuo.
 * La marco como decorativa porque repite nombres que ya viven en la seccion
 * de proyectos; es el unico marquee de la pagina y funciona como separador
 * entre bloques.
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

const Half = ({ items }) => (
  <span className="flex shrink-0">
    {Array.from({ length: 2 }).map((_, groupIndex) => (
      <span key={groupIndex} className="flex items-center">
        {items.map((text) => (
          <span key={text} className="flex items-center">
            <span className="whitespace-nowrap px-7 font-display uppercase text-4xl leading-none md:text-6xl">
              {text}
            </span>
            <Sparkle />
          </span>
        ))}
      </span>
    ))}
  </span>
);

const Marquee = ({ items }) => (
  <div
    aria-hidden="true"
    className="select-none overflow-hidden border-y border-line py-6 md:py-8"
  >
    <div className="marquee-track flex w-max">
      <Half items={items} />
      <Half items={items} />
    </div>
  </div>
);

export default Marquee;
