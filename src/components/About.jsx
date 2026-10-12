import Reveal from './ui/Reveal';
import SectionHeading from './ui/SectionHeading';
import { certifications } from '../data/skills';

/**
 * About: perfil en lenguaje editorial, sin tarjeta de perfil. A la izquierda
 * va la narrativa (frase manifiesto + parrafos) y a la derecha el registro
 * verificable: certificaciones y estado actual. Las habilidades blandas
 * viven ahora en la seccion Toolkit para no fragmentar este bloque.
 */
const About = () => (
  <section
    id="about"
    aria-labelledby="about-title"
    className="scroll-mt-20 border-t border-line px-5 py-24 sm:px-8 md:py-36"
  >
    <div className="mx-auto max-w-[1400px]">
      <SectionHeading id="about-title" title="About" />

      <div className="grid gap-14 lg:grid-cols-12 lg:gap-8">
        <Reveal className="lg:col-span-7">
          <p className="mb-10 max-w-[22ch] font-display uppercase leading-[1.02] text-2xl md:text-4xl">
            I learn by building, breaking and documenting real systems.
          </p>
          <div className="max-w-[62ch] space-y-5 leading-relaxed text-bone-dim">
            <p>
              I am a Systems Engineering student with a working foundation in
              programming tools, AI and cybersecurity. My focus is web
              development, and I keep a special interest in information
              security and data analysis.
            </p>
            <p>
              I develop my security tooling under the name Shadow-Net
              Technologies, and I treat every project as a complete product:
              code, documentation and a way to try it.
            </p>
            <p>
              I believe in clean, maintainable code, honest documentation and
              staying current with the technologies I actually use.
            </p>
          </div>
        </Reveal>

        <Reveal delay={0.08} className="lg:col-span-5">
          <div
            id="certificates"
            className="scroll-mt-28 border-t border-line pt-6"
          >
            <p className="mb-2 font-mono text-[11px] uppercase tracking-[0.18em] text-bone-faint">
              Certifications
            </p>
            <ul className="divide-y divide-line">
              {certifications.map((cert) => (
                <li key={cert.title} className="py-4">
                  <h3 className="mb-1 font-sans text-[15px] font-medium text-bone">
                    {cert.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-bone-faint">
                    {cert.description}
                  </p>
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-10 border-t border-line pt-6">
            <p className="mb-4 font-mono text-[11px] uppercase tracking-[0.18em] text-bone-faint">
              Currently
            </p>
            <ul className="space-y-3 text-sm leading-relaxed text-bone-dim">
              <li>
                Systems Engineering student, focused on security and applied
                machine learning.
              </li>
              <li>
                Building Shadow-Net Technologies and its first product,
                Shadow-Net: Defender.
              </li>
              <li>Published academic research with IEEE.</li>
            </ul>
          </div>
        </Reveal>
      </div>
    </div>
  </section>
);

export default About;
