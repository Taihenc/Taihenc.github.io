import type { GraphEdge, KnowledgeGraph, KnowledgeNode } from '../types/graph'

/** Pure helpers over a `KnowledgeGraph`. No React, no rendering. */

export interface Neighbor {
  node: KnowledgeNode
  edge: GraphEdge
}

export interface GraphIndex {
  byId: Map<string, KnowledgeNode>
  neighbors: Map<string, Neighbor[]>
  groupColor: Map<string, string>
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
  }
}
