import { motion } from 'framer-motion';

// --- Constants & Data ---

const PROGRAMMING_LANGUAGES = [
  {
    level: "Intermediate",
    languages: [
      { name: "Java", proficiency: 40 },
      { name: "Python", proficiency: 50 },
      { name: "HTML", proficiency: 45 },
      { name: "CSS", proficiency: 50 },
      { name: "JavaScript", proficiency: 35 }
    ]
  },
  {
    level: "Basic",
    languages: [
      { name: "TypeScript", proficiency: 25 },
      { name: "PHP", proficiency: 20 },
      { name: "React", proficiency: 25 },
      { name: "SQL", proficiency: 15 },
      { name: "Django", proficiency: 20 }
    ]
  }
];

const SKILLS_DATA = [
  {
    category: "Cybersecurity",
    items: ["Kali Linux", "Wireshark", "Network Security", "Penetration Testing", "Nmap", "Metasploit"]
  },
  {
    category: "Development Tools",
    items: ["GitHub", "Visual Studio Code", "Antigravity", "Eclipse", "Git", "Figma", "Canva"]
  },
  {
    category: "Soft Skills",
    items: ["Effective Communication", "Active Listening", "Problem Solving", "Resilience", "Teamwork", "Leadership"]
  }
];

const CERTIFICATIONS_DATA = [
  {
    title: "Information Security Fundamentals",
    description: "Course covering key principles of information security and best practices in digital protection."
  },
  {
    title: "Java Programming Course",
    description: "Training in application development using Java programming language."
  }
];

// --- Sub-components ---

const SectionTitle = ({ title, highlight }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.6 }}
    className="mb-16"
  >
    <h2 className="text-4xl md:text-6xl font-black mb-6">
      {title} <span className="text-gradient">{highlight}</span>
    </h2>
  </motion.div>
);

const BackgroundCard = () => (
  <div className="bg-dark border border-slate-800 rounded-xl p-8 h-full">
    <h3 className="text-2xl md:text-3xl font-bold mb-6 text-gradient">Background</h3>
    <div className="space-y-4 text-slate-300 leading-relaxed">
      <p>
        I'm a Systems Engineering student with a solid foundation in programming tools, AI and cybersecurity. While my specialty is WebDevelopment, I also have a keen interest in areas such as information security and data analysis.
      </p>
      <p>
        My goal is to continue growing as a developer and contribute to the creation of secure and innovative technological solutions. I combine technical expertise with creative problem-solving to build engaging digital experiences.
      </p>
      <p>
        I believe in writing clean, maintainable code and staying current with modern web technologies and security best practices.
      </p>
    </div>
  </div>
);

const CertificationList = () => (
  <div className="bg-dark border border-slate-800 rounded-xl p-8 h-full">
    <h3 className="text-2xl md:text-3xl font-bold mb-6 text-gradient">Certifications</h3>
    <div className="space-y-6">
      {CERTIFICATIONS_DATA.map((cert, index) => (
        <div key={index} className="border-l-2 border-primary pl-6">
          <h4 className="text-xl font-semibold text-slate-200 mb-2">{cert.title}</h4>
          <p className="text-slate-400">{cert.description}</p>
        </div>
      ))}
    </div>
  </div>
);

const LanguageCard = ({ lang, index }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.4, delay: index * 0.1 }}
    whileHover={{ y: -3 }}
  >
    <div className="bg-dark border border-slate-800 rounded-lg p-6 hover:border-primary/50 transition-all duration-300">
      <h5 className="text-lg font-bold text-slate-200 mb-4">{lang.name}</h5>
      <div className="w-full bg-slate-800/50 rounded-full h-2 overflow-hidden border border-slate-700">
        <motion.div
          className="bg-gradient-to-r from-primary to-cyan-500 h-full"
          initial={{ width: 0 }}
          whileInView={{ width: `${lang.proficiency}%` }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
        />
      </div>
    </div>
  </motion.div>
);

const SkillCategory = ({ skill, index }) => (
  <motion.div
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
);

// --- Main Component ---

const About = () => {
  return (
    <section id="about" className="py-20 px-6 bg-dark/30">
      <div className="max-w-7xl mx-auto">
        <SectionTitle title="About" highlight="Me" />

        {/* Background & Certifications Grid */}
        <div className="grid lg:grid-cols-2 gap-12 mb-20">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <BackgroundCard />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <CertificationList />
          </motion.div>
        </div>

        {/* Programming Languages Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-20"
        >
          <h3 className="text-3xl md:text-4xl font-bold mb-12 text-center">
            Programming <span className="text-gradient">Languages</span>
          </h3>
          <div className="space-y-12">
            {PROGRAMMING_LANGUAGES.map((levelGroup, levelIndex) => (
              <div key={levelIndex}>
                <h4 className="text-2xl font-bold mb-8 text-primary">
                  Level: <span className="text-gradient">{levelGroup.level}</span>
                </h4>
                <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-8">
                  {levelGroup.languages.map((lang, langIndex) => (
                    <LanguageCard key={langIndex} lang={lang} index={langIndex} />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Skills Section */}
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
            {SKILLS_DATA.map((skill, index) => (
              <SkillCategory key={index} skill={skill} index={index} />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;
