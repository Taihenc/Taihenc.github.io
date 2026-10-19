import { WorkExperience } from '../interfaces/WorkExperience'

export const workExperiences: WorkExperience[] = [
  {
    logo: './works-experience/utokyo/logo.png',
    title: 'UTokyo Research🗼',
    subtitle: 'Research Intern @ Oguchi Lab, Institute of Industrial Science',
    description:
      "I'm a research intern at The University of Tokyo (Jun - Nov 2026), applying black-box optimization and data-driven modeling to calibrate multi-agent simulations against real-world behavior. I model heterogeneous driver agents, such as motorcycles filtering through car queues, that traditional methods cannot represent, and optimize 55-74 parameters with Nevergrad (CMA-ES, DE, Bayesian) running in parallel across multiple HPC workers. I also built the data pipeline for 1M+ drone trajectory points, and the work led to my first-author paper, submitted to ITS Symposium 2026.",
    link: 'https://www.iis.u-tokyo.ac.jp/en/',
    images: [
      './works-experience/utokyo/campus.jpg',
      './works-experience/utokyo/desk.jpg',
      './works-experience/utokyo/lab-party.jpg',
    ],
  },
  {
    logo: './works-experience/scbtechx/logo.png',
    title: 'SCB TechX🧭',
    subtitle: 'Technical Lead / Project Manager (Capstone Intern)',
    description:
      'For my capstone (Sep 2025 - May 2026) I led a team of 5 developers building an internal AI knowledge management system for developers and marketing. I designed the architecture (RAG, LLM, vector DB) and an ingestion pipeline that cleans and structures documents, reviewed backend and AI-pipeline code, and ran sprint planning, code reviews and MVP demos for internal stakeholders.',
    link: 'https://www.scbtechx.io/',
    images: [
      './works-experience/scbtechx/architecture.jpg',
      './works-experience/scbtechx/chunking.jpg',
      './works-experience/scbtechx/lanyard.jpg',
      './works-experience/scbtechx/office.jpg',
    ],
  },
  {
    logo: './works-experience/skooldio/logo.png',
    title: 'Skooldio🤖',
    subtitle: 'AI Engineer (Part-time) & Full Stack Developer (Intern)',
    description:
      'As an AI Engineer (Aug - Dec 2025) I built multi-agent LLM pipelines with crewAI for an educational product that improves student literacy, tracked quality with Langfuse evals and structured outputs with Pydantic. Before that, as a full stack intern (Jun - Jul 2025), I designed a new DB schema with a senior engineer, migrated an online learning platform\'s data, built a new examination system in NestJS (DDD) with hints and multiple attempts, and fixed a legacy notification service for 1,000+ users.',
    link: 'https://www.skooldio.com/',
    images: [
      './works-experience/skooldio/demo.jpg',
      './works-experience/skooldio/kickoff.jpg',
      './works-experience/skooldio/welcome-kit.jpg',
      './works-experience/skooldio/plush.jpg',
    ],
  },
  {
    logo: './works-experience/profluid/logo.png',
    title: 'Profluid GmbH🇩🇪',
    subtitle: 'Remote, part-time developer for a German e-commerce company',
    description:
      'From Sep 2024 to May 2026 I worked remotely for Profluid in Germany. As a full stack developer I migrated the e-commerce store to Odoo, rebuilt the UI and maintained the ERP (PostgreSQL, Python, JS). Later, as a junior developer, I built Python scrapers for manufacturer specs to enrich a 10,000+ product catalog with complex product structures.',
    link: 'https://www.profluid.de/',
    images: ['./works-experience/profluid/logo.png'],
  },
  {
    logo: './works-experience/lmwn/logo.png',
    title: 'LMWN internship🍾',
    subtitle: "What I've learned^^",
    description:
      'I got an internship at Lineman Wongnai as a Software Engineer, specializing in Android development. I collaborated with the team to deliver new features more quickly, fix bugs, and migrate the old layout style to Jetpack Compose. I learned technologies such as Kotlin, Android development, and CI/CD pipelines. It was great to learn how a big company handles its large amount of traffic and data. Another thing to mention is that they treat intern students as full-time employees, so you get to experience the real work environment, which is great for seeing how your code actually works in the real world.',
    link: 'https://careers.lmwn.com/internship/lmwn-junior',
    images: [
      './works-experience/lmwn/image1.jpg',
      './works-experience/lmwn/image5.jpg',
      './works-experience/lmwn/image2.jpg',
      './works-experience/lmwn/image3.jpg',
      './works-experience/lmwn/image4.jpg',
    ],
  },
  {
    logo: './works-experience/yakiniku/logo.png',
    title: 'YAKINIKU🐄',
    subtitle: 'Feel the taste of Yakiniku but remotely!',
    description:
      'YAKINIKU is a website for learning about yakiniku. This site will provide you with a variety of cow breeds along with valuable information. It includes details about each cut, such as its origin and cooking recommendations. Additionally, we offer a mini-game for yakiniku enthusiasts where you can select a beef cut, read the cooking guide, start grilling, and receive a cooking result to gauge your skills.',
    link: 'https://taihenc.github.io/YAKINIKU/',
    images: [
      './works-experience/yakiniku/home.jpg',
      './works-experience/yakiniku/phone.jpg',
      './works-experience/yakiniku/cut.jpg',
      './works-experience/yakiniku/yaki.jpg',
    ],
  },
  {
    logo: 'https://github.com/Taihenc/MoeKot/blob/main/app/src/main/ic_launcher-playstore.png?raw=true',
    title: 'MoeKot📱',
    subtitle: "What's MoeKot?",
    description:
      'MoeKot is your go-to app for exploring, discovering, and curating your favorite manga and anime titles. With an intuitive interface and a touch of "Moe" (cute) inspiration, MoeKot enhances your browsing experience. Not only can you explore a vast collection of content, but future updates will also include a library feature for saving your favorite finds and tracking your reading/watching progress. The app is built using Kotlin and the MVVM architecture. Thanks to the API from AniList, the app provides the latest manga information. Although the app is not yet complete, you can check its progress on the GitHub repository.',
    link: 'https://github.com/Taihenc/MoeKot',
    images: ['./works-experience/moekot/image.jpg'],
  },
  {
    logo: './works-experience/chula/logo.png',
    title: 'University stuff🤓',
    subtitle: 'As a student only coding is not an ideal life~!',
    description:
      'Technical skills can be improved through coding (e.g., working on side projects), but soft skills require a different approach. I like to push myself into various situations where I can meet new people and learn new things. so I give it a try—for example, as a Teaching Assistant (TA), ICPC Thailand 2024 Staff, and @rubpuenkaomai Staff. I’m looking forward to taking on even more opportunities in the future. :)',
    link: 'https://www.chula.ac.th/',
    images: [
      './works-experience/chula/logo.png',
      './works-experience/chula/TA.jpg',
      './works-experience/chula/icpc.jpg',
      './works-experience/chula/aaum.jpg',
    ],
  },
]
