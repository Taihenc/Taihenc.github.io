import type { GraphEdge, KnowledgeGraph } from '../types/graph'

/**
 * Portfolio knowledge graph.
 *
 * Every fact here comes from the resume (Peerapat_Patcharamontree_Resume.tex)
 * or from the hand-written cards in `works-experience.ts`. Edges carry the
 * sentence that justifies them; `basis: 'inferred'` marks the ones that are
 * implied rather than written out (drawn dashed on the canvas).
 */

const groups: KnowledgeGraph['groups'] = [
  { id: 'experience', label: 'Experience', color: '#f4b860' },
  { id: 'activity', label: 'University', color: '#f29fc5' },
  { id: 'project', label: 'Side projects', color: '#5fd3c6' },
  { id: 'domain', label: 'Domains', color: '#a99cf5' },
  { id: 'language', label: 'Languages', color: '#8fa3bf' },
]

const nodes: KnowledgeGraph['nodes'] = [
  // ---------------------------------------------------------------- experience
  {
    id: 'utokyo',
    kind: 'work',
    group: 'experience',
    label: 'UTokyo',
    title: 'UTokyo Research',
    organization:
      'The University of Tokyo, Oguchi Lab, Institute of Industrial Science',
    roles: [
      {
        title: 'Research Intern',
        period: 'Jun 2026 - Nov 2026',
        engagement: 'internship',
      },
    ],
    summary:
      'Sim-to-real calibration of multi-agent driver-behavior models against real-world drone trajectories. Motorcycles filtering through car queues are something lane-based traffic models cannot represent, so these heterogeneous agents are modeled in SUMO/TraCI and calibrated as a black-box optimization problem.',
    highlights: [
      'First-author paper submitted to ITS Symposium 2026: a method to simulate and evaluate complex mixed traffic.',
      'Black-box optimization with Nevergrad (CMA-ES, DE, Bayesian) over 55-74 parameters on 16 HPC workers.',
      'Data pipeline for 1M+ drone trajectory points (DataFromSky) and a multi-objective loss.',
    ],
    logo: './works-experience/utokyo/logo.png',
    links: [{ label: 'IIS, UTokyo', url: 'https://www.iis.u-tokyo.ac.jp/en/' }],
  },
  {
    id: 'scbtechx',
    kind: 'work',
    group: 'experience',
    label: 'SCB TechX',
    title: 'SCB TechX',
    organization: 'SCB TechX',
    roles: [
      {
        title: 'Technical Lead / Project Manager (Capstone)',
        period: 'Sep 2025 - May 2026',
        engagement: 'internship',
      },
    ],
    summary:
      'Led a team of 5 developers building an internal AI knowledge management system for developers and marketing.',
    highlights: [
      'Designed the architecture (RAG, LLM, vector DB) and an ingestion pipeline that cleans and structures documents.',
      'Reviewed backend and AI-pipeline code; ran sprint planning, code reviews and MVP demos to internal stakeholders.',
    ],
    logo: './works-experience/scbtechx/logo.png',
    links: [{ label: 'scbtechx.io', url: 'https://www.scbtechx.io/' }],
  },
  {
    id: 'skooldio',
    kind: 'work',
    group: 'experience',
    label: 'Skooldio',
    title: 'Skooldio',
    organization: 'Skooldio',
    roles: [
      {
        title: 'AI Engineer',
        period: 'Aug 2025 - Dec 2025',
        engagement: 'part-time',
      },
      {
        title: 'Full Stack Developer',
        period: 'Jun 2025 - Jul 2025',
        engagement: 'internship',
      },
    ],
    summary:
      'Multi-agent LLM pipelines for an educational product that improves student literacy, after an internship on the platform side of an online learning product.',
    highlights: [
      'Built multi-agent LLM pipelines with crewAI; tracked quality with Langfuse evals; structured outputs with Pydantic.',
      "Designed a new DB schema with a senior engineer and migrated an online learning platform's data.",
      'Built a new examination system in NestJS (DDD): pre-tests and final exams with hints and multiple attempts.',
      'Debugged and revised a legacy notification service that failed to reach some of its 1,000+ users.',
    ],
    logo: './works-experience/skooldio/logo.png',
    links: [{ label: 'skooldio.com', url: 'https://www.skooldio.com/' }],
  },
  {
    id: 'profluid',
    kind: 'work',
    group: 'experience',
    remote: true,
    label: 'Profluid',
    title: 'Profluid GmbH',
    organization: 'Profluid GmbH (Germany)',
    roles: [
      {
        title: 'Junior Developer',
        period: 'Jun 2025 - May 2026',
        engagement: 'part-time',
      },
      {
        title: 'Full Stack Developer',
        period: 'Sep 2024 - May 2025',
        engagement: 'part-time',
      },
    ],
    summary:
      'Remote, part-time developer for a German e-commerce company, from the storefront and ERP to product data.',
    highlights: [
      'Migrated the e-commerce store to Odoo, rebuilt the UI and maintained the ERP (PostgreSQL, Python, JS).',
      'Built Python scrapers for manufacturer specs to enrich a 10,000+ product catalog with complex product structures.',
    ],
    logo: './works-experience/profluid/logo.png',
    links: [{ label: 'profluid.de', url: 'https://www.profluid.de/' }],
  },
  {
    id: 'lmwn',
    kind: 'work',
    group: 'experience',
    label: 'LINE MAN Wongnai',
    title: 'LINE MAN Wongnai',
    organization: 'LINE MAN Wongnai',
    roles: [
      {
        title: 'Software Engineer, Android',
        period: 'May 2024 - Jul 2024',
        engagement: 'internship',
      },
    ],
    summary:
      'Android internship where interns are treated as full-time employees: delivering features, fixing bugs and seeing how a big company handles its traffic and data.',
    highlights: [
      'Shipped order chaining (Android + BFF) on an app with 10M+ monthly active users.',
      'Migrated legacy XML layouts to Jetpack Compose (Kotlin, MVVM) to replace deprecated UI and ease maintenance.',
    ],
    logo: './works-experience/lmwn/logo.png',
    images: [
      './works-experience/lmwn/image1.jpg',
      './works-experience/lmwn/image5.jpg',
      './works-experience/lmwn/image2.jpg',
    ],
    links: [
      {
        label: 'LMWN Junior',
        url: 'https://careers.lmwn.com/internship/lmwn-junior',
      },
    ],
  },

  // ------------------------------------------------------------------ activity
  {
    id: 'chula-ta',
    kind: 'work',
    group: 'activity',
    label: 'Chula TA',
    title: 'Teaching Assistant & staff',
    organization: 'Chulalongkorn University',
    roles: [
      {
        title: 'Teaching Assistant (TA)',
        period: 'Aug 2024 - Dec 2025',
        engagement: 'volunteer',
      },
    ],
    summary:
      'TA for Data Structures & Algorithms and Computer Digital Logic. Soft skills need a different approach than coding, so I also staffed ICPC Thailand 2024, supporting competitors at the international collegiate programming contest.',
    logo: './works-experience/chula/logo.png',
    images: [
      './works-experience/chula/TA.jpg',
      './works-experience/chula/icpc.jpg',
    ],
    links: [{ label: 'chula.ac.th', url: 'https://www.chula.ac.th/' }],
  },
  {
    id: 'isd-sgcu',
    kind: 'work',
    group: 'activity',
    label: 'ISD SGCU',
    title: 'ISD SGCU',
    organization: 'Chula student government IT',
    roles: [
      {
        title: 'Senior Frontend Developer',
        period: 'Jul 2024 - May 2025',
        engagement: 'volunteer',
      },
    ],
    summary:
      'Front end for Chula student government IT, serving 1,000+ concurrent users.',
    logo: './works-experience/isd/logo.png',
    images: ['./works-experience/isd/banner.jpg'],
    links: [
      { label: 'github.com/isd-sgcu', url: 'https://github.com/isd-sgcu' },
    ],
  },

  // ------------------------------------------------------------------ projects
  {
    id: 'yakiniku',
    kind: 'work',
    group: 'project',
    engagement: 'side-project',
    label: 'YAKINIKU',
    title: 'YAKINIKU',
    summary:
      'A website for learning about yakiniku, built with no framework (plain HTML, CSS, JS): cow breeds, details for each cut such as its origin and cooking recommendations, and a mini-game where you pick a cut, read the guide, grill it and get a result.',
    logo: './works-experience/yakiniku/logo.png',
    images: [
      './works-experience/yakiniku/home.jpg',
      './works-experience/yakiniku/yaki.jpg',
    ],
    links: [
      { label: 'Live site', url: 'https://taihenc.github.io/YAKINIKU/' },
      { label: 'Source', url: 'https://github.com/Taihenc/YAKINIKU' },
    ],
  },
  {
    id: 'moekot',
    kind: 'work',
    group: 'project',
    engagement: 'side-project',
    label: 'MoeKot',
    title: 'MoeKot',
    summary:
      'Native Android app for exploring and curating manga and anime titles, using the AniList API. Built with Kotlin, Jetpack Compose and MVVM. Not finished yet; progress is on GitHub.',
    logo: './works-experience/moekot/logo.png',
    images: ['./works-experience/moekot/image.jpg'],
    links: [{ label: 'Source', url: 'https://github.com/Taihenc/MoeKot' }],
    status: 'in-progress',
  },
  {
    id: 'staysleep',
    kind: 'work',
    group: 'project',
    engagement: 'side-project',
    label: 'StaySleep',
    title: 'StaySleep',
    summary:
      'Hotel booking app (auth, search, booking). Led the front end, back end and design. Built with Next.js and MongoDB.',
  },
  {
    id: 'leaderboard',
    kind: 'work',
    group: 'project',
    engagement: 'side-project',
    label: 'Real-time Leaderboard',
    title: 'GO Real-time Leaderboard',
    summary:
      'Real-time leaderboard service using Redis sorted sets, written in Go.',
    links: [
      { label: 'Demo', url: 'https://app-taihendesu.koyeb.app/' },
      {
        label: 'Source',
        url: 'https://github.com/Taihenc/GO-Real-time-Leaderboard',
      },
    ],
  },

  // -------------------------------------------------------------------- topics
  {
    id: 'android',
    kind: 'topic',
    group: 'domain',
    label: 'Android',
    description: 'Native Android apps.',
  },
  {
    id: 'web',
    kind: 'topic',
    group: 'domain',
    label: 'Web / Full-stack',
    description: 'Front ends, back ends and the services between them.',
  },
  {
    id: 'ai',
    kind: 'topic',
    group: 'domain',
    label: 'AI / LLM',
    description: 'RAG, multi-agent LLM pipelines, LLM evals, vector DBs.',
  },
  {
    id: 'research',
    kind: 'topic',
    group: 'domain',
    label: 'Optimization & Research',
    description: 'Black-box optimization, simulation and research writing.',
  },
  {
    id: 'data',
    kind: 'topic',
    group: 'domain',
    label: 'Data pipelines',
    description: 'Ingesting, cleaning, migrating and enriching data.',
  },
  {
    id: 'lead',
    kind: 'topic',
    group: 'domain',
    label: 'Leading & Teaching',
    description: 'Leading teams and teaching others.',
  },
  { id: 'python', kind: 'topic', group: 'language', label: 'Python' },
  { id: 'ts', kind: 'topic', group: 'language', label: 'TypeScript / JS' },
  { id: 'go', kind: 'topic', group: 'language', label: 'Go' },
  { id: 'kotlin', kind: 'topic', group: 'language', label: 'Kotlin' },
]

