import React from 'react'
import clsx from 'clsx'
import { Toast } from './Toast'
import { ToastData, ToastPosition } from '../types'
import '../styles/toast.css'

interface ToastContainerProps {
  toasts: ToastData[]
  position?: ToastPosition
  maxToasts?: number
  className?: string
  style?: React.CSSProperties
  onDismiss: (id: string) => void
}

export const ToastContainer: React.FC<ToastContainerProps> = ({
  toasts,
  position = 'top-right',
  maxToasts = 5,
  className,
  style,
  onDismiss,
}) => {
  // 限制显示的 toast 数量
  const visibleToasts = toasts.slice(0, maxToasts)

  // 根据位置决定 toast 的排序
  const sortedToasts = position.includes('bottom') 
    ? [...visibleToasts].reverse() 
    : visibleToasts

  const containerClasses = clsx(
    'ygg-toast-container',
    `ygg-toast-container--${position}`,
    className
  )

  if (toasts.length === 0) {
    return null
  }

  return (
    <div className={containerClasses} style={style}>
      {sortedToasts.map((toast) => (
        <Toast
          key={toast.id}
          toast={toast}
          onDismiss={onDismiss}
        />
      ))}
    </div>
  )
}
