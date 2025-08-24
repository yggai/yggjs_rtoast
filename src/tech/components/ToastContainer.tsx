import React, { useMemo } from 'react'
import clsx from 'clsx'
import { Toast } from './Toast'
import { ToastData, ToastPosition } from '../types'
import { DEFAULT_POSITION, DEFAULT_MAX_TOASTS } from '../constants'
import '../styles/toast.css'

interface ToastContainerProps {
  toasts: ToastData[]
  position?: ToastPosition
  maxToasts?: number
  className?: string
  style?: React.CSSProperties
  onDismiss: (id: string) => void
}

const ToastContainerComponent: React.FC<ToastContainerProps> = ({
  toasts,
  position = DEFAULT_POSITION,
  maxToasts = DEFAULT_MAX_TOASTS,
  className,
  style,
  onDismiss,
}) => {
  // Memoize visible toasts calculation to avoid unnecessary re-computation
  const visibleToasts = useMemo(() => {
    return toasts.slice(0, maxToasts)
  }, [toasts, maxToasts])

  // Memoize sorted toasts calculation for position-based ordering
  const sortedToasts = useMemo(() => {
    return position.includes('bottom') 
      ? [...visibleToasts].reverse() 
      : visibleToasts
  }, [visibleToasts, position])

  // Memoize container classes to avoid recalculation
  const containerClasses = useMemo(() => clsx(
    'ygg-toast-container',
    `ygg-toast-container--${position}`,
    className
  ), [position, className])

  // Early return for empty toast list
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

// Memoize the entire ToastContainer with custom comparison
export const ToastContainer = React.memo(ToastContainerComponent, (prevProps, nextProps) => {
  // Shallow comparison for most props
  if (
    prevProps.position !== nextProps.position ||
    prevProps.maxToasts !== nextProps.maxToasts ||
    prevProps.className !== nextProps.className ||
    prevProps.style !== nextProps.style ||
    prevProps.onDismiss !== nextProps.onDismiss
  ) {
    return false
  }

  // Deep comparison for toasts array
  if (prevProps.toasts.length !== nextProps.toasts.length) {
    return false
  }

  // Check if any toast has changed
  for (let i = 0; i < prevProps.toasts.length; i++) {
    const prevToast = prevProps.toasts[i]
    const nextToast = nextProps.toasts[i]
    
    if (
      prevToast.id !== nextToast.id ||
      prevToast.message !== nextToast.message ||
      prevToast.type !== nextToast.type
    ) {
      return false
    }
  }

  return true
})

ToastContainer.displayName = 'ToastContainer'
