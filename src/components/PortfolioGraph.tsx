import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import ForceGraph2D from 'react-force-graph-2d'
import * as d3 from 'd3-force'
import {
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  Filter,
  RotateCcw,
  Search,
  Terminal,
} from 'lucide-react'
import { portfolioNodes } from '../data/portfolioData'
import { CATEGORY_CONFIG, GraphNode, NodeCategory } from '../types/graph'
import { buildGraphTopology, clampCardCoordinates } from '../utils/topology'
import { WorkDetailCard } from './WorkDetailCard'

export const PortfolioGraph: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null)
  const fgRef = useRef<any>()

  // Layout Dimensions
  const [dimensions, setDimensions] = useState({ width: 900, height: 620 })

  // Interactive State
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<NodeCategory | 'all'>('all')
  const [hoveredNode, setHoveredNode] = useState<GraphNode | null>(null)
  const [activeCardNode, setActiveCardNode] = useState<GraphNode | null>(null)
  const [cardPosition, setCardPosition] = useState<{ left: number; top: number }>({ left: 0, top: 0 })
  const [isBootLogOpen, setIsBootLogOpen] = useState(true)

  // Build Topology with Jaccard Similarity
  const graphData = useMemo(() => {
    return buildGraphTopology(portfolioNodes, 0.25)
  }, [])

  // Track Connected Nodes of Hovered or Selected Node for Spotlight Dimming
  const connectedNodeIds = useMemo(() => {
    const target = hoveredNode || activeCardNode
    if (!target) return new Set<string>()

    const ids = new Set<string>([target.id])
    graphData.links.forEach((link) => {
      const sourceId = typeof link.source === 'object' ? (link.source as GraphNode).id : link.source
      const targetId = typeof link.target === 'object' ? (link.target as GraphNode).id : link.target

      if (sourceId === target.id) ids.add(targetId)
      if (targetId === target.id) ids.add(sourceId)
    })
    return ids
  }, [hoveredNode, activeCardNode, graphData.links])

  // Filtered Graph Data based on category and search
  const filteredData = useMemo(() => {
    const query = searchQuery.trim().toLowerCase()
    const filteredNodes = graphData.nodes.filter((node) => {
      const matchesCategory = selectedCategory === 'all' || node.category === selectedCategory
      const matchesQuery =
        !query ||
        node.name.toLowerCase().includes(query) ||
        node.tags.some((t) => t.toLowerCase().includes(query)) ||
        node.summary.toLowerCase().includes(query)

      return matchesCategory && matchesQuery
    })

    const nodeIds = new Set(filteredNodes.map((n) => n.id))
    const filteredLinks = graphData.links.filter((link) => {
      const sourceId = typeof link.source === 'object' ? (link.source as GraphNode).id : link.source
      const targetId = typeof link.target === 'object' ? (link.target as GraphNode).id : link.target
      return nodeIds.has(sourceId) && nodeIds.has(targetId)
    })

    return { nodes: filteredNodes, links: filteredLinks }
  }, [graphData, selectedCategory, searchQuery])

  // Resize Observer for Fluid Responsive Canvas
  useEffect(() => {
    const updateDimensions = () => {
      if (containerRef.current) {
        const { clientWidth, clientHeight } = containerRef.current
        setDimensions({
          width: clientWidth || 900,
          height: clientHeight || 620,
        })
      }
    }

    updateDimensions()
    window.addEventListener('resize', updateDimensions)
    return () => window.removeEventListener('resize', updateDimensions)
  }, [])

  // Configure Physics Engine Simulation (Repulsion, Multi-Centroid, Collision, Links)
  useEffect(() => {
    if (!fgRef.current) return

    // 1. Repulsion force with capped distance to prevent drift
    fgRef.current.d3Force(
      'charge',
      d3.forceManyBody().strength(-170).distanceMax(300)
    )

    // 2. Collision avoidance
    fgRef.current.d3Force(
      'collide',
      d3.forceCollide().radius((node: any) => Math.sqrt(node.val || 5) * 4 + 10)
    )

    // 3. Multi-Centroid Categorical Gravity Anchors
    fgRef.current.d3Force(
      'x',
      d3
        .forceX((node: any) => {
          const config = CATEGORY_CONFIG[node.category as NodeCategory]
          return config ? config.anchor.x : 0
        })
        .strength(0.24)
    )

    fgRef.current.d3Force(
      'y',
      d3
        .forceY((node: any) => {
          const config = CATEGORY_CONFIG[node.category as NodeCategory]
          return config ? config.anchor.y : 0
        })
        .strength(0.24)
    )

    // 4. Link physics (tight within cluster, elastic cross-cluster)
    const linkForce = fgRef.current.d3Force('link') as any
    if (linkForce) {
      linkForce.distance((link: any) => (link.isInterCategory ? 120 : 42))
      linkForce.strength((link: any) => (link.isInterCategory ? 0.18 : 0.7))
    }

    // Warm up and anneal
    fgRef.current.d3ReheatSimulation()
  }, [filteredData])

  // Synchronize Floating Detail Card position to Canvas Screen Coordinates
  const updateCardScreenPosition = useCallback(
    (node: GraphNode) => {
      if (!fgRef.current || !containerRef.current || node.x === undefined || node.y === undefined) return
      const screenPos = fgRef.current.graph2ScreenCoords(node.x, node.y)
      if (!screenPos) return

      const clamped = clampCardCoordinates(
        screenPos.x,
        screenPos.y,
        340,
        290,
        dimensions.width,
        dimensions.height,
        16
      )
      setCardPosition({ left: clamped.left, top: clamped.top })
    },
    [dimensions]
  )

  useEffect(() => {
    if (activeCardNode) {
      updateCardScreenPosition(activeCardNode)
    }
  }, [activeCardNode, updateCardScreenPosition])

  // Kinetic Micro-Animation: "The Flutter" on Hover
  const handleNodeHover = useCallback(
    (node: GraphNode | null) => {
      setHoveredNode(node)

      if (node && fgRef.current) {
        // 1. Reheat simulation slightly
        const sim = (fgRef.current as any).d3Force('simulation')
        if (sim) sim.alphaTarget(0.12).restart()
      } else if (!node && fgRef.current) {
        // Return to rest
        const sim = (fgRef.current as any).d3Force('simulation')
        if (sim) sim.alphaTarget(0)
      }
    },
    []
  )

  const handleNodeClick = useCallback(
    (node: GraphNode) => {
      setActiveCardNode(node)
      updateCardScreenPosition(node)
    },
    [updateCardScreenPosition]
  )

  const handleResetZoom = useCallback(() => {
    if (fgRef.current) {
      fgRef.current.zoomToFit(400, 50)
    }
  }, [])

  // Custom Node Canvas Renderer (Obsidian Constellation + Glowing Stellar Halos)
  const drawNode = useCallback(
    (node: any, ctx: CanvasRenderingContext2D, globalScale: number) => {
      const isTarget = hoveredNode?.id === node.id || activeCardNode?.id === node.id
      const isConnected = connectedNodeIds.has(node.id)
      const hasActiveFocus = Boolean(hoveredNode || activeCardNode)

      // Kinetic Flutter on Hover
      if (isTarget && node.vx !== undefined && node.vy !== undefined) {
        const t = Date.now() / 45 + (node.index || 0)
        node.vx += 1.2 * Math.sin(t)
        node.vy += 1.2 * Math.cos(t)
      }

      const categoryMeta = CATEGORY_CONFIG[node.category as NodeCategory] || {
        color: '#38bdf8',
        glowColor: 'rgba(56, 189, 248, 0.45)',
      }

      // Spotlight Dimming
      let opacity = 1
      if (hasActiveFocus) {
        opacity = isConnected ? 1 : 0.12
      }

      ctx.save()
      ctx.globalAlpha = opacity

      const radius = Math.max(3, Math.sqrt(node.val || 5) * 2.8)

      // Outer Halo Glow
      if (isTarget || isConnected) {
        ctx.shadowColor = categoryMeta.color
        ctx.shadowBlur = isTarget ? 22 : 12
      } else {
        ctx.shadowColor = 'transparent'
        ctx.shadowBlur = 0
      }

      // Node Body Circle
      ctx.beginPath()
      ctx.arc(node.x, node.y, radius, 0, 2 * Math.PI, false)
      ctx.fillStyle = categoryMeta.color
      ctx.fill()

      // Inner Core
      ctx.beginPath()
      ctx.arc(node.x, node.y, radius * 0.45, 0, 2 * Math.PI, false)
      ctx.fillStyle = '#ffffff'
      ctx.fill()

      // Node Label (Strict Monospace)
      const fontSize = Math.max(10 / globalScale, 3.2)
      ctx.font = `600 ${fontSize}px ui-monospace, "JetBrains Mono", "Fira Code", monospace`
      ctx.textAlign = 'center'
      ctx.textBaseline = 'top'
      ctx.fillStyle = isTarget ? '#ffffff' : '#cbd5e1'
      ctx.shadowBlur = 0
      ctx.fillText(node.name, node.x, node.y + radius + 3)

      ctx.restore()
    },
    [hoveredNode, activeCardNode, connectedNodeIds]
  )

  // Custom Link Canvas Renderer (Luminescent Cybernetic Paths)
  const drawLink = useCallback(
    (link: any, ctx: CanvasRenderingContext2D) => {
      const sourceId = typeof link.source === 'object' ? link.source.id : link.source
      const targetId = typeof link.target === 'object' ? link.target.id : link.target

      const isHoveredLink =
        (hoveredNode && (hoveredNode.id === sourceId || hoveredNode.id === targetId)) ||
        (activeCardNode && (activeCardNode.id === sourceId || activeCardNode.id === targetId))

      const hasActiveFocus = Boolean(hoveredNode || activeCardNode)

      ctx.save()
      if (hasActiveFocus) {
        ctx.globalAlpha = isHoveredLink ? 0.95 : 0.08
      } else {
        ctx.globalAlpha = link.isInterCategory ? 0.18 : 0.35
      }

      ctx.beginPath()
      ctx.moveTo(link.source.x, link.source.y)
      ctx.lineTo(link.target.x, link.target.y)
      ctx.strokeStyle = isHoveredLink ? '#38bdf8' : link.isInterCategory ? '#64748b' : '#94a3b8'
      ctx.lineWidth = isHoveredLink ? 1.8 : 0.8
      if (isHoveredLink) {
        ctx.shadowColor = '#38bdf8'
        ctx.shadowBlur = 8
      }
      ctx.stroke()
      ctx.restore()
    },
    [hoveredNode, activeCardNode]
  )

  return (
    <div className="relative flex h-full w-full flex-col select-none overflow-hidden rounded-xl border border-white/10 bg-[#0f1523] font-mono shadow-2xl">
      {/* 1. Terminal Header & Telemetry Bar (procko.pro style) */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 bg-[#080c14]/90 px-4 py-2.5 text-xs text-[#cbd5e1]">
        {/* Mock Shell Prompt */}
        <div className="flex items-center gap-2">
          <Terminal size={14} className="text-cyan-400" />
          <span className="text-emerald-400">atom@taihen-lab</span>
          <span className="text-slate-500">:</span>
          <span className="text-cyan-300">~$</span>
          <span className="font-semibold text-slate-200">./visualize_graph.sh --inspect --cluster</span>
        </div>

        {/* Live Ontology Telemetry Bar */}
        <div className="flex flex-wrap items-center gap-2 text-[11px]">
          <span className="inline-flex items-center gap-1 rounded border border-emerald-500/30 bg-emerald-950/40 px-2 py-0.5 text-emerald-400">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400" />
            SYS_ONLINE
          </span>
          <span className="rounded border border-white/10 bg-white/5 px-2 py-0.5 text-slate-300">
            CU_ENG: TA
          </span>
          <span className="rounded border border-white/10 bg-white/5 px-2 py-0.5 text-slate-300">
            HOME_LAB: 99.9%
          </span>
          <span className="rounded border border-white/10 bg-white/5 px-2 py-0.5 text-cyan-400">
            FPS: 60
          </span>
          <button
            onClick={() => setIsBootLogOpen((prev) => !prev)}
            className="flex items-center gap-1 rounded border border-white/10 bg-white/5 px-2 py-0.5 text-slate-400 hover:text-white transition-colors"
          >
            {isBootLogOpen ? <ChevronUp size={12} /> : <ChevronDown size={12} />}
            LOGS
          </button>
        </div>
      </div>

      {/* 2. Collapsible Boot Diagnostic Log */}
      {isBootLogOpen && (
        <div className="border-b border-white/5 bg-[#05080e]/95 px-4 py-2 text-[11px] text-slate-400 space-y-0.5">
          <div className="flex items-center gap-2 text-cyan-400/90">
            <span>&gt; initializing taihen ontology engine...</span>
            <span className="text-slate-600">[OK]</span>
          </div>
          <div className="flex items-center gap-2 text-slate-400">
            <span>&gt; resolving Jaccard node clusters (k=0.25, nodes={graphData.nodes.length}, links={graphData.links.length})...</span>
          </div>
          <div className="flex items-center gap-2 text-emerald-400/90">
            <span>&gt; status: AVAILABLE FOR ROLES &amp; RESEARCH</span>
          </div>
        </div>
      )}

      {/* 3. Filter Chips & Search Controls */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/5 bg-[#0b101c]/80 px-4 py-2 text-xs">
        {/* Category Filters */}
        <div className="flex flex-wrap items-center gap-1.5">
          <Filter size={12} className="mr-1 text-slate-400" />
          <button
            onClick={() => setSelectedCategory('all')}
            className={`rounded px-2 py-1 text-[11px] transition-colors ${
              selectedCategory === 'all'
                ? 'border border-white/30 bg-white/15 text-white font-bold'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            All ({graphData.nodes.length})
          </button>
          {(Object.keys(CATEGORY_CONFIG) as NodeCategory[]).map((cat) => {
            const config = CATEGORY_CONFIG[cat]
            const isSelected = selectedCategory === cat
            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                style={{
                  borderColor: isSelected ? config.color : 'transparent',
                  color: isSelected ? config.color : '#94a3b8',
                }}
                className={`rounded border px-2 py-1 text-[11px] transition-colors ${
                  isSelected ? 'bg-white/10 font-bold' : 'hover:bg-white/5'
                }`}
              >
                {config.label}
              </button>
            )
          })}
        </div>

        {/* Live Search & Reset Zoom */}
        <div className="flex items-center gap-2">
          <div className="relative flex items-center">
            <Search size={12} className="absolute left-2 text-slate-500" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="grep nodes or #tags..."
              className="h-7 w-40 rounded border border-white/10 bg-[#080c14] pl-6 pr-2 text-[11px] text-slate-200 placeholder-slate-500 focus:border-cyan-400 focus:outline-none"
            />
          </div>
          <button
            onClick={handleResetZoom}
            title="Reset view"
            className="flex h-7 items-center gap-1 rounded border border-white/10 bg-white/5 px-2 text-[11px] text-slate-300 hover:bg-white/10 transition-colors"
          >
            <RotateCcw size={12} />
            Recenter
          </button>
        </div>
      </div>

      {/* 4. Canvas Container with Subtle 24px Crosshair/Grid Backdrop */}
      <div
        ref={containerRef}
        className="relative flex-1 w-full h-full min-h-[420px] overflow-hidden bg-[#080c14]"
        style={{
          backgroundImage:
            'radial-gradient(circle, rgba(255, 255, 255, 0.06) 1px, transparent 1px)',
          backgroundSize: '24px 24px',
        }}
      >
        <ForceGraph2D
          ref={fgRef}
          width={dimensions.width}
          height={dimensions.height}
          graphData={filteredData}
          nodeLabel={() => ''}
          nodeRelSize={4}
          nodeCanvasObject={drawNode}
          nodeCanvasObjectMode={() => 'replace'}
          linkCanvasObject={drawLink}
          linkCanvasObjectMode={() => 'replace'}
          onNodeHover={(node) => handleNodeHover(node as GraphNode | null)}
          onNodeClick={(node) => handleNodeClick(node as GraphNode)}
          onBackgroundClick={() => setActiveCardNode(null)}
          cooldownTicks={150}
          d3VelocityDecay={0.4}
          enableNodeDrag={true}
        />

        {/* 5. Floating Glassmorphic Terminal Card (Canvas-to-DOM Bridge) */}
        {activeCardNode && (
          <WorkDetailCard
            node={activeCardNode}
            position={cardPosition}
            onClose={() => setActiveCardNode(null)}
          />
        )}
      </div>

      {/* 6. Footer Activity & Evidence Frequency Ticker */}
      <div className="flex flex-wrap items-center justify-between border-t border-white/10 bg-[#080c14]/90 px-4 py-2 text-[11px] text-slate-400">
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-1 text-emerald-400 font-semibold">
            <CheckCircle2 size={12} />
            Ontology Graph Mounted
          </span>
          <span className="hidden sm:inline text-slate-500">|</span>
          <span className="hidden sm:inline text-slate-400">
            Hover to ignite connections • Click node for inspection
          </span>
        </div>
        <div className="flex items-center gap-2 text-[10px]">
          <span className="rounded bg-white/5 px-1.5 py-0.5 text-slate-300">Kotlin × 14</span>
          <span className="rounded bg-white/5 px-1.5 py-0.5 text-slate-300">TypeScript × 18</span>
          <span className="rounded bg-white/5 px-1.5 py-0.5 text-slate-300">Linux × 24</span>
          <span className="rounded bg-white/5 px-1.5 py-0.5 text-slate-300">Docker × 16</span>
        </div>
      </div>
    </div>
  )
}
