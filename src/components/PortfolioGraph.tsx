import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import ForceGraph2D from 'react-force-graph-2d'
import type {
  ForceGraphMethods,
  LinkObject,
  NodeObject,
} from 'react-force-graph-2d'
import { forceCollide, forceManyBody, forceX, forceY } from 'd3-force'
import { AnimatePresence } from 'framer-motion'
import {
  ArrowsPointingInIcon,
  HandRaisedIcon,
  LockClosedIcon,
  MinusIcon,
  PlusIcon,
} from '@heroicons/react/24/outline'
import type { GraphEdge, KnowledgeGraph, KnowledgeNode } from '../types/graph'
import type { Affinity } from '../utils/graph'
import { indexGraph, validateGraph, workAffinities } from '../utils/graph'
import { track } from '../utils/analytics'
import { WorkDetailCard } from './WorkDetailCard'

interface NodeDatum {
  id: string
  data: KnowledgeNode
  radius: number
  color: string
}
interface LinkDatum {
  edge: GraphEdge
}
type SimNode = NodeObject<NodeDatum>
type SimLink = LinkObject<NodeDatum, LinkDatum>

const BG = '#0b0f17'
const DIM_ALPHA = 0.18
// How fast highlight/dim states ease toward their target (per second).
const FADE_RATE = 9
const MAX_FIT_ZOOM = 2.4
const linkEndId = (end: SimLink['source']) =>
  typeof end === 'object' && end !== null ? String(end.id) : String(end)

function useMediaQuery(query: string) {
  const [matches] = useState(
    () => typeof window !== 'undefined' && window.matchMedia(query).matches
  )
  return matches
}

/** Moves `current` toward `target` frame-rate independently. */
const ease = (current: number, target: number, dt: number) =>
  current + (target - current) * Math.min(1, dt * FADE_RATE)

/** Stable per-id phase so nodes don't breathe or drift in sync. */
const phaseOf = (id: string) => {
  let h = 0
  for (let i = 0; i < id.length; i++) h = (h * 31 + id.charCodeAt(i)) | 0
  return ((h >>> 0) % 1000) / 1000 * Math.PI * 2
}

/** Tiny wandering force that keeps the settled graph gently alive. */
function driftForce(strength: number) {
  let nodes: SimNode[] = []
  const force = () => {
    const t = performance.now() / 1000
    for (const n of nodes) {
      if (n.fx !== undefined && n.fx !== null) continue // being dragged
      const p = phaseOf(String(n.id))
      n.vx = (n.vx ?? 0) + Math.sin(t * 0.45 + p) * strength
      n.vy = (n.vy ?? 0) + Math.cos(t * 0.38 + p * 1.7) * strength
    }
  }
  force.initialize = (ns: SimNode[]) => {
    nodes = ns
  }
  return force
}

/**
 * Invisible springs between related works. Unlike d3's forceLink it resolves
 * ids on every initialize and skips missing nodes, so it is safe to install
 * before force-graph has handed the simulation its nodes.
 */
function affinityForce(affinities: Affinity[]) {
  let springs: { s: SimNode; t: SimNode; length: number; k: number }[] = []
  const force = (alpha: number) => {
    for (const { s, t, length, k } of springs) {
      const dx = (t.x ?? 0) + (t.vx ?? 0) - (s.x ?? 0) - (s.vx ?? 0)
      const dy = (t.y ?? 0) + (t.vy ?? 0) - (s.y ?? 0) - (s.vy ?? 0)
      const d = Math.hypot(dx, dy) || 1
      const f = ((d - length) / d) * alpha * k * 0.5
      t.vx = (t.vx ?? 0) - dx * f
      t.vy = (t.vy ?? 0) - dy * f
      s.vx = (s.vx ?? 0) + dx * f
      s.vy = (s.vy ?? 0) + dy * f
    }
  }
  force.initialize = (ns: SimNode[]) => {
    const byId = new Map(ns.map((n) => [String(n.id), n]))
    springs = affinities.flatMap((a) => {
      const s = byId.get(a.source)
      const t = byId.get(a.target)
      if (!s || !t) return []
      return [
        {
          s,
          t,
          length: 100 - 60 * a.similarity,
          k: Math.min(1, 1.5 * a.similarity),
        },
      ]
    })
  }
  return force
}

