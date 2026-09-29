/**
 * Project content — single source of truth for Featured + Notable projects.
 *
 * To add a new project, append a new object to the corresponding array.
 * Components render exclusively from these arrays: no structural changes needed.
 *
 * All fields below come from the real GitHub repositories (README / file tree /
 * languages / package manifests). No invented demos, stacks or metrics.
 */

// --- Featured projects -------------------------------------------------------
// Focused on the flagship project. Add more objects to scale the section.

export const featuredProjects = [
  {
    id: 'shadow-net-defender',
    // Card header
    eyebrow: 'Flagship Project · AI & Cybersecurity',
    title: 'Shadow-Net: Defender',
    status: 'Active · v4.1.0',
    // Short, scannable description (full detail lives in the repo README)
    description:
      'Hybrid multi-layer static malware detection for Windows PE files. An MLP classifier scores a 2,387-dimension vector (2,381 EMBER + 6 overlay signals), while YARA, UPX unpacking and forensic layers correlate into a single explainable verdict.',
    // Problem it solves — communicates technical depth without inventing data
    problem:
      'Signature-based antiviruses fail against polymorphic malware, zero-days and overlay payloads. Shadow-Net detects threats by structure and behavior, not by hash.',
    tech: [
      'Python',
      'PyTorch',
      'ONNX Runtime',
      'FastAPI',
      'YARA',
      'Supabase',
      'Electron',
      'React',
    ],
    features: [
      '2,387-dim vector: 2,381 EMBER features + 6 overlay signals',
      'MLP 2387 → 512 → 256 → 128 → 1 trained on 7M SOREL-20M samples',
      'Hybrid engine: YARA + UPX + overlay forensics + .NET / IL',
      'Evidence contract + correlation engine with per-group weighting',
      'CPU inference at ~15 ms with per-block Z-Score scalers',
      'SHAP + LLM explainability with offline fallback',
    ],
    // Real, verifiable indicators taken from the repository README
    metrics: [
      { value: '0.996', label: 'AUC-ROC' },
      { value: '95.42%', label: 'F1-Score' },
      { value: '~15 ms', label: 'ONNX inference' },
      { value: '2,387', label: 'Feature dims' },
    ],
    links: {
      github:
        'https://github.com/IVAINX18/Shadow-Net-Defender-Hybrid-Malware-Detection',
      demo: 'https://defender.shadownettechnologies.tech',
      demoLabel: 'Live Preview',
    },
    // Footnote shown discreetly — authorship / license context from the README
    footnote:
      'Academic research project · Built with Santiago Cubillos · SHADOW-NET · Private academic license',
  },
];

// --- Other notable projects --------------------------------------------------
// Compact cards. Same rule: append objects, components adapt automatically.

export const notableProjects = [
  {
    id: 'secure-call',
    eyebrow: 'Real-time Communication',
    title: 'Secure-Call',
    description:
      'Secure video-call application built with React, Vite and PeerJS. Peer-to-peer WebRTC calls with a dedicated Express + Socket.IO signaling server, ready for static hosting plus Render.',
    tech: [
      'React',
      'TypeScript',
      'Vite',
      'PeerJS',
      'WebRTC',
      'Socket.IO',
      'Express',
      'TailwindCSS',
    ],
    highlights: ['P2P video calls', 'Dedicated signaling server'],
    links: {
      github: 'https://github.com/IVAINX18/Secure-Call',
      demo: null,
    },
  },
  {
    id: 'hotel-website',
    eyebrow: 'Multi-page Web App',
    title: 'Hotel Website',
    description:
      'Hotel website built for the TalentoTECH bootcamp: landing, booking, reservation management and inventory pages with gallery and responsive layout.',
    tech: ['HTML', 'CSS', 'JavaScript', 'PHP'],
    highlights: ['Booking interface', 'Reservation + inventory pages'],
    links: {
      github: 'https://github.com/IVAINX18/Pagina-de-Hotel',
      demo: 'https://ivainx18.github.io/Pagina-de-Hotel/',
    },
  },
  {
    id: 'bmi-calculator',
    eyebrow: 'Web Utility',
    title: 'BMI Calculator',
    description:
      'Interactive Body Mass Index calculator with input validation, visual feedback and health recommendations based on the result.',
    tech: ['HTML', 'CSS', 'JavaScript', 'PHP'],
    highlights: ['Input validation', 'Health recommendations'],
    links: {
      github: 'https://github.com/IVAINX18/Calculadora_IMC',
      demo: 'https://ivainx18.github.io/Calculadora_IMC/',
    },
  },
];
