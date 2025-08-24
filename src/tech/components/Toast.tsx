import React, { useMemo, useCallback } from 'react'
import clsx from 'clsx'
import { ToastData } from '../types'
import { DefaultIcons } from './icons'
import { useToastTimer } from '../hooks/useToastTimer'
import { useToastAnimation } from '../hooks/useToastAnimation'
import '../styles/toast.css'

interface ToastProps {
  toast: ToastData
  onDismiss: (id: string) => void
}

const ToastComponent: React.FC<ToastProps> = ({ toast, onDismiss }) => {
  const handleDismiss = useCallback(() => {
    onDismiss(toast.id)
    toast.onClose?.()
  }, [toast, onDismiss])

  const { startExitAnimation, animationClasses } = useToastAnimation({
    animation: toast.animation,
    onExit: handleDismiss,
  })

  const { progress, pause, resume } = useToastTimer({
    duration: toast.duration,
    onExpire: startExitAnimation,
    pauseOnHover: toast.pauseOnHover,
  })

  const handleClick = useCallback(() => {
    toast.onClick?.()
    if (toast.onClick) {
      startExitAnimation()
    }
  }, [toast, startExitAnimation])

  const handleMouseEnter = useCallback(() => {
    if (toast.pauseOnHover) {
      pause()
    }
  }, [toast.pauseOnHover, pause])

  const handleMouseLeave = useCallback(() => {
    if (toast.pauseOnHover) {
      resume()
    }
  }, [toast.pauseOnHover, resume])

  const handleCloseClick = useCallback((e: React.MouseEvent) => {
    e.stopPropagation()
    startExitAnimation()
  }, [startExitAnimation])

  const toastClasses = useMemo(() => clsx(
    'ygg-toast',
    `ygg-toast--${toast.type}`,
    animationClasses,
    toast.className
  ), [toast.type, toast.className, animationClasses])

  const icon = useMemo(() => {
    return toast.icon || DefaultIcons[toast.type]
  }, [toast.icon, toast.type])

  return (
    <div
      className={toastClasses}
      style={toast.style}
      onClick={handleClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      role="alert"
      aria-live="polite"
    >
      {icon && (
        <div className="ygg-toast__icon">
          {icon}
        </div>
      )}
      
      <div className="ygg-toast__message">
        {toast.message}
      </div>

      {toast.closable && (
        <button
          className="ygg-toast__close"
          onClick={handleCloseClick}
          aria-label="关闭通知"
        >
          ×
        </button>
      )}

      {toast.duration > 0 && (
        <div
          className="ygg-toast__progress"
          style={{ width: `${progress}%` }}
        />
      )}
    </div>
  )
}

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
