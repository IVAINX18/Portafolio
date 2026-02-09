import { motion } from 'framer-motion';

const otherProjects = [
  {
    title: "NovaCrew Web Oficial",
    description: "Official website for NovaCrew, a creative K-Pop group. Built with modern web technologies featuring responsive design, smooth animations, and optimized performance.",
    tech: ["React", "TailwindCSS", "Framer Motion", "Vite"],
    demo: "https://novacrewoficial.netlify.app/",
    github: "https://github.com/IVAINX18/NovaCrew-WebOficial",
    highlights: ["Creative Design", "Smooth Animations"]
  },
  {
    title: "Hotel Website",
    description: "Full-featured hotel website developed as part of a web development bootcamp. Features responsive design, booking interface, and modern UI/UX practices.",
    tech: ["HTML", "CSS", "JavaScript", "PHP"],
    demo: "https://ivainx18.github.io/Pagina-de-Hotel/",
    github: "https://github.com/IVAINX18/Pagina-de-Hotel",
    highlights: ["Responsive Design", "Clean Code Structure"]
  },
  {
    title: "BMI Calculator",
    description: "Interactive Body Mass Index calculator with user-friendly interface. Includes input validation, visual feedback, and health recommendations based on BMI results.",
    tech: ["HTML", "CSS", "JavaScript"],
    demo: "https://ivainx18.github.io/Calculadora_IMC/",
    github: "https://github.com/IVAINX18/Calculadora_IMC",
    highlights: ["Input Validation", "User-Friendly Design"]
  }
];

const OtherProjects = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  return (
    <section className="py-20 px-6 bg-dark/30">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <h2 className="text-4xl md:text-6xl font-black mb-6">
            Other Notable <span className="text-gradient">Projects</span>
          </h2>
          <p className="text-lg text-slate-400 max-w-2xl">
            Additional projects showcasing web development fundamentals and creative problem-solving.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid md:grid-cols-2 gap-8"
        >
          {otherProjects.map((project, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              whileHover={{ y: -8 }}
              className="group bg-dark border border-slate-800 rounded-xl p-8 hover:border-primary/50 transition-all duration-300 hover:shadow-xl hover:shadow-primary/10"
            >
              <h3 className="text-2xl md:text-3xl font-bold mb-3 group-hover:text-gradient transition-all duration-300">
                {project.title}
              </h3>

              <p className="text-slate-300 mb-6 leading-relaxed">
                {project.description}
              </p>

              <div className="flex flex-wrap gap-2 mb-6">
                {project.tech.map((tech, techIndex) => (
                  <span
                    key={techIndex}
                    className="px-3 py-1 bg-slate-800/50 text-slate-400 rounded-md text-sm font-mono border border-slate-700"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              <div className="mb-6">
                <p className="text-sm text-slate-500 mb-2 font-semibold">Highlights:</p>
                <ul className="space-y-1">
                  {project.highlights.map((highlight, idx) => (
                    <li key={idx} className="text-sm text-slate-400 flex items-center gap-2">
                      <span className="text-primary">▸</span> {highlight}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex gap-4">
                {project.demo && (
                  <motion.a
                    href={project.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex-1 px-4 py-3 bg-primary hover:bg-primary/90 text-white font-semibold rounded-lg transition-all duration-300 text-center flex items-center justify-center gap-2"
                  >
                    <span>Live Demo</span>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </motion.a>
                )}
                {project.github && (
                  <motion.a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-4 py-3 border-2 border-primary hover:bg-primary/10 text-primary font-semibold rounded-lg transition-all duration-300 flex items-center justify-center"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                    </svg>
                  </motion.a>
                )}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default OtherProjects;
