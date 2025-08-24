import React, { createContext, useCallback, useState, ReactNode } from 'react'
import { ToastContainer } from '../components/ToastContainer'
import { 
  ToastData, 
  ToastOptions, 
  ToastContextType, 
  ToastContainerOptions,
  ToastType 
} from '../types'

export const ToastContext = createContext<ToastContextType | null>(null)

interface ToastProviderProps extends ToastContainerOptions {
  children: ReactNode
}

// 默认配置
const DEFAULT_OPTIONS: Required<Omit<ToastOptions, 'icon' | 'className' | 'style' | 'onClick' | 'onClose'>> = {
  type: 'info',
  duration: 4000,
  closable: true,
  animation: 'slide',
  pauseOnHover: true,
}

// 生成唯一ID
const generateId = (): string => {
  return `toast-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
}

export const ToastProvider: React.FC<ToastProviderProps> = ({
  children,
  position = 'top-right',
  maxToasts = 5,
  className,
  style,
  defaultOptions = {},
}) => {
  const [toasts, setToasts] = useState<ToastData[]>([])

  // 添加 Toast
  const addToast = useCallback((message: ReactNode, options: ToastOptions = {}): string => {
    const mergedDefaultOptions = { ...DEFAULT_OPTIONS, ...defaultOptions }
    const id = generateId()
    const mergedOptions = { ...mergedDefaultOptions, ...options }

    const newToast: ToastData = {
      id,
      message,
      createdAt: Date.now(),
      ...mergedOptions,
    }

    console.log('添加Toast:', { id, message, options: mergedOptions })
    setToasts(prev => {
      const newToasts = [newToast, ...prev]
      console.log('更新Toast列表:', newToasts.length, '个Toast')
      return newToasts
    })
    return id
  }, [defaultOptions])

  // 移除 Toast
  const removeToast = useCallback((id: string) => {
    setToasts(prev => prev.filter(toast => toast.id !== id))
  }, [])

  // 清空所有 Toast
  const clearToasts = useCallback(() => {
    setToasts([])
  }, [])

  // 创建类型化的 Toast 方法
  const createTypedToast = useCallback((type: ToastType) => {
    return (message: ReactNode, options: Omit<ToastOptions, 'type'> = {}) => {
      return addToast(message, { ...options, type })
    }
  }, [addToast])

  // Context 值
  const contextValue: ToastContextType = {
    toast: addToast,
    success: createTypedToast('success'),
    error: createTypedToast('error'),
    warning: createTypedToast('warning'),
    info: createTypedToast('info'),
    debug: createTypedToast('debug' as ToastType),
    dismiss: removeToast,
    dismissAll: clearToasts,
    toasts,
  }

  return (
    <ToastContext.Provider value={contextValue}>
      {children}
      <ToastContainer
        toasts={toasts}
        position={position}
        maxToasts={maxToasts}
        className={className}
        style={style}
        onDismiss={removeToast}
      />
    </ToastContext.Provider>
  )
}
