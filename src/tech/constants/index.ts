// Animation constants
export const ANIMATION_DURATION = 300

// Default durations (in milliseconds)
export const DEFAULT_DURATION = 4000
export const SHORT_DURATION = 3000
export const MEDIUM_DURATION = 5000
export const LONG_DURATION = 8000

// Performance constants
export const PROGRESS_UPDATE_INTERVAL = 16 // 60fps
export const RENDER_DELAY = 50

// Container constants
export const DEFAULT_MAX_TOASTS = 5

// Default configuration
export const DEFAULT_TOAST_CONFIG = {
  type: 'info' as const,
  duration: DEFAULT_DURATION,
  closable: true,
  animation: 'slide' as const,
  pauseOnHover: true,
}

// Default position
export const DEFAULT_POSITION = 'top-right' as const

// Easing functions
export const EASING = {
  easeOutCubic: 'cubic-bezier(0.33, 1, 0.68, 1)',
  easeInOut: 'ease-in-out',
  easeOut: 'ease-out',
} as const

// Toast ID generation constants
export const ID_LENGTH = 9