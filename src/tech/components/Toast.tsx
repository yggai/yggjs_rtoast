import React, { useEffect, useState, useCallback } from 'react'
import clsx from 'clsx'
import { ToastData } from '../types'
import '../styles/toast.css'

interface ToastProps {
  toast: ToastData
  onDismiss: (id: string) => void
}

// 默认图标组件
const DefaultIcons = {
  success: (
    <svg viewBox="0 0 20 20" fill="currentColor" width="20" height="20">
      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
    </svg>
  ),
  error: (
    <svg viewBox="0 0 20 20" fill="currentColor" width="20" height="20">
      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
    </svg>
  ),
  warning: (
    <svg viewBox="0 0 20 20" fill="currentColor" width="20" height="20">
      <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
    </svg>
  ),
  info: (
    <svg viewBox="0 0 20 20" fill="currentColor" width="20" height="20">
      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
    </svg>
  ),
  debug: (
    <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
      <path d="M3 5h18v2H3V5zm2 4h14v10a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V9zm4 2v6h2v-6H9zm4 0v6h2v-6h-2z" />
    </svg>
  ),
}

export const Toast: React.FC<ToastProps> = ({ toast, onDismiss }) => {
  const [isVisible, setIsVisible] = useState(false)
  const [isExiting, setIsExiting] = useState(false)
  const [progress, setProgress] = useState(100)
  const [isPaused, setIsPaused] = useState(false)

  const handleDismiss = useCallback(() => {
    setIsExiting(true)
    setTimeout(() => {
      onDismiss(toast.id)
      toast.onClose?.()
    }, 300) // 动画持续时间
  }, [toast.id, toast.onClose, onDismiss])

  const handleClick = useCallback(() => {
    toast.onClick?.()
    if (toast.onClick) {
      handleDismiss()
    }
  }, [toast.onClick, handleDismiss])

  const handleMouseEnter = useCallback(() => {
    if (toast.pauseOnHover) {
      setIsPaused(true)
    }
  }, [toast.pauseOnHover])

  const handleMouseLeave = useCallback(() => {
    if (toast.pauseOnHover) {
      setIsPaused(false)
    }
  }, [toast.pauseOnHover])

  // 显示动画
  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 50)
    return () => clearTimeout(timer)
  }, [])

  // 自动关闭逻辑
  useEffect(() => {
    if (toast.duration === 0 || isPaused || isExiting) return

    const startTime = Date.now()
    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime
      const remaining = Math.max(0, toast.duration - elapsed)
      const progressPercent = (remaining / toast.duration) * 100

      setProgress(progressPercent)

      if (remaining <= 0) {
        handleDismiss()
      }
    }, 16) // 60fps

    return () => clearInterval(interval)
  }, [toast.duration, isPaused, isExiting, handleDismiss])

  const toastClasses = clsx(
    'ygg-toast',
    `ygg-toast--${toast.type}`,
    {
      [`ygg-toast--${toast.animation}-enter`]: isVisible && !isExiting,
      [`ygg-toast--${toast.animation}-exit`]: isExiting,
    },
    toast.className
  )

  const icon = toast.icon || DefaultIcons[toast.type]

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
          onClick={(e) => {
            e.stopPropagation()
            handleDismiss()
          }}
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
