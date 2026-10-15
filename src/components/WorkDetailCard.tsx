import React from 'react'
import { ExternalLink, GitBranch, Terminal, X } from 'lucide-react'
import { CATEGORY_CONFIG, GraphNode } from '../types/graph'

interface WorkDetailCardProps {
  node: GraphNode
  position: { left: number; top: number }
  onClose: () => void
}

export const WorkDetailCard: React.FC<WorkDetailCardProps> = ({ node, position, onClose }) => {
  const categoryMeta = CATEGORY_CONFIG[node.category]

  return (
    <div
      style={{
        left: `${position.left}px`,
        top: `${position.top}px`,
        borderColor: 'rgba(255, 255, 255, 0.14)',
      }}
      className="absolute z-50 w-[340px] max-w-[calc(100vw-32px)] select-none rounded-lg border bg-[#0f1523]/95 p-0 font-mono text-[#cbd5e1] shadow-2xl backdrop-blur-xl transition-all duration-150 animate-in fade-in zoom-in-95"
    >
      {/* Terminal Title Bar */}
      <div className="flex items-center justify-between border-b border-white/10 bg-[#080c14]/80 px-3 py-2 text-xs">
        <div className="flex items-center gap-2">
          <div className="flex gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-[#ef4444]/80" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#eab308]/80" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#22c55e]/80" />
          </div>
          <span className="truncate text-slate-400">
            cat {categoryMeta.pathPrefix}/{node.id}.nfo
          </span>
        </div>
        <button
          onClick={onClose}
          className="rounded p-0.5 text-slate-400 hover:bg-white/10 hover:text-white transition-colors"
        >
          <X size={14} />
        </button>
      </div>

      {/* Card Content Body */}
      <div className="space-y-3 p-4 text-xs">
        {/* Title & Status Badge */}
        <div className="flex items-start justify-between gap-2">
          <div>
            <h3 className="text-base font-bold text-[#e2e8f0]" style={{ color: categoryMeta.color }}>
              {node.name}
            </h3>
            {node.role && <p className="text-[11px] text-slate-400">{node.role}</p>}
          </div>

          {/* Status Glyphs */}
          {node.status && (
            <span
              className={`inline-flex shrink-0 items-center gap-1 rounded border px-1.5 py-0.5 text-[10px] font-semibold ${
                node.status === 'finished'
                  ? 'border-emerald-500/40 bg-emerald-950/40 text-emerald-400'
                  : node.status === 'dev'
                  ? 'border-amber-500/40 bg-amber-950/40 text-amber-400'
                  : 'border-cyan-500/40 bg-cyan-950/40 text-cyan-400'
              }`}
            >
              {node.status === 'finished' && '✓ finished'}
              {node.status === 'dev' && '● dev'}
              {node.status === 'lab' && '◈ lab'}
            </span>
          )}
        </div>

        {/* Summary Description */}
        <p className="leading-relaxed text-[#cbd5e1]">{node.summary}</p>

        {/* Evidence Frequency Counter / Tags */}
        <div className="space-y-1.5 pt-1">
          <div className="flex items-center justify-between text-[10px] text-slate-400">
            <span className="flex items-center gap-1">
              <Terminal size={11} />
              ontology evidence
            </span>
            {node.evidenceCount && (
              <span className="text-amber-400 font-semibold">evidence × {node.evidenceCount}</span>
            )}
          </div>
          <div className="flex flex-wrap gap-1.5">
            {node.tags.map((tag) => (
              <span
                key={tag}
                className="rounded border border-white/10 bg-white/5 px-1.5 py-0.5 text-[10px] text-slate-300"
              >
                #{tag}
              </span>
            ))}
          </div>
        </div>

        {/* Action Links */}
        {(node.demoUrl || node.repoUrl) && (
          <div className="flex items-center gap-2 border-t border-white/10 pt-3 text-[11px]">
            {node.demoUrl && (
              <a
                href={node.demoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 rounded border border-cyan-500/30 bg-cyan-950/30 px-2 py-1 text-cyan-300 hover:border-cyan-400 hover:bg-cyan-900/40 transition-colors"
              >
                [ENTER LIVE DEMO →]
                <ExternalLink size={11} />
              </a>
            )}
            {node.repoUrl && (
              <a
                href={node.repoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 rounded border border-white/10 bg-white/5 px-2 py-1 text-slate-300 hover:border-white/25 hover:bg-white/10 transition-colors"
              >
                [VIEW REPO →]
                <GitBranch size={11} />
              </a>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
