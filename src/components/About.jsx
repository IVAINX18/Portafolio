import { motion } from 'framer-motion';

const skills = [
  {
    category: "Frontend Development",
    items: ["HTML", "CSS", "JavaScript", "React", "TailwindCSS"]
  },
  {
    category: "Cybersecurity",
    items: ["Kali Linux", "Wireshark", "Network Security", "Penetration Testing"]
  },
  {
    category: "Development Tools",
    items: ["GitHub", "Visual Studio Code", "Eclipse", "Git"]
  },
  {
    category: "Soft Skills",
    items: ["Effective Communication", "Active Listening", "Problem Solving", "Resilience"]
  }
];

const certifications = [
  {
    title: "Information Security Fundamentals",
    description: "Course covering key principles of information security and best practices in digital protection."
  },
  {
    title: "Java Programming Course",
    description: "Training in application development using Java programming language."
  }
];

const About = () => {
  return (
    <section id="about" className="py-20 px-6 bg-dark/30">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <h2 className="text-4xl md:text-6xl font-black mb-6">
            About <span className="text-gradient">Me</span>
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 mb-20">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="bg-dark border border-slate-800 rounded-xl p-8 h-full">
              <h3 className="text-2xl md:text-3xl font-bold mb-6 text-gradient">Background</h3>
              <div className="space-y-4 text-slate-300 leading-relaxed">
                <p>
                  I'm a Systems Engineering student with a solid foundation in programming tools and cybersecurity. While my specialty is Frontend Development, I also have a keen interest in areas such as information security and data analysis.
                </p>
                <p>
                  My goal is to continue growing as a developer and contribute to the creation of secure and innovative technological solutions. I combine technical expertise with creative problem-solving to build engaging digital experiences.
                </p>
                <p>
                  I believe in writing clean, maintainable code and staying current with modern web technologies and security best practices.
                </p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="bg-dark border border-slate-800 rounded-xl p-8 h-full">
              <h3 className="text-2xl md:text-3xl font-bold mb-6 text-gradient">Certifications</h3>
              <div className="space-y-6">
                {certifications.map((cert, index) => (
                  <div key={index} className="border-l-2 border-primary pl-6">
                    <h4 className="text-xl font-semibold text-slate-200 mb-2">{cert.title}</h4>
                    <p className="text-slate-400">{cert.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h3 className="text-3xl md:text-4xl font-bold mb-8 text-center">
            Skills & <span className="text-gradient">Expertise</span>
          </h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {skills.map((skill, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                className="bg-dark border border-slate-800 rounded-xl p-6 hover:border-primary/50 transition-all duration-300"
              >
                <h4 className="text-lg font-bold text-primary mb-4">{skill.category}</h4>
                <ul className="space-y-2">
                  {skill.items.map((item, itemIndex) => (
                    <li key={itemIndex} className="text-slate-300 flex items-start gap-2">
                      <span className="text-primary mt-1">▸</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;
