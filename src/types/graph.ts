/**
 * Knowledge-graph schema for the portfolio graph view.
 *
 * Kept free of React / rendering concerns on purpose: a dataset that satisfies
 * `KnowledgeGraph` can be rendered by any front end (the force-graph canvas in
 * `components/PortfolioGraph.tsx` today, a standalone library later).
 */

/** A visual/semantic cluster, e.g. "experience" or "language". */
export interface GraphGroup {
  id: string
  label: string
  /** CSS colour used for nodes of this group. */
  color: string
}

export interface GraphLinkRef {
  label: string
  url: string
}

/** How the work was done; shown as a flag on the detail card. */
export type Engagement =
  'internship' | 'part-time' | 'full-time' | 'volunteer' | 'side-project'

export interface WorkRole {
  title: string
  /** Free-form, human readable, e.g. "Jun 2026 - Nov 2026". */
  period?: string
  engagement?: Engagement
}

interface GraphNodeBase {
  /** Stable, unique id; edges refer to nodes by this id. */
  id: string
  /** Short label drawn on the canvas. */
  label: string
  /** Id of a `GraphGroup`. */
  group: string
}

/** Something that was done: a job, a project, an activity. Opens a detail card. */
export interface WorkNode extends GraphNodeBase {
  kind: 'work'
  /** Full title shown on the detail card. */
  title: string
  organization?: string
  roles?: WorkRole[]
  summary: string
  highlights?: string[]
  /** Small square image drawn inside the node and on the card header. */
  logo?: string
  /** Larger images shown on the detail card. */
  images?: string[]
  links?: GraphLinkRef[]
  status?: 'in-progress'
  /** Engagement for works without roles (e.g. side projects). */
  engagement?: Engagement
  remote?: boolean
}

/** A skill, language or domain that groups related works together. */
export interface TopicNode extends GraphNodeBase {
  kind: 'topic'
  description?: string
}

export type KnowledgeNode = WorkNode | TopicNode

export interface GraphEdge {
  source: string
  target: string
  /** Why the two nodes are related (shown in the detail card). */
  evidence: string
  /**
   * 'stated'   - written explicitly in the source material (resume / cards).
   * 'inferred' - implied by it (e.g. NestJS -> TypeScript) but not spelled out.
   */
  basis: 'stated' | 'inferred'
}

export interface KnowledgeGraph {
  groups: GraphGroup[]
  nodes: KnowledgeNode[]
  edges: GraphEdge[]
}
