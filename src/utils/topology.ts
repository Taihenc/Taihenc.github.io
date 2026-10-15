import { GraphData, GraphLink, GraphNode } from '../types/graph'

/**
 * Calculates the Jaccard similarity coefficient between two string arrays:
 * J(A, B) = |A ∩ B| / |A ∪ B|
 */
export function calculateJaccardSimilarity(tagsA: string[], tagsB: string[]): number {
  if (!tagsA.length || !tagsB.length) return 0
  const setA = new Set(tagsA.map((t) => t.toLowerCase()))
  const setB = new Set(tagsB.map((t) => t.toLowerCase()))

  let intersection = 0
  setA.forEach((tag) => {
    if (setB.has(tag)) intersection++
  })

  const union = new Set([...setA, ...setB]).size
  return union === 0 ? 0 : intersection / union
}

/**
 * Automatically derives graph links using Jaccard tag similarity threshold (>= 0.25)
 * and guaranteed semantic category bonds.
 */
export function buildGraphTopology(nodes: GraphNode[], threshold = 0.25): GraphData {
  const links: GraphLink[] = []

  for (let i = 0; i < nodes.length; i++) {
    for (let j = i + 1; j < nodes.length; j++) {
      const nodeA = nodes[i]
      const nodeB = nodes[j]

      const similarity = calculateJaccardSimilarity(nodeA.tags, nodeB.tags)
      const isInterCategory = nodeA.category !== nodeB.category

      if (similarity >= threshold) {
        links.push({
          source: nodeA.id,
          target: nodeB.id,
          similarity,
          isInterCategory,
        })
      }
    }
  }

  return { nodes, links }
}

/**
 * Clamps a floating terminal detail card within screen boundaries
 * so it never overflows off-screen or gets obstructed.
 */
export function clampCardCoordinates(
  targetX: number,
  targetY: number,
  cardWidth = 340,
  cardHeight = 280,
  containerWidth: number,
  containerHeight: number,
  padding = 16
): { left: number; top: number; flippedX: boolean; flippedY: boolean } {
  let left = targetX + 16
  let top = targetY - cardHeight / 2
  let flippedX = false
  let flippedY = false

  // Flip to the left if overflowing on right
  if (left + cardWidth > containerWidth - padding) {
    left = targetX - cardWidth - 16
    flippedX = true
  }

  // Fallback left clamp
  if (left < padding) {
    left = padding
  }

  // Bottom clamp
  if (top + cardHeight > containerHeight - padding) {
    top = containerHeight - cardHeight - padding
    flippedY = true
  }

  // Top clamp
  if (top < padding) {
    top = padding
  }

  return { left, top, flippedX, flippedY }
}
