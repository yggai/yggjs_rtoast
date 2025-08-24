import {
  ANIMATION_DURATION,
  DEFAULT_DURATION,
  SHORT_DURATION,
  MEDIUM_DURATION,
  LONG_DURATION,
  PROGRESS_UPDATE_INTERVAL,
  RENDER_DELAY,
  DEFAULT_MAX_TOASTS,
  DEFAULT_TOAST_CONFIG,
  DEFAULT_POSITION,
  EASING,
  ID_LENGTH,
} from '../index'

describe('Constants', () => {
  describe('Animation constants', () => {
    it('should have correct animation duration', () => {
      expect(ANIMATION_DURATION).toBe(300)
      expect(typeof ANIMATION_DURATION).toBe('number')
    })
  })

  describe('Duration constants', () => {
    it('should have correct default durations', () => {
      expect(DEFAULT_DURATION).toBe(4000)
      expect(SHORT_DURATION).toBe(3000)
      expect(MEDIUM_DURATION).toBe(5000)
      expect(LONG_DURATION).toBe(8000)
    })

    it('should have durations in ascending order', () => {
      expect(SHORT_DURATION).toBeLessThan(DEFAULT_DURATION)
      expect(DEFAULT_DURATION).toBeLessThan(MEDIUM_DURATION)
      expect(MEDIUM_DURATION).toBeLessThan(LONG_DURATION)
    })
  })

  describe('Performance constants', () => {
    it('should have correct performance values', () => {
      expect(PROGRESS_UPDATE_INTERVAL).toBe(16) // 60fps
      expect(RENDER_DELAY).toBe(50)
    })
  })

  describe('Container constants', () => {
    it('should have correct default max toasts', () => {
      expect(DEFAULT_MAX_TOASTS).toBe(5)
      expect(typeof DEFAULT_MAX_TOASTS).toBe('number')
    })

    it('should have correct default position', () => {
      expect(DEFAULT_POSITION).toBe('top-right')
    })
  })

  describe('Default configuration', () => {
    it('should have correct default toast config', () => {
      expect(DEFAULT_TOAST_CONFIG).toEqual({
        type: 'info',
        duration: DEFAULT_DURATION,
        closable: true,
        animation: 'slide',
        pauseOnHover: true,
      })
    })
  })

  describe('Easing functions', () => {
    it('should have correct easing values', () => {
      expect(EASING).toEqual({
        easeOutCubic: 'cubic-bezier(0.33, 1, 0.68, 1)',
        easeInOut: 'ease-in-out',
        easeOut: 'ease-out',
      })
    })
  })

  describe('ID generation constants', () => {
    it('should have correct ID length', () => {
      expect(ID_LENGTH).toBe(9)
      expect(typeof ID_LENGTH).toBe('number')
    })
  })
})