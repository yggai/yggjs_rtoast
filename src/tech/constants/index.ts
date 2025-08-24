/**
 * 动画相关常量
 */
export const ANIMATION_DURATION = 300

/**
 * 默认持续时间配置（毫秒）
 */
export const DEFAULT_DURATION = 4000
export const SHORT_DURATION = 3000
export const MEDIUM_DURATION = 5000
export const LONG_DURATION = 8000

/**
 * 性能优化相关常量
 */
export const PROGRESS_UPDATE_INTERVAL = 16 // 60fps帧率
export const RENDER_DELAY = 50

/**
 * 容器相关常量
 */
export const DEFAULT_MAX_TOASTS = 5

/**
 * 默认Toast配置
 */
export const DEFAULT_TOAST_CONFIG = {
  type: 'info' as const,
  duration: DEFAULT_DURATION,
  closable: true,
  animation: 'slide' as const,
  pauseOnHover: true,
}

/**
 * 默认显示位置
 */
export const DEFAULT_POSITION = 'top-right' as const

/**
 * 动画缓动函数
 */
export const EASING = {
  easeOutCubic: 'cubic-bezier(0.33, 1, 0.68, 1)',
  easeInOut: 'ease-in-out',
  easeOut: 'ease-out',
} as const

/**
 * Toast ID生成相关常量
 */
export const ID_LENGTH = 9