import posthog from 'posthog-js'

// The project key is public by design (it ships in the bundle). It lives in
// .env.production so the GitHub Pages build picks it up; local dev uses .env.
const posthogKey = import.meta.env.VITE_POSTHOG_KEY
const posthogHost = import.meta.env.VITE_POSTHOG_HOST

export const isPostHogEnabled = Boolean(posthogKey && posthogHost)

if (isPostHogEnabled) {
  posthog.init(posthogKey, {
    api_host: posthogHost,
    defaults: '2025-05-24',
    person_profiles: 'identified_only',
    capture_exceptions: {
      capture_unhandled_errors: true,
      capture_unhandled_rejections: true,
      capture_console_errors: false,
    },
    session_recording: {
      // The works graph is a <canvas>; without this replays show an empty box.
      captureCanvas: { recordCanvas: true, canvasFps: 4, canvasQuality: '0.4' },
    },
  })
} else if (import.meta.env.DEV) {
  console.warn('PostHog disabled: set VITE_POSTHOG_KEY and VITE_POSTHOG_HOST in .env')
}

export default posthog
