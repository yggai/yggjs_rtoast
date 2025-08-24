import React, { createContext, useCallback, useState, ReactNode } from 'react'
import { ToastContainer } from '../components/ToastContainer'
import { 
  ToastData, 
  ToastOptions, 
  ToastContextType, 
  ToastContainerOptions,
  ToastType 
} from '../types'
import { 
  DEFAULT_TOAST_CONFIG,
  DEFAULT_MAX_TOASTS,
  DEFAULT_POSITION,
  ID_LENGTH
} from '../constants'

/**
 * Toast上下文对象
 * 提供Toast相关的方法和状态
 */
export const ToastContext = createContext<ToastContextType | null>(null)

/**
 * ToastProvider组件的属性接口
 */
interface ToastProviderProps extends ToastContainerOptions {
  /** 子组件 */
  children: ReactNode
}

/**
 * 默认Toast配置
 * 排除可选的自定义属性，确保所有必需属性都有默认值
 */
const DEFAULT_OPTIONS: Required<Omit<ToastOptions, 'icon' | 'className' | 'style' | 'onClick' | 'onClose'>> = DEFAULT_TOAST_CONFIG

/**
 * 生成唯一的Toast ID
 * 
 * @returns 格式为 "toast-{timestamp}-{random}" 的唯一标识符
 */
const generateId = (): string => {
  return `toast-${Date.now()}-${Math.random().toString(36).substr(2, ID_LENGTH)}`
}

/**
 * ToastProvider组件
 * 提供Toast功能的上下文提供者，管理全局Toast状态
 * 
 * @param props - ToastProvider组件的属性
 * @returns React功能组件
 */
export const ToastProvider: React.FC<ToastProviderProps> = ({
  children,
  position = DEFAULT_POSITION,
  maxToasts = DEFAULT_MAX_TOASTS,
  className,
  style,
  defaultOptions = {},
}) => {
  // Toast列表状态
  const [toasts, setToasts] = useState<ToastData[]>([])

  /**
   * 添加新的Toast
   * 
   * @param message - Toast消息内容
   * @param options - Toast配置选项
   * @returns Toast的唯一ID
   */
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

    if (process.env.NODE_ENV === 'development') {
      console.log('添加Toast:', { id, message, options: mergedOptions })
    }
    
    setToasts(prev => {
      const newToasts = [newToast, ...prev]
      if (process.env.NODE_ENV === 'development') {
        console.log('更新Toast列表:', newToasts.length, '个Toast')
      }
      return newToasts
    })
    return id
  }, [defaultOptions])

  /**
   * 移除指定ID的Toast
   * 
   * @param id - 要移除的Toast ID
   */
  const removeToast = useCallback((id: string) => {
    setToasts(prev => prev.filter(toast => toast.id !== id))
  }, [])

  /**
   * 清空所有Toast
   */
  const clearToasts = useCallback(() => {
    setToasts([])
  }, [])

  /**
   * 创建指定类型的Toast方法
   * 
   * @param type - Toast类型
   * @returns 返回创建该类型Toast的方法
   */
  const createTypedToast = useCallback((type: ToastType) => {
    return (message: ReactNode, options: Omit<ToastOptions, 'type'> = {}) => {
      return addToast(message, { ...options, type })
    }
  }, [addToast])

  // 构建上下文值对象
  const contextValue: ToastContextType = {
    /** 通用Toast方法 */
    toast: addToast,
    /** 成功类型Toast方法 */
    success: createTypedToast('success'),
    /** 错误类型Toast方法 */
    error: createTypedToast('error'),
    /** 警告类型Toast方法 */
    warning: createTypedToast('warning'),
    /** 信息类型Toast方法 */
    info: createTypedToast('info'),
    /** 调试类型Toast方法 */
    debug: createTypedToast('debug' as ToastType),
    /** 关闭指定Toast方法 */
    dismiss: removeToast,
    /** 关闭所有Toast方法 */
    dismissAll: clearToasts,
    /** 当前Toast列表 */
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
