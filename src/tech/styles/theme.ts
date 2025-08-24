/**
 * Toast样式主题配置
 * 定义颜色、尺寸、动画等设计tokens
 */

// 颜色系统
export const colors = {
  // Toast类型颜色
  success: {
    primary: '#10b981',
    secondary: '#059669',
    shadow: 'rgba(16, 185, 129, 0.2)',
    border: 'rgba(16, 185, 129, 0.3)',
    outline: 'rgba(16, 185, 129, 0.1)',
  },
  error: {
    primary: '#ef4444',
    secondary: '#dc2626',
    shadow: 'rgba(239, 68, 68, 0.2)',
    border: 'rgba(239, 68, 68, 0.3)',
    outline: 'rgba(239, 68, 68, 0.1)',
  },
  warning: {
    primary: '#f59e0b',
    secondary: '#d97706',
    shadow: 'rgba(245, 158, 11, 0.2)',
    border: 'rgba(245, 158, 11, 0.3)',
    outline: 'rgba(245, 158, 11, 0.1)',
  },
  info: {
    primary: '#3b82f6',
    secondary: '#2563eb',
    shadow: 'rgba(59, 130, 246, 0.2)',
    border: 'rgba(59, 130, 246, 0.3)',
    outline: 'rgba(59, 130, 246, 0.1)',
  },
  debug: {
    primary: '#9ca3af',
    secondary: '#4b5563',
    shadow: 'rgba(156, 163, 175, 0.2)',
    border: 'rgba(156, 163, 175, 0.3)',
    outline: 'rgba(156, 163, 175, 0.1)',
  },
  // 通用颜色
  white: '#ffffff',
  black: '#000000',
  transparent: 'transparent',
  // 白色透明度变体
  whiteAlpha: {
    5: 'rgba(255, 255, 255, 0.05)',
    10: 'rgba(255, 255, 255, 0.1)',
    15: 'rgba(255, 255, 255, 0.15)',
    20: 'rgba(255, 255, 255, 0.2)',
    30: 'rgba(255, 255, 255, 0.3)',
    40: 'rgba(255, 255, 255, 0.4)',
    80: 'rgba(255, 255, 255, 0.8)',
  },
  // 黑色透明度变体
  blackAlpha: {
    20: 'rgba(0, 0, 0, 0.2)',
    30: 'rgba(0, 0, 0, 0.3)',
    40: 'rgba(0, 0, 0, 0.4)',
  }
} as const

// 尺寸系统
export const sizes = {
  // 间距
  spacing: {
    xs: '4px',
    sm: '8px',
    md: '12px',
    lg: '16px',
    xl: '20px',
    xxl: '32px',
  },
  // 圆角
  radius: {
    sm: '4px',
    md: '8px',
    lg: '12px',
  },
  // 字体大小
  fontSize: {
    sm: '13px',
    md: '14px',
    lg: '16px',
  },
  // Toast容器
  container: {
    maxWidth: '420px',
    padding: '16px',
    gap: '8px',
  },
  // Toast项目
  toast: {
    padding: '16px 20px',
    iconSize: '20px',
    closeButtonSize: '20px',
    progressHeight: '3px',
  },
  // 移动端适配
  mobile: {
    containerPadding: '8px',
    toastPadding: '12px 16px',
  }
} as const

// 阴影系统
export const shadows = {
  toast: {
    default: '0 8px 32px rgba(0, 0, 0, 0.3), 0 0 0 1px rgba(255, 255, 255, 0.05), inset 0 1px 0 rgba(255, 255, 255, 0.1)',
    hover: '0 12px 40px rgba(0, 0, 0, 0.4), 0 0 0 1px rgba(255, 255, 255, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.15)',
  },
  progress: '0 0 8px rgba(255, 255, 255, 0.3)',
} as const

// 字体系统
export const fonts = {
  family: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
  weight: {
    normal: '400',
    medium: '500',
    semibold: '600',
  },
  lineHeight: {
    normal: '1.4',
    tight: '1.2',
  },
} as const

// 过渡动画系统
export const transitions = {
  // 缓动函数
  easing: {
    ease: 'cubic-bezier(0.4, 0, 0.2, 1)',
    bounce: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
    spring: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)',
  },
  // 持续时间
  duration: {
    fast: '0.2s',
    normal: '0.3s',
    slow: '0.5s',
  },
  // 常用组合
  default: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
  fast: 'all 0.2s ease',
} as const

// 层级系统
export const zIndex = {
  toast: 9999,
  overlay: 9998,
} as const

// 断点系统
export const breakpoints = {
  mobile: '480px',
  tablet: '768px',
  desktop: '1024px',
} as const

// 导出完整主题对象
export const theme = {
  colors,
  sizes,
  shadows,
  fonts,
  transitions,
  zIndex,
  breakpoints,
} as const

// 主题类型定义
export type Theme = typeof theme
export type ToastType = keyof typeof colors.success