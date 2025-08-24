import { useState, useEffect, useCallback, useRef } from 'react'

export interface UseToastTimerOptions {
  duration: number
  onExpire: () => void
  pauseOnHover?: boolean
}

export const useToastTimer = ({ duration, onExpire, pauseOnHover = true }: UseToastTimerOptions) => {
  const [progress, setProgress] = useState(100)
  const [isPaused, setIsPaused] = useState(false)
  const startTimeRef = useRef<number>(Date.now())
  const pausedTimeRef = useRef<number>(0)
  const animationFrameRef = useRef<number>()

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

  const pause = useCallback(() => {
    if (pauseOnHover && !isPaused) {
      setIsPaused(true)
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
      }
    }
  }, [pauseOnHover, isPaused])

  const resume = useCallback(() => {
    if (pauseOnHover && isPaused) {
      setIsPaused(false)
      const pauseDuration = Date.now() - (startTimeRef.current + pausedTimeRef.current)
      pausedTimeRef.current += pauseDuration
      startTimeRef.current = Date.now() - pausedTimeRef.current
    }
  }, [pauseOnHover, isPaused])

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
    progress,
    isPaused,
    pause,
    resume,
  }
}