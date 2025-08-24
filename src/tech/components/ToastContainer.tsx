import React, { useMemo } from 'react'
import { Toast } from './Toast'
import { ToastData, ToastPosition } from '../types'
import { DEFAULT_POSITION, DEFAULT_MAX_TOASTS } from '../constants'
import { createContainerStyles, getContainerClassName } from '../styles/toastStyles'
import { cx } from '../styles/css-in-js'

/**
 * ToastContainer组件的属性接口
 */
interface ToastContainerProps {
  /** Toast数组 */
  toasts: ToastData[]
  /** Toast显示位置 */
  position?: ToastPosition
  /** 最大显示Toast数量 */
  maxToasts?: number
  /** 自定义CSS类名 */
  className?: string
  /** 自定义样式 */
  style?: React.CSSProperties
  /** Toast关闭回调函数 */
  onDismiss: (id: string) => void
}

/**
 * ToastContainer组件实现
 * 负责管理和渲染多个Toast组件的容器
 */
const ToastContainerComponent: React.FC<ToastContainerProps> = ({
  toasts,
  position = DEFAULT_POSITION,
  maxToasts = DEFAULT_MAX_TOASTS,
  className,
  style,
  onDismiss,
}) => {
  // 缓存可见Toast列表计算，避免不必要的重复计算
  const visibleToasts = useMemo(() => {
    return toasts.slice(0, maxToasts)
  }, [toasts, maxToasts])

  // 缓存基于位置的Toast排序计算
  const sortedToasts = useMemo(() => {
    return position.includes('bottom') 
      ? [...visibleToasts].reverse() 
      : visibleToasts
  }, [visibleToasts, position])

  // 生成容器样式类名
  const containerClassName = useMemo(() => {
    return createContainerStyles({ position })
  }, [position])

  // 合并最终的CSS类名，包含语义化类名以兼容测试
  const finalClassName = useMemo(() => {
    return cx(
      getContainerClassName(position),
      containerClassName,
      className
    )
  }, [position, containerClassName, className])

  // 如果没有Toast则不渲染任何内容
  if (toasts.length === 0) {
    return null
  }

  return (
    <div className={finalClassName} style={style}>
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

/**
 * 使用React.memo优化的ToastContainer组件
 * 通过自定义比较函数避免不必要的重渲染
 */
export const ToastContainer = React.memo(ToastContainerComponent, (prevProps, nextProps) => {
  // 对大部分属性进行浅比较
  if (
    prevProps.position !== nextProps.position ||
    prevProps.maxToasts !== nextProps.maxToasts ||
    prevProps.className !== nextProps.className ||
    prevProps.style !== nextProps.style ||
    prevProps.onDismiss !== nextProps.onDismiss
  ) {
    return false
  }

  // 对Toast数组进行深度比较
  if (prevProps.toasts.length !== nextProps.toasts.length) {
    return false
  }

  // 检查任何Toast是否发生变化
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
