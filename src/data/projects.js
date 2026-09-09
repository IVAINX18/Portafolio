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
      'Hybrid multi-layer static malware detection for Windows PE files. A deep neural network classifies a 2,381-dimension feature vector, while YARA, UPX unpacking and forensic layers correlate into a single explainable verdict.',
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
      '2,381-dim EMBER / SOREL-20M feature vector',
      'Hybrid engine: YARA + UPX + overlay forensics + .NET / IL',
      'Correlation engine with typed evidence contract',
      'CPU inference under 50 ms (ONNX + Z-Score)',
      'SHAP + LLM explainability with offline fallback',
      'Clean Architecture, evidence-centered pipeline',
    ],
    // Real, verifiable indicators taken from the repository README
    metrics: [
      { value: '0.985', label: 'AUC-ROC' },
      { value: '2,381', label: 'Feature dims' },
      { value: '<50 ms', label: 'ONNX inference' },
      { value: 'SOREL-20M', label: 'Training data' },
    ],
    links: {
      github:
        'https://github.com/IVAINX18/Shadow-Net-Defender-Hybrid-Malware-Detection',
      demo: null,
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
