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
 *
 * `shortLabel` is the compact name used on the radar perimeter; `label` is
 * the full name used in headings, panels and accessible text.
 */

export const SKILL_LEVELS = {
  core: { label: 'Core', description: 'Daily driver' },
  intermediate: { label: 'Intermediate', description: 'Project-proven' },
  familiar: { label: 'Familiar', description: 'Working knowledge' },
};

/**
 * Conceptual radar weight per tier. Used ONLY to derive the radar shape —
 * never displayed as a number, percentage or score.
 */
const LEVEL_WEIGHT = { core: 3, intermediate: 2, familiar: 1 };

/**
 * Conceptual 0..1 breadth of a category from its tier mix.
 * Clamped to a moderate band so the radar suggests relative breadth
 * without implying precise measurement.
 */
export function categoryBreadth(category) {
  if (!category.items.length) return 0.35;
  const avg =
    category.items.reduce(
      (sum, item) => sum + (LEVEL_WEIGHT[item.level] ?? 1),
      0
    ) /
    category.items.length /
    3;
  return Math.min(0.92, Math.max(0.35, 0.35 + 0.57 * avg));
}

export const skillCategories = [
  {
    id: 'languages',
    label: 'Languages',
    shortLabel: 'Languages',
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
    shortLabel: 'Frontend',
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
    shortLabel: 'Backend',
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
    shortLabel: 'AI / ML',
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
    shortLabel: 'Data',
    items: [
      { name: 'PostgreSQL', level: 'familiar' },
      { name: 'Supabase', level: 'familiar' },
    ],
  },
  {
    id: 'cybersecurity',
    label: 'Cybersecurity',
    shortLabel: 'Security',
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
    shortLabel: 'DevOps',
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
  {
    title: 'Fundamentos Informática Forense',
    description:
      'Introductory foundations of digital forensics: core principles for identifying, preserving and examining digital evidence.',
  },
  {
    title: 'Certificado de Iniciación al Desarrollo con IA',
    description:
      'Introductory program on AI-assisted software development: fundamentals for building and iterating on code with the support of AI tools.',
  },
];
