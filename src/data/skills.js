/**
 * Skills content — "technology ecosystem" model.
 *
 * No arbitrary percentages. Experience is communicated with three honest tiers:
 *   core         — used regularly, comfortable owning work
 *   intermediate — used in real projects, productive with docs
 *   familiar     — touched in coursework / projects, can ramp up fast
 *
 * Every technology below is backed by real usage: portfolio code, the four
 * GitHub repositories in src/data/projects.js, or the previously published
 * skill list. To add a skill, append { name, level } to a category.
 * To add a category, append a new object — layouts adapt automatically.
 */

export const SKILL_LEVELS = {
  core: { label: 'Core', description: 'Daily driver' },
  intermediate: { label: 'Intermediate', description: 'Project-proven' },
  familiar: { label: 'Familiar', description: 'Working knowledge' },
};

export const skillCategories = [
  {
    id: 'languages',
    label: 'Languages',
    items: [
      { name: 'Python', level: 'core' },
      { name: 'JavaScript', level: 'core' },
      { name: 'HTML', level: 'core' },
      { name: 'CSS', level: 'core' },
      { name: 'Java', level: 'intermediate' },
      { name: 'SQL', level: 'intermediate' },
      { name: 'PHP', level: 'intermediate' },
      { name: 'TypeScript', level: 'familiar' },
    ],
  },
  {
    id: 'frontend',
    label: 'Frontend',
    items: [
      { name: 'React', level: 'intermediate' },
      { name: 'Vite', level: 'intermediate' },
      { name: 'TailwindCSS', level: 'intermediate' },
      { name: 'Framer Motion', level: 'familiar' },
      { name: 'Electron', level: 'familiar' },
    ],
  },
  {
    id: 'backend',
    label: 'Backend',
    items: [
      { name: 'FastAPI', level: 'intermediate' },
      { name: 'Node.js', level: 'intermediate' },
      { name: 'Express', level: 'intermediate' },
      { name: 'Socket.IO', level: 'familiar' },
      { name: 'Django', level: 'familiar' },
    ],
  },
  {
    id: 'ai-ml',
    label: 'AI / Machine Learning',
    items: [
      { name: 'PyTorch', level: 'intermediate' },
      { name: 'ONNX Runtime', level: 'intermediate' },
      { name: 'scikit-learn', level: 'familiar' },
      { name: 'NumPy', level: 'familiar' },
      { name: 'SHAP', level: 'familiar' },
    ],
  },
  {
    id: 'databases',
    label: 'Databases',
    items: [
      { name: 'PostgreSQL', level: 'familiar' },
      { name: 'Supabase', level: 'familiar' },
    ],
  },
  {
    id: 'cybersecurity',
    label: 'Cybersecurity',
    items: [
      { name: 'YARA', level: 'intermediate' },
      { name: 'Static Analysis', level: 'intermediate' },
      { name: 'Network Security', level: 'intermediate' },
      { name: 'Kali Linux', level: 'familiar' },
      { name: 'Wireshark', level: 'familiar' },
      { name: 'Nmap', level: 'familiar' },
      { name: 'Penetration Testing', level: 'familiar' },
      { name: 'Metasploit', level: 'familiar' },
    ],
  },
  {
    id: 'tools',
    label: 'Tools / DevOps',
    items: [
      { name: 'Git', level: 'intermediate' },
      { name: 'GitHub', level: 'intermediate' },
      { name: 'VS Code', level: 'core' },
      { name: 'Render', level: 'familiar' },
      { name: 'Vercel', level: 'familiar' },
      { name: 'Netlify', level: 'familiar' },
      { name: 'Figma', level: 'familiar' },
    ],
  },
];

export const softSkills = [
  'Effective Communication',
  'Active Listening',
  'Problem Solving',
  'Resilience',
  'Teamwork',
  'Leadership',
];

export const certifications = [
  {
    title: 'Information Security Fundamentals',
    description:
      'Course covering key principles of information security and best practices in digital protection.',
  },
  {
    title: 'Java Programming Course',
    description:
      'Training in application development using Java programming language.',
  },
];
