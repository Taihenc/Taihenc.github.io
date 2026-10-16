export interface Award {
  title: string
  detail: string
  short: string // One-line version for small screens
  year: string
}

export interface Certificate {
  name: string
  issuer: string
  badge: string // Path to the badge image
}

export const awards: Award[] = [
  {
    title: 'Winner (1st place)',
    detail: 'Depa Unity3D VR-AR Competition',
    short: 'Depa VR-AR Winner',
    year: '2022',
  },
  {
    title: 'Top 100 nationwide',
    detail: 'Thailand Olympiad in Informatics (TOI18), 3rd round',
    short: 'TOI18 Top 100',
    year: '2022',
  },
]

export const certificates: Certificate[] = [
  {
    name: 'Unity Certified User: Programmer',
    issuer: 'Unity',
    badge: './certificates/unity.png',
  },
  {
    name: 'Huawei Cloud Certified Developer Professional',
    issuer: 'Huawei',
    badge: './certificates/huawei.png',
  },
  {
    name: 'Upwork Skill Certification: Node.js Full Stack Development',
    issuer: 'Upwork',
    badge: './certificates/upwork.png',
  },
]
