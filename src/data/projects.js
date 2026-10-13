/**
 * Project content: single source of truth for the flagship and secondary
 * projects. Mantengo aqui todo lo que la pagina muestra de cada proyecto,
 * de modo que los componentes solo renderizan datos y no llevan contenido
 * escrito a mano.
 *
 * To add a new project, append a new object to the corresponding array.
 * Components render exclusively from these arrays: no structural changes needed.
 *
 * All fields below come from the real GitHub repositories (README / file tree /
 * languages / package manifests). No invented demos, stacks or metrics.
 * Retire las capturas de las demos en vivo: sus paletas (verde, morado)
 * chocaban con el sistema tinta/hueso. Los campos image/imageAlt/caption
 * siguen soportados por los componentes si alguna captura futura respeta
 * el lenguaje visual.
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
    // Contexto honesto: quien lo construyo y bajo que marco
    role: 'Academic research, co-built with Santiago Cubillos.',
    // Short, scannable description (full detail lives in the repo README)
    description:
      'Hybrid multi-layer static malware detection for Windows PE files. An MLP classifier scores a 2,387-dimension vector (2,381 EMBER + 6 overlay signals), while YARA, UPX unpacking and forensic layers correlate into a single explainable verdict.',
    // Problem it solves: communicates technical depth without inventing data
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
    // Sin captura: la pantalla de la demo en vivo rompia el sistema tinta/hueso
    links: {
      github:
        'https://github.com/IVAINX18/Shadow-Net-Defender-Hybrid-Malware-Detection',
      demo: 'https://defender.shadownettechnologies.tech',
      demoLabel: 'Live preview',
    },
    // Footnote shown discreetly: authorship / license context from the README
    footnote:
      'Academic research project built with Santiago Cubillos. SHADOW-NET, private academic license.',
  },
];

// --- Other notable projects --------------------------------------------------
// Compact entries. Same rule: append objects, components adapt automatically.
// `treatment` decide la composicion: 'plate' para captura + texto, 'text'
// para un bloque puramente tipografico.

export const notableProjects = [
  {
    id: 'secure-call',
    eyebrow: 'Real-time Communication',
    title: 'Secure-Call',
    role: 'Personal project.',
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
    treatment: 'text',
    links: {
      github: 'https://github.com/IVAINX18/Secure-Call',
      demo: null,
    },
  },
  // Familia Shadow-Net: sumo los dos repos hermanos del flagship. Bills aun
  // no tiene codigo: titulo, alcance y stack salen de su especificacion.
  // StockFlow ya tiene las fundaciones (fase 0) y va en fase 1. Declaro ambos
  // estados tal cual, sin vender lo que todavia no existe.
  {
    id: 'shadow-net-bills',
    eyebrow: 'Personal Finance Manager',
    title: 'Shadow-Net: Bills',
    role: 'Shadow-Net Technologies project, in the specification phase.',
    description:
      'Personal financial obligations manager for Colombia: bills, subscriptions and recurring payments with email reminders, a monthly calendar and an expense summary. Manual-first by design, with no bank integrations, no payment initiation and no AI or OCR; the repository currently holds only the specification.',
    tech: ['React', 'TypeScript', 'FastAPI', 'Python', 'Supabase', 'PostgreSQL'],
    highlights: [
      'Manual-first MVP: no bank credentials, money never moves',
      'Email reminders at 3, 1 and 0 days before each due date',
      'Specification fully written before any code',
    ],
    treatment: 'text',
    links: {
      github: 'https://github.com/IVAINX18/Shadow-Net-Bills',
      demo: null,
    },
  },
  {
    id: 'shadow-net-stockflow',
    eyebrow: 'Inventory & Logistics ERP',
    title: 'Shadow-Net: StockFlow',
    role: 'Shadow-Net Technologies ecosystem product, in development.',
    description:
      'Multi-warehouse inventory and logistics ERP built around an immutable movement ledger (kardex): every stock operation is confirmed in an atomic transaction with row locking to prevent overselling, idempotency against duplicates and traceable reversals. Laravel 13 API, Angular 22 SPA and MySQL 8.4; phase 1 (authentication, RBAC, warehouses) in progress.',
    tech: [
      'Laravel',
      'PHP',
      'Angular',
      'TypeScript',
      'MySQL',
      'Podman',
      'GitHub Actions',
    ],
    highlights: [
      'Immutable kardex, not a stock column',
      'Atomic transactions with row locking and idempotency',
      'Versioned /api/v1 REST API with OpenAPI docs',
    ],
    treatment: 'text',
    links: {
      github: 'https://github.com/IVAINX18/Shadow-Net-StockFlow',
      demo: null,
    },
  },
];