interface PortfolioGraphProps {
  graph: KnowledgeGraph
}

/** Canvas renderer for a `KnowledgeGraph`. All content comes from props. */
export default function PortfolioGraph({ graph }: PortfolioGraphProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const fgRef = useRef<ForceGraphMethods<SimNode, SimLink>>()
  const fitted = useRef(false)
  const ticks = useRef(0)
  const images = useRef(new Map<string, HTMLImageElement>())

  const [size, setSize] = useState({ width: 0, height: 0 })
  const [hoverId, setHoverId] = useState<string | null>(null)
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const [imagesLoaded, setImagesLoaded] = useState(0)
  const coarse = useMediaQuery('(pointer: coarse)')
  const reducedMotion = useMediaQuery('(prefers-reduced-motion: reduce)')
  // Eased highlight state, advanced once per rendered frame.
  const nodeAlpha = useRef(new Map<string, number>())
  const linkLit = useRef(new WeakMap<SimLink, number>())
  const frame = useRef({ now: performance.now(), dt: 0 })
  // Free pan/zoom. Off by default so the graph never traps page scrolling.
  const [explore, setExplore] = useState(false)
  // force-graph keeps the first interaction filter it receives, so read live state via a ref.
  const exploreRef = useRef(explore)
  exploreRef.current = explore

  const index = useMemo(() => indexGraph(graph), [graph])
  const affinities = useMemo(() => workAffinities(index, 0.1), [index])
  const compact = size.width > 0 && size.width < 640

  useEffect(() => {
    if (import.meta.env.DEV) {
      const problems = validateGraph(graph)
      if (problems.length)
        console.warn('[PortfolioGraph] invalid graph:', problems)
    }
  }, [graph])

  // Simulation objects are created once; force-graph mutates them in place.
  const data = useMemo(() => {
    const nodes: SimNode[] = graph.nodes.map((n) => {
      const degree = index.neighbors.get(n.id)?.length ?? 0
      return {
        id: n.id,
        data: n,
        radius: n.kind === 'work' ? 14 : 3 + Math.sqrt(degree) * 1.3,
        color: index.groupColor.get(n.group) ?? '#94a3b8',
      }
    })
    const links: SimLink[] = graph.edges.map((edge) => ({
      source: edge.source,
      target: edge.target,
      edge,
    }))
    return { nodes, links }
  }, [graph, index])

  // Preload logos so they can be drawn inside the nodes.
  useEffect(() => {
    for (const n of graph.nodes) {
      if (n.kind !== 'work' || !n.logo || images.current.has(n.logo)) continue
      const img = new Image()
      img.onload = () => setImagesLoaded((c) => c + 1)
      img.src = n.logo
      images.current.set(n.logo, img)
    }
  }, [graph])

  // Track container size.
  useEffect(() => {
    const el = containerRef.current
    if (!el) return
    const ro = new ResizeObserver(([entry]) => {
      const { width, height } = entry.contentRect
      setSize({ width: Math.floor(width), height: Math.floor(height) })
    })
    ro.observe(el)
    return () => ro.disconnect()
  }, [])

  // Tune forces once the graph instance exists.
  useEffect(() => {
    const fg = fgRef.current
    if (!fg || !size.width) return
    // Phones are portrait: pull harder sideways so the layout grows tall, not wide.
    const portrait = size.height > size.width * 1.15
    fg.d3Force('charge')?.strength?.(portrait ? -260 : -220)?.distanceMax?.(260)
    // Weak gravity keeps disconnected clusters (e.g. Android) on screen.
    fg.d3Force('x', forceX<SimNode>(0).strength(portrait ? 0.16 : 0.07))
    fg.d3Force('y', forceY<SimNode>(0).strength(portrait ? 0.03 : 0.07))
    const link = fg.d3Force('link')
    link?.distance?.(74)
    fg.d3Force(
      'collide',
      // Portrait gives labels less room sideways, so works keep a wider berth.
      forceCollide<SimNode>((n) =>
        n.radius + (portrait && n.data.kind === 'work' ? 26 : 14)
      )
    )
    // Related works cluster: invisible springs between works that share
    // neighbours, plus extra repulsion between works so unrelated ones part.
    fg.d3Force('affinity', affinityForce(affinities))
    fg.d3Force(
      'workRepel',
      forceManyBody<SimNode>()
        .strength((n) => (n.data.kind === 'work' ? -300 : 0))
        .distanceMax(400)
    )
    fg.d3Force('drift', reducedMotion ? null : driftForce(0.012))
    fg.d3ReheatSimulation()
  }, [size.width, size.height, reducedMotion, affinities])

  // Touch: let vertical swipes scroll the page unless the user unlocked pan/zoom.
  useEffect(() => {
    const canvas = containerRef.current?.querySelector('canvas')
    if (canvas) canvas.style.touchAction = explore ? 'none' : 'pan-y'
  }, [explore, size.width])

  // Trackpad: two-finger swipe pans (pinch / ctrl+scroll still zooms via force-graph).
  // Each swipe is claimed once, at its start: free mode or a sideways start belongs
  // to the graph for the whole swipe; a vertical start in normal mode scrolls the page.
  // Touch: once two fingers are down, stop the browser from scrolling the page.
  useEffect(() => {
    const el = containerRef.current
    if (!el) return
    let owner: 'graph' | 'page' = 'page'
    let lastWheel = 0
    const onWheel = (ev: WheelEvent) => {
      const fg = fgRef.current
      if (!fg || ev.ctrlKey || ev.metaKey) return
      const now = performance.now()
      if (now - lastWheel > 200) {
        const sideways = Math.abs(ev.deltaX) > Math.abs(ev.deltaY)
        owner = exploreRef.current || sideways ? 'graph' : 'page'
      }
      lastWheel = now
      if (owner === 'page') return
      ev.preventDefault()
      const k = fg.zoom()
      const { x, y } = fg.centerAt()
      fg.centerAt(x + ev.deltaX / k, y + ev.deltaY / k)
    }
    const onTouch = (ev: TouchEvent) => {
      if (ev.touches.length >= 2 && ev.cancelable) ev.preventDefault()
    }
    el.addEventListener('wheel', onWheel, { passive: false })
    el.addEventListener('touchstart', onTouch, { passive: false })
    el.addEventListener('touchmove', onTouch, { passive: false })
    return () => {
      el.removeEventListener('wheel', onWheel)
      el.removeEventListener('touchstart', onTouch)
      el.removeEventListener('touchmove', onTouch)
    }
  }, [size.width])

  const focusId = hoverId ?? selectedId
  const highlighted = useMemo(() => {
    if (!focusId) return null
    const set = new Set([focusId])
    index.neighbors.get(focusId)?.forEach((n) => set.add(n.node.id))
    return set
  }, [focusId, index])

  const select = useCallback(
    (id: string | null) => {
      setSelectedId(id)
      const node = data.nodes.find((n) => n.id === id)
      if (node) {
        track('graph_node_selected', {
          node_kind: node.data.kind,
          node_label: node.data.label,
        })
      }
    },
    [data.nodes]
  )

  const drawNode = useCallback(
    (node: SimNode, ctx: CanvasRenderingContext2D, scale: number) => {
      const x = node.x ?? 0
      const y = node.y ?? 0
      const { radius: r, color, data: d } = node
      const id = String(node.id)
      const isFocus = id === focusId
      const dimmed = highlighted !== null && !highlighted.has(id)
      const alpha = ease(
        nodeAlpha.current.get(id) ?? 1,
        dimmed ? DIM_ALPHA : 1,
        frame.current.dt
      )
      nodeAlpha.current.set(id, alpha)

      ctx.save()
      ctx.globalAlpha = alpha

      // Soft breathing glow on works; static when reduced motion is preferred.
      if (d.kind === 'work') {
        const breath = reducedMotion
          ? 0.5
          : 0.5 + 0.5 * Math.sin(frame.current.now / 900 + phaseOf(id))
        const glow = ctx.createRadialGradient(x, y, r, x, y, r + 6 + breath * 3)
        glow.addColorStop(0, `${color}55`)
        glow.addColorStop(1, `${color}00`)
        ctx.beginPath()
        ctx.arc(x, y, r + 6 + breath * 3, 0, 2 * Math.PI)
        ctx.fillStyle = glow
        ctx.fill()
      }

      if (isFocus || id === selectedId) {
        ctx.beginPath()
        ctx.arc(x, y, r + 3.5, 0, 2 * Math.PI)
        ctx.strokeStyle = color
        ctx.lineWidth = 1.2
        ctx.stroke()
      }

      const img =
        d.kind === 'work' && d.logo ? images.current.get(d.logo) : undefined
      ctx.beginPath()
      ctx.arc(x, y, r, 0, 2 * Math.PI)
      if (img && img.complete && img.naturalWidth > 0) {
        ctx.fillStyle = '#ffffff'
        ctx.fill()
        ctx.save()
        ctx.clip()
        ctx.drawImage(img, x - r, y - r, r * 2, r * 2)
        ctx.restore()
        ctx.beginPath()
        ctx.arc(x, y, r, 0, 2 * Math.PI)
        ctx.strokeStyle = color
        ctx.lineWidth = 1.6
        ctx.stroke()
      } else if (d.kind === 'work') {
        ctx.fillStyle = BG
        ctx.fill()
        ctx.strokeStyle = color
        ctx.lineWidth = 1.6
        ctx.stroke()
        ctx.fillStyle = color
        ctx.font = `600 ${r}px ui-sans-serif, system-ui, sans-serif`
        ctx.textAlign = 'center'
        ctx.textBaseline = 'middle'
        ctx.fillText(d.label.charAt(0), x, y + 0.5)
      } else {
        ctx.fillStyle = color
        ctx.fill()
      }

      // Small screens: topic labels only appear around the focused node or when zoomed in.
      if (compact && d.kind === 'topic' && !isFocus && (highlighted === null || dimmed) && scale < 2.2) {
        ctx.restore()
        return
      }
      // Labels keep a readable on-screen size across zoom levels.
      const px = compact
        ? Math.min(11.5, Math.max(9, scale * 3))
        : Math.min(13, Math.max(10, scale * 3.6))
      ctx.font = `${d.kind === 'work' ? 600 : 400} ${px / scale}px ui-sans-serif, system-ui, sans-serif`
      ctx.textAlign = 'center'
      ctx.textBaseline = 'top'
      ctx.fillStyle = d.kind === 'work' ? '#e2e8f0' : color
      if (d.kind === 'topic') ctx.globalAlpha = alpha * 0.85
      ctx.fillText(d.label, x, y + r + 3 / scale + 1)
      ctx.restore()
    },
    // imagesLoaded: redraw once logos arrive
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [focusId, selectedId, highlighted, imagesLoaded, reducedMotion, compact]
  )

  const paintPointerArea = useCallback(
    (
      node: SimNode,
      paint: string,
      ctx: CanvasRenderingContext2D,
      scale: number
    ) => {
      ctx.beginPath()
      ctx.arc(
        node.x ?? 0,
        node.y ?? 0,
        node.radius + (coarse ? 10 : 4) / scale,
        0,
        2 * Math.PI
      )
      ctx.fillStyle = paint
      ctx.fill()
    },
    [coarse]
  )

  const isLinkLit = useCallback(
    (l: SimLink) =>
      focusId !== null &&
      (linkEndId(l.source) === focusId || linkEndId(l.target) === focusId),
    [focusId]
  )

  /** 1 = link touches the focused node, 0 = idle; eased between frames. */
  const litOf = useCallback(
    (l: SimLink) => {
      const v = ease(
        linkLit.current.get(l) ?? 0,
        isLinkLit(l) ? 1 : 0,
        frame.current.dt
      )
      linkLit.current.set(l, v)
      return v
    },
    [isLinkLit]
  )

  // Idle links fade further back while something is focused, and ease back.
  const idleLinkAlpha = useRef(0.28)
  const onFramePre = useCallback(() => {
    const now = performance.now()
    // Clamp so a backgrounded tab doesn't snap everything on return.
    frame.current = { now, dt: Math.min(0.05, (now - frame.current.now) / 1000) }
    idleLinkAlpha.current = ease(
      idleLinkAlpha.current,
      highlighted ? 0.06 : 0.28,
      frame.current.dt
    )
  }, [highlighted])

  const linkColor = useCallback(
    (l: SimLink) => {
      const lit = litOf(l)
      const a = idleLinkAlpha.current + (0.85 - idleLinkAlpha.current) * lit
      const c = Math.round(148 + (226 - 148) * lit)
      return `rgba(${c},${Math.round(163 + (232 - 163) * lit)},${Math.round(184 + (240 - 184) * lit)},${a.toFixed(3)})`
    },
    [litOf]
  )

  const zoomBy = (factor: number) => {
    const fg = fgRef.current
    if (fg) fg.zoom(fg.zoom() * factor, 250)
  }
  /** The part of the canvas the detail card leaves uncovered, in canvas pixels. */
  const viewport = useCallback(() => {
    const full = { left: 0, top: 0, width: size.width, height: size.height }
    if (!selectedId) return full
    const panel = containerRef.current?.parentElement?.querySelector<HTMLElement>(
      `[data-detail-panel="${CSS.escape(selectedId)}"]`
    )
    if (!panel) return full
    const gap = 12
    // offsetLeft/offsetTop ignore the card's enter transform, so this is where it comes to rest.
    return panel.offsetLeft > size.width / 3
      ? { ...full, width: panel.offsetLeft - gap } // docked right (desktop)
      : { ...full, height: panel.offsetTop - gap } // docked bottom (phone)
  }, [size, selectedId])

  /** Eases the camera so graph point (x, y) sits in the middle of the visible area. */
  const lookAt = useCallback(
    (x: number, y: number, k: number, ms: number) => {
      const fg = fgRef.current
      if (!fg) return
      const v = viewport()
      fg.centerAt(
        x + (size.width / 2 - (v.left + v.width / 2)) / k,
        y + (size.height / 2 - (v.top + v.height / 2)) / k,
        ms
      )
      fg.zoom(k, ms)
    },
    [size, viewport]
  )

  /** Eases the camera to frame the whole graph (never snaps). */
  const fit = useCallback(
    (ms = 700) => {
      const fg = fgRef.current
      if (!fg || !size.width) return
      const { x, y } = fg.getGraphBbox()
      const v = viewport()
      const pad = 48
      const k = Math.min(
        MAX_FIT_ZOOM, // small graphs would otherwise be blown up on large screens
        (v.width - pad * 2) / Math.max(1, x[1] - x[0]),
        (v.height - pad * 2) / Math.max(1, y[1] - y[0])
      )
      lookAt((x[0] + x[1]) / 2, (y[0] + y[1]) / 2, Math.max(0.4, k), ms)
    },
    [size, viewport, lookAt]
  )

  // Centre the selected node in the space beside (or above) the detail card. Runs
  // after the card mounts so its real size is known.
  useEffect(() => {
    const fg = fgRef.current
    const node = selectedId ? data.nodes.find((n) => n.id === selectedId) : undefined
    if (!fg || node?.x === undefined || node.y === undefined) return
    lookAt(node.x, node.y, fg.zoom(), 500)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedId])

  const selected = selectedId ? index.byId.get(selectedId) : undefined
  const isTouchEvent = (ev: Event) => ev.type.startsWith('touch')
  // Two fingers always move the graph; one finger keeps scrolling the page.
  const isMultiTouch = (ev: Event) =>
    'touches' in ev && (ev as TouchEvent).touches.length >= 2

  return (
    <div
      className="relative w-full h-full overflow-hidden rounded-xl border border-white/10 select-none"
      style={{
        background: BG,
        backgroundImage:
          'radial-gradient(rgba(148,163,184,0.09) 1px, transparent 1px)',
        backgroundSize: '22px 22px',
      }}
    >
      <div ref={containerRef} className="absolute inset-0">
        {size.width > 0 && (
          <ForceGraph2D<NodeDatum, LinkDatum>
            ref={fgRef}
            width={size.width}
            height={size.height}
            graphData={data}
            backgroundColor="rgba(0,0,0,0)"
            nodeRelSize={1}
            nodeVal={(n) => n.radius * n.radius}
            nodeLabel={() => ''}
            nodeCanvasObject={drawNode}
            nodePointerAreaPaint={paintPointerArea}
            linkColor={linkColor}
            linkWidth={(l) => 0.8 + 0.8 * (linkLit.current.get(l) ?? 0)}
            // Slow ambient particles; they brighten along the focused links.
            linkDirectionalParticles={reducedMotion ? 0 : 1}
            linkDirectionalParticleSpeed={(l) =>
              0.0025 + ((phaseOf(l.edge.source + l.edge.target) % 1) * 0.002)
            }
            linkDirectionalParticleWidth={(l) =>
              1.3 + 0.9 * (linkLit.current.get(l) ?? 0)
            }
            linkDirectionalParticleColor={(l) => {
              const lit = linkLit.current.get(l) ?? 0
              const a = Math.min(0.9, idleLinkAlpha.current * 1.6 + 0.6 * lit)
              return `rgba(226,232,240,${a.toFixed(3)})`
            }}
            onRenderFramePre={onFramePre}
            // Keep redrawing after the layout settles so motion and fades continue.
            autoPauseRedraw={false}
            linkLineDash={(l) => (l.edge.basis === 'inferred' ? [3, 3] : null)}
            onNodeHover={(n) => setHoverId(n ? String(n.id) : null)}
            onNodeClick={(n) => select(String(n.id))}
            onBackgroundClick={() => {
              setSelectedId(null)
              setHoverId(null)
            }}
            enableNodeDrag={!coarse || explore}
            // Wheel without ctrl/⌘ pans (handled above); pinch arrives as ctrl+wheel.
            enableZoomInteraction={(ev) => ev.ctrlKey || ev.metaKey}
            enablePanInteraction={(ev) =>
              exploreRef.current || !isTouchEvent(ev) || isMultiTouch(ev)
            }
            minZoom={0.4}
            maxZoom={8}
            // With motion on, the simulation never fully cools so the drift force keeps nodes wandering.
            cooldownTicks={reducedMotion ? 180 : Infinity}
            cooldownTime={reducedMotion ? 15000 : Infinity}
            d3AlphaMin={reducedMotion ? 0.001 : 0}
            d3VelocityDecay={0.35}
            onEngineTick={() => {
              // Frame the graph early so it never sits half-off-screen while settling.
              ticks.current++
              if (ticks.current === 40 && !fitted.current) fit(600)
              // The engine never stops while drifting, so frame the settled layout here.
              if (ticks.current === 220 && !fitted.current) {
                fitted.current = true
                fit(900)
              }
            }}
            onEngineStop={() => {
              if (!fitted.current) {
                fitted.current = true
                fit(900)
              }
            }}
          />
        )}
      </div>

      {/* Legend */}
      <ul className="pointer-events-none absolute left-3 top-3 z-10 flex flex-nowrap sm:flex-wrap gap-x-3 gap-y-1 max-w-[calc(100%-1.5rem)] sm:max-w-[75%] overflow-x-auto pointer-events-auto sm:pointer-events-none [scrollbar-width:none] rounded-full sm:rounded-md border border-white/5 sm:border-0 bg-[#0b0f17]/80 backdrop-blur-sm px-3 sm:px-2 py-1 text-[10px] sm:text-[11px] text-slate-400 whitespace-nowrap">
        {graph.groups.map((g) => (
          <li key={g.id} className="flex items-center gap-1.5">
            <span
              className="w-2 h-2 rounded-full"
              style={{ background: g.color }}
            />
            {g.label}
          </li>
        ))}
      </ul>

      {/* Controls */}
      <div className="absolute inset-x-3 bottom-3 sm:right-auto flex flex-row-reverse sm:flex-row items-end justify-between sm:justify-start gap-3 pointer-events-none">
        <div className="pointer-events-auto flex rounded-full sm:rounded-lg border border-white/10 bg-[#0d131d]/90 backdrop-blur-sm text-slate-300 overflow-hidden shadow-lg shadow-black/40">
          <button
            className="p-3 sm:p-2 hover:bg-white/10"
            onClick={() => zoomBy(1.4)}
            aria-label="Zoom in"
          >
            <PlusIcon className="w-4 h-4" />
          </button>
          <button
            className="p-3 sm:p-2 hover:bg-white/10"
            onClick={() => zoomBy(1 / 1.4)}
            aria-label="Zoom out"
          >
            <MinusIcon className="w-4 h-4" />
          </button>
          <button
            className="p-3 sm:p-2 hover:bg-white/10"
            onClick={() => fit()}
            aria-label="Fit graph to view"
          >
            <ArrowsPointingInIcon className="w-4 h-4" />
          </button>
          <button
            className={`p-3 sm:p-2 border-l border-white/10 ${explore ? 'bg-white/15 text-white' : 'hover:bg-white/10'}`}
            onClick={() => setExplore((v) => !v)}
            aria-pressed={explore}
            aria-label={
              explore ? 'Lock pan and zoom' : 'Unlock free pan and zoom'
            }
            title={explore ? 'Lock pan & zoom' : 'Free pan & zoom'}
          >
            {explore ? (
              <LockClosedIcon className="w-4 h-4" />
            ) : (
              <HandRaisedIcon className="w-4 h-4" />
            )}
          </button>
        </div>
        <p className="pb-1 whitespace-nowrap text-[10px] sm:text-[11px] text-slate-500 rounded-full sm:rounded-none bg-[#0b0f17]/70 sm:bg-transparent px-2.5 py-1 sm:p-0 sm:pb-1">
          {explore
            ? coarse
              ? 'Drag to pan · pinch to zoom'
              : 'Free mode: scroll or drag to pan, pinch / ctrl+scroll to zoom'
            : coarse
              ? 'Tap a node · two fingers to move'
              : 'Click for details · drag to pan · ctrl/⌘ + scroll to zoom'}
        </p>
      </div>

      {/* Screen-reader / keyboard access to the same content */}
      <ul className="sr-only">
        {graph.nodes.map((n) => (
          <li key={n.id}>
            <button onClick={() => select(n.id)}>
              {n.kind === 'work' ? n.title : n.label}
            </button>
          </li>
        ))}
      </ul>

      <AnimatePresence>
        {selected && (
          <WorkDetailCard
            key={selected.id}
            node={selected}
            index={index}
            onSelect={select}
            onClose={() => setSelectedId(null)}
          />
        )}
      </AnimatePresence>
    </div>
  )
}
