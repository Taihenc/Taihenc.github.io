import { motion } from 'framer-motion'
import {
  ArrowTopRightOnSquareIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline'
import type { Engagement, KnowledgeNode, WorkNode } from '../types/graph'
import SkeletonImage from './SkeletonImage'
import type { GraphIndex } from '../utils/graph'

const ENGAGEMENT_STYLE: Record<
  Engagement,
  { label: string; className: string }
> = {
  internship: {
    label: 'Internship',
    className: 'border-sky-300/30 bg-sky-400/10 text-sky-200',
  },
  'part-time': {
    label: 'Part-time',
    className: 'border-amber-300/30 bg-amber-400/10 text-amber-200',
  },
  'full-time': {
    label: 'Full-time',
    className: 'border-emerald-300/30 bg-emerald-400/10 text-emerald-200',
  },
  volunteer: {
    label: 'Volunteer',
    className: 'border-pink-300/30 bg-pink-400/10 text-pink-200',
  },
  'side-project': {
    label: 'Side project',
    className: 'border-teal-300/30 bg-teal-400/10 text-teal-200',
  },
}

const chip =
  'inline-flex items-center rounded-full border px-2 py-0.5 text-[10px] font-medium leading-none'

/** Distinct engagements of a work, in role order. */
function engagementsOf(node: WorkNode): Engagement[] {
  const all = [
    ...(node.roles ?? []).map((r) => r.engagement),
    node.engagement,
  ].filter((e): e is Engagement => e !== undefined)
  return [...new Set(all)]
}

function EngagementChip({ engagement }: { engagement: Engagement }) {
  const { label, className } = ENGAGEMENT_STYLE[engagement]
  return <span className={`${chip} ${className}`}>{label}</span>
}

interface DetailCardProps {
  node: KnowledgeNode
  index: GraphIndex
  onSelect: (id: string) => void
  onClose: () => void
}

/**
 * Detail panel for the selected node. Docked to the right on wide screens,
 * a bottom sheet on small ones.
 */
export function WorkDetailCard({
  node,
  index,
  onSelect,
  onClose,
}: DetailCardProps) {
  const color = index.groupColor.get(node.group) ?? '#cbd5e1'
  const neighbors = index.neighbors.get(node.id) ?? []
  const engagements = node.kind === 'work' ? engagementsOf(node) : []

  return (
    <motion.aside
      key={node.id}
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 24 }}
      transition={{ duration: 0.22, ease: 'easeOut' }}
      className="absolute z-20 inset-x-2 bottom-2 max-h-[62%] md:inset-x-auto md:right-3 md:top-3 md:bottom-3 md:max-h-none md:w-[23rem] flex flex-col rounded-xl border border-white/10 bg-[#0d131d]/95 text-slate-300 shadow-[0_20px_60px_-20px_rgba(0,0,0,0.8)] backdrop-blur-md overflow-hidden"
      aria-label={`Details: ${node.label}`}
    >
      <div className="h-[3px] w-full shrink-0" style={{ background: color }} />
      <header className="flex items-start gap-3 px-4 pt-4 pb-3 shrink-0">
        {node.kind === 'work' && node.logo && (
          <img
            src={node.logo}
            alt=""
            className="w-11 h-11 rounded-lg object-cover bg-white/5 shrink-0"
          />
        )}
        <div className="min-w-0 flex-1">
          <h3 className="text-lg font-semibold leading-tight text-slate-50">
            {node.kind === 'work' ? node.title : node.label}
          </h3>
          {node.kind === 'work' && node.organization && (
            <p className="text-xs text-slate-400 mt-0.5">{node.organization}</p>
          )}
          {node.kind === 'work' && (engagements.length > 0 || node.remote) && (
            <div className="flex flex-wrap gap-1.5 mt-2">
              {engagements.map((e) => (
                <EngagementChip key={e} engagement={e} />
              ))}
              {node.remote && (
                <span
                  className={`${chip} border-slate-300/25 bg-slate-400/10 text-slate-300`}
                >
                  Remote
                </span>
              )}
            </div>
          )}
          {node.kind === 'topic' && (
            <p className="text-xs mt-0.5" style={{ color }}>
              {neighbors.length} connected{' '}
              {neighbors.length === 1 ? 'work' : 'works'}
            </p>
          )}
        </div>
        <button
          onClick={onClose}
          className="p-1 -mr-1 rounded-md text-slate-400 hover:text-white hover:bg-white/10"
          aria-label="Close details"
        >
          <XMarkIcon className="w-5 h-5" />
        </button>
      </header>

      <div className="overflow-y-auto overscroll-contain px-4 pb-4 space-y-4 text-sm leading-relaxed">
        {node.kind === 'work' ? (
          <>
            {node.roles && node.roles.length > 0 && (
              <ul className="space-y-1">
                {node.roles.map((r) => (
                  <li
                    key={r.title}
                    className="flex flex-wrap justify-between gap-x-3 text-xs"
                  >
                    <span className="flex items-center gap-1.5 text-slate-200">
                      {r.title}
                      {/* Per-role flag only when roles differ (e.g. intern, then part-time) */}
                      {engagements.length > 1 && r.engagement && (
                        <EngagementChip engagement={r.engagement} />
                      )}
                    </span>
                    {r.period && (
                      <span className="text-slate-500 tabular-nums">
                        {r.period}
                      </span>
                    )}
                  </li>
                ))}
              </ul>
            )}
            {node.status === 'in-progress' && (
              <span className="inline-block text-[11px] px-2 py-0.5 rounded-full border border-amber-300/30 text-amber-200/90">
                in progress
              </span>
            )}
            <p>{node.summary}</p>
            {node.highlights && (
              <ul className="space-y-1.5 text-[13px]">
                {node.highlights.map((h) => (
                  <li key={h} className="flex gap-2">
                    <span
                      className="mt-[0.55em] w-1 h-1 rounded-full shrink-0"
                      style={{ background: color }}
                    />
                    <span>{h}</span>
                  </li>
                ))}
              </ul>
            )}
            {node.images && node.images.length > 0 && (
              <div className="flex gap-2 overflow-x-auto pb-1 -mx-1 px-1 snap-x">
                {node.images.map((src) => (
                  <SkeletonImage
                    key={src}
                    src={src}
                    loading="lazy"
                    wrapperClassName="h-28 min-w-[9rem] shrink-0 rounded-md snap-start"
                    className="h-28 w-auto object-cover"
                  />
                ))}
              </div>
            )}
          </>
        ) : (
          node.description && <p>{node.description}</p>
        )}

        {neighbors.length > 0 && (
          <div>
            <p className="text-[11px] uppercase tracking-wider text-slate-500 mb-1.5">
              {node.kind === 'work' ? 'Connected to' : 'Works'}
            </p>
            <ul className="space-y-1">
              {neighbors.map(({ node: other, edge }) => (
                <li key={other.id}>
                  <button
                    onClick={() => onSelect(other.id)}
                    className="w-full text-left rounded-md px-2 py-1.5 -mx-2 hover:bg-white/5 group"
                  >
                    <span className="flex items-center gap-2 text-[13px] text-slate-200">
                      <span
                        className="w-2 h-2 rounded-full shrink-0"
                        style={{
                          background: index.groupColor.get(other.group),
                        }}
                      />
                      {other.label}
                      {edge.basis === 'inferred' && (
                        <span className="text-[10px] text-slate-500">
                          (inferred)
                        </span>
                      )}
                    </span>
                    <span className="block pl-4 text-xs text-slate-500 group-hover:text-slate-400">
                      {edge.evidence}
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}

        {node.kind === 'work' && node.links && node.links.length > 0 && (
          <div className="flex flex-wrap gap-2 pt-1">
            {node.links.map((l) => (
              <a
                key={l.url}
                href={l.url}
                target="_blank"
                rel="noopener noreferrer"
                data-umami-event="work-link"
                data-umami-event-work={node.label}
                data-umami-event-link={l.label}
                className="inline-flex items-center gap-1.5 rounded-md border border-white/15 px-3 py-1.5 text-xs text-slate-100 hover:border-white/40 hover:bg-white/5"
              >
                {l.label}
                <ArrowTopRightOnSquareIcon className="w-3.5 h-3.5" />
              </a>
            ))}
          </div>
        )}
      </div>
    </motion.aside>
  )
}
