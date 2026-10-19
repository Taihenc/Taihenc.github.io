/**
 * Custom analytics events for Umami and PostHog. The Umami script in index.html
 * only loads on taihenc.github.io (data-domains), so its calls are no-ops locally.
 */

import posthog, { isPostHogEnabled } from '../posthog'

type EventData = Record<string, string | number | boolean>

declare global {
  interface Window {
    umami?: { track: (event: string, data?: EventData) => void }
  }
}

export function track(event: string, data?: EventData) {
  try {
    window.umami?.track(event, data)
  } catch {
    // Umami failures must not block PostHog.
  }
  if (isPostHogEnabled) posthog.capture(event, data)
}
