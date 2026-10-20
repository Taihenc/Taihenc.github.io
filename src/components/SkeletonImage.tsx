import { useState } from 'react'
import type { ImgHTMLAttributes } from 'react'

interface SkeletonImageProps extends ImgHTMLAttributes<HTMLImageElement> {
  /** Classes for the wrapper that holds the skeleton (size/shape/position). */
  wrapperClassName?: string
  /** Wrapper classes used only until the image loads, e.g. a placeholder width. */
  loadingClassName?: string
}

/** Image that shows a shimmering skeleton until it loads, then fades in. */
export default function SkeletonImage({
  wrapperClassName = '',
  loadingClassName = '',
  className = '',
  onLoad,
  onError,
  alt = '',
  ...img
}: SkeletonImageProps) {
  const [state, setState] = useState<'loading' | 'loaded' | 'error'>('loading')

  return (
    <div
      className={`relative overflow-hidden ${wrapperClassName} ${state === 'loaded' ? '' : loadingClassName}`}
    >
      {state !== 'loaded' && (
        <div
          aria-hidden
          className={`absolute inset-0 rounded-[inherit] ${state === 'loading' ? 'skeleton-shimmer' : 'bg-slate-500/10'}`}
        />
      )}
      <img
        {...img}
        alt={alt}
        className={`transition-opacity duration-500 ${state === 'loaded' ? 'opacity-100' : 'opacity-0'} ${className}`}
        onLoad={(e) => {
          setState('loaded')
          onLoad?.(e)
        }}
        onError={(e) => {
          setState('error')
          onError?.(e)
        }}
      />
    </div>
  )
}
