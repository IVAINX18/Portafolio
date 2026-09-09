/**
 * TechBadge — single refined tech chip used by every project + skill surface.
 * One definition, consistent spacing / typography / interactive states.
 */
const TechBadge = ({ children, tone = 'default' }) => {
  const tones = {
    default:
      'bg-slate-800/50 text-slate-300 border-slate-700 hover:border-primary/40 hover:text-slate-100',
    accent:
      'bg-primary/10 text-primary border-primary/25 hover:bg-primary/15',
  };

  return (
    <li
      className={`inline-flex items-center px-3 py-1.5 rounded-md text-[13px] font-mono border transition-colors duration-200 ${tones[tone]}`}
    >
      {children}
    </li>
  );
};

export default TechBadge;
