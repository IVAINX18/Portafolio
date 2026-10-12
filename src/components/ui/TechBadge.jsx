/**
 * Etiqueta mono para tecnologias. Mantengo las esquinas rectas a proposito:
 * en este sistema los botones son pill y todo lo demas queda recto, como el
 * rotulo impreso de una ficha tecnica.
 */
const TechBadge = ({ children }) => {
  return (
    <li className="inline-flex items-center border border-line px-2.5 py-1 font-mono text-[11px] uppercase tracking-[0.08em] text-bone-dim">
      {children}
    </li>
  );
};

export default TechBadge;
