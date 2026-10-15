import { GraphNode } from '../types/graph'

export const portfolioNodes: GraphNode[] = [
  // --- PROJECTS ---
  {
    id: 'proj-yakiniku',
    name: 'YAKINIKU',
    category: 'projects',
    val: 8,
    tags: ['JavaScript', 'Web', 'Frontend', 'React'],
    summary:
      'Interactive web-dev platform exploring Japanese beef cuts, cow breeds, grilling guides, and interactive mini-games.',
    status: 'finished',
    demoUrl: 'https://taihenc.github.io/YAKINIKU/',
    repoUrl: 'https://github.com/Taihenc/YAKINIKU',
    evidenceCount: 12,
  },
  {
    id: 'proj-moekot',
    name: 'MoeKot',
    category: 'projects',
    val: 8,
    tags: ['Android', 'Kotlin', 'Mobile', 'UI'],
    summary:
      'Native Android manga & anime curation client with Jetpack Compose, AniList API integration, and MVVM architecture.',
    status: 'dev',
    repoUrl: 'https://github.com/Taihenc/MoeKot',
    evidenceCount: 14,
  },
  {
    id: 'proj-unity-game',
    name: 'Unity Game Project',
    category: 'projects',
    val: 6,
    tags: ['Unity', 'C#', 'GameDev'],
    summary:
      'Experimental 2D/3D game mechanics lab exploring kinematic controllers, physics interactions, and custom shaders.',
    status: 'lab',
    repoUrl: 'https://github.com/Taihenc',
    evidenceCount: 7,
  },

  // --- EXPERIENCE ---
  {
    id: 'exp-lmwn',
    name: 'Lineman Wongnai',
    category: 'experience',
    val: 10,
    tags: ['Android', 'Kotlin', 'Mobile', 'Team'],
    summary:
      'Software Engineer Intern (Android team). Delivered production features, refactored legacy layouts to Jetpack Compose, maintained CI/CD pipelines at scale.',
    role: 'Software Engineer Intern (Android)',
    organization: 'LINE MAN Wongnai',
    demoUrl: 'https://careers.lmwn.com/internship/lmwn-junior',
    evidenceCount: 14,
  },
  {
    id: 'exp-profluid',
    name: 'Profluid GmbH',
    category: 'experience',
    val: 9,
    tags: ['TypeScript', 'Fullstack', 'React', 'Docker'],
    summary:
      'Remote Part-time Fullstack Developer. Architecting scalable web services, React application frontends, and containerized backend microservices.',
    role: 'Fullstack Developer (Remote)',
    organization: 'Profluid GmbH',
    evidenceCount: 16,
  },
  {
    id: 'exp-chula-ta',
    name: 'Chulalongkorn University',
    category: 'experience',
    val: 9,
    tags: ['Teaching', 'Engineering', 'Algorithms', 'Python'],
    summary:
      'Teaching Assistant & Computer Engineering student. Mentoring students in algorithms and computer systems; ICPC Thailand 2024 Staff.',
    role: 'Teaching Assistant (Computer Engineering)',
    organization: 'Chulalongkorn University',
    demoUrl: 'https://www.chula.ac.th/',
    evidenceCount: 18,
  },

  // --- SYSTEMS & HOME-LAB ---
  {
    id: 'sys-homelab',
    name: 'Self-Hosted Home Lab',
    category: 'systems',
    val: 9,
    tags: ['Linux', 'Docker', 'IaC', 'Networking'],
    summary:
      'Bare-metal Linux cluster, container orchestration via Docker/Compose, automated IaC workflows, WireGuard VPN mesh, and self-hosted monitoring.',
    status: 'finished',
    evidenceCount: 24,
  },

  // --- CORE SKILLS & STACK ---
  {
    id: 'skill-kotlin',
    name: 'Kotlin',
    category: 'skills',
    val: 7,
    tags: ['Kotlin', 'Android', 'Mobile'],
    summary: 'Primary language for Android, Coroutines, Flow, Jetpack Compose, and modern mobile engineering.',
    evidenceCount: 14,
  },
  {
    id: 'skill-typescript',
    name: 'TypeScript',
    category: 'skills',
    val: 8,
    tags: ['TypeScript', 'Web', 'React', 'Fullstack'],
    summary: 'Strict-mode type-safe frontend and backend architectures, modern web standards, and tooling.',
    evidenceCount: 18,
  },
  {
    id: 'skill-react',
    name: 'React',
    category: 'skills',
    val: 7,
    tags: ['React', 'Web', 'Frontend', 'TypeScript'],
    summary: 'Component-driven UI, state management, hooks lifecycle, Framer Motion, and Three.js / R3F canvases.',
    evidenceCount: 12,
  },
  {
    id: 'skill-linux',
    name: 'Linux',
    category: 'skills',
    val: 9,
    tags: ['Linux', 'Networking', 'IaC', 'Docker'],
    summary: 'Daily driver environment (Ghostty + Tmux + Yabai + Fish), server administration, bash/fish scripting, and system internals.',
    evidenceCount: 24,
  },
  {
    id: 'skill-docker',
    name: 'Docker',
    category: 'skills',
    val: 8,
    tags: ['Docker', 'IaC', 'Fullstack', 'Linux'],
    summary: 'Multi-stage builds, container isolation, docker-compose orchestration, and CI deployment pipelines.',
    evidenceCount: 16,
  },
  {
    id: 'skill-python',
    name: 'Python',
    category: 'skills',
    val: 7,
    tags: ['Python', 'Algorithms', 'Engineering'],
    summary: 'AI/ML research, computational algorithms, automated scripting, and academic simulation workloads.',
    evidenceCount: 15,
  },
]
