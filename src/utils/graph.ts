import type {
  GraphEdge,
  KnowledgeGraph,
  KnowledgeNode,
  WorkKeyword,
} from '../types/graph'

/** Pure helpers over a `KnowledgeGraph`. No React, no rendering. */

export interface Neighbor {
  node: KnowledgeNode
  edge: GraphEdge
}

export interface GraphIndex {
  byId: Map<string, KnowledgeNode>
  neighbors: Map<string, Neighbor[]>
  groupColor: Map<string, string>
  groupWeight: Map<string, number>
}

/** Returns human-readable problems (duplicate ids, dangling edges, unknown groups). */
export function validateGraph(graph: KnowledgeGraph): string[] {
  const problems: string[] = []
  const ids = new Set<string>()
  const groups = new Set(graph.groups.map((g) => g.id))

  for (const node of graph.nodes) {
    if (ids.has(node.id)) problems.push(`duplicate node id "${node.id}"`)
    ids.add(node.id)
    if (!groups.has(node.group))
      problems.push(`node "${node.id}" has unknown group "${node.group}"`)
  }
  for (const edge of graph.edges) {
    if (!ids.has(edge.source))
      problems.push(`edge source "${edge.source}" not found`)
    if (!ids.has(edge.target))
      problems.push(`edge target "${edge.target}" not found`)
  }
  return problems
}

export const keywordId = (label: string) =>
  `kw-${label.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`

/**
 * Expands `keywords` on works into topic nodes (in `group`) plus one edge per
 * tagged work. A keyword whose id already exists links to that node instead.
 */
export function withKeywords(
  graph: KnowledgeGraph,
  group: string
): KnowledgeGraph {
  const ids = new Set(graph.nodes.map((n) => n.id))
  const nodes = [...graph.nodes]
  const edges = [...graph.edges]
  for (const work of graph.nodes) {
    if (work.kind !== 'work') continue
    for (const kw of work.keywords ?? []) {
      const { label, evidence }: WorkKeyword =
        typeof kw === 'string' ? { label: kw } : kw
      const id = keywordId(label)
      if (!ids.has(id)) {
        nodes.push({ id, kind: 'topic', group, label })
        ids.add(id)
      }
      edges.push({
        source: work.id,
        target: id,
        evidence: evidence ?? `Tagged "${label}"`,
        basis: 'stated',
      })
    }
  }
  return { ...graph, nodes, edges }
}

export interface Affinity {
  source: string
  target: string
  /** 0..1, how much of their neighbourhood two works share. */
  similarity: number
}

/**
 * Pairs of works that share neighbours, scored by weighted Jaccard. A shared
 * neighbour weighs weight/degree: a niche keyword says more than "Python", and
 * a heavy group (e.g. job type) says more than any single skill.
 */
export function workAffinities(index: GraphIndex, min = 0.15): Affinity[] {
  const works = [...index.byId.values()].filter((n) => n.kind === 'work')
  const weight = (id: string) => {
    const node = index.byId.get(id)
    const w = node?.weight ?? index.groupWeight.get(node?.group ?? '') ?? 1
    return w / (index.neighbors.get(id)?.length || 1)
  }
  const around = new Map(
    works.map((w) => [
      w.id,
      new Set((index.neighbors.get(w.id) ?? []).map((n) => n.node.id)),
    ])
  )
  const result: Affinity[] = []
  for (let i = 0; i < works.length; i++) {
    for (let j = i + 1; j < works.length; j++) {
      const a = around.get(works[i].id)!
      const b = around.get(works[j].id)!
      let shared = 0
      let union = 0
      for (const id of new Set([...a, ...b])) {
        const w = weight(id)
        union += w
        if (a.has(id) && b.has(id)) shared += w
      }
      const similarity = union ? shared / union : 0
      if (similarity >= min)
        result.push({ source: works[i].id, target: works[j].id, similarity })
    }
  }
  return result
}

export function indexGraph(graph: KnowledgeGraph): GraphIndex {
  const byId = new Map(graph.nodes.map((n) => [n.id, n]))
  const neighbors = new Map<string, Neighbor[]>(
    graph.nodes.map((n) => [n.id, []])
  )

  for (const edge of graph.edges) {
    const a = byId.get(edge.source)
    const b = byId.get(edge.target)
    if (!a || !b) continue
    neighbors.get(a.id)?.push({ node: b, edge })
    neighbors.get(b.id)?.push({ node: a, edge })
  }

  return {
    byId,
    neighbors,
    groupColor: new Map(graph.groups.map((g) => [g.id, g.color])),
    groupWeight: new Map(graph.groups.map((g) => [g.id, g.weight ?? 1])),
  }
}
