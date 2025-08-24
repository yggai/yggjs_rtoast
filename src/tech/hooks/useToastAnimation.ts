import { useState, useEffect, useCallback } from 'react'
import { ANIMATION_DURATION, RENDER_DELAY } from '../constants'

/**
 * useToastAnimation Hook的配置选项接口
 */
export interface UseToastAnimationOptions {
  /** 动画类型 */
  animation: string
  /** 退出动画完成时的回调函数 */
  onExit?: () => void
}

/**
 * Toast动画Hook
 * 管理Toast的进入和退出动画状态
 * 
 * @param options - 动画配置选项
 * @returns 动画状态和控制方法
 */
export const useToastAnimation = ({ animation, onExit }: UseToastAnimationOptions) => {
  // 是否可见状态
  const [isVisible, setIsVisible] = useState(false)
  // 是否正在退出状态
  const [isExiting, setIsExiting] = useState(false)

  /**
   * 启动进入动画
   * 延迟一段时间后设置为可见状态，确保DOM渲染完成
   */
  const startEnterAnimation = useCallback(() => {
    const timer = setTimeout(() => setIsVisible(true), RENDER_DELAY)
    return () => clearTimeout(timer)
  }, [])

  /**
   * 启动退出动画
   * 设置退出状态，并在动画完成后执行回调
   */
  const startExitAnimation = useCallback(() => {
    setIsExiting(true)
    const timer = setTimeout(() => {
      onExit?.()
    }, ANIMATION_DURATION)
    return () => clearTimeout(timer)
  }, [onExit])

  // 副作用：组件挂载时启动进入动画
  useEffect(() => {
    return startEnterAnimation()
  }, [startEnterAnimation])

  return {
    /** 是否可见 */
    isVisible,
    /** 是否正在退出 */
    isExiting,
    /** 启动退出动画的方法 */
    startExitAnimation,
    /** 动画CSS类名对象 */
    animationClasses: {
      [`ygg-toast--${animation}-enter`]: isVisible && !isExiting,
      [`ygg-toast--${animation}-exit`]: isExiting,
    }
  }
}