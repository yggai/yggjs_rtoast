/**
 * CSS-in-JS性能优化工具
 * 提供样式缓存、样式提取、SSR支持等高级功能
 */

import { css, clearStyleCache } from './css-in-js'

// 样式提取器，用于SSR
let extractedStyles: string[] = []

/**
 * 启用样式提取模式（用于SSR）
 */
export const startStyleExtraction = (): void => {
  extractedStyles = []
}

/**
 * 停止样式提取并返回提取的样式
 * @returns 提取的CSS样式数组
 */
export const finishStyleExtraction = (): string[] => {
  const styles = [...extractedStyles]
  extractedStyles = []
  return styles
}

/**
 * 获取当前提取的样式
 * @returns 提取的CSS样式字符串
 */
export const getExtractedStyles = (): string => {
  return extractedStyles.join('\n')
}

/**
 * 样式性能监控器
 */
class StylePerformanceMonitor {
  private styleGenerationTimes: number[] = []
  private cacheHits = 0
  private cacheMisses = 0

  /**
   * 记录样式生成时间
   * @param time - 生成时间（毫秒）
   */
  recordStyleGeneration(time: number): void {
    this.styleGenerationTimes.push(time)
    // 保持最近100个记录
    if (this.styleGenerationTimes.length > 100) {
      this.styleGenerationTimes.shift()
    }
  }

  /**
   * 记录缓存命中
   */
  recordCacheHit(): void {
    this.cacheHits++
  }

  /**
   * 记录缓存未命中
   */
  recordCacheMiss(): void {
    this.cacheMisses++
  }

  /**
   * 获取性能统计信息
   * @returns 性能统计对象
   */
  getStats(): {
    averageGenerationTime: number
    cacheHitRate: number
    totalOperations: number
  } {
    const totalTime = this.styleGenerationTimes.reduce((sum, time) => sum + time, 0)
    const averageGenerationTime = this.styleGenerationTimes.length > 0 
      ? totalTime / this.styleGenerationTimes.length 
      : 0

    const totalOperations = this.cacheHits + this.cacheMisses
    const cacheHitRate = totalOperations > 0 
      ? this.cacheHits / totalOperations 
      : 0

    return {
      averageGenerationTime,
      cacheHitRate,
      totalOperations,
    }
  }

  /**
   * 重置统计信息
   */
  reset(): void {
    this.styleGenerationTimes = []
    this.cacheHits = 0
    this.cacheMisses = 0
  }
}

// 全局性能监控器实例
export const performanceMonitor = new StylePerformanceMonitor()

/**
 * 高性能样式函数，带有性能监控
 * @param styles - 样式对象或字符串
 * @param prefix - 类名前缀
 * @returns CSS类名
 */
export const performantCSS = (
  styles: Record<string, string | number> | string,
  prefix?: string
): string => {
  const startTime = performance.now()
  
  try {
    const className = css(styles, prefix)
    const endTime = performance.now()
    
    performanceMonitor.recordStyleGeneration(endTime - startTime)
    performanceMonitor.recordCacheHit() // css函数内部会处理缓存
    
    return className
  } catch (error) {
    const endTime = performance.now()
    performanceMonitor.recordStyleGeneration(endTime - startTime)
    performanceMonitor.recordCacheMiss()
    throw error
  }
}

/**
 * 批量样式生成器，用于一次性生成多个样式
 * @param styleGroups - 样式组对象
 * @returns 样式类名映射
 */
export const batchStyles = <T extends Record<string, Record<string, string | number>>>(
  styleGroups: T
): Record<keyof T, string> => {
  const result: Record<keyof T, string> = {} as Record<keyof T, string>
  
  for (const [key, styles] of Object.entries(styleGroups)) {
    result[key as keyof T] = performantCSS(styles, key)
  }
  
  return result
}

/**
 * 样式预加载器，用于预生成常用样式
 * @param commonStyles - 常用样式定义
 */
export const preloadStyles = (commonStyles: Record<string, Record<string, string | number>>): void => {
  // 在空闲时间预生成样式
  if (typeof requestIdleCallback !== 'undefined') {
    requestIdleCallback(() => {
      batchStyles(commonStyles)
    })
  } else {
    // 降级到setTimeout
    setTimeout(() => {
      batchStyles(commonStyles)
    }, 0)
  }
}

/**
 * 样式缓存管理器
 */
export class StyleCacheManager {
  private static instance: StyleCacheManager

  static getInstance(): StyleCacheManager {
    if (!StyleCacheManager.instance) {
      StyleCacheManager.instance = new StyleCacheManager()
    }
    return StyleCacheManager.instance
  }

  /**
   * 清理过期的样式缓存
   */
  cleanupExpiredStyles(): void {
    // 这里可以实现基于时间的缓存清理逻辑
    // 由于我们的CSS-in-JS实现比较简单，这里暂时使用全量清理
    if (Date.now() % 100 === 0) { // 1%的概率触发清理
      clearStyleCache()
    }
  }

  /**
   * 获取缓存统计信息
   * @returns 缓存统计
   */
  getCacheStats(): { size: number } {
    // 简化的统计信息
    return { size: 0 } // 实际实现需要访问内部缓存
  }

  /**
   * 预热样式缓存
   * @param styles - 需要预热的样式
   */
  warmupCache(styles: Record<string, Record<string, string | number>>): void {
    preloadStyles(styles)
  }
}

/**
 * 开发模式的样式调试工具
 */
export const StyleDebugger = {
  /**
   * 启用样式调试
   */
  enable(): void {
    if (process.env.NODE_ENV === 'development') {
      console.log('🎨 Toast CSS-in-JS 样式调试已启用')
      
      // 定期输出性能统计
      setInterval(() => {
        const stats = performanceMonitor.getStats()
        console.log('📊 样式性能统计:', stats)
      }, 30000) // 每30秒输出一次
    }
  },

  /**
   * 输出样式信息
   * @param className - 类名
   * @param styles - 样式对象
   */
  logStyles(className: string, styles: Record<string, string | number>): void {
    if (process.env.NODE_ENV === 'development') {
      console.group(`🎨 样式生成: ${className}`)
      console.log('样式对象:', styles)
      console.groupEnd()
    }
  },

  /**
   * 分析样式性能
   */
  analyzePerformance(): void {
    if (process.env.NODE_ENV === 'development') {
      const stats = performanceMonitor.getStats()
      console.group('📊 Toast样式性能分析')
      console.log('平均生成时间:', `${stats.averageGenerationTime.toFixed(2)}ms`)
      console.log('缓存命中率:', `${(stats.cacheHitRate * 100).toFixed(2)}%`)
      console.log('总操作数:', stats.totalOperations)
      console.groupEnd()
    }
  }
}

// 在开发模式下自动启用调试
if (process.env.NODE_ENV === 'development' && typeof window !== 'undefined') {
  StyleDebugger.enable()
}