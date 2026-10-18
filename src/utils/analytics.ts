/**
 * Umami custom events. The script in index.html only loads on
 * taihenc.github.io (data-domains), so these are no-ops locally.
 * Link clicks use `data-umami-event` attributes instead of this helper.
 */

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
    // Analytics must never break the page.
  }
}
