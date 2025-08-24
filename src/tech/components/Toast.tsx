import React, { useMemo, useCallback, useState } from 'react'
import { ToastData } from '../types'
import { DefaultIcons } from './icons'
import { useToastTimer } from '../hooks/useToastTimer'
import { useToastAnimation } from '../hooks/useToastAnimation'
import {
  createToastStyles,
  createIconStyles,
  createMessageStyles,
  createCloseButtonStyles,
  getCloseButtonClassName,
  createProgressStyles,
} from '../styles/toastStyles'
import { cx } from '../styles/css-in-js'

/**
 * Toast组件的属性接口
 */
interface ToastProps {
  /** Toast数据对象 */
  toast: ToastData
  /** 关闭Toast的回调函数 */
  onDismiss: (id: string) => void
}

/**
 * Toast组件实现
 * 负责渲染单个Toast消息，包含图标、消息内容、关闭按钮和进度条
 */
const ToastComponent: React.FC<ToastProps> = ({ toast, onDismiss }) => {
  // 悬停状态管理
  const [isHovered, setIsHovered] = useState(false)
  const [closeButtonHovered, setCloseButtonHovered] = useState(false)

  // 处理Toast关闭逻辑
  const handleDismiss = useCallback(() => {
    onDismiss(toast.id)
    toast.onClose?.()
  }, [toast, onDismiss])

  // 使用动画Hook管理Toast的进入和退出动画
  const { startExitAnimation, animationClasses } = useToastAnimation({
    animation: toast.animation,
    onExit: handleDismiss,
  })

  // 使用计时器Hook管理Toast的自动关闭和进度条
  const { progress, pause, resume } = useToastTimer({
    duration: toast.duration,
    onExpire: startExitAnimation,
    pauseOnHover: toast.pauseOnHover,
  })

  // 处理Toast点击事件
  const handleClick = useCallback(() => {
    toast.onClick?.()
    if (toast.onClick) {
      startExitAnimation()
    }
  }, [toast, startExitAnimation])

  // 处理鼠标进入事件，暂停计时器
  const handleMouseEnter = useCallback(() => {
    setIsHovered(true)
    if (toast.pauseOnHover) {
      pause()
    }
  }, [toast.pauseOnHover, pause])

  // 处理鼠标离开事件，恢复计时器
  const handleMouseLeave = useCallback(() => {
    setIsHovered(false)
    if (toast.pauseOnHover) {
      resume()
    }
  }, [toast.pauseOnHover, resume])

  // 处理关闭按钮点击事件
  const handleCloseClick = useCallback((e: React.MouseEvent) => {
    e.stopPropagation()
    startExitAnimation()
  }, [startExitAnimation])

  // 处理关闭按钮悬停
  const handleCloseMouseEnter = useCallback(() => {
    setCloseButtonHovered(true)
  }, [])

  const handleCloseMouseLeave = useCallback(() => {
    setCloseButtonHovered(false)
  }, [])

  // 生成样式类名
  const toastClassName = useMemo(() => {
    return createToastStyles({ type: toast.type, isHovered })
  }, [toast.type, isHovered])

  const iconClassName = useMemo(() => {
    return createIconStyles
  }, [])

  const messageClassName = useMemo(() => {
    return createMessageStyles
  }, [])

  const closeButtonClassName = useMemo(() => {
    return createCloseButtonStyles({ isHovered: closeButtonHovered })
  }, [closeButtonHovered])

  const progressClassName = useMemo(() => {
    return createProgressStyles({ width: `${progress}%` })
  }, [progress])

  // 缓存图标选择逻辑，优先使用自定义图标
  const icon = useMemo(() => {
    return toast.icon || DefaultIcons[toast.type]
  }, [toast.icon, toast.type])

  // 合并所有CSS类名，包含语义化类名以兼容测试
  const finalClassName = useMemo(() => {
    const animationClassNames = Object.entries(animationClasses)
      .filter(([, isActive]) => isActive)
      .map(([className]) => className)
    
    return cx(
      'ygg-toast',
      `ygg-toast--${toast.type}`,
      toastClassName,
      ...animationClassNames,
      toast.className
    )
  }, [toast.type, toastClassName, animationClasses, toast.className])

  return (
    <div
      className={finalClassName}
      style={toast.style}
      onClick={handleClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      role="alert"
      aria-live="polite"
    >
      {/* 图标区域 */}
      {icon && (
        <div className={cx(iconClassName, 'ygg-toast__icon')}>
          {icon}
        </div>
      )}
      
      {/* 消息内容区域 */}
      <div className={cx(messageClassName, 'ygg-toast__message')}>
        {toast.message}
      </div>

      {/* 关闭按钮（可选） */}
      {toast.closable && (
        <button
          className={cx(closeButtonClassName, getCloseButtonClassName())}
          onClick={handleCloseClick}
          onMouseEnter={handleCloseMouseEnter}
          onMouseLeave={handleCloseMouseLeave}
          aria-label="关闭通知"
        >
          ×
        </button>
      )}

      {/* 进度条（仅在设置了持续时间时显示） */}
      {toast.duration > 0 && (
        <div className={cx(progressClassName, 'ygg-toast__progress')} />
      )}
    </div>
  )
}

/**
 * 使用React.memo优化的Toast组件
 * 通过自定义比较函数避免不必要的重渲染
 */
export const Toast = React.memo(ToastComponent, (prevProps, nextProps) => {
  return (
    prevProps.toast.id === nextProps.toast.id &&
    prevProps.toast.message === nextProps.toast.message &&
    prevProps.toast.type === nextProps.toast.type &&
    prevProps.toast.duration === nextProps.toast.duration &&
    prevProps.toast.closable === nextProps.toast.closable &&
    prevProps.toast.animation === nextProps.toast.animation &&
    prevProps.toast.pauseOnHover === nextProps.toast.pauseOnHover &&
    prevProps.toast.className === nextProps.toast.className &&
    prevProps.toast.style === nextProps.toast.style &&
    prevProps.toast.icon === nextProps.toast.icon &&
    prevProps.onDismiss === nextProps.onDismiss
  )
})

Toast.displayName = 'Toast'
