import { ReactNode } from 'react'

/**
 * Toast 类型枚举
 */
export type ToastType = 'success' | 'error' | 'warning' | 'info' | 'debug'

/**
 * Toast 位置枚举
 */
export type ToastPosition = 
  | 'top-left' 
  | 'top-center' 
  | 'top-right'
  | 'bottom-left' 
  | 'bottom-center' 
  | 'bottom-right'

/**
 * Toast 动画类型
 */
export type ToastAnimation = 'slide' | 'fade' | 'bounce' | 'zoom'

/**
 * Toast 配置选项
 */
export interface ToastOptions {
  /** Toast 类型 */
  type?: ToastType
  /** 自动关闭时间（毫秒），0 表示不自动关闭 */
  duration?: number
  /** 是否可手动关闭 */
  closable?: boolean
  /** 自定义图标 */
  icon?: ReactNode
  /** 自定义样式类名 */
  className?: string
  /** 自定义内联样式 */
  style?: React.CSSProperties
  /** 点击事件回调 */
  onClick?: () => void
  /** 关闭事件回调 */
  onClose?: () => void
  /** 动画类型 */
  animation?: ToastAnimation
  /** 是否暂停自动关闭（鼠标悬停时） */
  pauseOnHover?: boolean
}

/**
 * Toast 数据结构
 */
export interface ToastData extends Required<Omit<ToastOptions, 'icon' | 'className' | 'style' | 'onClick' | 'onClose'>> {
  /** 唯一标识符 */
  id: string
  /** 消息内容 */
  message: ReactNode
  /** 创建时间戳 */
  createdAt: number
  /** 自定义图标 */
  icon?: ReactNode
  /** 自定义样式类名 */
  className?: string
  /** 自定义内联样式 */
  style?: React.CSSProperties
  /** 点击事件回调 */
  onClick?: () => void
  /** 关闭事件回调 */
  onClose?: () => void
}

/**
 * ToastContainer 配置选项
 */
export interface ToastContainerOptions {
  /** Toast 显示位置 */
  position?: ToastPosition
  /** 最大显示数量 */
  maxToasts?: number
  /** 容器样式类名 */
  className?: string
  /** 容器内联样式 */
  style?: React.CSSProperties
  /** 全局默认配置 */
  defaultOptions?: Partial<ToastOptions>
}

/**
 * Toast Context 类型
 */
export interface ToastContextType {
  /** 显示 Toast */
  toast: (message: ReactNode, options?: ToastOptions) => string
  /** 显示成功 Toast */
  success: (message: ReactNode, options?: Omit<ToastOptions, 'type'>) => string
  /** 显示错误 Toast */
  error: (message: ReactNode, options?: Omit<ToastOptions, 'type'>) => string
  /** 显示警告 Toast */
  warning: (message: ReactNode, options?: Omit<ToastOptions, 'type'>) => string
  /** 显示信息 Toast */
  info: (message: ReactNode, options?: Omit<ToastOptions, 'type'>) => string
  /** 显示调试 Toast */
  debug: (message: ReactNode, options?: Omit<ToastOptions, 'type'>) => string
  /** 关闭指定 Toast */
  dismiss: (id: string) => void
  /** 关闭所有 Toast */
  dismissAll: () => void
  /** 当前 Toast 列表 */
  toasts: ToastData[]
}

/**
 * Toast Hook 返回类型
 */
export type UseToastReturn = ToastContextType
