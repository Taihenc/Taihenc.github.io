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
  /**
   * How strongly sharing a node of this group pulls two works together in the
   * layout (default 1). E.g. 4 on job types keeps all internships in one area
   * even when their topics differ.
   */
  weight?: number
}

export interface GraphLinkRef {
  label: string
  url: string
}

/** How the work was done; shown as a flag on the detail card. */
export type Engagement =
  'internship' | 'part-time' | 'full-time' | 'volunteer' | 'side-project'

/** A tag on a work. Works sharing a keyword are linked through one small node. */
export interface WorkKeyword {
  label: string
  /** Why the work carries the keyword; defaults to 'Tagged "<label>"'. */
  evidence?: string
}

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
  /** Overrides the group's layout weight for this node. */
  weight?: number
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
  /** 'current' marks the position held right now; 'paused' an unfinished project on hold. */
  status?: 'current' | 'paused'
  /** Engagement for works without roles (e.g. side projects). */
  engagement?: Engagement
  remote?: boolean
  /**
   * Lightweight connections: each distinct keyword becomes a node linked to
   * every work that lists it, so no node has to be written by hand.
   */
  keywords?: (string | WorkKeyword)[]
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