const stated = (
  source: string,
  target: string,
  evidence: string
): GraphEdge => ({
  source,
  target,
  evidence,
  basis: 'stated',
})
const inferred = (
  source: string,
  target: string,
  evidence: string
): GraphEdge => ({
  source,
  target,
  evidence,
  basis: 'inferred',
})

const edges: GraphEdge[] = [
  stated(
    'utokyo',
    'research',
    'Black-box optimization (Nevergrad); first-author paper'
  ),
  stated('utokyo', 'data', 'Pipeline for 1M+ drone trajectory points'),
  inferred(
    'utokyo',
    'python',
    'Nevergrad and SUMO/TraCI are driven from Python'
  ),

  stated('scbtechx', 'ai', 'Designed the RAG / LLM / vector DB architecture'),
  stated(
    'scbtechx',
    'data',
    'Ingestion pipeline that cleans and structures documents'
  ),
  stated('scbtechx', 'lead', 'Led a team of 5 developers'),

  stated(
    'skooldio',
    'ai',
    'Multi-agent LLM pipelines (crewAI), Langfuse evals'
  ),
  stated(
    'skooldio',
    'python',
    'crewAI pipelines with Pydantic structured outputs'
  ),
  stated('skooldio', 'web', 'Examination system in NestJS'),
  inferred('skooldio', 'ts', 'NestJS back end'),
  stated('skooldio', 'data', 'New DB schema and platform data migration'),

  stated('profluid', 'web', 'Odoo store migration, UI rebuild, ERP'),
  stated('profluid', 'python', 'ERP work and product-spec scrapers in Python'),
  stated('profluid', 'ts', 'ERP work in JS'),
  stated('profluid', 'data', 'Scrapers enriching a 10,000+ product catalog'),

  stated('lmwn', 'android', 'Android team; order chaining on a 10M+ MAU app'),
  stated('lmwn', 'kotlin', 'Jetpack Compose migration in Kotlin'),

  stated(
    'chula-ta',
    'lead',
    'TA for Data Structures & Algorithms and Digital Logic'
  ),
  stated('isd-sgcu', 'web', 'Senior Frontend Developer'),

  stated('yakiniku', 'web', 'Website built with plain HTML, CSS, JS'),
  stated('yakiniku', 'ts', 'Plain JavaScript, no framework'),
  stated('moekot', 'android', 'Native Android app'),
  stated('moekot', 'kotlin', 'Kotlin + Jetpack Compose'),
  stated('staysleep', 'web', 'Next.js + MongoDB booking app'),
  inferred('staysleep', 'ts', 'Next.js front end'),
  stated('staysleep', 'lead', 'Led front end, back end and design'),
  stated('leaderboard', 'go', 'Written in Go'),
  stated('leaderboard', 'web', 'Real-time backend service on Redis'),
]

export const portfolioGraph: KnowledgeGraph = { groups, nodes, edges }
