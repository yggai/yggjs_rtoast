import { useState, useEffect, useCallback, useRef } from 'react'

/**
 * useToastTimer Hook的配置选项接口
 */
export interface UseToastTimerOptions {
  /** Toast持续时间（毫秒） */
  duration: number
  /** 计时器到期时的回调函数 */
  onExpire: () => void
  /** 是否支持鼠标悬停时暂停 */
  pauseOnHover?: boolean
}

/**
 * Toast计时器Hook
 * 管理Toast的自动关闭计时器和进度条显示
 * 
 * @param options - 计时器配置选项
 * @returns 计时器状态和控制方法
 */
export const useToastTimer = ({ duration, onExpire, pauseOnHover = true }: UseToastTimerOptions) => {
  // 进度百分比状态
  const [progress, setProgress] = useState(100)
  // 是否暂停状态
  const [isPaused, setIsPaused] = useState(false)
  // 开始时间引用
  const startTimeRef = useRef<number>(Date.now())
  // 暂停累计时间引用
  const pausedTimeRef = useRef<number>(0)
  // 动画帧ID引用
  const animationFrameRef = useRef<number>()

  /**
   * 更新进度条的回调函数
   * 使用requestAnimationFrame确保流畅的动画效果
   */
  const updateProgress = useCallback(() => {
    if (duration === 0 || isPaused) return

    const now = Date.now()
    const elapsed = now - startTimeRef.current - pausedTimeRef.current
    const remaining = Math.max(0, duration - elapsed)
    const progressPercent = (remaining / duration) * 100

    setProgress(progressPercent)

    if (remaining <= 0) {
      onExpire()
    } else {
      animationFrameRef.current = requestAnimationFrame(updateProgress)
    }
  }, [duration, isPaused, onExpire])

  /**
   * 暂停计时器
   * 仅在启用pauseOnHover且当前未暂停时生效
   */
  const pause = useCallback(() => {
    if (pauseOnHover && !isPaused) {
      setIsPaused(true)
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
      }
    }
  }, [pauseOnHover, isPaused])

  /**
   * 恢复计时器
   * 计算暂停期间的时间并调整开始时间
   */
  const resume = useCallback(() => {
    if (pauseOnHover && isPaused) {
      setIsPaused(false)
      const pauseDuration = Date.now() - (startTimeRef.current + pausedTimeRef.current)
      pausedTimeRef.current += pauseDuration
      startTimeRef.current = Date.now() - pausedTimeRef.current
    }
  }, [pauseOnHover, isPaused])

  // 副作用：启动计时器和清理资源
  useEffect(() => {
    if (duration > 0 && !isPaused) {
      animationFrameRef.current = requestAnimationFrame(updateProgress)
    }

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
      }
    }
  }, [duration, isPaused, updateProgress])

  return {
    /** 当前进度百分比 */
    progress,
    /** 是否处于暂停状态 */
    isPaused,
    /** 暂停计时器方法 */
    pause,
    /** 恢复计时器方法 */
    resume,
  }
}