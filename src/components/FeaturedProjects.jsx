import { motion } from 'framer-motion';
import { useState } from 'react';

const featuredProjects = [
  {
    title: "ShadowNet GUI",
    description: "Advanced GUI application specializing in malware detection and cybersecurity analysis. Combines artificial intelligence with penetration testing capabilities, offering both academic rigor and practical security applications. The interface provides seamless interaction with AI-powered vulnerability assessment and real-time threat detection.",
    tech: ["Python", "AI/ML", "Malware Detection", "Security", "GUI"],
    link: null,
    github: "https://github.com/IVAINX18/ShadowNet_GUI",
    type: "AI & Cybersecurity",
    color: "from-purple-500 to-pink-500"
  },
  {
    title: "BiometricoV4",
    description: "Real-time video calling platform with biometric data scanning simulation. Built with React, the application enables seamless communication between users while processing and displaying live biometric scan data during active calls. The backend infrastructure is deployed on Render, ensuring reliable performance and scalability.",
    tech: ["React", "WebRTC", "Real-time Processing", "Biometric Systems", "Render"],
    link: "https://biometricov4-lunq.onrender.com",
    github: null,
    type: "Video Communication",
    color: "from-cyan-500 to-blue-500"
  }
];

const FeaturedProjects = () => {
  const [hoveredIndex, setHoveredIndex] = useState(null);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  return (
    <section id="projects" className="py-20 px-6">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <h2 className="text-5xl md:text-7xl font-black mb-6">
            Featured <span className="text-gradient">Projects</span>
          </h2>
          <p className="text-xl text-slate-400 max-w-2xl">
            Showcasing my most impactful work in web development, artificial intelligence, and cybersecurity.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="space-y-12"
        >
          {featuredProjects.map((project, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              className="group"
            >
              <div className="bg-dark border border-slate-800 rounded-2xl p-8 md:p-12 hover:border-primary/50 transition-all duration-500 relative overflow-hidden">
                <motion.div
                  className={`absolute inset-0 bg-gradient-to-r ${project.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}
                />

                <div className="relative z-10">
                  <div className="flex flex-wrap items-start justify-between gap-4 mb-6">
                    <div>
                      <span className="inline-block px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-mono mb-4">
                        {project.type}
                      </span>
                      <h3 className="text-3xl md:text-4xl font-bold mb-3 group-hover:text-gradient transition-all duration-300">
                        {project.title}
                      </h3>
                    </div>

                    <div className="flex gap-3">
                      {project.link && (
                        <motion.a
                          href={project.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.95 }}
                          className="p-3 bg-primary/10 hover:bg-primary/20 rounded-lg transition-colors duration-300"
                        >
                          <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                          </svg>
                        </motion.a>
                      )}
                      {project.github && (
                        <motion.a
                          href={project.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.95 }}
                          className="p-3 bg-primary/10 hover:bg-primary/20 rounded-lg transition-colors duration-300"
                        >
                          <svg className="w-6 h-6 text-primary" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                          </svg>
                        </motion.a>
                      )}
                    </div>
                  </div>

                  <p className="text-lg text-slate-300 mb-6 leading-relaxed">
                    {project.description}
                  </p>

                  <div className="flex flex-wrap gap-2">
                    {project.tech.map((tech, techIndex) => (
                      <span
                        key={techIndex}
                        className="px-4 py-2 bg-slate-800/50 text-slate-300 rounded-lg text-sm font-mono border border-slate-700"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturedProjects;
