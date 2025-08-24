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

/**
 * 常量配置测试套件
 * 验证所有导出的常量值和类型的正确性
 */
describe('常量配置', () => {
  describe('动画常量', () => {
    it('应该有正确的动画持续时间', () => {
      expect(ANIMATION_DURATION).toBe(300)
      expect(typeof ANIMATION_DURATION).toBe('number')
    })
  })

  describe('持续时间常量', () => {
    it('应该有正确的默认持续时间', () => {
      expect(DEFAULT_DURATION).toBe(4000)
      expect(SHORT_DURATION).toBe(3000)
      expect(MEDIUM_DURATION).toBe(5000)
      expect(LONG_DURATION).toBe(8000)
    })

    it('持续时间应该按升序排列', () => {
      expect(SHORT_DURATION).toBeLessThan(DEFAULT_DURATION)
      expect(DEFAULT_DURATION).toBeLessThan(MEDIUM_DURATION)
      expect(MEDIUM_DURATION).toBeLessThan(LONG_DURATION)
    })
  })

  describe('性能常量', () => {
    it('应该有正确的性能配置值', () => {
      expect(PROGRESS_UPDATE_INTERVAL).toBe(16) // 60fps帧率
      expect(RENDER_DELAY).toBe(50)
    })
  })

  describe('容器常量', () => {
    it('应该有正确的默认最大Toast数量', () => {
      expect(DEFAULT_MAX_TOASTS).toBe(5)
      expect(typeof DEFAULT_MAX_TOASTS).toBe('number')
    })

    it('应该有正确的默认位置', () => {
      expect(DEFAULT_POSITION).toBe('top-right')
    })
  })

  describe('默认配置', () => {
    it('应该有正确的默认Toast配置', () => {
      expect(DEFAULT_TOAST_CONFIG).toEqual({
        type: 'info',
        duration: DEFAULT_DURATION,
        closable: true,
        animation: 'slide',
        pauseOnHover: true,
      })
    })
  })

  describe('缓动函数', () => {
    it('应该有正确的缓动函数值', () => {
      expect(EASING).toEqual({
        easeOutCubic: 'cubic-bezier(0.33, 1, 0.68, 1)',
        easeInOut: 'ease-in-out',
        easeOut: 'ease-out',
      })
    })
  })

  describe('ID生成常量', () => {
    it('应该有正确的ID长度', () => {
      expect(ID_LENGTH).toBe(9)
      expect(typeof ID_LENGTH).toBe('number')
    })
  })
})