import { useState, useEffect, useCallback } from 'react'
import { ANIMATION_DURATION, RENDER_DELAY } from '../constants'

export interface UseToastAnimationOptions {
  animation: string
  onExit?: () => void
}

export const useToastAnimation = ({ animation, onExit }: UseToastAnimationOptions) => {
  const [isVisible, setIsVisible] = useState(false)
  const [isExiting, setIsExiting] = useState(false)

  const startEnterAnimation = useCallback(() => {
    const timer = setTimeout(() => setIsVisible(true), RENDER_DELAY)
    return () => clearTimeout(timer)
  }, [])

  const startExitAnimation = useCallback(() => {
    setIsExiting(true)
    const timer = setTimeout(() => {
      onExit?.()
    }, ANIMATION_DURATION)
    return () => clearTimeout(timer)
  }, [onExit])

  useEffect(() => {
    return startEnterAnimation()
  }, [startEnterAnimation])

  return {
    isVisible,
    isExiting,
    startExitAnimation,
    animationClasses: {
      [`ygg-toast--${animation}-enter`]: isVisible && !isExiting,
      [`ygg-toast--${animation}-exit`]: isExiting,
    }
  }
}