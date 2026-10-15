export type NodeCategory = 'projects' | 'experience' | 'skills' | 'systems'

export type ProjectStatus = 'finished' | 'dev' | 'lab'

export interface GraphNode {
  id: string
  name: string
  category: NodeCategory
  val: number // Node size weight
  tags: string[]
  summary: string
  status?: ProjectStatus
  role?: string
  organization?: string
  demoUrl?: string
  repoUrl?: string
  evidenceCount?: number
  // Physics engine simulation properties (d3-force)
  x?: number
  y?: number
  vx?: number
  vy?: number
  fx?: number
  fy?: number
  index?: number
}

export interface GraphLink {
  source: string | GraphNode
  target: string | GraphNode
  similarity: number
  isInterCategory: boolean
}

export interface GraphData {
  nodes: GraphNode[]
  links: GraphLink[]
}

export interface ScreenCoords {
  x: number
  y: number
}

export const CATEGORY_CONFIG: Record<
  NodeCategory,
  {
    label: string
    color: string
    glowColor: string
    anchor: { x: number; y: number }
    pathPrefix: string
  }
> = {
  projects: {
    label: 'Projects',
    color: '#38bdf8', // Neon Cyan
    glowColor: 'rgba(56, 189, 248, 0.45)',
    anchor: { x: -220, y: -40 },
    pathPrefix: '~/taihen/projects',
  },
  experience: {
    label: 'Experience & Teaching',
    color: '#22c55e', // Emerald Green
    glowColor: 'rgba(34, 197, 94, 0.45)',
    anchor: { x: 180, y: 160 },
    pathPrefix: '~/taihen/experience',
  },
  skills: {
    label: 'Stack & Languages',
    color: '#a855f7', // Purple / Violet
    glowColor: 'rgba(168, 85, 247, 0.45)',
    anchor: { x: 200, y: -160 },
    pathPrefix: '~/taihen/skills',
  },
  systems: {
    label: 'Systems & Home-Lab',
    color: '#f59e0b', // Amber / Terminal Gold
    glowColor: 'rgba(245, 158, 11, 0.45)',
    anchor: { x: -80, y: 180 },
    pathPrefix: '~/taihen/systems',
  },
}
